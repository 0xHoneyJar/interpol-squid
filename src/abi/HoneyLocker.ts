import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    HoneyLocker__AdapterRegistered: event("0x21f7adbcf0a252b6201977540191880dfba320615340274613c2031f93a14534", "HoneyLocker__AdapterRegistered(string,address)", {"protocol": indexed(p.string), "adapter": p.address}),
    HoneyLocker__Claimed: event("0x4d47b0d98037344ecb5a6c8991f791589b339dd4838404ec8cc98c6c5163997d", "HoneyLocker__Claimed(address,address,uint256)", {"vault": indexed(p.address), "rewardToken": indexed(p.address), "amount": p.uint256}),
    HoneyLocker__ClaimedFeesOfLP: event("0xb0dff37222ba4e89efe2533faadab28399a747de2f3f5821087660455c86410c", "HoneyLocker__ClaimedFeesOfLP(address,uint256,uint256)", {"LPToken": indexed(p.address), "amount0": p.uint256, "amount1": p.uint256}),
    HoneyLocker__Deposited: event("0x2a4123c00a67c6c2dd2ba7f70f84f4e7ddbdc6825ba8c567d68c6223720e5a11", "HoneyLocker__Deposited(address,uint256)", {"LPToken": indexed(p.address), "amountOrId": p.uint256}),
    HoneyLocker__LockedUntil: event("0x895c7fd3a25a9996f37edb555ba8f6eda2373b30f31b23153e5b6f9eb5e2c8e5", "HoneyLocker__LockedUntil(address,uint256)", {"LPToken": indexed(p.address), "expiration": p.uint256}),
    HoneyLocker__OperatorSet: event("0xdd7d2b400bfd18320bf3e32ec833e44712e98becb73ce95021c84472d07f60d3", "HoneyLocker__OperatorSet(address)", {"operator": indexed(p.address)}),
    HoneyLocker__Staked: event("0xb79e28292a8aeda2cc4b0796574e8e910b4b2bdd20da4618ba031be8904642c4", "HoneyLocker__Staked(address,address,uint256)", {"vault": indexed(p.address), "LPToken": indexed(p.address), "amountOrId": p.uint256}),
    HoneyLocker__TreasurySet: event("0x1cfd57337acaaed7c247ecca0f8fdfdf9d9e397ef5dafd91b72f4127969d9711", "HoneyLocker__TreasurySet(address)", {"treasury": indexed(p.address)}),
    HoneyLocker__Unstaked: event("0x3fbddeb8cf191a7224b036f2936759a3c73ed98a41ca294185cd751552f540f1", "HoneyLocker__Unstaked(address,address,uint256)", {"vault": indexed(p.address), "LPToken": indexed(p.address), "amountOrId": p.uint256}),
    HoneyLocker__Wildcard: event("0xf7f0ed0f2b94710cb25d12685d78341088499642c3e4e629c8b29274bc020857", "HoneyLocker__Wildcard(address,uint8,bytes)", {"vault": indexed(p.address), "func": indexed(p.uint8), "args": p.bytes}),
    HoneyLocker__Withdrawn: event("0x3d2663eb759e4c9d27f9e857a4f4bab24e85612c773ea268d88c010e89f48dc2", "HoneyLocker__Withdrawn(address,uint256)", {"LPToken": indexed(p.address), "amountOrId": p.uint256}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
}

export const functions = {
    activateBoost: fun("0x95195fd9", "activateBoost(bytes)", {"validator": p.bytes}, ),
    adapterOfProtocol: viewFun("0xb1a3fdd1", "adapterOfProtocol(string)", {"protocol": p.string}, p.address),
    burnBGTForBERA: fun("0x45d514e9", "burnBGTForBERA(uint256)", {"_amount": p.uint256}, ),
    cancelDropBoost: fun("0x14ae4e87", "cancelDropBoost(uint128,bytes)", {"amount": p.uint128, "validator": p.bytes}, ),
    cancelQueuedBoost: fun("0x66cc8439", "cancelQueuedBoost(uint128,bytes)", {"amount": p.uint128, "validator": p.bytes}, ),
    claim: fun("0x1e83409a", "claim(address)", {"vault": p.address}, {"_0": p.array(p.address), "_1": p.array(p.uint256)}),
    claimBGTRewards: fun("0x4c7beee9", "claimBGTRewards()", {}, ),
    claimFeesOfLP: fun("0x049f4b08", "claimFeesOfLP(address,uint256)", {"_LPToken": p.address, "_tokenId": p.uint256}, ),
    delegate: fun("0x5c19a95c", "delegate(address)", {"delegatee": p.address}, ),
    depositAndLock: fun("0xa6da1e7d", "depositAndLock(address,uint256,uint256)", {"_LPToken": p.address, "_amountOrId": p.uint256, "_expiration": p.uint256}, ),
    dropBoost: fun("0xbb09720a", "dropBoost(uint128,bytes)", {"amount": p.uint128, "validator": p.bytes}, ),
    expirations: viewFun("0x3c74db0f", "expirations(address)", {"LPToken": p.address}, p.uint256),
    honeyQueen: viewFun("0xee9ec831", "honeyQueen()", {}, p.address),
    initialize: fun("0xfecf9734", "initialize(address,address,address,bool)", {"_honeyQueen": p.address, "_owner": p.address, "_referrer": p.address, "_unlocked": p.bool}, ),
    onERC1155BatchReceived: viewFun("0xbc197c81", "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)", {"_0": p.address, "_1": p.address, "_2": p.array(p.uint256), "_3": p.array(p.uint256), "_4": p.bytes}, p.bytes4),
    onERC1155Received: viewFun("0xf23a6e61", "onERC1155Received(address,address,uint256,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.uint256, "_4": p.bytes}, p.bytes4),
    onERC721Received: viewFun("0x150b7a02", "onERC721Received(address,address,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.bytes}, p.bytes4),
    operator: viewFun("0x570ca735", "operator()", {}, p.address),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    queueBoost: fun("0x5a52c3f3", "queueBoost(uint128,bytes)", {"amount": p.uint128, "validator": p.bytes}, ),
    queueDropBoost: fun("0x8ce7545d", "queueDropBoost(uint128,bytes)", {"amount": p.uint128, "validator": p.bytes}, ),
    recipient: viewFun("0x66d003ac", "recipient()", {}, p.address),
    referrer: viewFun("0x68447c93", "referrer()", {}, p.address),
    registerAdapter: fun("0x7179fd7d", "registerAdapter(string)", {"protocol": p.string}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setOperator: fun("0xb3ab15fb", "setOperator(address)", {"_operator": p.address}, ),
    setTreasury: fun("0xf0f44260", "setTreasury(address)", {"_treasury": p.address}, ),
    stake: fun("0xadc9772e", "stake(address,uint256)", {"vault": p.address, "amount": p.uint256}, ),
    totalLPStaked: viewFun("0xfb14f439", "totalLPStaked(address)", {"LPToken": p.address}, p.uint256),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    treasury: viewFun("0x61d027b3", "treasury()", {}, p.address),
    unlocked: viewFun("0x6a5e2650", "unlocked()", {}, p.bool),
    unstake: fun("0xc2a672e0", "unstake(address,uint256)", {"vault": p.address, "amount": p.uint256}, ),
    vaultLPStaked: viewFun("0x104ddd07", "vaultLPStaked(address)", {"vault": p.address}, p.uint256),
    version: viewFun("0x54fd4d50", "version()", {}, p.string),
    wildcard: fun("0xedb4b5cf", "wildcard(address,uint8,bytes)", {"vault": p.address, "func": p.uint8, "args": p.bytes}, ),
    withdrawBERA: fun("0x3a1f406c", "withdrawBERA(uint256)", {"_amount": p.uint256}, ),
    withdrawERC1155: fun("0xa1538bde", "withdrawERC1155(address,uint256,uint256,bytes)", {"_token": p.address, "_id": p.uint256, "_amount": p.uint256, "_data": p.bytes}, ),
    withdrawERC20: fun("0xa1db9782", "withdrawERC20(address,uint256)", {"_token": p.address, "_amount": p.uint256}, ),
    withdrawERC721: fun("0xf3e414f8", "withdrawERC721(address,uint256)", {"_token": p.address, "_id": p.uint256}, ),
    withdrawLPToken: fun("0x7c68da48", "withdrawLPToken(address,uint256)", {"_LPToken": p.address, "_amountOrId": p.uint256}, ),
}

export class Contract extends ContractBase {

    adapterOfProtocol(protocol: AdapterOfProtocolParams["protocol"]) {
        return this.eth_call(functions.adapterOfProtocol, {protocol})
    }

    expirations(LPToken: ExpirationsParams["LPToken"]) {
        return this.eth_call(functions.expirations, {LPToken})
    }

    honeyQueen() {
        return this.eth_call(functions.honeyQueen, {})
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

    operator() {
        return this.eth_call(functions.operator, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    recipient() {
        return this.eth_call(functions.recipient, {})
    }

    referrer() {
        return this.eth_call(functions.referrer, {})
    }

    totalLPStaked(LPToken: TotalLPStakedParams["LPToken"]) {
        return this.eth_call(functions.totalLPStaked, {LPToken})
    }

    treasury() {
        return this.eth_call(functions.treasury, {})
    }

    unlocked() {
        return this.eth_call(functions.unlocked, {})
    }

    vaultLPStaked(vault: VaultLPStakedParams["vault"]) {
        return this.eth_call(functions.vaultLPStaked, {vault})
    }

    version() {
        return this.eth_call(functions.version, {})
    }
}

/// Event types
export type HoneyLocker__AdapterRegisteredEventArgs = EParams<typeof events.HoneyLocker__AdapterRegistered>
export type HoneyLocker__ClaimedEventArgs = EParams<typeof events.HoneyLocker__Claimed>
export type HoneyLocker__ClaimedFeesOfLPEventArgs = EParams<typeof events.HoneyLocker__ClaimedFeesOfLP>
export type HoneyLocker__DepositedEventArgs = EParams<typeof events.HoneyLocker__Deposited>
export type HoneyLocker__LockedUntilEventArgs = EParams<typeof events.HoneyLocker__LockedUntil>
export type HoneyLocker__OperatorSetEventArgs = EParams<typeof events.HoneyLocker__OperatorSet>
export type HoneyLocker__StakedEventArgs = EParams<typeof events.HoneyLocker__Staked>
export type HoneyLocker__TreasurySetEventArgs = EParams<typeof events.HoneyLocker__TreasurySet>
export type HoneyLocker__UnstakedEventArgs = EParams<typeof events.HoneyLocker__Unstaked>
export type HoneyLocker__WildcardEventArgs = EParams<typeof events.HoneyLocker__Wildcard>
export type HoneyLocker__WithdrawnEventArgs = EParams<typeof events.HoneyLocker__Withdrawn>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>

/// Function types
export type ActivateBoostParams = FunctionArguments<typeof functions.activateBoost>
export type ActivateBoostReturn = FunctionReturn<typeof functions.activateBoost>

export type AdapterOfProtocolParams = FunctionArguments<typeof functions.adapterOfProtocol>
export type AdapterOfProtocolReturn = FunctionReturn<typeof functions.adapterOfProtocol>

export type BurnBGTForBERAParams = FunctionArguments<typeof functions.burnBGTForBERA>
export type BurnBGTForBERAReturn = FunctionReturn<typeof functions.burnBGTForBERA>

export type CancelDropBoostParams = FunctionArguments<typeof functions.cancelDropBoost>
export type CancelDropBoostReturn = FunctionReturn<typeof functions.cancelDropBoost>

export type CancelQueuedBoostParams = FunctionArguments<typeof functions.cancelQueuedBoost>
export type CancelQueuedBoostReturn = FunctionReturn<typeof functions.cancelQueuedBoost>

export type ClaimParams = FunctionArguments<typeof functions.claim>
export type ClaimReturn = FunctionReturn<typeof functions.claim>

export type ClaimBGTRewardsParams = FunctionArguments<typeof functions.claimBGTRewards>
export type ClaimBGTRewardsReturn = FunctionReturn<typeof functions.claimBGTRewards>

export type ClaimFeesOfLPParams = FunctionArguments<typeof functions.claimFeesOfLP>
export type ClaimFeesOfLPReturn = FunctionReturn<typeof functions.claimFeesOfLP>

export type DelegateParams = FunctionArguments<typeof functions.delegate>
export type DelegateReturn = FunctionReturn<typeof functions.delegate>

export type DepositAndLockParams = FunctionArguments<typeof functions.depositAndLock>
export type DepositAndLockReturn = FunctionReturn<typeof functions.depositAndLock>

export type DropBoostParams = FunctionArguments<typeof functions.dropBoost>
export type DropBoostReturn = FunctionReturn<typeof functions.dropBoost>

export type ExpirationsParams = FunctionArguments<typeof functions.expirations>
export type ExpirationsReturn = FunctionReturn<typeof functions.expirations>

export type HoneyQueenParams = FunctionArguments<typeof functions.honeyQueen>
export type HoneyQueenReturn = FunctionReturn<typeof functions.honeyQueen>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type OnERC1155BatchReceivedParams = FunctionArguments<typeof functions.onERC1155BatchReceived>
export type OnERC1155BatchReceivedReturn = FunctionReturn<typeof functions.onERC1155BatchReceived>

export type OnERC1155ReceivedParams = FunctionArguments<typeof functions.onERC1155Received>
export type OnERC1155ReceivedReturn = FunctionReturn<typeof functions.onERC1155Received>

export type OnERC721ReceivedParams = FunctionArguments<typeof functions.onERC721Received>
export type OnERC721ReceivedReturn = FunctionReturn<typeof functions.onERC721Received>

export type OperatorParams = FunctionArguments<typeof functions.operator>
export type OperatorReturn = FunctionReturn<typeof functions.operator>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type QueueBoostParams = FunctionArguments<typeof functions.queueBoost>
export type QueueBoostReturn = FunctionReturn<typeof functions.queueBoost>

export type QueueDropBoostParams = FunctionArguments<typeof functions.queueDropBoost>
export type QueueDropBoostReturn = FunctionReturn<typeof functions.queueDropBoost>

export type RecipientParams = FunctionArguments<typeof functions.recipient>
export type RecipientReturn = FunctionReturn<typeof functions.recipient>

export type ReferrerParams = FunctionArguments<typeof functions.referrer>
export type ReferrerReturn = FunctionReturn<typeof functions.referrer>

export type RegisterAdapterParams = FunctionArguments<typeof functions.registerAdapter>
export type RegisterAdapterReturn = FunctionReturn<typeof functions.registerAdapter>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetOperatorParams = FunctionArguments<typeof functions.setOperator>
export type SetOperatorReturn = FunctionReturn<typeof functions.setOperator>

export type SetTreasuryParams = FunctionArguments<typeof functions.setTreasury>
export type SetTreasuryReturn = FunctionReturn<typeof functions.setTreasury>

export type StakeParams = FunctionArguments<typeof functions.stake>
export type StakeReturn = FunctionReturn<typeof functions.stake>

export type TotalLPStakedParams = FunctionArguments<typeof functions.totalLPStaked>
export type TotalLPStakedReturn = FunctionReturn<typeof functions.totalLPStaked>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TreasuryParams = FunctionArguments<typeof functions.treasury>
export type TreasuryReturn = FunctionReturn<typeof functions.treasury>

export type UnlockedParams = FunctionArguments<typeof functions.unlocked>
export type UnlockedReturn = FunctionReturn<typeof functions.unlocked>

export type UnstakeParams = FunctionArguments<typeof functions.unstake>
export type UnstakeReturn = FunctionReturn<typeof functions.unstake>

export type VaultLPStakedParams = FunctionArguments<typeof functions.vaultLPStaked>
export type VaultLPStakedReturn = FunctionReturn<typeof functions.vaultLPStaked>

export type VersionParams = FunctionArguments<typeof functions.version>
export type VersionReturn = FunctionReturn<typeof functions.version>

export type WildcardParams = FunctionArguments<typeof functions.wildcard>
export type WildcardReturn = FunctionReturn<typeof functions.wildcard>

export type WithdrawBERAParams = FunctionArguments<typeof functions.withdrawBERA>
export type WithdrawBERAReturn = FunctionReturn<typeof functions.withdrawBERA>

export type WithdrawERC1155Params = FunctionArguments<typeof functions.withdrawERC1155>
export type WithdrawERC1155Return = FunctionReturn<typeof functions.withdrawERC1155>

export type WithdrawERC20Params = FunctionArguments<typeof functions.withdrawERC20>
export type WithdrawERC20Return = FunctionReturn<typeof functions.withdrawERC20>

export type WithdrawERC721Params = FunctionArguments<typeof functions.withdrawERC721>
export type WithdrawERC721Return = FunctionReturn<typeof functions.withdrawERC721>

export type WithdrawLPTokenParams = FunctionArguments<typeof functions.withdrawLPToken>
export type WithdrawLPTokenReturn = FunctionReturn<typeof functions.withdrawLPToken>

