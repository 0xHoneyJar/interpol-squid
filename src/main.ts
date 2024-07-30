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
  VaultStake,
  VaultUnstake,
} from "./model";
import { processor } from "./processor";
// import * as kodiakAbi from './abi/Kodiak'

processor.run(new TypeormDatabase(), async (ctx) => {
  const vaults: Vault[] = [];
  const lpTokens: LPToken[] = [];
  const vaultDeposits: VaultDeposit[] = [];
  const vaultStakes: VaultStake[] = [];
  const vaultUnstakes: VaultUnstake[] = [];
  const bgtBoosts: BGTBoost[] = [];
  const kodiakStakes: KodiakStake[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.topics[0] === factoryAbi.events.NewVault.topic) {
        const { owner, vault } = factoryAbi.events.NewVault.decode(log);
        vaults.push(
          new Vault({
            id: vault,
            owner: owner,
            createdAt: new Date(block.header.timestamp),
            honeyVaultAddress: vault,
          })
        );
      }

      if (log.topics[0] === honeyVaultAbi.events.Initialized.topic) {
        // Handle Initialized event
      }

      if (log.topics[0] === honeyVaultAbi.events.Deposited.topic) {
        const { token, amount } = honeyVaultAbi.events.Deposited.decode(log);
        vaultDeposits.push(
          new VaultDeposit({
            id: log.id,
            vault: log.address,
            token: token,
            amount: amount,
            timestamp: new Date(block.header.timestamp),
          })
        );
      }

      if (log.topics[0] === honeyVaultAbi.events.LockedUntil.topic) {
        // Handle LockedUntil event
      }

      if (log.topics[0] === honeyVaultAbi.events.Staked.topic) {
        const { stakingContract, token, amount } =
          honeyVaultAbi.events.Staked.decode(log);
        vaultStakes.push(
          new VaultStake({
            id: log.id,
            vault: log.address,
            token: token,
            stakingContract: stakingContract,
            amount: amount,
            timestamp: new Date(block.header.timestamp),
          })
        );
      }

      if (log.topics[0] === honeyVaultAbi.events.Unstaked.topic) {
        const { stakingContract, token, amount } =
          honeyVaultAbi.events.Unstaked.decode(log);
        vaultUnstakes.push(
          new VaultUnstake({
            id: log.id,
            vault: log.address,
            token: token,
            stakingContract: stakingContract,
            amount: amount,
            timestamp: new Date(block.header.timestamp),
          })
        );
      }

      // if (
      //   log.topics[0] === bgtAbi.events.QueueBoost.topic ||
      //   log.topics[0] === bgtAbi.events.ActivateBoost.topic
      // ) {
      //   const { sender, validator, amount } =
      //     bgtAbi.events.QueueBoost.decode(log);
      //   bgtBoosts.push(
      //     new BGTBoost({
      //       id: log.id,
      //       vault: sender,
      //       validator: validator,
      //       amount: amount,
      //       status:
      //         log.topics[0] === bgtAbi.events.QueueBoost.topic
      //           ? "Queued"
      //           : "Activated",
      //       timestamp: new Date(block.header.timestamp),
      //     })
      //   );
      }

      //   if (log.topics[0] === kodiakAbi.events.StakeLocked.topic) {
      //     const { user, amount, secs, kek_id } =
      //       kodiakAbi.events.StakeLocked.decode(log);
      //     kodiakStakes.push(
      //       new KodiakStake({
      //         id: log.id,
      //         vault: user,
      //         amount: amount,
      //         lockDuration: secs,
      //         kekId: kek_id,
      //         timestamp: new Date(block.header.timestamp),
      //       })
      //     );
      //   }
    }
  }

  await ctx.store.save(vaults);
  await ctx.store.save(lpTokens);
  await ctx.store.save(vaultDeposits);
  await ctx.store.save(vaultStakes);
  await ctx.store.save(vaultUnstakes);
  await ctx.store.save(bgtBoosts);
  await ctx.store.save(kodiakStakes);
});
