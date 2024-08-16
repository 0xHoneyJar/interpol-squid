import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    NewVault: event("0x4241302c393c713e690702c4a45a57e93cef59aa8c6e2358495853b3420551d8", "NewVault(address,address)", {"owner": indexed(p.address), "vault": p.address}),
}

export const functions = {
    clone: fun("0xb1dc8ce3", "clone(address,address,bool)", {"_owner": p.address, "_referral": p.address, "_unlocked": p.bool}, p.address),
}

export class Contract extends ContractBase {
}

/// Event types
export type NewVaultEventArgs = EParams<typeof events.NewVault>

/// Function types
export type CloneParams = FunctionArguments<typeof functions.clone>
export type CloneReturn = FunctionReturn<typeof functions.clone>

