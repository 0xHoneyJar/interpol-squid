import {assertNotNull} from '@subsquid/util-internal'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as factoryAbi from './abi/Factory'
import * as honeyVaultAbi from './abi/HoneyVault'
import * as bgtAbi from './abi/BGT' // You'll need to add this ABI
import * as kodiakAbi from './abi/Kodiak' // You'll need to add this ABI

export const processor = new EvmBatchProcessor()
    .setGateway('https://v2.archive.subsquid.io/network/ethereum-mainnet')
    .setRpcEndpoint({
        url: assertNotNull(process.env.RPC_ETH_HTTP, 'No RPC endpoint supplied'),
        rateLimit: 10
    })
    .setFinalityConfirmation(75)
    .setFields({
        transaction: {
            from: true,
            to: true,
            hash: true,
        },
    })
    .setBlockRange({
        from: 0,
    })
    .addLog({
        address: ['0x...'], // Factory contract address
        topic0: [
            factoryAbi.events.NewVault.topic,
        ],
    })
    .addLog({
        topic0: [
            honeyVaultAbi.events.Initialized.topic,
            honeyVaultAbi.events.Deposited.topic,
            honeyVaultAbi.events.LockedUntil.topic,
            honeyVaultAbi.events.Staked.topic,
            honeyVaultAbi.events.Unstaked.topic,
        ],
    })
    .addLog({
        address: ['0x...'], // BGT contract address
        topic0: [
            bgtAbi.events.QueueBoost.topic,
            bgtAbi.events.ActivateBoost.topic,
            bgtAbi.events.DropBoost.topic,
        ],
    })
    .addLog({
        address: ['0x...'], // Kodiak contract address
        topic0: [
            kodiakAbi.events.StakeLocked.topic,
        ],
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>