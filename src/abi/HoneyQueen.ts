import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    HoneyQueen__AdapterApproved: event("0x84b1179108b0ec15b78da41642e8b999605f77e054c5d56af81100e181ecfcf8", "HoneyQueen__AdapterApproved(address,address,bool)", {"vault": indexed(p.address), "adapter": p.address, "approved": p.bool}),
    HoneyQueen__AdapterUpgraded: event("0x315bc9f2261351c50ad56e0b82609b120d966fdb64247849c800381c3db0d83b", "HoneyQueen__AdapterUpgraded(string,address,address)", {"protocol": indexed(p.string), "fromLogic": indexed(p.address), "toLogic": p.address}),
    HoneyQueen__LockerUpgraded: event("0x1c0e11299dfafa76a9d250b113bbf04885ae71eb14278a647d563e7392ccf345", "HoneyQueen__LockerUpgraded(address,address)", {"fromLogic": indexed(p.address), "toLogic": p.address}),
    HoneyQueen__VaultAdapterSet: event("0x174871e097c9a64299198736454f7bf44b9e2887a90602e761e10cdd8dbaee31", "HoneyQueen__VaultAdapterSet(address,address)", {"vault": indexed(p.address), "adapter": p.address}),
    OwnershipHandoverCanceled: event("0xfa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92", "OwnershipHandoverCanceled(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipHandoverRequested: event("0xdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d", "OwnershipHandoverRequested(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"oldOwner": indexed(p.address), "newOwner": indexed(p.address)}),
}

export const functions = {
    BGT: viewFun("0x905d9075", "BGT()", {}, p.address),
    adapterFactory: viewFun("0xd67cd5b4", "adapterFactory()", {}, p.address),
    adapterOfProtocol: viewFun("0xb1a3fdd1", "adapterOfProtocol(string)", {"protocol": p.string}, p.address),
    beekeeper: viewFun("0xc5bb4c90", "beekeeper()", {}, p.address),
    cancelOwnershipHandover: fun("0x54d1f13d", "cancelOwnershipHandover()", {}, ),
    completeOwnershipHandover: fun("0xf04e283e", "completeOwnershipHandover(address)", {"pendingOwner": p.address}, ),
    computeFees: viewFun("0xbd9124d6", "computeFees(uint256)", {"amount": p.uint256}, p.uint256),
    getAdapterParams: viewFun("0x7cfc7653", "getAdapterParams(address)", {"vault": p.address}, {"_0": p.address, "_1": p.address}),
    isRewardToken: viewFun("0xb5fd73f8", "isRewardToken(address)", {"token": p.address}, p.bool),
    isTokenBlocked: viewFun("0xcc47abf6", "isTokenBlocked(address)", {"token": p.address}, p.bool),
    isVaultValidForAdapter: viewFun("0x6f4d22c7", "isVaultValidForAdapter(address,address)", {"adapter": p.address, "vault": p.address}, p.bool),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownershipHandoverExpiresAt: viewFun("0xfee81cf4", "ownershipHandoverExpiresAt(address)", {"pendingOwner": p.address}, p.uint256),
    protocolFees: viewFun("0x1ad8b03b", "protocolFees()", {}, p.uint256),
    protocolOfAdapter: viewFun("0x94035b29", "protocolOfAdapter(address)", {"adapter": p.address}, p.string),
    protocolOfVault: viewFun("0x56403d69", "protocolOfVault(address)", {"vault": p.address}, p.string),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    requestOwnershipHandover: fun("0x25692962", "requestOwnershipHandover()", {}, ),
    setAdapterFactory: fun("0x60591329", "setAdapterFactory(address)", {"_adapterFactory": p.address}, ),
    setAdapterForProtocol: fun("0xec616f6c", "setAdapterForProtocol(string,address)", {"protocol": p.string, "adapter": p.address}, ),
    setBeekeeper: fun("0x41e21a1d", "setBeekeeper(address)", {"_beekeeper": p.address}, ),
    setIsRewardToken: fun("0xe69af9a3", "setIsRewardToken(address,bool)", {"token": p.address, "_isRewardToken": p.bool}, ),
    setProtocolFees: fun("0xf69b340b", "setProtocolFees(uint256)", {"_protocolFees": p.uint256}, ),
    setTokenBlocked: fun("0xd71255eb", "setTokenBlocked(address,bool)", {"token": p.address, "blocked": p.bool}, ),
    setUpgradeOfAdapter: fun("0xa599b0a8", "setUpgradeOfAdapter(address,address)", {"fromLogic": p.address, "toLogic": p.address}, ),
    setUpgradeOfLocker: fun("0xe8ce3f71", "setUpgradeOfLocker(address,address)", {"fromLogic": p.address, "toLogic": p.address}, ),
    setVaultForProtocol: fun("0xbf1efc29", "setVaultForProtocol(string,address,address,bool)", {"protocol": p.string, "vault": p.address, "token": p.address, "approved": p.bool}, ),
    tokenOfVault: viewFun("0x2c5b8d17", "tokenOfVault(address)", {"vault": p.address}, p.address),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    upgradeOfAdapter: viewFun("0xe0a7d123", "upgradeOfAdapter(address)", {"fromLogic": p.address}, p.address),
    upgradeOfLocker: viewFun("0x7c82dfd3", "upgradeOfLocker(address)", {"fromLogic": p.address}, p.address),
}

export class Contract extends ContractBase {

    BGT() {
        return this.eth_call(functions.BGT, {})
    }

    adapterFactory() {
        return this.eth_call(functions.adapterFactory, {})
    }

    adapterOfProtocol(protocol: AdapterOfProtocolParams["protocol"]) {
        return this.eth_call(functions.adapterOfProtocol, {protocol})
    }

    beekeeper() {
        return this.eth_call(functions.beekeeper, {})
    }

    computeFees(amount: ComputeFeesParams["amount"]) {
        return this.eth_call(functions.computeFees, {amount})
    }

    getAdapterParams(vault: GetAdapterParamsParams["vault"]) {
        return this.eth_call(functions.getAdapterParams, {vault})
    }

    isRewardToken(token: IsRewardTokenParams["token"]) {
        return this.eth_call(functions.isRewardToken, {token})
    }

    isTokenBlocked(token: IsTokenBlockedParams["token"]) {
        return this.eth_call(functions.isTokenBlocked, {token})
    }

    isVaultValidForAdapter(adapter: IsVaultValidForAdapterParams["adapter"], vault: IsVaultValidForAdapterParams["vault"]) {
        return this.eth_call(functions.isVaultValidForAdapter, {adapter, vault})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownershipHandoverExpiresAt(pendingOwner: OwnershipHandoverExpiresAtParams["pendingOwner"]) {
        return this.eth_call(functions.ownershipHandoverExpiresAt, {pendingOwner})
    }

    protocolFees() {
        return this.eth_call(functions.protocolFees, {})
    }

    protocolOfAdapter(adapter: ProtocolOfAdapterParams["adapter"]) {
        return this.eth_call(functions.protocolOfAdapter, {adapter})
    }

    protocolOfVault(vault: ProtocolOfVaultParams["vault"]) {
        return this.eth_call(functions.protocolOfVault, {vault})
    }

    tokenOfVault(vault: TokenOfVaultParams["vault"]) {
        return this.eth_call(functions.tokenOfVault, {vault})
    }

    upgradeOfAdapter(fromLogic: UpgradeOfAdapterParams["fromLogic"]) {
        return this.eth_call(functions.upgradeOfAdapter, {fromLogic})
    }

    upgradeOfLocker(fromLogic: UpgradeOfLockerParams["fromLogic"]) {
        return this.eth_call(functions.upgradeOfLocker, {fromLogic})
    }
}

/// Event types
export type HoneyQueen__AdapterApprovedEventArgs = EParams<typeof events.HoneyQueen__AdapterApproved>
export type HoneyQueen__AdapterUpgradedEventArgs = EParams<typeof events.HoneyQueen__AdapterUpgraded>
export type HoneyQueen__LockerUpgradedEventArgs = EParams<typeof events.HoneyQueen__LockerUpgraded>
export type HoneyQueen__VaultAdapterSetEventArgs = EParams<typeof events.HoneyQueen__VaultAdapterSet>
export type OwnershipHandoverCanceledEventArgs = EParams<typeof events.OwnershipHandoverCanceled>
export type OwnershipHandoverRequestedEventArgs = EParams<typeof events.OwnershipHandoverRequested>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>

/// Function types
export type BGTParams = FunctionArguments<typeof functions.BGT>
export type BGTReturn = FunctionReturn<typeof functions.BGT>

export type AdapterFactoryParams = FunctionArguments<typeof functions.adapterFactory>
export type AdapterFactoryReturn = FunctionReturn<typeof functions.adapterFactory>

export type AdapterOfProtocolParams = FunctionArguments<typeof functions.adapterOfProtocol>
export type AdapterOfProtocolReturn = FunctionReturn<typeof functions.adapterOfProtocol>

export type BeekeeperParams = FunctionArguments<typeof functions.beekeeper>
export type BeekeeperReturn = FunctionReturn<typeof functions.beekeeper>

export type CancelOwnershipHandoverParams = FunctionArguments<typeof functions.cancelOwnershipHandover>
export type CancelOwnershipHandoverReturn = FunctionReturn<typeof functions.cancelOwnershipHandover>

export type CompleteOwnershipHandoverParams = FunctionArguments<typeof functions.completeOwnershipHandover>
export type CompleteOwnershipHandoverReturn = FunctionReturn<typeof functions.completeOwnershipHandover>

export type ComputeFeesParams = FunctionArguments<typeof functions.computeFees>
export type ComputeFeesReturn = FunctionReturn<typeof functions.computeFees>

export type GetAdapterParamsParams = FunctionArguments<typeof functions.getAdapterParams>
export type GetAdapterParamsReturn = FunctionReturn<typeof functions.getAdapterParams>

export type IsRewardTokenParams = FunctionArguments<typeof functions.isRewardToken>
export type IsRewardTokenReturn = FunctionReturn<typeof functions.isRewardToken>

export type IsTokenBlockedParams = FunctionArguments<typeof functions.isTokenBlocked>
export type IsTokenBlockedReturn = FunctionReturn<typeof functions.isTokenBlocked>

export type IsVaultValidForAdapterParams = FunctionArguments<typeof functions.isVaultValidForAdapter>
export type IsVaultValidForAdapterReturn = FunctionReturn<typeof functions.isVaultValidForAdapter>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnershipHandoverExpiresAtParams = FunctionArguments<typeof functions.ownershipHandoverExpiresAt>
export type OwnershipHandoverExpiresAtReturn = FunctionReturn<typeof functions.ownershipHandoverExpiresAt>

export type ProtocolFeesParams = FunctionArguments<typeof functions.protocolFees>
export type ProtocolFeesReturn = FunctionReturn<typeof functions.protocolFees>

export type ProtocolOfAdapterParams = FunctionArguments<typeof functions.protocolOfAdapter>
export type ProtocolOfAdapterReturn = FunctionReturn<typeof functions.protocolOfAdapter>

export type ProtocolOfVaultParams = FunctionArguments<typeof functions.protocolOfVault>
export type ProtocolOfVaultReturn = FunctionReturn<typeof functions.protocolOfVault>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RequestOwnershipHandoverParams = FunctionArguments<typeof functions.requestOwnershipHandover>
export type RequestOwnershipHandoverReturn = FunctionReturn<typeof functions.requestOwnershipHandover>

export type SetAdapterFactoryParams = FunctionArguments<typeof functions.setAdapterFactory>
export type SetAdapterFactoryReturn = FunctionReturn<typeof functions.setAdapterFactory>

export type SetAdapterForProtocolParams = FunctionArguments<typeof functions.setAdapterForProtocol>
export type SetAdapterForProtocolReturn = FunctionReturn<typeof functions.setAdapterForProtocol>

export type SetBeekeeperParams = FunctionArguments<typeof functions.setBeekeeper>
export type SetBeekeeperReturn = FunctionReturn<typeof functions.setBeekeeper>

export type SetIsRewardTokenParams = FunctionArguments<typeof functions.setIsRewardToken>
export type SetIsRewardTokenReturn = FunctionReturn<typeof functions.setIsRewardToken>

export type SetProtocolFeesParams = FunctionArguments<typeof functions.setProtocolFees>
export type SetProtocolFeesReturn = FunctionReturn<typeof functions.setProtocolFees>

export type SetTokenBlockedParams = FunctionArguments<typeof functions.setTokenBlocked>
export type SetTokenBlockedReturn = FunctionReturn<typeof functions.setTokenBlocked>

export type SetUpgradeOfAdapterParams = FunctionArguments<typeof functions.setUpgradeOfAdapter>
export type SetUpgradeOfAdapterReturn = FunctionReturn<typeof functions.setUpgradeOfAdapter>

export type SetUpgradeOfLockerParams = FunctionArguments<typeof functions.setUpgradeOfLocker>
export type SetUpgradeOfLockerReturn = FunctionReturn<typeof functions.setUpgradeOfLocker>

export type SetVaultForProtocolParams = FunctionArguments<typeof functions.setVaultForProtocol>
export type SetVaultForProtocolReturn = FunctionReturn<typeof functions.setVaultForProtocol>

export type TokenOfVaultParams = FunctionArguments<typeof functions.tokenOfVault>
export type TokenOfVaultReturn = FunctionReturn<typeof functions.tokenOfVault>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradeOfAdapterParams = FunctionArguments<typeof functions.upgradeOfAdapter>
export type UpgradeOfAdapterReturn = FunctionReturn<typeof functions.upgradeOfAdapter>

export type UpgradeOfLockerParams = FunctionArguments<typeof functions.upgradeOfLocker>
export type UpgradeOfLockerReturn = FunctionReturn<typeof functions.upgradeOfLocker>

