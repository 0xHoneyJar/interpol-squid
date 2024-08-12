import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as factoryAbi from "./abi/Factory";
import * as honeyVaultAbi from "./abi/HoneyVault";
import {
  LPToken,
  Vault,
  VaultDeposit,
  VaultWithdrawal,
  VaultStake,
  VaultTotalDeposit,
  VaultTotalStake,
  VaultUnstake,
  Fees,
  BGTDelegation,
} from "./model";
import { processor } from "./processor";
import * as bgtAbi from "./abi/BGT";
// import * as kodiakAbi from './abi/Kodiak'

processor.run(new TypeormDatabase(), async (ctx) => {
  const vaults: Vault[] = [];
  const lpTokens: LPToken[] = [];
  const vaultDeposits: VaultDeposit[] = [];
  const vaultWithdrawals: VaultWithdrawal[] = [];
  const vaultTotalDepositsMap = new Map<string, VaultTotalDeposit>();
  const vaultStakes: VaultStake[] = [];
  const vaultUnstakes: VaultUnstake[] = [];
  const vaultTotalStakes = new Map<string, VaultTotalStake>();
  const fees: Fees[] = [];
  const bgtDelegations = new Map<string, BGTDelegation>();

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      /*###############################################################
                            NEW VAULT EVENT
      ###############################################################*/
      if (factoryAbi.events.NewVault.is(log)) {
        const { owner, vault } = factoryAbi.events.NewVault.decode(log);
        vaults.push(
          new Vault({
            id: vault,
            owner: owner,
            timestamp: new Date(block.header.timestamp),
            address: vault,
          })
        );
      }

      /*###############################################################
                            DEPOSIT EVENT
      ###############################################################*/
      if (honeyVaultAbi.events.Deposited.is(log)) {
        const { token, amount } = honeyVaultAbi.events.Deposited.decode(log);
        // we add single deposit event
        vaultDeposits.push(
          new VaultDeposit({
            id: log.id,
            vaultAddress: log.address,
            tokenAddress: token,
            amount: amount,
            timestamp: new Date(block.header.timestamp),
            transactionHash: log.transaction?.hash,
          })
        );

        // We also update the single entity that tracks the total deposit amount for each vault for each LP token
        const id = log.address + "-" + token;
        const existingDeposit =
          vaultTotalDepositsMap.get(id) ||
          (await ctx.store.get(VaultTotalDeposit, id));
        const updatedDeposit = new VaultTotalDeposit({
          id: id,
          vaultAddress: log.address,
          tokenAddress: token,
          amount: amount + (existingDeposit?.amount || BigInt(0)),
          lockExpiration: existingDeposit?.lockExpiration,
        });
        vaultTotalDepositsMap.set(id, updatedDeposit);
      }

      /*###############################################################
                            WITHDRAW EVENT
      ###############################################################*/
      if (honeyVaultAbi.events.Withdrawn.is(log)) {
        const { token, amount } = honeyVaultAbi.events.Withdrawn.decode(log);
        // we add single deposit event
        vaultWithdrawals.push(
          new VaultWithdrawal({
            id: log.id,
            vaultAddress: log.address,
            tokenAddress: token,
            amount: amount,
            timestamp: new Date(block.header.timestamp),
            transactionHash: log.transaction?.hash,
          })
        );

        // We also update the single entity that tracks the total deposit amount for each vault for each LP token
        const id = log.address + "-" + token;
        const existingDeposit =
          vaultTotalDepositsMap.get(id) ||
          (await ctx.store.get(VaultTotalDeposit, id));
        const updatedDeposit = new VaultTotalDeposit({
          id: id,
          vaultAddress: log.address,
          tokenAddress: token,
          amount: (existingDeposit?.amount || BigInt(0)) - amount,
          lockExpiration: existingDeposit?.lockExpiration,
        });
        vaultTotalDepositsMap.set(id, updatedDeposit);
      }

      /*###############################################################
                            LOCK EVENT
      ###############################################################*/
      if (honeyVaultAbi.events.LockedUntil.is(log)) {
        const { token, expiration } =
          honeyVaultAbi.events.LockedUntil.decode(log);
        const id = log.address + "-" + token;
        const existingDeposit =
          vaultTotalDepositsMap.get(id) ||
          (await ctx.store.get(VaultTotalDeposit, id));
        const updatedDeposit = new VaultTotalDeposit({
          ...existingDeposit,
          id: id,
          lockExpiration: new Date(Number(expiration)),
        });
        vaultTotalDepositsMap.set(id, updatedDeposit);
      }

      /*###############################################################
                            STAKE EVENT
      ###############################################################*/
      if (honeyVaultAbi.events.Staked.is(log)) {
        const vaultAddress = log.address;
        const { stakingContract, token, amount } =
          honeyVaultAbi.events.Staked.decode(log);
        vaultStakes.push(
          new VaultStake({
            id: log.id,
            vaultAddress,
            tokenAddress: token,
            stakingContract,
            amount,
            timestamp: new Date(block.header.timestamp),
            transactionHash: log.transaction?.hash,
          })
        );

        const id = vaultAddress + "-" + token + "-" + stakingContract;
        const vaultTotalStake =
          vaultTotalStakes.get(id) ||
          (await ctx.store.get(VaultTotalStake, id));
        const updatedVaultTotalStake = new VaultTotalStake({
          id,
          vaultAddress,
          tokenAddress: token,
          stakingContract,
          amount: amount + (vaultTotalStake?.amount || BigInt(0)),
        });
        vaultTotalStakes.set(id, updatedVaultTotalStake);
      }

      /*###############################################################
                            UNSTAKE EVENT
      ###############################################################*/
      if (honeyVaultAbi.events.Unstaked.is(log)) {
        const { stakingContract, token, amount } =
          honeyVaultAbi.events.Unstaked.decode(log);
        vaultUnstakes.push(
          new VaultUnstake({
            id: log.id,
            vaultAddress: log.address,
            tokenAddress: token,
            stakingContract,
            amount,
            timestamp: new Date(block.header.timestamp),
            transactionHash: log.transaction?.hash,
          })
        );

        const id = log.address + "-" + token + "-" + stakingContract;
        const vaultTotalStake =
          vaultTotalStakes.get(id) ||
          (await ctx.store.get(VaultTotalStake, id));
        const updatedVaultTotalStake = new VaultTotalStake({
          id,
          vaultAddress: log.address,
          tokenAddress: token,
          stakingContract,
          amount: vaultTotalStake ? vaultTotalStake.amount! - amount : 0n, // at this point, the vaultTotalStake should > 0
        });
        vaultTotalStakes.set(id, updatedVaultTotalStake);
      }

      /*###############################################################
                            FEE EVENT
      ###############################################################*/
      if (honeyVaultAbi.events.Fees.is(log)) {
        const { referral, token, amount } =
          honeyVaultAbi.events.Fees.decode(log);
        fees.push(
          new Fees({
            id: log.id,
            tokenAddress: token,
            amount,
            referral,
            transactionHash: log.transaction?.hash,
          })
        );
      }

      /*###############################################################
                            BGT DELEGATION related
      ###############################################################*/
      if (bgtAbi.events.QueueBoost.is(log)) {
        const { sender, validator, amount } =
          bgtAbi.events.QueueBoost.decode(log);
        const vaultAddress = sender;
        const id = vaultAddress + "-" + validator;
        const existingDelegation =
          bgtDelegations.get(id) || (await ctx.store.get(BGTDelegation, id));
        // if vault doesn't exist, we skip
        const vault = await ctx.store.get(Vault, vaultAddress);
        if (!vault) continue;
        let updatedDelegation: BGTDelegation = new BGTDelegation({
          id,
          validator,
          vaultAddress,
          queued: (existingDelegation?.queued || BigInt(0)) + amount,
          activated: existingDelegation?.activated || BigInt(0),
        });
        bgtDelegations.set(id, updatedDelegation);
      }

      if (bgtAbi.events.ActivateBoost.is(log)) {
        const { sender, validator, amount } =
          bgtAbi.events.ActivateBoost.decode(log);
        const vaultAddress = sender;
        const id = vaultAddress + "-" + validator;
        const existingDelegation =
          bgtDelegations.get(id) || (await ctx.store.get(BGTDelegation, id));
        if (!existingDelegation) continue;
        let updatedDelegation: BGTDelegation = new BGTDelegation({
          id,
          validator,
          vaultAddress,
          queued: (existingDelegation?.queued || BigInt(0)) - amount,
          activated: (existingDelegation?.activated || BigInt(0)) + amount,
        });
        bgtDelegations.set(id, updatedDelegation);
      }

      if (bgtAbi.events.CancelBoost.is(log)) {
        const { sender, validator, amount } =
          bgtAbi.events.CancelBoost.decode(log);
        const vaultAddress = sender;
        const id = vaultAddress + "-" + validator;
        const existingDelegation =
          bgtDelegations.get(id) || (await ctx.store.get(BGTDelegation, id));
        if (!existingDelegation) continue;
        let updatedDelegation: BGTDelegation = new BGTDelegation({
          id,
          validator,
          vaultAddress,
          queued: (existingDelegation?.queued || BigInt(0)) - amount,
          activated: existingDelegation?.activated || BigInt(0),
        });
        bgtDelegations.set(id, updatedDelegation);
      }

      if (bgtAbi.events.DropBoost.is(log)) {
        const { sender, validator, amount } =
          bgtAbi.events.DropBoost.decode(log);
        const vaultAddress = sender;
        const id = vaultAddress + "-" + validator;
        const existingDelegation =
          bgtDelegations.get(id) || (await ctx.store.get(BGTDelegation, id));
        // skip if no existing delegation
        if (!existingDelegation) continue;
        let updatedDelegation: BGTDelegation = new BGTDelegation({
          id,
          validator,
          vaultAddress,
          queued: existingDelegation?.queued || BigInt(0),
          activated: (existingDelegation?.activated || BigInt(0)) - amount,
        });
        bgtDelegations.set(id, updatedDelegation);
      }
    }
  }
  await ctx.store.upsert(vaults);
  await ctx.store.upsert(lpTokens);
  await ctx.store.upsert(vaultDeposits);
  await ctx.store.upsert(vaultWithdrawals);
  await ctx.store.upsert(Array.from(vaultTotalDepositsMap.values()));
  await ctx.store.upsert(vaultStakes);
  await ctx.store.upsert(vaultUnstakes);
  await ctx.store.upsert(Array.from(vaultTotalStakes.values()));
  await ctx.store.upsert(fees);
  await ctx.store.upsert(Array.from(bgtDelegations.values()));
});
