import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Allocate: event("0x5168bfb88d6125d4580e2b91ecb103a730312c3e8b0be9c4031a0fc794e2cd5f", "Allocate(address,address,uint256)", {"userAddress": indexed(p.address), "usageAddress": indexed(p.address), "amount": p.uint256}),
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    ApproveUsage: event("0xe75ec259c38e4601f24580968665ec00b21cca4f996689b260ec598aec5c08db", "ApproveUsage(address,address,uint256)", {"userAddress": indexed(p.address), "usageAddress": indexed(p.address), "amount": p.uint256}),
    CancelRedeem: event("0x56d7520e387607a8daa892e3fed116badc2a636307bdc794b1c1aed97ae203f4", "CancelRedeem(address,uint256)", {"userAddress": indexed(p.address), "xKodiakAmount": p.uint256}),
    Convert: event("0xccfaeb3043a96a967dc036ab72e078a9632af809671bc2a1ac30a8043645f89e", "Convert(address,address,uint256)", {"from": indexed(p.address), "to": p.address, "amount": p.uint256}),
    Deallocate: event("0x7d613f7bd1a777aeeefdd38ae61201003086575188df50618d02482220f5c147", "Deallocate(address,address,uint256,uint256)", {"userAddress": indexed(p.address), "usageAddress": indexed(p.address), "amount": p.uint256, "fee": p.uint256}),
    FinalizeRedeem: event("0x0da072ebd7a5649099f43a3776eb0cda17aca79426ee9f28aae203f5dfa04eda", "FinalizeRedeem(address,uint256,uint256)", {"userAddress": indexed(p.address), "xKodiakAmount": p.uint256, "kodiakAmount": p.uint256}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Redeem: event("0xbd5034ffbd47e4e72a94baa2cdb74c6fad73cb3bcdc13036b72ec8306f5a7646", "Redeem(address,uint256,uint256,uint256)", {"userAddress": indexed(p.address), "xKodiakAmount": p.uint256, "kodiakAmount": p.uint256, "duration": p.uint256}),
    SetTransferWhitelist: event("0x3a34209cb941a5d23a56dea730a13738454bc7daefd4bb32e8d7df58c1bd920d", "SetTransferWhitelist(address,bool)", {"account": p.address, "add": p.bool}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    UpdateDeallocationFee: event("0x6ff024152fc2cd8071bc701f966036513eb03e243863f21d8218646faac0eaef", "UpdateDeallocationFee(address,uint256)", {"usageAddress": indexed(p.address), "fee": p.uint256}),
    UpdateRedeemRewardsAddress: event("0xf5e2c02a38c6a35532ac422a379e6c7f3ce33d2dc4a1420efaceb4174ee526cb", "UpdateRedeemRewardsAddress(address,uint256,address,address)", {"userAddress": indexed(p.address), "redeemIndex": p.uint256, "previousRewardsAddress": p.address, "newRewardsAddress": p.address}),
    UpdateRedeemSettings: event("0x5b37d10782e41a6539b50d59366d4112a880236e4187e85b6d1514d20e07d9b8", "UpdateRedeemSettings(uint256,uint256,uint256,uint256,uint256)", {"minRedeemRatio": p.uint256, "maxRedeemRatio": p.uint256, "minRedeemDuration": p.uint256, "maxRedeemDuration": p.uint256, "redeemRewardsAdjustment": p.uint256}),
    UpdateRewardsAddress: event("0x9c7c1f991900c513fecc6a856d8877fe832e6f6a5abfa6e206ef30f10ec38f26", "UpdateRewardsAddress(address,address)", {"previousRewardsAddress": p.address, "newRewardsAddress": p.address}),
}

export const functions = {
    MAX_DEALLOCATION_FEE: viewFun("0x02f91e55", "MAX_DEALLOCATION_FEE()", {}, p.uint256),
    MAX_FIXED_RATIO: viewFun("0x619ac95b", "MAX_FIXED_RATIO()", {}, p.uint256),
    allocate: fun("0x1c75e369", "allocate(address,uint256,bytes)", {"usageAddress": p.address, "amount": p.uint256, "usageData": p.bytes}, ),
    allocateFromUsage: fun("0x3b90f9a0", "allocateFromUsage(address,uint256)", {"userAddress": p.address, "amount": p.uint256}, ),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "amount": p.uint256}, p.bool),
    approveUsage: fun("0xc360ed1c", "approveUsage(address,uint256)", {"usage": p.address, "amount": p.uint256}, ),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    cancelRedeem: fun("0x539ffb77", "cancelRedeem(uint256)", {"redeemIndex": p.uint256}, ),
    convert: fun("0xa3908e1b", "convert(uint256)", {"amount": p.uint256}, ),
    convertTo: fun("0x5a1d34dc", "convertTo(uint256,address)", {"amount": p.uint256, "to": p.address}, ),
    deallocate: fun("0x549230c9", "deallocate(address,uint256,bytes)", {"usageAddress": p.address, "amount": p.uint256, "usageData": p.bytes}, ),
    deallocateFromUsage: fun("0xa0bdc7cb", "deallocateFromUsage(address,uint256)", {"userAddress": p.address, "amount": p.uint256}, ),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    decreaseAllowance: fun("0xa457c2d7", "decreaseAllowance(address,uint256)", {"spender": p.address, "subtractedValue": p.uint256}, p.bool),
    finalizeRedeem: fun("0xaff6cbf1", "finalizeRedeem(uint256)", {"redeemIndex": p.uint256}, ),
    getKodiakByVestingDuration: viewFun("0xd26d3565", "getKodiakByVestingDuration(uint256,uint256)", {"amount": p.uint256, "duration": p.uint256}, p.uint256),
    getUsageAllocation: viewFun("0x2e9a76e4", "getUsageAllocation(address,address)", {"userAddress": p.address, "usageAddress": p.address}, p.uint256),
    getUsageApproval: viewFun("0x2b489679", "getUsageApproval(address,address)", {"userAddress": p.address, "usageAddress": p.address}, p.uint256),
    getUserRedeem: viewFun("0xcc6c5423", "getUserRedeem(address,uint256)", {"userAddress": p.address, "redeemIndex": p.uint256}, {"kdkAmount": p.uint256, "xKdkAmount": p.uint256, "endTime": p.uint256, "rewardsContract": p.address, "rewardsAllocation": p.uint256}),
    getUserRedeemsLength: viewFun("0xb90c2b52", "getUserRedeemsLength(address)", {"userAddress": p.address}, p.uint256),
    getXKodiakBalance: viewFun("0xb7dae89b", "getXKodiakBalance(address)", {"userAddress": p.address}, {"allocatedAmount": p.uint256, "redeemingAmount": p.uint256}),
    increaseAllowance: fun("0x39509351", "increaseAllowance(address,uint256)", {"spender": p.address, "addedValue": p.uint256}, p.bool),
    isTransferWhitelisted: viewFun("0x1eee7e60", "isTransferWhitelisted(address)", {"account": p.address}, p.bool),
    kdkToken: viewFun("0x78cf8588", "kdkToken()", {}, p.address),
    maxRedeemDuration: viewFun("0xe9ed87f8", "maxRedeemDuration()", {}, p.uint256),
    maxRedeemRatio: viewFun("0xe3a2950b", "maxRedeemRatio()", {}, p.uint256),
    minRedeemDuration: viewFun("0xc4b10766", "minRedeemDuration()", {}, p.uint256),
    minRedeemRatio: viewFun("0x1c352679", "minRedeemRatio()", {}, p.uint256),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    redeem: fun("0x7cbc2373", "redeem(uint256,uint256)", {"xKdkAmount": p.uint256, "duration": p.uint256}, ),
    redeemRewardsAdjustment: viewFun("0x00e3cc13", "redeemRewardsAdjustment()", {}, p.uint256),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    rewardsAddress: viewFun("0xc0973eed", "rewardsAddress()", {}, p.address),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"recipient": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"sender": p.address, "recipient": p.address, "amount": p.uint256}, p.bool),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    transferWhitelist: viewFun("0x4b359d38", "transferWhitelist(uint256)", {"index": p.uint256}, p.address),
    transferWhitelistLength: viewFun("0x161aab43", "transferWhitelistLength()", {}, p.uint256),
    updateDeallocationFee: fun("0x0f7d3a69", "updateDeallocationFee(address,uint256)", {"usageAddress": p.address, "fee": p.uint256}, ),
    updateRedeemRewardsAddress: fun("0xc696bf47", "updateRedeemRewardsAddress(uint256)", {"redeemIndex": p.uint256}, ),
    updateRedeemSettings: fun("0x093220b7", "updateRedeemSettings(uint256,uint256,uint256,uint256,uint256)", {"minRedeemRatio_": p.uint256, "maxRedeemRatio_": p.uint256, "minRedeemDuration_": p.uint256, "maxRedeemDuration_": p.uint256, "redeemRewardsAdjustment_": p.uint256}, ),
    updateRewardsAddress: fun("0x2c33d12b", "updateRewardsAddress(address)", {"rewardsAddress_": p.address}, ),
    updateTransferWhitelist: fun("0x89083654", "updateTransferWhitelist(address,bool)", {"account": p.address, "add": p.bool}, ),
    usageAllocations: viewFun("0x2cc2f5ce", "usageAllocations(address,address)", {"_0": p.address, "_1": p.address}, p.uint256),
    usageApprovals: viewFun("0x488c8303", "usageApprovals(address,address)", {"_0": p.address, "_1": p.address}, p.uint256),
    usagesDeallocationFee: viewFun("0x8975f918", "usagesDeallocationFee(address)", {"_0": p.address}, p.uint256),
    userRedeems: viewFun("0x4f62b7ec", "userRedeems(address,uint256)", {"_0": p.address, "_1": p.uint256}, {"kdkAmount": p.uint256, "xKodiakAmount": p.uint256, "endTime": p.uint256, "rewardsAddress": p.address, "rewardsAllocation": p.uint256}),
    xKodiakBalances: viewFun("0x824326f6", "xKodiakBalances(address)", {"_0": p.address}, {"allocatedAmount": p.uint256, "redeemingAmount": p.uint256}),
}

export class Contract extends ContractBase {

    MAX_DEALLOCATION_FEE() {
        return this.eth_call(functions.MAX_DEALLOCATION_FEE, {})
    }

    MAX_FIXED_RATIO() {
        return this.eth_call(functions.MAX_FIXED_RATIO, {})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    getKodiakByVestingDuration(amount: GetKodiakByVestingDurationParams["amount"], duration: GetKodiakByVestingDurationParams["duration"]) {
        return this.eth_call(functions.getKodiakByVestingDuration, {amount, duration})
    }

    getUsageAllocation(userAddress: GetUsageAllocationParams["userAddress"], usageAddress: GetUsageAllocationParams["usageAddress"]) {
        return this.eth_call(functions.getUsageAllocation, {userAddress, usageAddress})
    }

    getUsageApproval(userAddress: GetUsageApprovalParams["userAddress"], usageAddress: GetUsageApprovalParams["usageAddress"]) {
        return this.eth_call(functions.getUsageApproval, {userAddress, usageAddress})
    }

    getUserRedeem(userAddress: GetUserRedeemParams["userAddress"], redeemIndex: GetUserRedeemParams["redeemIndex"]) {
        return this.eth_call(functions.getUserRedeem, {userAddress, redeemIndex})
    }

    getUserRedeemsLength(userAddress: GetUserRedeemsLengthParams["userAddress"]) {
        return this.eth_call(functions.getUserRedeemsLength, {userAddress})
    }

    getXKodiakBalance(userAddress: GetXKodiakBalanceParams["userAddress"]) {
        return this.eth_call(functions.getXKodiakBalance, {userAddress})
    }

    isTransferWhitelisted(account: IsTransferWhitelistedParams["account"]) {
        return this.eth_call(functions.isTransferWhitelisted, {account})
    }

    kdkToken() {
        return this.eth_call(functions.kdkToken, {})
    }

    maxRedeemDuration() {
        return this.eth_call(functions.maxRedeemDuration, {})
    }

    maxRedeemRatio() {
        return this.eth_call(functions.maxRedeemRatio, {})
    }

    minRedeemDuration() {
        return this.eth_call(functions.minRedeemDuration, {})
    }

    minRedeemRatio() {
        return this.eth_call(functions.minRedeemRatio, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    redeemRewardsAdjustment() {
        return this.eth_call(functions.redeemRewardsAdjustment, {})
    }

    rewardsAddress() {
        return this.eth_call(functions.rewardsAddress, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    transferWhitelist(index: TransferWhitelistParams["index"]) {
        return this.eth_call(functions.transferWhitelist, {index})
    }

    transferWhitelistLength() {
        return this.eth_call(functions.transferWhitelistLength, {})
    }

    usageAllocations(_0: UsageAllocationsParams["_0"], _1: UsageAllocationsParams["_1"]) {
        return this.eth_call(functions.usageAllocations, {_0, _1})
    }

    usageApprovals(_0: UsageApprovalsParams["_0"], _1: UsageApprovalsParams["_1"]) {
        return this.eth_call(functions.usageApprovals, {_0, _1})
    }

    usagesDeallocationFee(_0: UsagesDeallocationFeeParams["_0"]) {
        return this.eth_call(functions.usagesDeallocationFee, {_0})
    }

    userRedeems(_0: UserRedeemsParams["_0"], _1: UserRedeemsParams["_1"]) {
        return this.eth_call(functions.userRedeems, {_0, _1})
    }

    xKodiakBalances(_0: XKodiakBalancesParams["_0"]) {
        return this.eth_call(functions.xKodiakBalances, {_0})
    }
}

/// Event types
export type AllocateEventArgs = EParams<typeof events.Allocate>
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ApproveUsageEventArgs = EParams<typeof events.ApproveUsage>
export type CancelRedeemEventArgs = EParams<typeof events.CancelRedeem>
export type ConvertEventArgs = EParams<typeof events.Convert>
export type DeallocateEventArgs = EParams<typeof events.Deallocate>
export type FinalizeRedeemEventArgs = EParams<typeof events.FinalizeRedeem>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type RedeemEventArgs = EParams<typeof events.Redeem>
export type SetTransferWhitelistEventArgs = EParams<typeof events.SetTransferWhitelist>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UpdateDeallocationFeeEventArgs = EParams<typeof events.UpdateDeallocationFee>
export type UpdateRedeemRewardsAddressEventArgs = EParams<typeof events.UpdateRedeemRewardsAddress>
export type UpdateRedeemSettingsEventArgs = EParams<typeof events.UpdateRedeemSettings>
export type UpdateRewardsAddressEventArgs = EParams<typeof events.UpdateRewardsAddress>

/// Function types
export type MAX_DEALLOCATION_FEEParams = FunctionArguments<typeof functions.MAX_DEALLOCATION_FEE>
export type MAX_DEALLOCATION_FEEReturn = FunctionReturn<typeof functions.MAX_DEALLOCATION_FEE>

export type MAX_FIXED_RATIOParams = FunctionArguments<typeof functions.MAX_FIXED_RATIO>
export type MAX_FIXED_RATIOReturn = FunctionReturn<typeof functions.MAX_FIXED_RATIO>

export type AllocateParams = FunctionArguments<typeof functions.allocate>
export type AllocateReturn = FunctionReturn<typeof functions.allocate>

export type AllocateFromUsageParams = FunctionArguments<typeof functions.allocateFromUsage>
export type AllocateFromUsageReturn = FunctionReturn<typeof functions.allocateFromUsage>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type ApproveUsageParams = FunctionArguments<typeof functions.approveUsage>
export type ApproveUsageReturn = FunctionReturn<typeof functions.approveUsage>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type CancelRedeemParams = FunctionArguments<typeof functions.cancelRedeem>
export type CancelRedeemReturn = FunctionReturn<typeof functions.cancelRedeem>

export type ConvertParams = FunctionArguments<typeof functions.convert>
export type ConvertReturn = FunctionReturn<typeof functions.convert>

export type ConvertToParams = FunctionArguments<typeof functions.convertTo>
export type ConvertToReturn = FunctionReturn<typeof functions.convertTo>

export type DeallocateParams = FunctionArguments<typeof functions.deallocate>
export type DeallocateReturn = FunctionReturn<typeof functions.deallocate>

export type DeallocateFromUsageParams = FunctionArguments<typeof functions.deallocateFromUsage>
export type DeallocateFromUsageReturn = FunctionReturn<typeof functions.deallocateFromUsage>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DecreaseAllowanceParams = FunctionArguments<typeof functions.decreaseAllowance>
export type DecreaseAllowanceReturn = FunctionReturn<typeof functions.decreaseAllowance>

export type FinalizeRedeemParams = FunctionArguments<typeof functions.finalizeRedeem>
export type FinalizeRedeemReturn = FunctionReturn<typeof functions.finalizeRedeem>

export type GetKodiakByVestingDurationParams = FunctionArguments<typeof functions.getKodiakByVestingDuration>
export type GetKodiakByVestingDurationReturn = FunctionReturn<typeof functions.getKodiakByVestingDuration>

export type GetUsageAllocationParams = FunctionArguments<typeof functions.getUsageAllocation>
export type GetUsageAllocationReturn = FunctionReturn<typeof functions.getUsageAllocation>

export type GetUsageApprovalParams = FunctionArguments<typeof functions.getUsageApproval>
export type GetUsageApprovalReturn = FunctionReturn<typeof functions.getUsageApproval>

export type GetUserRedeemParams = FunctionArguments<typeof functions.getUserRedeem>
export type GetUserRedeemReturn = FunctionReturn<typeof functions.getUserRedeem>

export type GetUserRedeemsLengthParams = FunctionArguments<typeof functions.getUserRedeemsLength>
export type GetUserRedeemsLengthReturn = FunctionReturn<typeof functions.getUserRedeemsLength>

export type GetXKodiakBalanceParams = FunctionArguments<typeof functions.getXKodiakBalance>
export type GetXKodiakBalanceReturn = FunctionReturn<typeof functions.getXKodiakBalance>

export type IncreaseAllowanceParams = FunctionArguments<typeof functions.increaseAllowance>
export type IncreaseAllowanceReturn = FunctionReturn<typeof functions.increaseAllowance>

export type IsTransferWhitelistedParams = FunctionArguments<typeof functions.isTransferWhitelisted>
export type IsTransferWhitelistedReturn = FunctionReturn<typeof functions.isTransferWhitelisted>

export type KdkTokenParams = FunctionArguments<typeof functions.kdkToken>
export type KdkTokenReturn = FunctionReturn<typeof functions.kdkToken>

export type MaxRedeemDurationParams = FunctionArguments<typeof functions.maxRedeemDuration>
export type MaxRedeemDurationReturn = FunctionReturn<typeof functions.maxRedeemDuration>

export type MaxRedeemRatioParams = FunctionArguments<typeof functions.maxRedeemRatio>
export type MaxRedeemRatioReturn = FunctionReturn<typeof functions.maxRedeemRatio>

export type MinRedeemDurationParams = FunctionArguments<typeof functions.minRedeemDuration>
export type MinRedeemDurationReturn = FunctionReturn<typeof functions.minRedeemDuration>

export type MinRedeemRatioParams = FunctionArguments<typeof functions.minRedeemRatio>
export type MinRedeemRatioReturn = FunctionReturn<typeof functions.minRedeemRatio>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RedeemRewardsAdjustmentParams = FunctionArguments<typeof functions.redeemRewardsAdjustment>
export type RedeemRewardsAdjustmentReturn = FunctionReturn<typeof functions.redeemRewardsAdjustment>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RewardsAddressParams = FunctionArguments<typeof functions.rewardsAddress>
export type RewardsAddressReturn = FunctionReturn<typeof functions.rewardsAddress>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TransferWhitelistParams = FunctionArguments<typeof functions.transferWhitelist>
export type TransferWhitelistReturn = FunctionReturn<typeof functions.transferWhitelist>

export type TransferWhitelistLengthParams = FunctionArguments<typeof functions.transferWhitelistLength>
export type TransferWhitelistLengthReturn = FunctionReturn<typeof functions.transferWhitelistLength>

export type UpdateDeallocationFeeParams = FunctionArguments<typeof functions.updateDeallocationFee>
export type UpdateDeallocationFeeReturn = FunctionReturn<typeof functions.updateDeallocationFee>

export type UpdateRedeemRewardsAddressParams = FunctionArguments<typeof functions.updateRedeemRewardsAddress>
export type UpdateRedeemRewardsAddressReturn = FunctionReturn<typeof functions.updateRedeemRewardsAddress>

export type UpdateRedeemSettingsParams = FunctionArguments<typeof functions.updateRedeemSettings>
export type UpdateRedeemSettingsReturn = FunctionReturn<typeof functions.updateRedeemSettings>

export type UpdateRewardsAddressParams = FunctionArguments<typeof functions.updateRewardsAddress>
export type UpdateRewardsAddressReturn = FunctionReturn<typeof functions.updateRewardsAddress>

export type UpdateTransferWhitelistParams = FunctionArguments<typeof functions.updateTransferWhitelist>
export type UpdateTransferWhitelistReturn = FunctionReturn<typeof functions.updateTransferWhitelist>

export type UsageAllocationsParams = FunctionArguments<typeof functions.usageAllocations>
export type UsageAllocationsReturn = FunctionReturn<typeof functions.usageAllocations>

export type UsageApprovalsParams = FunctionArguments<typeof functions.usageApprovals>
export type UsageApprovalsReturn = FunctionReturn<typeof functions.usageApprovals>

export type UsagesDeallocationFeeParams = FunctionArguments<typeof functions.usagesDeallocationFee>
export type UsagesDeallocationFeeReturn = FunctionReturn<typeof functions.usagesDeallocationFee>

export type UserRedeemsParams = FunctionArguments<typeof functions.userRedeems>
export type UserRedeemsReturn = FunctionReturn<typeof functions.userRedeems>

export type XKodiakBalancesParams = FunctionArguments<typeof functions.xKodiakBalances>
export type XKodiakBalancesReturn = FunctionReturn<typeof functions.xKodiakBalances>

