import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AdapterFactory__AdapterCreated: event("0x7bee1caec3803b135e052d71c5f5839b4d36ca28fc0fa073950dd6bacd22add6", "AdapterFactory__AdapterCreated(string,address,address,address)", {"protocol": indexed(p.string), "logic": indexed(p.address), "locker": p.address, "adapter": p.address}),
}

export const functions = {
    'createAdapter(address,string)': fun("0x4495dc4c", "createAdapter(address,string)", {"locker": p.address, "protocol": p.string}, p.address),
    'createAdapter(address,address)': fun("0x8c454cbd", "createAdapter(address,address)", {"locker": p.address, "logic": p.address}, p.address),
    honeyQueen: viewFun("0xee9ec831", "honeyQueen()", {}, p.address),
}

export class Contract extends ContractBase {

    honeyQueen() {
        return this.eth_call(functions.honeyQueen, {})
    }
}

/// Event types
export type AdapterFactory__AdapterCreatedEventArgs = EParams<typeof events.AdapterFactory__AdapterCreated>

/// Function types
export type CreateAdapterParams_0 = FunctionArguments<typeof functions['createAdapter(address,string)']>
export type CreateAdapterReturn_0 = FunctionReturn<typeof functions['createAdapter(address,string)']>

export type CreateAdapterParams_1 = FunctionArguments<typeof functions['createAdapter(address,address)']>
export type CreateAdapterReturn_1 = FunctionReturn<typeof functions['createAdapter(address,address)']>

export type HoneyQueenParams = FunctionArguments<typeof functions.honeyQueen>
export type HoneyQueenReturn = FunctionReturn<typeof functions.honeyQueen>

