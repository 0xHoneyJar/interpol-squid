import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CrocKnockoutCross: event("0x78d4bacd92cc15fe8ee27d50b9be043e663f43f413418e9b478c034765931ec8", "CrocKnockoutCross(bytes32,int24,bool,uint32,uint64,uint160)", {"pool": indexed(p.bytes32), "tick": indexed(p.int24), "isBid": p.bool, "pivotTime": p.uint32, "feeMileage": p.uint64, "commitEntropy": p.uint160}),
}

export const functions = {
    acceptCrocDex: viewFun("0x7c519625", "acceptCrocDex()", {}, p.bool),
    protocolCmd: fun("0x13fd34f4", "protocolCmd(uint16,bytes,bool)", {"callpath": p.uint16, "cmd": p.bytes, "sudo": p.bool}, ),
    readSlot: viewFun("0x02ce8af3", "readSlot(uint256)", {"slot": p.uint256}, p.uint256),
    swap: fun("0x3d719cd9", "swap(address,address,uint256,bool,bool,uint128,uint16,uint128,uint128,uint8)", {"base": p.address, "quote": p.address, "poolIdx": p.uint256, "isBuy": p.bool, "inBaseQty": p.bool, "qty": p.uint128, "tip": p.uint16, "limitPrice": p.uint128, "minOut": p.uint128, "reserveFlags": p.uint8}, {"baseFlow": p.int128, "quoteFlow": p.int128}),
    userCmd: fun("0xa15112f9", "userCmd(uint16,bytes)", {"callpath": p.uint16, "cmd": p.bytes}, p.bytes),
    userCmdRelayer: fun("0x08719070", "userCmdRelayer(uint16,bytes,bytes,bytes,bytes)", {"callpath": p.uint16, "cmd": p.bytes, "conds": p.bytes, "relayerTip": p.bytes, "signature": p.bytes}, p.bytes),
    userCmdRouter: fun("0x90b33ce5", "userCmdRouter(uint16,bytes,address)", {"callpath": p.uint16, "cmd": p.bytes, "client": p.address}, p.bytes),
    wbera: viewFun("0x31f41a33", "wbera()", {}, p.address),
}

export class Contract extends ContractBase {

    acceptCrocDex() {
        return this.eth_call(functions.acceptCrocDex, {})
    }

    readSlot(slot: ReadSlotParams["slot"]) {
        return this.eth_call(functions.readSlot, {slot})
    }

    wbera() {
        return this.eth_call(functions.wbera, {})
    }
}

/// Event types
export type CrocKnockoutCrossEventArgs = EParams<typeof events.CrocKnockoutCross>

/// Function types
export type AcceptCrocDexParams = FunctionArguments<typeof functions.acceptCrocDex>
export type AcceptCrocDexReturn = FunctionReturn<typeof functions.acceptCrocDex>

export type ProtocolCmdParams = FunctionArguments<typeof functions.protocolCmd>
export type ProtocolCmdReturn = FunctionReturn<typeof functions.protocolCmd>

export type ReadSlotParams = FunctionArguments<typeof functions.readSlot>
export type ReadSlotReturn = FunctionReturn<typeof functions.readSlot>

export type SwapParams = FunctionArguments<typeof functions.swap>
export type SwapReturn = FunctionReturn<typeof functions.swap>

export type UserCmdParams = FunctionArguments<typeof functions.userCmd>
export type UserCmdReturn = FunctionReturn<typeof functions.userCmd>

export type UserCmdRelayerParams = FunctionArguments<typeof functions.userCmdRelayer>
export type UserCmdRelayerReturn = FunctionReturn<typeof functions.userCmdRelayer>

export type UserCmdRouterParams = FunctionArguments<typeof functions.userCmdRouter>
export type UserCmdRouterReturn = FunctionReturn<typeof functions.userCmdRouter>

export type WberaParams = FunctionArguments<typeof functions.wbera>
export type WberaReturn = FunctionReturn<typeof functions.wbera>

