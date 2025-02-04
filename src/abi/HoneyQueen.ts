import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", "Upgraded(address)", {"implementation": indexed(p.address)}),
}

export const functions = {
    BGT: viewFun("0x905d9075", "BGT()", {}, p.address),
    UPGRADE_INTERFACE_VERSION: viewFun("0xad3cb1cc", "UPGRADE_INTERFACE_VERSION()", {}, p.string),
    adapterBeaconOfProtocol: viewFun("0x2ef5aafb", "adapterBeaconOfProtocol(string)", {"protocol": p.string}, p.address),
    beekeeper: viewFun("0xc5bb4c90", "beekeeper()", {}, p.address),
    computeFees: viewFun("0xbd9124d6", "computeFees(uint256)", {"amount": p.uint256}, p.uint256),
    getAdapterParams: viewFun("0x7cfc7653", "getAdapterParams(address)", {"vault": p.address}, {"_0": p.address, "_1": p.address}),
    getImplementation: viewFun("0xaaf10f42", "getImplementation()", {}, p.address),
    initialize: fun("0x485cc955", "initialize(address,address)", {"_owner": p.address, "_BGT": p.address}, ),
    isRewardToken: viewFun("0xb5fd73f8", "isRewardToken(address)", {"token": p.address}, p.bool),
    isTokenBlocked: viewFun("0xcc47abf6", "isTokenBlocked(address)", {"token": p.address}, p.bool),
    isVaultValidForAdapterBeacon: viewFun("0x1975ee0f", "isVaultValidForAdapterBeacon(address,address)", {"adapterBeacon": p.address, "vault": p.address}, p.bool),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    protocolFees: viewFun("0x1ad8b03b", "protocolFees()", {}, p.uint256),
    protocolOfAdapterBeacon: viewFun("0x0d25e570", "protocolOfAdapterBeacon(address)", {"adapterBeacon": p.address}, p.string),
    protocolOfVault: viewFun("0x56403d69", "protocolOfVault(address)", {"vault": p.address}, p.string),
    proxiableUUID: viewFun("0x52d1902d", "proxiableUUID()", {}, p.bytes32),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setAdapterBeaconForProtocol: fun("0xd28fbc3a", "setAdapterBeaconForProtocol(string,address)", {"protocol": p.string, "adapterBeacon": p.address}, ),
    setBeekeeper: fun("0x41e21a1d", "setBeekeeper(address)", {"_beekeeper": p.address}, ),
    setIsRewardToken: fun("0xe69af9a3", "setIsRewardToken(address,bool)", {"token": p.address, "_isRewardToken": p.bool}, ),
    setProtocolFees: fun("0xf69b340b", "setProtocolFees(uint256)", {"_protocolFees": p.uint256}, ),
    setTokenBlocked: fun("0xd71255eb", "setTokenBlocked(address,bool)", {"token": p.address, "blocked": p.bool}, ),
    setVaultForProtocol: fun("0xbf1efc29", "setVaultForProtocol(string,address,address,bool)", {"protocol": p.string, "vault": p.address, "token": p.address, "approved": p.bool}, ),
    tokenOfVault: viewFun("0x2c5b8d17", "tokenOfVault(address)", {"vault": p.address}, p.address),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    upgradeToAndCall: fun("0x4f1ef286", "upgradeToAndCall(address,bytes)", {"newImplementation": p.address, "data": p.bytes}, ),
    version: viewFun("0x54fd4d50", "version()", {}, p.string),
}

export class Contract extends ContractBase {

    BGT() {
        return this.eth_call(functions.BGT, {})
    }

    UPGRADE_INTERFACE_VERSION() {
        return this.eth_call(functions.UPGRADE_INTERFACE_VERSION, {})
    }

    adapterBeaconOfProtocol(protocol: AdapterBeaconOfProtocolParams["protocol"]) {
        return this.eth_call(functions.adapterBeaconOfProtocol, {protocol})
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

    getImplementation() {
        return this.eth_call(functions.getImplementation, {})
    }

    isRewardToken(token: IsRewardTokenParams["token"]) {
        return this.eth_call(functions.isRewardToken, {token})
    }

    isTokenBlocked(token: IsTokenBlockedParams["token"]) {
        return this.eth_call(functions.isTokenBlocked, {token})
    }

    isVaultValidForAdapterBeacon(adapterBeacon: IsVaultValidForAdapterBeaconParams["adapterBeacon"], vault: IsVaultValidForAdapterBeaconParams["vault"]) {
        return this.eth_call(functions.isVaultValidForAdapterBeacon, {adapterBeacon, vault})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    protocolFees() {
        return this.eth_call(functions.protocolFees, {})
    }

    protocolOfAdapterBeacon(adapterBeacon: ProtocolOfAdapterBeaconParams["adapterBeacon"]) {
        return this.eth_call(functions.protocolOfAdapterBeacon, {adapterBeacon})
    }

    protocolOfVault(vault: ProtocolOfVaultParams["vault"]) {
        return this.eth_call(functions.protocolOfVault, {vault})
    }

    proxiableUUID() {
        return this.eth_call(functions.proxiableUUID, {})
    }

    tokenOfVault(vault: TokenOfVaultParams["vault"]) {
        return this.eth_call(functions.tokenOfVault, {vault})
    }

    version() {
        return this.eth_call(functions.version, {})
    }
}

/// Event types
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>

/// Function types
export type BGTParams = FunctionArguments<typeof functions.BGT>
export type BGTReturn = FunctionReturn<typeof functions.BGT>

export type UPGRADE_INTERFACE_VERSIONParams = FunctionArguments<typeof functions.UPGRADE_INTERFACE_VERSION>
export type UPGRADE_INTERFACE_VERSIONReturn = FunctionReturn<typeof functions.UPGRADE_INTERFACE_VERSION>

export type AdapterBeaconOfProtocolParams = FunctionArguments<typeof functions.adapterBeaconOfProtocol>
export type AdapterBeaconOfProtocolReturn = FunctionReturn<typeof functions.adapterBeaconOfProtocol>

export type BeekeeperParams = FunctionArguments<typeof functions.beekeeper>
export type BeekeeperReturn = FunctionReturn<typeof functions.beekeeper>

export type ComputeFeesParams = FunctionArguments<typeof functions.computeFees>
export type ComputeFeesReturn = FunctionReturn<typeof functions.computeFees>

export type GetAdapterParamsParams = FunctionArguments<typeof functions.getAdapterParams>
export type GetAdapterParamsReturn = FunctionReturn<typeof functions.getAdapterParams>

export type GetImplementationParams = FunctionArguments<typeof functions.getImplementation>
export type GetImplementationReturn = FunctionReturn<typeof functions.getImplementation>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsRewardTokenParams = FunctionArguments<typeof functions.isRewardToken>
export type IsRewardTokenReturn = FunctionReturn<typeof functions.isRewardToken>

export type IsTokenBlockedParams = FunctionArguments<typeof functions.isTokenBlocked>
export type IsTokenBlockedReturn = FunctionReturn<typeof functions.isTokenBlocked>

export type IsVaultValidForAdapterBeaconParams = FunctionArguments<typeof functions.isVaultValidForAdapterBeacon>
export type IsVaultValidForAdapterBeaconReturn = FunctionReturn<typeof functions.isVaultValidForAdapterBeacon>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type ProtocolFeesParams = FunctionArguments<typeof functions.protocolFees>
export type ProtocolFeesReturn = FunctionReturn<typeof functions.protocolFees>

export type ProtocolOfAdapterBeaconParams = FunctionArguments<typeof functions.protocolOfAdapterBeacon>
export type ProtocolOfAdapterBeaconReturn = FunctionReturn<typeof functions.protocolOfAdapterBeacon>

export type ProtocolOfVaultParams = FunctionArguments<typeof functions.protocolOfVault>
export type ProtocolOfVaultReturn = FunctionReturn<typeof functions.protocolOfVault>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetAdapterBeaconForProtocolParams = FunctionArguments<typeof functions.setAdapterBeaconForProtocol>
export type SetAdapterBeaconForProtocolReturn = FunctionReturn<typeof functions.setAdapterBeaconForProtocol>

export type SetBeekeeperParams = FunctionArguments<typeof functions.setBeekeeper>
export type SetBeekeeperReturn = FunctionReturn<typeof functions.setBeekeeper>

export type SetIsRewardTokenParams = FunctionArguments<typeof functions.setIsRewardToken>
export type SetIsRewardTokenReturn = FunctionReturn<typeof functions.setIsRewardToken>

export type SetProtocolFeesParams = FunctionArguments<typeof functions.setProtocolFees>
export type SetProtocolFeesReturn = FunctionReturn<typeof functions.setProtocolFees>

export type SetTokenBlockedParams = FunctionArguments<typeof functions.setTokenBlocked>
export type SetTokenBlockedReturn = FunctionReturn<typeof functions.setTokenBlocked>

export type SetVaultForProtocolParams = FunctionArguments<typeof functions.setVaultForProtocol>
export type SetVaultForProtocolReturn = FunctionReturn<typeof functions.setVaultForProtocol>

export type TokenOfVaultParams = FunctionArguments<typeof functions.tokenOfVault>
export type TokenOfVaultReturn = FunctionReturn<typeof functions.tokenOfVault>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

export type VersionParams = FunctionArguments<typeof functions.version>
export type VersionReturn = FunctionReturn<typeof functions.version>

