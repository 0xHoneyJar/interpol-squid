import {
  StoreWithCache,
  TypeormDatabaseWithCache,
} from "@belopash/typeorm-store";
import { Log } from "@subsquid/evm-processor";
import * as bgtAbi from "./abi/BGT";
import * as erc20Abi from "./abi/ERC20";
import * as factoryAbi from "./abi/Factory";
import * as honeyVaultAbi from "./abi/HoneyVault";
import * as xkdkAbi from "./abi/XKDK";
import {
  BGTDelegation,
  Vault,
  VaultBalance,
  VaultDeposit,
  VaultRewardsClaim,
  VaultStake,
  VaultTotalDeposit,
  VaultTotalStake,
  VaultUnstake,
  VaultWithdrawal,
  XKDKFinalizedRedeem,
  XKDKRedeem,
} from "./model";
import { processor, ProcessorContext } from "./processor";

type Task = () => Promise<void>;
type MappingContext = ProcessorContext<StoreWithCache> & { queue: Task[] };

processor.run(new TypeormDatabaseWithCache(), async (ctx) => {
  const mctx: MappingContext = {
    ...ctx,
    queue: [],
  };

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      await processLog(log, block, mctx);
    }
  }

  for (let task of mctx.queue) {
    await task();
  }
});

async function processLog(log: Log, block: any, mctx: MappingContext) {
  if (factoryAbi.events.NewLocker.is(log)) {
    processNewVault(log, block, mctx);
  } else if (honeyVaultAbi.events.Deposited.is(log)) {
    await processDeposit(log, block, mctx);
  } else if (honeyVaultAbi.events.Withdrawn.is(log)) {
    await processWithdrawal(log, block, mctx);
  } else if (honeyVaultAbi.events.LockedUntil.is(log)) {
    await processLock(log, mctx);
  } else if (honeyVaultAbi.events.Staked.is(log)) {
    await processStake(log, block, mctx);
  } else if (honeyVaultAbi.events.Unstaked.is(log)) {
    await processUnstake(log, block, mctx);
  } else if (honeyVaultAbi.events.RewardsClaimed.is(log)) {
    await processRewardsClaim(log, block, mctx);
  } else if (bgtAbi.events.QueueBoost.is(log)) {
    await processBGTQueueBoost(log, mctx);
  } else if (bgtAbi.events.ActivateBoost.is(log)) {
    await processBGTActivateBoost(log, mctx);
  } else if (bgtAbi.events.CancelBoost.is(log)) {
    await processBGTCancelBoost(log, mctx);
  } else if (bgtAbi.events.DropBoost.is(log)) {
    await processBGTDropBoost(log, mctx);
  } else if (xkdkAbi.events.Redeem.is(log)) {
    await processXKDKRedeem(log, block, mctx);
  } else if (xkdkAbi.events.FinalizeRedeem.is(log)) {
    await processXKDKFinalizedRedeem(log, block, mctx);
  } else if (erc20Abi.events.Transfer.is(log)) {
    await processERC20Transfer(log, block, mctx);
  } else if (honeyVaultAbi.events.OwnershipTransferred.is(log)) {
    await processOwnershipTransferred(log, mctx);
  }
}

function processNewVault(log: Log, block: any, mctx: MappingContext) {
  const { owner, locker } = factoryAbi.events.NewLocker.decode(log);
  const vault = mctx.store.defer(Vault, locker.toLowerCase());
  mctx.queue.push(async () => {
    vault.getOrInsert(
      () =>
        new Vault({
          id: locker.toLowerCase(),
          owner: owner,
          timestamp: BigInt(block.header.timestamp),
          address: locker,
        })
    );
  });
}

async function processDeposit(log: Log, block: any, mctx: MappingContext) {
  const { token, amount } = honeyVaultAbi.events.Deposited.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new VaultDeposit({
        id: log.id,
        vaultAddress: log.address,
        tokenAddress: token,
        amount: amount,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
  await updateVaultTotalDeposit(log.address, token, amount, mctx);
}

async function processWithdrawal(log: Log, block: any, mctx: MappingContext) {
  const { token, amount } = honeyVaultAbi.events.Withdrawn.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new VaultWithdrawal({
        id: log.id,
        vaultAddress: log.address,
        tokenAddress: token,
        amount: amount,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
  await updateVaultTotalDeposit(log.address, token, -amount, mctx);
}

async function processLock(log: Log, mctx: MappingContext) {
  const { token, expiration } = honeyVaultAbi.events.LockedUntil.decode(log);
  const id = log.address + "-" + token;
  mctx.store.defer(VaultTotalDeposit, id);
  mctx.queue.push(async () => {
    const existingDeposit = await mctx.store.get(VaultTotalDeposit, id);
    await mctx.store.upsert(
      new VaultTotalDeposit({
        ...existingDeposit,
        id: id,
        lockExpiration: expiration,
      })
    );
  });
}

async function processStake(log: Log, block: any, mctx: MappingContext) {
  const { stakingContract, token, amount } =
    honeyVaultAbi.events.Staked.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
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
  });
  await updateVaultTotalStake(
    log.address,
    token,
    stakingContract,
    amount,
    mctx
  );
}

async function processUnstake(log: Log, block: any, mctx: MappingContext) {
  const { stakingContract, token, amount } =
    honeyVaultAbi.events.Unstaked.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
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
  });
  await updateVaultTotalStake(
    log.address,
    token,
    stakingContract,
    -amount,
    mctx
  );
}

async function processRewardsClaim(log: Log, block: any, mctx: MappingContext) {
  const { stakingContract } = honeyVaultAbi.events.RewardsClaimed.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new VaultRewardsClaim({
        id: log.id,
        vaultAddress: log.address,
        stakingContract: stakingContract,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
}

async function processBGTQueueBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.QueueBoost.decode(log);
  await updateBGTDelegation(sender, validator, amount, 0n, mctx);
}

async function processBGTActivateBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.ActivateBoost.decode(log);
  await updateBGTDelegation(sender, validator, -amount, amount, mctx);
}

async function processBGTCancelBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.CancelBoost.decode(log);
  await updateBGTDelegation(sender, validator, -amount, 0n, mctx);
}

async function processBGTDropBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.DropBoost.decode(log);
  await updateBGTDelegation(sender, validator, 0n, -amount, mctx);
}

async function processOwnershipTransferred(log: Log, mctx: MappingContext) {
  const { oldOwner, newOwner } =
    honeyVaultAbi.events.OwnershipTransferred.decode(log);
  mctx.store.defer(Vault, oldOwner.toLowerCase());
  mctx.queue.push(async () => {
    const vault = await mctx.store.get(Vault, oldOwner.toLowerCase());
    if (vault) {
      await mctx.store.upsert(
        new Vault({
          id: log.address,
          owner: newOwner,
        })
      );
    }
  });
}

async function processXKDKFinalizedRedeem(
  log: Log,
  block: any,
  mctx: MappingContext
) {
  const { userAddress, xKodiakAmount } =
    xkdkAbi.events.FinalizeRedeem.decode(log);
  mctx.store.defer(Vault, userAddress.toLowerCase());
  mctx.queue.push(async () => {
    const isVault = await mctx.store.get(Vault, userAddress.toLowerCase());
    if (isVault) {
      await mctx.store.upsert(
        new XKDKFinalizedRedeem({
          id: log.id,
          vaultAddress: userAddress,
          amount: xKodiakAmount,
          timestamp: BigInt(block.header.timestamp),
          transactionHash: log.transaction?.hash,
        })
      );
    }
  });
}

async function processXKDKRedeem(log: Log, block: any, mctx: MappingContext) {
  const { userAddress, xKodiakAmount, kodiakAmount, duration } =
    xkdkAbi.events.Redeem.decode(log);
  mctx.store.defer(Vault, userAddress.toLowerCase());
  mctx.queue.push(async () => {
    const isVault = await mctx.store.get(Vault, userAddress.toLowerCase());
    if (isVault) {
      await mctx.store.upsert(
        new XKDKRedeem({
          id: log.id,
          vaultAddress: userAddress,
          xKodiakAmount: xKodiakAmount,
          kodiakAmount: kodiakAmount,
          duration: duration,
          timestamp: BigInt(block.header.timestamp),
          transactionHash: log.transaction?.hash,
        })
      );
    }
  });
}

async function processERC20Transfer(
  log: Log,
  block: any,
  mctx: MappingContext
) {
  const { from, to, value } = erc20Abi.events.Transfer.decode(log);

  mctx.store.defer(Vault, to.toLowerCase());
  mctx.store.defer(Vault, from.toLowerCase());

  mctx.queue.push(async () => {
    const isToVault = await mctx.store.get(Vault, to.toLowerCase());
    if (isToVault) {
      await updateVaultBalance(to, log.address, BigInt(value), mctx);
    }
  });

  mctx.queue.push(async () => {
    const isFromVault = await mctx.store.get(Vault, from.toLowerCase());
    if (isFromVault) {
      await updateVaultBalance(from, log.address, BigInt(-value), mctx);
    }
  });
}

async function updateVaultBalance(
  vaultAddress: string,
  tokenAddress: string,
  amount: bigint,
  mctx: MappingContext
) {
  const id = `${vaultAddress}-${tokenAddress}`;
  mctx.store.defer(VaultBalance, id);
  mctx.queue.push(async () => {
    const existingBalance = await mctx.store.get(VaultBalance, id);

    await mctx.store.upsert(
      new VaultBalance({
        id,
        vaultAddress,
        tokenAddress,
        balance: (existingBalance?.balance || 0n) + amount,
      })
    );
  });
}

async function updateVaultTotalDeposit(
  vaultAddress: string,
  token: string,
  amount: bigint,
  mctx: MappingContext
) {
  const id = vaultAddress + "-" + token;
  mctx.store.defer(VaultTotalDeposit, id);
  mctx.queue.push(async () => {
    const existingDeposit = await mctx.store.get(VaultTotalDeposit, id);
    await mctx.store.upsert(
      new VaultTotalDeposit({
        id: id,
        vaultAddress: vaultAddress,
        tokenAddress: token,
        amount: (existingDeposit?.amount || BigInt(0)) + amount,
        lockExpiration: existingDeposit?.lockExpiration,
      })
    );
  });
}

async function updateVaultTotalStake(
  vaultAddress: string,
  token: string,
  stakingContract: string,
  amount: bigint,
  mctx: MappingContext
) {
  const id = vaultAddress + "-" + token + "-" + stakingContract;
  mctx.store.defer(VaultTotalStake, id);
  mctx.queue.push(async () => {
    const existingStake = await mctx.store.get(VaultTotalStake, id);
    await mctx.store.upsert(
      new VaultTotalStake({
        id,
        vaultAddress,
        tokenAddress: token,
        stakingContract,
        amount: (existingStake?.amount || BigInt(0)) + amount,
      })
    );
  });
}

async function updateBGTDelegation(
  vaultAddress: string,
  validator: string,
  queuedChange: bigint,
  activatedChange: bigint,
  mctx: MappingContext
) {
  const id = vaultAddress + "-" + validator;
  mctx.store.defer(BGTDelegation, id);
  mctx.queue.push(async () => {
    const existingDelegation = await mctx.store.get(BGTDelegation, id);
    await mctx.store.upsert(
      new BGTDelegation({
        id,
        vaultAddress,
        validator,
        queued: (existingDelegation?.queued || BigInt(0)) + queuedChange,
        activated:
          (existingDelegation?.activated || BigInt(0)) + activatedChange,
      })
    );
  });
}
