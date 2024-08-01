import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as factoryAbi from "./abi/Factory";
import * as honeyVaultAbi from "./abi/HoneyVault";
import {
  BGTBoost,
  KodiakStake,
  LPToken,
  Vault,
  VaultDeposit,
  VaultStake,
  VaultTotalDeposit,
  VaultTotalStake,
  VaultUnstake,
} from "./model";
import { processor } from "./processor";
// import * as kodiakAbi from './abi/Kodiak'

processor.run(new TypeormDatabase(), async (ctx) => {
  const vaults: Vault[] = [];
  const lpTokens: LPToken[] = [];
  const vaultDeposits: VaultDeposit[] = [];
  const vaultTotalDepositsMap = new Map<string, VaultTotalDeposit>();
  const vaultStakes: VaultStake[] = [];
  const vaultUnstakes: VaultUnstake[] = [];
  const vaultTotalStakes: VaultTotalStake[] = [];
  const bgtBoosts: BGTBoost[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      /*###############################################################
                            NEW VAULT EVENT
      ###############################################################*/
      if (factoryAbi.events.NewVault.is(log)) {
        const { owner, vault } = factoryAbi.events.NewVault.decode(log);
        vaults.push(
          new Vault({
            id: log.id,
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
          })
        );

        const vaultTotalStake = await ctx.store.get(
          VaultTotalStake,
          vaultAddress + "-" + token + "-" + stakingContract
        );
        vaultTotalStakes.push(
          new VaultTotalStake({
            id: vaultAddress + "-" + token + "-" + stakingContract,
            vaultAddress,
            tokenAddress: token,
            stakingContract,
            amount: amount + (vaultTotalStake?.amount || BigInt(0)),
          })
        );
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
          })
        );

        const vaultTotalStake = await ctx.store.get(
          VaultTotalStake,
          log.address + "-" + token + "-" + stakingContract
        );
        vaultTotalStakes.push(
          new VaultTotalStake({
            id: log.address + "-" + token + "-" + stakingContract,
            amount: vaultTotalStake!.amount! - amount, // at this point, the vaultTotalStake should > 0
          })
        );
      }
    }
  }
  await ctx.store.upsert(vaults);
  await ctx.store.upsert(lpTokens);
  await ctx.store.upsert(vaultDeposits);
  await ctx.store.upsert(Array.from(vaultTotalDepositsMap.values()));
  await ctx.store.upsert(vaultStakes);
  await ctx.store.upsert(vaultUnstakes);
  await ctx.store.upsert(bgtBoosts);
  await ctx.store.upsert(vaultTotalStakes);
});
