import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as bgtAbi from "./abi/BGT";
import * as factoryAbi from "./abi/Factory";
import * as honeyVaultAbi from "./abi/HoneyVault";
import {
  BGTDelegation,
  Fees,
  LPToken,
  VaultRewardsClaim,
  Vault,
  VaultDeposit,
  VaultStake,
  VaultTotalDeposit,
  VaultTotalStake,
  VaultUnstake,
  VaultWithdrawal,
} from "./model";
import { processor } from "./processor";

processor.run(new TypeormDatabase(), async (ctx) => {
  const entities = {
    vaults: [] as Vault[],
    lpTokens: [] as LPToken[],
    vaultDeposits: [] as VaultDeposit[],
    vaultWithdrawals: [] as VaultWithdrawal[],
    vaultTotalDeposits: new Map<string, VaultTotalDeposit>(),
    vaultStakes: [] as VaultStake[],
    vaultUnstakes: [] as VaultUnstake[],
    vaultTotalStakes: new Map<string, VaultTotalStake>(),
    fees: [] as Fees[],
    bgtDelegations: new Map<string, BGTDelegation>(),
    vaultRewardsClaims: [] as VaultRewardsClaim[],
  };

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      await processLog(log, block, ctx, entities);
    }
  }

  await saveEntities(ctx, entities);
});

async function processLog(log: any, block: any, ctx: any, entities: any) {
  if (factoryAbi.events.NewVault.is(log)) {
    processNewVault(log, block, entities);
  } else if (honeyVaultAbi.events.Deposited.is(log)) {
    await processDeposit(log, block, ctx, entities);
  } else if (honeyVaultAbi.events.Withdrawn.is(log)) {
    await processWithdrawal(log, block, ctx, entities);
  } else if (honeyVaultAbi.events.LockedUntil.is(log)) {
    await processLock(log, ctx, entities);
  } else if (honeyVaultAbi.events.Staked.is(log)) {
    await processStake(log, block, ctx, entities);
  } else if (honeyVaultAbi.events.Unstaked.is(log)) {
    await processUnstake(log, block, ctx, entities);
  } else if (honeyVaultAbi.events.Fees.is(log)) {
    processFees(log, entities);
  } else if (honeyVaultAbi.events.RewardsClaimed.is(log)) {
    await processRewardsClaim(log, block, entities);
  } else if (bgtAbi.events.QueueBoost.is(log)) {
    await processBGTQueueBoost(log, ctx, entities);
  } else if (bgtAbi.events.ActivateBoost.is(log)) {
    await processBGTActivateBoost(log, ctx, entities);
  } else if (bgtAbi.events.CancelBoost.is(log)) {
    await processBGTCancelBoost(log, ctx, entities);
  } else if (bgtAbi.events.DropBoost.is(log)) {
    await processBGTDropBoost(log, ctx, entities);
  }
}

function processNewVault(log: any, block: any, entities: any) {
  const { owner, vault } = factoryAbi.events.NewVault.decode(log);
  entities.vaults.push(
    new Vault({
      id: vault,
      owner: owner,
      timestamp: BigInt(block.header.timestamp),
      address: vault,
    })
  );
}

async function processDeposit(log: any, block: any, ctx: any, entities: any) {
  const { token, amount } = honeyVaultAbi.events.Deposited.decode(log);
  entities.vaultDeposits.push(
    new VaultDeposit({
      id: log.id,
      vaultAddress: log.address,
      tokenAddress: token,
      amount: amount,
      timestamp: BigInt(block.header.timestamp),
      transactionHash: log.transaction?.hash,
    })
  );

  await updateVaultTotalDeposit(log.address, token, amount, ctx, entities);
}

async function processWithdrawal(log: any, block: any, ctx: any, entities: any) {
  const { token, amount } = honeyVaultAbi.events.Withdrawn.decode(log);
  entities.vaultWithdrawals.push(
    new VaultWithdrawal({
      id: log.id,
      vaultAddress: log.address,
      tokenAddress: token,
      amount: amount,
      timestamp: BigInt(block.header.timestamp),
      transactionHash: log.transaction?.hash,
    })
  );

  await updateVaultTotalDeposit(log.address, token, -amount, ctx, entities);
}

async function processLock(log: any, ctx: any, entities: any) {
  const { token, expiration } = honeyVaultAbi.events.LockedUntil.decode(log);
  const id = log.address + "-" + token;
  const existingDeposit = entities.vaultTotalDeposits.get(id) || await ctx.store.get(VaultTotalDeposit, id);
  const updatedDeposit = new VaultTotalDeposit({
    ...existingDeposit,
    id: id,
    lockExpiration: expiration,
  });
  entities.vaultTotalDeposits.set(id, updatedDeposit);
}

async function processStake(log: any, block: any, ctx: any, entities: any) {
  const { stakingContract, token, amount } = honeyVaultAbi.events.Staked.decode(log);
  entities.vaultStakes.push(
    new VaultStake({
      id: log.id,
      vaultAddress: log.address,
      tokenAddress: token,
      stakingContract,
      amount,
      timestamp: BigInt(block.header.timestamp),
      transactionHash: log.transaction?.hash,
    })
  );

  await updateVaultTotalStake(log.address, token, stakingContract, amount, ctx, entities);
}

async function processUnstake(log: any, block: any, ctx: any, entities: any) {
  const { stakingContract, token, amount } = honeyVaultAbi.events.Unstaked.decode(log);
  entities.vaultUnstakes.push(
    new VaultUnstake({
      id: log.id,
      vaultAddress: log.address,
      tokenAddress: token,
      stakingContract,
      amount,
      timestamp: BigInt(block.header.timestamp),
      transactionHash: log.transaction?.hash,
    })
  );

  await updateVaultTotalStake(log.address, token, stakingContract, -amount, ctx, entities);
}

function processFees(log: any, entities: any) {
  const { referral, token, amount } = honeyVaultAbi.events.Fees.decode(log);
  entities.fees.push(
    new Fees({
      id: log.id,
      tokenAddress: token,
      amount,
      referral,
      transactionHash: log.transaction?.hash,
    })
  );
}

async function processRewardsClaim(log: any, block: any, entities: any) {
  const { stakingContract } = honeyVaultAbi.events.RewardsClaimed.decode(log);
  entities.vaultRewardsClaims.push(
    new VaultRewardsClaim({
      id: log.id,
      vaultAddress: log.address,
      stakingContract: stakingContract,
      timestamp: BigInt(block.header.timestamp),
      transactionHash: log.transaction?.hash,
    })
  );
}

async function processBGTQueueBoost(log: any, ctx: any, entities: any) {
  const { sender, validator, amount } = bgtAbi.events.QueueBoost.decode(log);
  await updateBGTDelegation(sender, validator, amount, 0n, ctx, entities);
}

async function processBGTActivateBoost(log: any, ctx: any, entities: any) {
  const { sender, validator, amount } = bgtAbi.events.ActivateBoost.decode(log);
  await updateBGTDelegation(sender, validator, -amount, amount, ctx, entities);
}

async function processBGTCancelBoost(log: any, ctx: any, entities: any) {
  const { sender, validator, amount } = bgtAbi.events.CancelBoost.decode(log);
  await updateBGTDelegation(sender, validator, -amount, 0n, ctx, entities);
}

async function processBGTDropBoost(log: any, ctx: any, entities: any) {
  const { sender, validator, amount } = bgtAbi.events.DropBoost.decode(log);
  await updateBGTDelegation(sender, validator, 0n, -amount, ctx, entities);
}

async function saveEntities(ctx: any, entities: any) {
  await ctx.store.upsert(entities.vaults);
  await ctx.store.upsert(entities.lpTokens);
  await ctx.store.upsert(entities.vaultDeposits);
  await ctx.store.upsert(entities.vaultWithdrawals);
  await ctx.store.upsert(Array.from(entities.vaultTotalDeposits.values()));
  await ctx.store.upsert(entities.vaultStakes);
  await ctx.store.upsert(entities.vaultUnstakes);
  await ctx.store.upsert(Array.from(entities.vaultTotalStakes.values()));
  await ctx.store.upsert(entities.fees);
  await ctx.store.upsert(entities.vaultRewardsClaims);
  await ctx.store.upsert(Array.from(entities.bgtDelegations.values()));
}

async function updateVaultTotalDeposit(vaultAddress: string, token: string, amount: bigint, ctx: any, entities: any) {
  const id = vaultAddress + "-" + token;
  const existingDeposit = entities.vaultTotalDeposits.get(id) || await ctx.store.get(VaultTotalDeposit, id);
  const updatedDeposit = new VaultTotalDeposit({
    id: id,
    vaultAddress: vaultAddress,
    tokenAddress: token,
    amount: (existingDeposit?.amount || BigInt(0)) + amount,
    lockExpiration: existingDeposit?.lockExpiration,
  });
  entities.vaultTotalDeposits.set(id, updatedDeposit);
}

async function updateVaultTotalStake(vaultAddress: string, token: string, stakingContract: string, amount: bigint, ctx: any, entities: any) {
  const id = vaultAddress + "-" + token + "-" + stakingContract;
  const existingStake = entities.vaultTotalStakes.get(id) || await ctx.store.get(VaultTotalStake, id);
  const updatedStake = new VaultTotalStake({
    id,
    vaultAddress,
    tokenAddress: token,
    stakingContract,
    amount: (existingStake?.amount || BigInt(0)) + amount,
  });
  entities.vaultTotalStakes.set(id, updatedStake);
}

async function updateBGTDelegation(vaultAddress: string, validator: string, queuedChange: bigint, activatedChange: bigint, ctx: any, entities: any) {
  const id = vaultAddress + "-" + validator;
  const existingDelegation = entities.bgtDelegations.get(id) || await ctx.store.get(BGTDelegation, id);
  const updatedDelegation = new BGTDelegation({
    id,
    vaultAddress,
    validator,
    queued: (existingDelegation?.queued || BigInt(0)) + queuedChange,
    activated: (existingDelegation?.activated || BigInt(0)) + activatedChange,
  });
  entities.bgtDelegations.set(id, updatedDelegation);
}