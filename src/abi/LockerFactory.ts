import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    LockerFactory__NewLocker: event("0xf90dba2c22b4b35781fe4c875a4df4a94ba3bc7ba8837a35741a15dd65d1d171", "LockerFactory__NewLocker(address,address,address,bool)", {"owner": indexed(p.address), "locker": p.address, "referrer": p.address, "unlocked": p.bool}),
}

export const functions = {
    createLocker: fun("0xbb569bad", "createLocker(address,address,bool)", {"_owner": p.address, "_referral": p.address, "_unlocked": p.bool}, p.address),
}

export class Contract extends ContractBase {
}

/// Event types
export type LockerFactory__NewLockerEventArgs = EParams<typeof events.LockerFactory__NewLocker>

/// Function types
export type CreateLockerParams = FunctionArguments<typeof functions.createLocker>
export type CreateLockerReturn = FunctionReturn<typeof functions.createLocker>

