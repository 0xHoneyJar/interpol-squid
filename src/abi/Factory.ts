import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    NewLocker: event("0x69253c7023f628e3a302b63087a3bfc1dfdb256780182f81b9f0df9eff9542b0", "NewLocker(address,address)", {"owner": indexed(p.address), "locker": p.address}),
}

export const functions = {
    clone: fun("0xb1dc8ce3", "clone(address,address,bool)", {"_owner": p.address, "_referral": p.address, "_unlocked": p.bool}, p.address),
}

export class Contract extends ContractBase {
}

/// Event types
export type NewLockerEventArgs = EParams<typeof events.NewLocker>

/// Function types
export type CloneParams = FunctionArguments<typeof functions.clone>
export type CloneReturn = FunctionReturn<typeof functions.clone>

