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
import * as lockerFactoryAbi from "./abi/LockerFactory";
import * as honeyLockerAbi from "./abi/HoneyLocker";
import * as xkdkAbi from "./abi/XKDK";
//import * as kodiakAbi from "./abi/Kodiak"; // You'll need to add this ABI
import * as erc20Abi from "./abi/ERC20"; // You'll need to add this ABI
import { BGT_ADDRESS, FACTORY_ADDRESS, XKDK_ADDRESS } from "./addresses";

export const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/berachain-bartio")
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_BERA_HTTP, "No RPC endpoint supplied"),
  })
  .setFinalityConfirmation(20)
  .setFields({
    transaction: {
      from: true,
      to: true,
      hash: true,
    },
  })
  .setBlockRange({
    from: 8366813, // deployment block of factory
  })
  .addLog({
    address: [FACTORY_ADDRESS], // Factory contract address
    topic0: [lockerFactoryAbi.events.LockerFactory__NewLocker.topic],
  })
  .addLog({
    topic0: [
      honeyLockerAbi.events.HoneyLocker__Deposited.topic,
      honeyLockerAbi.events.HoneyLocker__Withdrawn.topic,
      honeyLockerAbi.events.HoneyLocker__LockedUntil.topic,
      honeyLockerAbi.events.HoneyLocker__Staked.topic,
      honeyLockerAbi.events.HoneyLocker__Unstaked.topic,
      honeyLockerAbi.events.HoneyLocker__Claimed.topic,
      honeyLockerAbi.events.HoneyLocker__Wildcard.topic,
      honeyLockerAbi.events.HoneyLocker__OperatorSet.topic,
      honeyLockerAbi.events.HoneyLocker__TreasurySet.topic,
      honeyLockerAbi.events.OwnershipTransferred.topic,
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
  })
  .addLog({
    topic0: [erc20Abi.events.Transfer.topic],
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
