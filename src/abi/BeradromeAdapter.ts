import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Adapter__FailedTransfer: event("0x86ee8c6d60df203e62e048d5562d5c84d36bbf079f3e059232d6f6b60642f9f9", "Adapter__FailedTransfer(address,address,uint256)", {"locker": indexed(p.address), "token": indexed(p.address), "amount": p.uint256}),
    Adapter__Upgraded: event("0xe284e491e2b2d250cfb3dea3e70af0606164caf294ff0d04a286190b2862274e", "Adapter__Upgraded(address,address)", {"from": indexed(p.address), "to": indexed(p.address)}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
}

export const functions = {
    claim: fun("0x1e83409a", "claim(address)", {"vault": p.address}, {"_0": p.array(p.address), "_1": p.array(p.uint256)}),
    earned: viewFun("0x008cc262", "earned(address)", {"vault": p.address}, {"_0": p.array(p.address), "_1": p.array(p.uint256)}),
    implementation: viewFun("0x5c60da1b", "implementation()", {}, p.address),
    initialize: fun("0xc0c53b8b", "initialize(address,address,address)", {"_locker": p.address, "_honeyQueen": p.address, "_adapterBeacon": p.address}, ),
    locker: viewFun("0xd7b96d4e", "locker()", {}, p.address),
    onERC1155BatchReceived: viewFun("0xbc197c81", "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)", {"_0": p.address, "_1": p.address, "_2": p.array(p.uint256), "_3": p.array(p.uint256), "_4": p.bytes}, p.bytes4),
    onERC1155Received: viewFun("0xf23a6e61", "onERC1155Received(address,address,uint256,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.uint256, "_4": p.bytes}, p.bytes4),
    onERC721Received: viewFun("0x150b7a02", "onERC721Received(address,address,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.bytes}, p.bytes4),
    rescueERC20: fun("0xccec3716", "rescueERC20(address)", {"token": p.address}, ),
    stake: fun("0xadc9772e", "stake(address,uint256)", {"vault": p.address, "amount": p.uint256}, p.uint256),
    stakingToken: viewFun("0x27d616ee", "stakingToken(address)", {"vault": p.address}, p.address),
    unstake: fun("0xc2a672e0", "unstake(address,uint256)", {"vault": p.address, "amount": p.uint256}, p.uint256),
    version: viewFun("0x54fd4d50", "version()", {}, p.string),
    wildcard: fun("0xedb4b5cf", "wildcard(address,uint8,bytes)", {"vault": p.address, "func": p.uint8, "args": p.bytes}, ),
}

export class Contract extends ContractBase {

    earned(vault: EarnedParams["vault"]) {
        return this.eth_call(functions.earned, {vault})
    }

    implementation() {
        return this.eth_call(functions.implementation, {})
    }

    locker() {
        return this.eth_call(functions.locker, {})
    }

    onERC1155BatchReceived(_0: OnERC1155BatchReceivedParams["_0"], _1: OnERC1155BatchReceivedParams["_1"], _2: OnERC1155BatchReceivedParams["_2"], _3: OnERC1155BatchReceivedParams["_3"], _4: OnERC1155BatchReceivedParams["_4"]) {
        return this.eth_call(functions.onERC1155BatchReceived, {_0, _1, _2, _3, _4})
    }

    onERC1155Received(_0: OnERC1155ReceivedParams["_0"], _1: OnERC1155ReceivedParams["_1"], _2: OnERC1155ReceivedParams["_2"], _3: OnERC1155ReceivedParams["_3"], _4: OnERC1155ReceivedParams["_4"]) {
        return this.eth_call(functions.onERC1155Received, {_0, _1, _2, _3, _4})
    }

    onERC721Received(_0: OnERC721ReceivedParams["_0"], _1: OnERC721ReceivedParams["_1"], _2: OnERC721ReceivedParams["_2"], _3: OnERC721ReceivedParams["_3"]) {
        return this.eth_call(functions.onERC721Received, {_0, _1, _2, _3})
    }

    stakingToken(vault: StakingTokenParams["vault"]) {
        return this.eth_call(functions.stakingToken, {vault})
    }

    version() {
        return this.eth_call(functions.version, {})
    }
}

/// Event types
export type Adapter__FailedTransferEventArgs = EParams<typeof events.Adapter__FailedTransfer>
export type Adapter__UpgradedEventArgs = EParams<typeof events.Adapter__Upgraded>
export type InitializedEventArgs = EParams<typeof events.Initialized>

/// Function types
export type ClaimParams = FunctionArguments<typeof functions.claim>
export type ClaimReturn = FunctionReturn<typeof functions.claim>

export type EarnedParams = FunctionArguments<typeof functions.earned>
export type EarnedReturn = FunctionReturn<typeof functions.earned>

export type ImplementationParams = FunctionArguments<typeof functions.implementation>
export type ImplementationReturn = FunctionReturn<typeof functions.implementation>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type LockerParams = FunctionArguments<typeof functions.locker>
export type LockerReturn = FunctionReturn<typeof functions.locker>

export type OnERC1155BatchReceivedParams = FunctionArguments<typeof functions.onERC1155BatchReceived>
export type OnERC1155BatchReceivedReturn = FunctionReturn<typeof functions.onERC1155BatchReceived>

export type OnERC1155ReceivedParams = FunctionArguments<typeof functions.onERC1155Received>
export type OnERC1155ReceivedReturn = FunctionReturn<typeof functions.onERC1155Received>

export type OnERC721ReceivedParams = FunctionArguments<typeof functions.onERC721Received>
export type OnERC721ReceivedReturn = FunctionReturn<typeof functions.onERC721Received>

export type RescueERC20Params = FunctionArguments<typeof functions.rescueERC20>
export type RescueERC20Return = FunctionReturn<typeof functions.rescueERC20>

export type StakeParams = FunctionArguments<typeof functions.stake>
export type StakeReturn = FunctionReturn<typeof functions.stake>

export type StakingTokenParams = FunctionArguments<typeof functions.stakingToken>
export type StakingTokenReturn = FunctionReturn<typeof functions.stakingToken>

export type UnstakeParams = FunctionArguments<typeof functions.unstake>
export type UnstakeReturn = FunctionReturn<typeof functions.unstake>

export type VersionParams = FunctionArguments<typeof functions.version>
export type VersionReturn = FunctionReturn<typeof functions.version>

export type WildcardParams = FunctionArguments<typeof functions.wildcard>
export type WildcardReturn = FunctionReturn<typeof functions.wildcard>

