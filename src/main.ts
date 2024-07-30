import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as bgtAbi from "./abi/BGT";
import * as factoryAbi from "./abi/Factory";
import * as honeyVaultAbi from "./abi/HoneyVault";
import {
  BGTBoost,
  KodiakStake,
  LPToken,
  Vault,
  VaultDeposit,
  VaultTotalDeposit,
  VaultStake,
  VaultUnstake,
  VaultTotalStake,
} from "./model";
import { processor } from "./processor";
// import * as kodiakAbi from './abi/Kodiak'

processor.run(new TypeormDatabase(), async (ctx) => {
  const vaults: Vault[] = [];
  const lpTokens: LPToken[] = [];
  const vaultDeposits: VaultDeposit[] = [];
  const vaultTotalDeposits: VaultTotalDeposit[] = [];
  const vaultStakes: VaultStake[] = [];
  const vaultUnstakes: VaultUnstake[] = [];
  const vaultTotalStakes: VaultTotalStake[] = [];
  const bgtBoosts: BGTBoost[] = [];
  const kodiakStakes: KodiakStake[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      const logTopic = log.topics[0];

      /*###############################################################
                            NEW VAULT EVENT
      ###############################################################*/
      if (logTopic === factoryAbi.events.NewVault.topic) {
        const { owner, vault } = factoryAbi.events.NewVault.decode(log);
        vaults.push(
          new Vault({
            id: vault,
            owner: owner,
            createdAt: new Date(block.header.timestamp),
            address: vault,
          })
        );
      }

      /*###############################################################
                            DEPOSIT EVENT
      ###############################################################*/
      if (logTopic === honeyVaultAbi.events.Deposited.topic) {
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
        const vaultTotalDeposit = await ctx.store.get(
          VaultTotalDeposit,
          log.address + "-" + token
        );
        vaultTotalDeposits.push(
          new VaultTotalDeposit({
            id: log.address + "-" + token,
            vaultAddress: log.address,
            tokenAddress: token,
            amount: amount + (vaultTotalDeposit?.amount || BigInt(0)),
          })
        );
      }

      /*###############################################################
                            LOCK EVENT
      ###############################################################*/
      if (logTopic === honeyVaultAbi.events.LockedUntil.topic) {
        const { token, expiration } =
          honeyVaultAbi.events.LockedUntil.decode(log);

        vaultTotalDeposits.push(
          new VaultTotalDeposit({
            id: log.address + "-" + token,
            lockExpiration: new Date(Number(expiration)),
          })
        );
      }

      /*###############################################################
                            STAKE EVENT
      ###############################################################*/
      if (logTopic === honeyVaultAbi.events.Staked.topic) {
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
      if (logTopic === honeyVaultAbi.events.Unstaked.topic) {
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
    await ctx.store.upsert(vaults);
    await ctx.store.upsert(lpTokens);
    await ctx.store.upsert(vaultDeposits);
    await ctx.store.upsert(vaultStakes);
    await ctx.store.upsert(vaultUnstakes);
    await ctx.store.upsert(bgtBoosts);
    await ctx.store.upsert(kodiakStakes);
  }
});
