import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { assertNotNull } from "@subsquid/util-internal";
import * as bgtAbi from "./abi/BGT"; // You'll need to add this ABI
import * as factoryAbi from "./abi/Factory";
import * as honeyVaultAbi from "./abi/HoneyVault";
import * as xkdkAbi from "./abi/XKDK";
//import * as kodiakAbi from "./abi/Kodiak"; // You'll need to add this ABI
import { BGT_ADDRESS, FACTORY_ADDRESS, XKDK_ADDRESS } from "./addresses";

export const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/berachain-bartio")
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_BERA_HTTP, "No RPC endpoint supplied"),
  })
  .setFinalityConfirmation(5)
  .setFields({
    transaction: {
      from: true,
      to: true,
      hash: true,
    },
  })
  .setBlockRange({
    from: 4290191, // deployment block of factory
  })
  .addLog({
    address: [FACTORY_ADDRESS], // Factory contract address
    topic0: [factoryAbi.events.NewLocker.topic],
  })
  .addLog({
    topic0: [
      honeyVaultAbi.events.Initialized.topic,
      honeyVaultAbi.events.Deposited.topic,
      honeyVaultAbi.events.Withdrawn.topic,
      honeyVaultAbi.events.LockedUntil.topic,
      honeyVaultAbi.events.Staked.topic,
      honeyVaultAbi.events.Unstaked.topic,
      honeyVaultAbi.events.Fees.topic,
      honeyVaultAbi.events.RewardsClaimed.topic,
    ],
    transaction: true,
  })
  .addLog({
    address: [BGT_ADDRESS],
    topic0: [
      bgtAbi.events.ActivateBoost.topic,
      bgtAbi.events.QueueBoost.topic,
      bgtAbi.events.CancelBoost.topic,
      bgtAbi.events.DropBoost.topic,
    ],
  })
  .addLog({
    address: [XKDK_ADDRESS],
    topic0: [xkdkAbi.events.FinalizeRedeem.topic, xkdkAbi.events.Redeem.topic],
    transaction: true,
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
