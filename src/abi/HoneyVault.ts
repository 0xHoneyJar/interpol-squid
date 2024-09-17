import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Deposited: event("0x2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4", "Deposited(address,uint256)", {"token": indexed(p.address), "amount": p.uint256}),
    Initialized: event("0x908408e307fc569b417f6cbec5d5a06f44a0a505ac0479b47d421a4b2fd6a1e6", "Initialized(address)", {"owner": indexed(p.address)}),
    LockedUntil: event("0xd13efb9a06098a4dd8c306224c2a601960dfd5904ddd08c6b11bb6ff4df21e4f", "LockedUntil(address,uint256)", {"token": indexed(p.address), "expiration": p.uint256}),
    Migrated: event("0xe1b831b0e6f3aa16b4b1a6bd526b5cdeab4940744ca6e0251f5fe5f8caf1c81a", "Migrated(address,address,address)", {"token": indexed(p.address), "oldLocker": indexed(p.address), "newLocker": indexed(p.address)}),
    OwnershipHandoverCanceled: event("0xfa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92", "OwnershipHandoverCanceled(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipHandoverRequested: event("0xdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d", "OwnershipHandoverRequested(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"oldOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    RewardsClaimed: event("0xfec02445b4dcb9e977f70b2966aab1907694acaa22a61ef1ff7d6ee2cb8ed780", "RewardsClaimed(address)", {"stakingContract": p.address}),
    Staked: event("0x5dac0c1b1112564a045ba943c9d50270893e8e826c49be8e7073adc713ab7bd7", "Staked(address,address,uint256)", {"stakingContract": indexed(p.address), "token": indexed(p.address), "amount": p.uint256}),
    Unstaked: event("0xd8654fcc8cf5b36d30b3f5e4688fc78118e6d68de60b9994e09902268b57c3e3", "Unstaked(address,address,uint256)", {"stakingContract": indexed(p.address), "token": indexed(p.address), "amount": p.uint256}),
    Withdrawn: event("0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5", "Withdrawn(address,uint256)", {"token": indexed(p.address), "amount": p.uint256}),
}

export const functions = {
    HONEY_QUEEN: viewFun("0xa1053f09", "HONEY_QUEEN()", {}, p.address),
    activateBoost: fun("0x95c0e232", "activateBoost(address)", {"_validator": p.address}, ),
    burnBGTForBERA: fun("0x45d514e9", "burnBGTForBERA(uint256)", {"_amount": p.uint256}, ),
    cancelOwnershipHandover: fun("0x54d1f13d", "cancelOwnershipHandover()", {}, ),
    cancelQueuedBoost: fun("0x66b35e98", "cancelQueuedBoost(uint128,address)", {"_amount": p.uint128, "_validator": p.address}, ),
    claimRewards: fun("0x18b4d37f", "claimRewards(address,bytes)", {"_stakingContract": p.address, "_data": p.bytes}, ),
    completeOwnershipHandover: fun("0xf04e283e", "completeOwnershipHandover(address)", {"pendingOwner": p.address}, ),
    delegateBGT: fun("0x913a561b", "delegateBGT(uint128,address)", {"_amount": p.uint128, "_validator": p.address}, ),
    depositAndLock: fun("0xa6da1e7d", "depositAndLock(address,uint256,uint256)", {"_LPToken": p.address, "_amountOrId": p.uint256, "_expiration": p.uint256}, ),
    dropBoost: fun("0x1db6c3a1", "dropBoost(uint128,address)", {"_amount": p.uint128, "_validator": p.address}, ),
    expirations: viewFun("0x3c74db0f", "expirations(address)", {"LPToken": p.address}, p.uint256),
    initialize: fun("0xfecf9734", "initialize(address,address,address,bool)", {"_owner": p.address, "_honeyQueen": p.address, "_referral": p.address, "_unlocked": p.bool}, ),
    migrate: fun("0x8e82f61d", "migrate(address[],uint256[],address)", {"_LPTokens": p.array(p.address), "_amountsOrIds": p.array(p.uint256), "_newHoneyLocker": p.address}, ),
    onERC1155BatchReceived: viewFun("0xbc197c81", "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)", {"_0": p.address, "_1": p.address, "_2": p.array(p.uint256), "_3": p.array(p.uint256), "_4": p.bytes}, p.bytes4),
    onERC1155Received: viewFun("0xf23a6e61", "onERC1155Received(address,address,uint256,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.uint256, "_4": p.bytes}, p.bytes4),
    onERC721Received: viewFun("0x150b7a02", "onERC721Received(address,address,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.bytes}, p.bytes4),
    operator: viewFun("0x570ca735", "operator()", {}, p.address),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownershipHandoverExpiresAt: viewFun("0xfee81cf4", "ownershipHandoverExpiresAt(address)", {"pendingOwner": p.address}, p.uint256),
    recipient: viewFun("0x66d003ac", "recipient()", {}, p.address),
    referral: viewFun("0x1441a5a9", "referral()", {}, p.address),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    requestOwnershipHandover: fun("0x25692962", "requestOwnershipHandover()", {}, ),
    setMigratingVault: fun("0x44afa245", "setMigratingVault(address)", {"_migratingVault": p.address}, ),
    setOperator: fun("0xb3ab15fb", "setOperator(address)", {"_operator": p.address}, ),
    setTreasury: fun("0xf0f44260", "setTreasury(address)", {"_treasury": p.address}, ),
    stake: fun("0x4854b143", "stake(address,address,uint256,bytes)", {"_LPToken": p.address, "_stakingContract": p.address, "_amount": p.uint256, "_data": p.bytes}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    treasury: viewFun("0x61d027b3", "treasury()", {}, p.address),
    unlocked: viewFun("0x6a5e2650", "unlocked()", {}, p.bool),
    unstake: fun("0xc148cf85", "unstake(address,address,uint256,bytes)", {"_LPToken": p.address, "_stakingContract": p.address, "_amount": p.uint256, "_data": p.bytes}, ),
    wildcard: fun("0xb89497fa", "wildcard(address,bytes)", {"_contract": p.address, "_data": p.bytes}, ),
    withdrawBERA: fun("0x3a1f406c", "withdrawBERA(uint256)", {"_amount": p.uint256}, ),
    withdrawERC1155: fun("0xa1538bde", "withdrawERC1155(address,uint256,uint256,bytes)", {"_token": p.address, "_id": p.uint256, "_amount": p.uint256, "_data": p.bytes}, ),
    withdrawERC20: fun("0xa1db9782", "withdrawERC20(address,uint256)", {"_token": p.address, "_amount": p.uint256}, ),
    withdrawERC721: fun("0xf3e414f8", "withdrawERC721(address,uint256)", {"_token": p.address, "_id": p.uint256}, ),
    withdrawLPToken: fun("0x7c68da48", "withdrawLPToken(address,uint256)", {"_LPToken": p.address, "_amount": p.uint256}, ),
}

export class Contract extends ContractBase {

    HONEY_QUEEN() {
        return this.eth_call(functions.HONEY_QUEEN, {})
    }

    expirations(LPToken: ExpirationsParams["LPToken"]) {
        return this.eth_call(functions.expirations, {LPToken})
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

    ownershipHandoverExpiresAt(pendingOwner: OwnershipHandoverExpiresAtParams["pendingOwner"]) {
        return this.eth_call(functions.ownershipHandoverExpiresAt, {pendingOwner})
    }

    recipient() {
        return this.eth_call(functions.recipient, {})
    }

    referral() {
        return this.eth_call(functions.referral, {})
    }

    treasury() {
        return this.eth_call(functions.treasury, {})
    }

    unlocked() {
        return this.eth_call(functions.unlocked, {})
    }
}

/// Event types
export type DepositedEventArgs = EParams<typeof events.Deposited>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type LockedUntilEventArgs = EParams<typeof events.LockedUntil>
export type MigratedEventArgs = EParams<typeof events.Migrated>
export type OwnershipHandoverCanceledEventArgs = EParams<typeof events.OwnershipHandoverCanceled>
export type OwnershipHandoverRequestedEventArgs = EParams<typeof events.OwnershipHandoverRequested>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type RewardsClaimedEventArgs = EParams<typeof events.RewardsClaimed>
export type StakedEventArgs = EParams<typeof events.Staked>
export type UnstakedEventArgs = EParams<typeof events.Unstaked>
export type WithdrawnEventArgs = EParams<typeof events.Withdrawn>

/// Function types
export type HONEY_QUEENParams = FunctionArguments<typeof functions.HONEY_QUEEN>
export type HONEY_QUEENReturn = FunctionReturn<typeof functions.HONEY_QUEEN>

export type ActivateBoostParams = FunctionArguments<typeof functions.activateBoost>
export type ActivateBoostReturn = FunctionReturn<typeof functions.activateBoost>

export type BurnBGTForBERAParams = FunctionArguments<typeof functions.burnBGTForBERA>
export type BurnBGTForBERAReturn = FunctionReturn<typeof functions.burnBGTForBERA>

export type CancelOwnershipHandoverParams = FunctionArguments<typeof functions.cancelOwnershipHandover>
export type CancelOwnershipHandoverReturn = FunctionReturn<typeof functions.cancelOwnershipHandover>

export type CancelQueuedBoostParams = FunctionArguments<typeof functions.cancelQueuedBoost>
export type CancelQueuedBoostReturn = FunctionReturn<typeof functions.cancelQueuedBoost>

export type ClaimRewardsParams = FunctionArguments<typeof functions.claimRewards>
export type ClaimRewardsReturn = FunctionReturn<typeof functions.claimRewards>

export type CompleteOwnershipHandoverParams = FunctionArguments<typeof functions.completeOwnershipHandover>
export type CompleteOwnershipHandoverReturn = FunctionReturn<typeof functions.completeOwnershipHandover>

export type DelegateBGTParams = FunctionArguments<typeof functions.delegateBGT>
export type DelegateBGTReturn = FunctionReturn<typeof functions.delegateBGT>

export type DepositAndLockParams = FunctionArguments<typeof functions.depositAndLock>
export type DepositAndLockReturn = FunctionReturn<typeof functions.depositAndLock>

export type DropBoostParams = FunctionArguments<typeof functions.dropBoost>
export type DropBoostReturn = FunctionReturn<typeof functions.dropBoost>

export type ExpirationsParams = FunctionArguments<typeof functions.expirations>
export type ExpirationsReturn = FunctionReturn<typeof functions.expirations>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type MigrateParams = FunctionArguments<typeof functions.migrate>
export type MigrateReturn = FunctionReturn<typeof functions.migrate>

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

export type OwnershipHandoverExpiresAtParams = FunctionArguments<typeof functions.ownershipHandoverExpiresAt>
export type OwnershipHandoverExpiresAtReturn = FunctionReturn<typeof functions.ownershipHandoverExpiresAt>

export type RecipientParams = FunctionArguments<typeof functions.recipient>
export type RecipientReturn = FunctionReturn<typeof functions.recipient>

export type ReferralParams = FunctionArguments<typeof functions.referral>
export type ReferralReturn = FunctionReturn<typeof functions.referral>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RequestOwnershipHandoverParams = FunctionArguments<typeof functions.requestOwnershipHandover>
export type RequestOwnershipHandoverReturn = FunctionReturn<typeof functions.requestOwnershipHandover>

export type SetMigratingVaultParams = FunctionArguments<typeof functions.setMigratingVault>
export type SetMigratingVaultReturn = FunctionReturn<typeof functions.setMigratingVault>

export type SetOperatorParams = FunctionArguments<typeof functions.setOperator>
export type SetOperatorReturn = FunctionReturn<typeof functions.setOperator>

export type SetTreasuryParams = FunctionArguments<typeof functions.setTreasury>
export type SetTreasuryReturn = FunctionReturn<typeof functions.setTreasury>

export type StakeParams = FunctionArguments<typeof functions.stake>
export type StakeReturn = FunctionReturn<typeof functions.stake>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TreasuryParams = FunctionArguments<typeof functions.treasury>
export type TreasuryReturn = FunctionReturn<typeof functions.treasury>

export type UnlockedParams = FunctionArguments<typeof functions.unlocked>
export type UnlockedReturn = FunctionReturn<typeof functions.unlocked>

export type UnstakeParams = FunctionArguments<typeof functions.unstake>
export type UnstakeReturn = FunctionReturn<typeof functions.unstake>

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

