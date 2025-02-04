import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ActivateBoost: event("0x331ddcd7d9830ca2dd8d4e44a2ff8d00f690b6b56827cb02135ee066a702f65f", "ActivateBoost(address,address,bytes,uint128)", {"sender": indexed(p.address), "user": indexed(p.address), "pubkey": indexed(p.bytes), "amount": p.uint128}),
    ActivateBoostDelayChanged: event("0xd257e80fd5337e71c312e3765759b53192ff844bee242248b277a77a9d82c12e", "ActivateBoostDelayChanged(uint32)", {"newDelay": p.uint32}),
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    BgtTermsAndConditionsChanged: event("0x22e8cea885a4b7de3886bb99b58052f39daab345deeee849f6c72087f1b35de9", "BgtTermsAndConditionsChanged(string)", {"newTermsAndConditions": p.string}),
    CancelBoost: event("0xabb23fd3a3e0e63d68fab24ef90be479363fa89b757065641e6a77ca49d45ba6", "CancelBoost(address,bytes,uint128)", {"user": indexed(p.address), "pubkey": indexed(p.bytes), "amount": p.uint128}),
    CancelDropBoost: event("0xae8e6c975978143902c820cfff730990781faf7ad970ce723d9e586557613474", "CancelDropBoost(address,bytes,uint128)", {"user": indexed(p.address), "pubkey": indexed(p.bytes), "amount": p.uint128}),
    DelegateChanged: event("0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f", "DelegateChanged(address,address,address)", {"delegator": indexed(p.address), "fromDelegate": indexed(p.address), "toDelegate": indexed(p.address)}),
    DelegateVotesChanged: event("0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724", "DelegateVotesChanged(address,uint256,uint256)", {"delegate": indexed(p.address), "previousVotes": p.uint256, "newVotes": p.uint256}),
    DropBoost: event("0x574d5117cce15ba0f7443c955ec7bfc5f3e9b50ac2314a0f33ab7a9ea94c3ab1", "DropBoost(address,address,bytes,uint128)", {"sender": indexed(p.address), "user": indexed(p.address), "pubkey": indexed(p.bytes), "amount": p.uint128}),
    DropBoostDelayChanged: event("0xed6ddb1d14a5f2efb1c569e5d75960519ac932e2c3d456e6d95762061c685c99", "DropBoostDelayChanged(uint32)", {"newDelay": p.uint32}),
    EIP712DomainChanged: event("0x0a6387c9ea3628b88a633bb4f3b151770f70085117a15f9bf3787cda53f13d31", "EIP712DomainChanged()", {}),
    ExceedingReservesBurnt: event("0xbef567cd1f0f14efefc29842ca1de0d16dff08c828433ba7a31bb8c75ca7a6f0", "ExceedingReservesBurnt(address,uint256)", {"caller": p.address, "amount": p.uint256}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    MinterChanged: event("0x3b0007eb941cf645526cbb3a4fdaecda9d28ce4843167d9263b536a1f1edc0f6", "MinterChanged(address,address)", {"previous": indexed(p.address), "current": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    QueueBoost: event("0x23031c323c53188b79b7ee95867e49f995174fa03f33678ddcb46c514f07e021", "QueueBoost(address,bytes,uint128)", {"user": indexed(p.address), "pubkey": indexed(p.bytes), "amount": p.uint128}),
    QueueDropBoost: event("0xaba377162291315e8f2d858c2eb7e5088df2d096757bf9781eea90fe7dda7d2b", "QueueDropBoost(address,bytes,uint128)", {"user": indexed(p.address), "pubkey": indexed(p.bytes), "amount": p.uint128}),
    Redeem: event("0xd12200efa34901b99367694174c3b0d32c99585fdf37c7c26892136ddd0836d9", "Redeem(address,address,uint256)", {"from": indexed(p.address), "receiver": indexed(p.address), "amount": p.uint256}),
    SenderWhitelisted: event("0x7cc8eedb33d0513aac63d861ea275788d3526752cda024d59cfad9d9174190ca", "SenderWhitelisted(address,bool)", {"sender": indexed(p.address), "approved": p.bool}),
    StakerChanged: event("0x96d621126ebae771afc3398d70236d4cec9cda04b8a0888161100f5b7c9b491b", "StakerChanged(address,address)", {"previous": indexed(p.address), "current": indexed(p.address)}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
}

export const functions = {
    CLOCK_MODE: viewFun("0x4bf5d7e9", "CLOCK_MODE()", {}, p.string),
    activateBoost: fun("0x9b05e781", "activateBoost(address,bytes)", {"user": p.address, "pubkey": p.bytes}, p.bool),
    activateBoostDelay: viewFun("0x1778260f", "activateBoostDelay()", {}, p.uint32),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "amount": p.uint256}, p.bool),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    bgtTermsAndConditions: viewFun("0x586d8b4c", "bgtTermsAndConditions()", {}, p.string),
    boosted: viewFun("0x441b76d8", "boosted(address,bytes)", {"account": p.address, "pubkey": p.bytes}, p.uint128),
    boostedQueue: viewFun("0x2477e76a", "boostedQueue(address,bytes)", {"account": p.address, "pubkey": p.bytes}, {"blockNumberLast": p.uint32, "balance": p.uint128}),
    boostees: viewFun("0xc160b284", "boostees(bytes)", {"pubkey": p.bytes}, p.uint128),
    boosts: viewFun("0xfdabc986", "boosts(address)", {"account": p.address}, p.uint128),
    burnExceedingReserves: fun("0x471b57a3", "burnExceedingReserves()", {}, ),
    cancelBoost: fun("0xf59f3cbf", "cancelBoost(bytes,uint128)", {"pubkey": p.bytes, "amount": p.uint128}, ),
    cancelDropBoost: fun("0x9c8b0547", "cancelDropBoost(bytes,uint128)", {"pubkey": p.bytes, "amount": p.uint128}, ),
    checkpoints: viewFun("0xf1127ed8", "checkpoints(address,uint32)", {"account": p.address, "pos": p.uint32}, p.struct({"_key": p.uint48, "_value": p.uint208})),
    clock: viewFun("0x91ddadf4", "clock()", {}, p.uint48),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    delegate: fun("0x5c19a95c", "delegate(address)", {"delegatee": p.address}, ),
    delegateBySig: fun("0xc3cda520", "delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)", {"delegatee": p.address, "nonce": p.uint256, "expiry": p.uint256, "v": p.uint8, "r": p.bytes32, "s": p.bytes32}, ),
    delegates: viewFun("0x587cde1e", "delegates(address)", {"account": p.address}, p.address),
    dropBoost: fun("0x814d2614", "dropBoost(address,bytes)", {"user": p.address, "pubkey": p.bytes}, p.bool),
    dropBoostDelay: viewFun("0x21ddb7df", "dropBoostDelay()", {}, p.uint32),
    dropBoostQueue: viewFun("0x3b6ccac9", "dropBoostQueue(address,bytes)", {"account": p.address, "pubkey": p.bytes}, {"blockNumberLast": p.uint32, "balance": p.uint128}),
    eip712Domain: viewFun("0x84b0196e", "eip712Domain()", {}, {"fields": p.bytes1, "name": p.string, "version": p.string, "chainId": p.uint256, "verifyingContract": p.address, "salt": p.bytes32, "extensions": p.array(p.uint256)}),
    getPastTotalSupply: viewFun("0x8e539e8c", "getPastTotalSupply(uint256)", {"timepoint": p.uint256}, p.uint256),
    getPastVotes: viewFun("0x3a46b1a8", "getPastVotes(address,uint256)", {"account": p.address, "timepoint": p.uint256}, p.uint256),
    getVotes: viewFun("0x9ab24eb0", "getVotes(address)", {"account": p.address}, p.uint256),
    initialize: fun("0xc4d66de8", "initialize(address)", {"_owner": p.address}, ),
    isWhitelistedSender: viewFun("0x1b9e2fad", "isWhitelistedSender(address)", {"sender": p.address}, p.bool),
    mint: fun("0x40c10f19", "mint(address,uint256)", {"distributor": p.address, "amount": p.uint256}, ),
    minter: viewFun("0x07546172", "minter()", {}, p.address),
    multicall: fun("0xac9650d8", "multicall(bytes[])", {"data": p.array(p.bytes)}, p.array(p.bytes)),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    nonces: viewFun("0x7ecebe00", "nonces(address)", {"owner": p.address}, p.uint256),
    normalizedBoost: viewFun("0x1e569d7b", "normalizedBoost(bytes)", {"pubkey": p.bytes}, p.uint256),
    numCheckpoints: viewFun("0x6fcfff45", "numCheckpoints(address)", {"account": p.address}, p.uint32),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    queueBoost: fun("0x489fa30a", "queueBoost(bytes,uint128)", {"pubkey": p.bytes, "amount": p.uint128}, ),
    queueDropBoost: fun("0x2b153ce1", "queueDropBoost(bytes,uint128)", {"pubkey": p.bytes, "amount": p.uint128}, ),
    queuedBoost: viewFun("0xfa8ce245", "queuedBoost(address)", {"account": p.address}, p.uint128),
    redeem: fun("0x1e9a6950", "redeem(address,uint256)", {"receiver": p.address, "amount": p.uint256}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setActivateBoostDelay: fun("0x0f85da32", "setActivateBoostDelay(uint32)", {"_activateBoostDelay": p.uint32}, ),
    setBgtTermsAndConditions: fun("0x9750aad7", "setBgtTermsAndConditions(string)", {"_bgtTermsAndConditions": p.string}, ),
    setDropBoostDelay: fun("0xdc63bd40", "setDropBoostDelay(uint32)", {"_dropBoostDelay": p.uint32}, ),
    setMinter: fun("0xfca3b5aa", "setMinter(address)", {"_minter": p.address}, ),
    setStaker: fun("0xa29a43bb", "setStaker(address)", {"_staker": p.address}, ),
    staker: viewFun("0x5ebaf1db", "staker()", {}, p.address),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalBoosts: viewFun("0xd66e54e1", "totalBoosts()", {}, p.uint128),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "amount": p.uint256}, p.bool),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    unboostedBalanceOf: viewFun("0x9203ad5d", "unboostedBalanceOf(address)", {"account": p.address}, p.uint256),
    whitelistSender: fun("0x0613fef8", "whitelistSender(address,bool)", {"sender": p.address, "approved": p.bool}, ),
}

export class Contract extends ContractBase {

    CLOCK_MODE() {
        return this.eth_call(functions.CLOCK_MODE, {})
    }

    activateBoostDelay() {
        return this.eth_call(functions.activateBoostDelay, {})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    bgtTermsAndConditions() {
        return this.eth_call(functions.bgtTermsAndConditions, {})
    }

    boosted(account: BoostedParams["account"], pubkey: BoostedParams["pubkey"]) {
        return this.eth_call(functions.boosted, {account, pubkey})
    }

    boostedQueue(account: BoostedQueueParams["account"], pubkey: BoostedQueueParams["pubkey"]) {
        return this.eth_call(functions.boostedQueue, {account, pubkey})
    }

    boostees(pubkey: BoosteesParams["pubkey"]) {
        return this.eth_call(functions.boostees, {pubkey})
    }

    boosts(account: BoostsParams["account"]) {
        return this.eth_call(functions.boosts, {account})
    }

    checkpoints(account: CheckpointsParams["account"], pos: CheckpointsParams["pos"]) {
        return this.eth_call(functions.checkpoints, {account, pos})
    }

    clock() {
        return this.eth_call(functions.clock, {})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    delegates(account: DelegatesParams["account"]) {
        return this.eth_call(functions.delegates, {account})
    }

    dropBoostDelay() {
        return this.eth_call(functions.dropBoostDelay, {})
    }

    dropBoostQueue(account: DropBoostQueueParams["account"], pubkey: DropBoostQueueParams["pubkey"]) {
        return this.eth_call(functions.dropBoostQueue, {account, pubkey})
    }

    eip712Domain() {
        return this.eth_call(functions.eip712Domain, {})
    }

    getPastTotalSupply(timepoint: GetPastTotalSupplyParams["timepoint"]) {
        return this.eth_call(functions.getPastTotalSupply, {timepoint})
    }

    getPastVotes(account: GetPastVotesParams["account"], timepoint: GetPastVotesParams["timepoint"]) {
        return this.eth_call(functions.getPastVotes, {account, timepoint})
    }

    getVotes(account: GetVotesParams["account"]) {
        return this.eth_call(functions.getVotes, {account})
    }

    isWhitelistedSender(sender: IsWhitelistedSenderParams["sender"]) {
        return this.eth_call(functions.isWhitelistedSender, {sender})
    }

    minter() {
        return this.eth_call(functions.minter, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    nonces(owner: NoncesParams["owner"]) {
        return this.eth_call(functions.nonces, {owner})
    }

    normalizedBoost(pubkey: NormalizedBoostParams["pubkey"]) {
        return this.eth_call(functions.normalizedBoost, {pubkey})
    }

    numCheckpoints(account: NumCheckpointsParams["account"]) {
        return this.eth_call(functions.numCheckpoints, {account})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    queuedBoost(account: QueuedBoostParams["account"]) {
        return this.eth_call(functions.queuedBoost, {account})
    }

    staker() {
        return this.eth_call(functions.staker, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalBoosts() {
        return this.eth_call(functions.totalBoosts, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    unboostedBalanceOf(account: UnboostedBalanceOfParams["account"]) {
        return this.eth_call(functions.unboostedBalanceOf, {account})
    }
}

/// Event types
export type ActivateBoostEventArgs = EParams<typeof events.ActivateBoost>
export type ActivateBoostDelayChangedEventArgs = EParams<typeof events.ActivateBoostDelayChanged>
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type BgtTermsAndConditionsChangedEventArgs = EParams<typeof events.BgtTermsAndConditionsChanged>
export type CancelBoostEventArgs = EParams<typeof events.CancelBoost>
export type CancelDropBoostEventArgs = EParams<typeof events.CancelDropBoost>
export type DelegateChangedEventArgs = EParams<typeof events.DelegateChanged>
export type DelegateVotesChangedEventArgs = EParams<typeof events.DelegateVotesChanged>
export type DropBoostEventArgs = EParams<typeof events.DropBoost>
export type DropBoostDelayChangedEventArgs = EParams<typeof events.DropBoostDelayChanged>
export type EIP712DomainChangedEventArgs = EParams<typeof events.EIP712DomainChanged>
export type ExceedingReservesBurntEventArgs = EParams<typeof events.ExceedingReservesBurnt>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type MinterChangedEventArgs = EParams<typeof events.MinterChanged>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type QueueBoostEventArgs = EParams<typeof events.QueueBoost>
export type QueueDropBoostEventArgs = EParams<typeof events.QueueDropBoost>
export type RedeemEventArgs = EParams<typeof events.Redeem>
export type SenderWhitelistedEventArgs = EParams<typeof events.SenderWhitelisted>
export type StakerChangedEventArgs = EParams<typeof events.StakerChanged>
export type TransferEventArgs = EParams<typeof events.Transfer>

/// Function types
export type CLOCK_MODEParams = FunctionArguments<typeof functions.CLOCK_MODE>
export type CLOCK_MODEReturn = FunctionReturn<typeof functions.CLOCK_MODE>

export type ActivateBoostParams = FunctionArguments<typeof functions.activateBoost>
export type ActivateBoostReturn = FunctionReturn<typeof functions.activateBoost>

export type ActivateBoostDelayParams = FunctionArguments<typeof functions.activateBoostDelay>
export type ActivateBoostDelayReturn = FunctionReturn<typeof functions.activateBoostDelay>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BgtTermsAndConditionsParams = FunctionArguments<typeof functions.bgtTermsAndConditions>
export type BgtTermsAndConditionsReturn = FunctionReturn<typeof functions.bgtTermsAndConditions>

export type BoostedParams = FunctionArguments<typeof functions.boosted>
export type BoostedReturn = FunctionReturn<typeof functions.boosted>

export type BoostedQueueParams = FunctionArguments<typeof functions.boostedQueue>
export type BoostedQueueReturn = FunctionReturn<typeof functions.boostedQueue>

export type BoosteesParams = FunctionArguments<typeof functions.boostees>
export type BoosteesReturn = FunctionReturn<typeof functions.boostees>

export type BoostsParams = FunctionArguments<typeof functions.boosts>
export type BoostsReturn = FunctionReturn<typeof functions.boosts>

export type BurnExceedingReservesParams = FunctionArguments<typeof functions.burnExceedingReserves>
export type BurnExceedingReservesReturn = FunctionReturn<typeof functions.burnExceedingReserves>

export type CancelBoostParams = FunctionArguments<typeof functions.cancelBoost>
export type CancelBoostReturn = FunctionReturn<typeof functions.cancelBoost>

export type CancelDropBoostParams = FunctionArguments<typeof functions.cancelDropBoost>
export type CancelDropBoostReturn = FunctionReturn<typeof functions.cancelDropBoost>

export type CheckpointsParams = FunctionArguments<typeof functions.checkpoints>
export type CheckpointsReturn = FunctionReturn<typeof functions.checkpoints>

export type ClockParams = FunctionArguments<typeof functions.clock>
export type ClockReturn = FunctionReturn<typeof functions.clock>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DelegateParams = FunctionArguments<typeof functions.delegate>
export type DelegateReturn = FunctionReturn<typeof functions.delegate>

export type DelegateBySigParams = FunctionArguments<typeof functions.delegateBySig>
export type DelegateBySigReturn = FunctionReturn<typeof functions.delegateBySig>

export type DelegatesParams = FunctionArguments<typeof functions.delegates>
export type DelegatesReturn = FunctionReturn<typeof functions.delegates>

export type DropBoostParams = FunctionArguments<typeof functions.dropBoost>
export type DropBoostReturn = FunctionReturn<typeof functions.dropBoost>

export type DropBoostDelayParams = FunctionArguments<typeof functions.dropBoostDelay>
export type DropBoostDelayReturn = FunctionReturn<typeof functions.dropBoostDelay>

export type DropBoostQueueParams = FunctionArguments<typeof functions.dropBoostQueue>
export type DropBoostQueueReturn = FunctionReturn<typeof functions.dropBoostQueue>

export type Eip712DomainParams = FunctionArguments<typeof functions.eip712Domain>
export type Eip712DomainReturn = FunctionReturn<typeof functions.eip712Domain>

export type GetPastTotalSupplyParams = FunctionArguments<typeof functions.getPastTotalSupply>
export type GetPastTotalSupplyReturn = FunctionReturn<typeof functions.getPastTotalSupply>

export type GetPastVotesParams = FunctionArguments<typeof functions.getPastVotes>
export type GetPastVotesReturn = FunctionReturn<typeof functions.getPastVotes>

export type GetVotesParams = FunctionArguments<typeof functions.getVotes>
export type GetVotesReturn = FunctionReturn<typeof functions.getVotes>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsWhitelistedSenderParams = FunctionArguments<typeof functions.isWhitelistedSender>
export type IsWhitelistedSenderReturn = FunctionReturn<typeof functions.isWhitelistedSender>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type MinterParams = FunctionArguments<typeof functions.minter>
export type MinterReturn = FunctionReturn<typeof functions.minter>

export type MulticallParams = FunctionArguments<typeof functions.multicall>
export type MulticallReturn = FunctionReturn<typeof functions.multicall>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type NoncesParams = FunctionArguments<typeof functions.nonces>
export type NoncesReturn = FunctionReturn<typeof functions.nonces>

export type NormalizedBoostParams = FunctionArguments<typeof functions.normalizedBoost>
export type NormalizedBoostReturn = FunctionReturn<typeof functions.normalizedBoost>

export type NumCheckpointsParams = FunctionArguments<typeof functions.numCheckpoints>
export type NumCheckpointsReturn = FunctionReturn<typeof functions.numCheckpoints>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type QueueBoostParams = FunctionArguments<typeof functions.queueBoost>
export type QueueBoostReturn = FunctionReturn<typeof functions.queueBoost>

export type QueueDropBoostParams = FunctionArguments<typeof functions.queueDropBoost>
export type QueueDropBoostReturn = FunctionReturn<typeof functions.queueDropBoost>

export type QueuedBoostParams = FunctionArguments<typeof functions.queuedBoost>
export type QueuedBoostReturn = FunctionReturn<typeof functions.queuedBoost>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetActivateBoostDelayParams = FunctionArguments<typeof functions.setActivateBoostDelay>
export type SetActivateBoostDelayReturn = FunctionReturn<typeof functions.setActivateBoostDelay>

export type SetBgtTermsAndConditionsParams = FunctionArguments<typeof functions.setBgtTermsAndConditions>
export type SetBgtTermsAndConditionsReturn = FunctionReturn<typeof functions.setBgtTermsAndConditions>

export type SetDropBoostDelayParams = FunctionArguments<typeof functions.setDropBoostDelay>
export type SetDropBoostDelayReturn = FunctionReturn<typeof functions.setDropBoostDelay>

export type SetMinterParams = FunctionArguments<typeof functions.setMinter>
export type SetMinterReturn = FunctionReturn<typeof functions.setMinter>

export type SetStakerParams = FunctionArguments<typeof functions.setStaker>
export type SetStakerReturn = FunctionReturn<typeof functions.setStaker>

export type StakerParams = FunctionArguments<typeof functions.staker>
export type StakerReturn = FunctionReturn<typeof functions.staker>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalBoostsParams = FunctionArguments<typeof functions.totalBoosts>
export type TotalBoostsReturn = FunctionReturn<typeof functions.totalBoosts>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UnboostedBalanceOfParams = FunctionArguments<typeof functions.unboostedBalanceOf>
export type UnboostedBalanceOfReturn = FunctionReturn<typeof functions.unboostedBalanceOf>

export type WhitelistSenderParams = FunctionArguments<typeof functions.whitelistSender>
export type WhitelistSenderReturn = FunctionReturn<typeof functions.whitelistSender>

