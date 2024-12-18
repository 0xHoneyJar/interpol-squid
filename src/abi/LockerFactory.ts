import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    LockerFactory__NewLocker: event("0xf90dba2c22b4b35781fe4c875a4df4a94ba3bc7ba8837a35741a15dd65d1d171", "LockerFactory__NewLocker(address,address,address,bool)", {"owner": indexed(p.address), "locker": p.address, "referrer": p.address, "unlocked": p.bool}),
    OwnershipHandoverCanceled: event("0xfa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92", "OwnershipHandoverCanceled(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipHandoverRequested: event("0xdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d", "OwnershipHandoverRequested(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"oldOwner": indexed(p.address), "newOwner": indexed(p.address)}),
}

export const functions = {
    cancelOwnershipHandover: fun("0x54d1f13d", "cancelOwnershipHandover()", {}, ),
    completeOwnershipHandover: fun("0xf04e283e", "completeOwnershipHandover(address)", {"pendingOwner": p.address}, ),
    createLocker: fun("0xbb569bad", "createLocker(address,address,bool)", {"_owner": p.address, "_referral": p.address, "_unlocked": p.bool}, p.address),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownershipHandoverExpiresAt: viewFun("0xfee81cf4", "ownershipHandoverExpiresAt(address)", {"pendingOwner": p.address}, p.uint256),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    requestOwnershipHandover: fun("0x25692962", "requestOwnershipHandover()", {}, ),
    setLockerImplementation: fun("0x76f33454", "setLockerImplementation(address)", {"_lockerImplementation": p.address}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
}

export class Contract extends ContractBase {

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownershipHandoverExpiresAt(pendingOwner: OwnershipHandoverExpiresAtParams["pendingOwner"]) {
        return this.eth_call(functions.ownershipHandoverExpiresAt, {pendingOwner})
    }
}

/// Event types
export type LockerFactory__NewLockerEventArgs = EParams<typeof events.LockerFactory__NewLocker>
export type OwnershipHandoverCanceledEventArgs = EParams<typeof events.OwnershipHandoverCanceled>
export type OwnershipHandoverRequestedEventArgs = EParams<typeof events.OwnershipHandoverRequested>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>

/// Function types
export type CancelOwnershipHandoverParams = FunctionArguments<typeof functions.cancelOwnershipHandover>
export type CancelOwnershipHandoverReturn = FunctionReturn<typeof functions.cancelOwnershipHandover>

export type CompleteOwnershipHandoverParams = FunctionArguments<typeof functions.completeOwnershipHandover>
export type CompleteOwnershipHandoverReturn = FunctionReturn<typeof functions.completeOwnershipHandover>

export type CreateLockerParams = FunctionArguments<typeof functions.createLocker>
export type CreateLockerReturn = FunctionReturn<typeof functions.createLocker>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnershipHandoverExpiresAtParams = FunctionArguments<typeof functions.ownershipHandoverExpiresAt>
export type OwnershipHandoverExpiresAtReturn = FunctionReturn<typeof functions.ownershipHandoverExpiresAt>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RequestOwnershipHandoverParams = FunctionArguments<typeof functions.requestOwnershipHandover>
export type RequestOwnershipHandoverReturn = FunctionReturn<typeof functions.requestOwnershipHandover>

export type SetLockerImplementationParams = FunctionArguments<typeof functions.setLockerImplementation>
export type SetLockerImplementationReturn = FunctionReturn<typeof functions.setLockerImplementation>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

