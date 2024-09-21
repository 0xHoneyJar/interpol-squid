import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousManager": indexed(p.address), "newManager": indexed(p.address)}),
    PoolCreated: event("0x9c5d829b9b23efc461f9aeef91979ec04bb903feb3bee4f26d22114abfc7335b", "PoolCreated(address,address,address)", {"uniPool": indexed(p.address), "manager": indexed(p.address), "pool": indexed(p.address)}),
    UpdatePoolImplementation: event("0x0617fd31aa5ab95ec80eefc1eb61a2c477aa419d1d761b4e46f5f077e47852aa", "UpdatePoolImplementation(address,address)", {"previousImplementation": p.address, "newImplementation": p.address}),
}

export const functions = {
    deployVault: fun("0xfef46b28", "deployVault(address,address,uint24,address,uint16,int24,int24)", {"tokenA": p.address, "tokenB": p.address, "uniFee": p.uint24, "manager": p.address, "managerFee": p.uint16, "lowerTick": p.int24, "upperTick": p.int24}, p.address),
    factory: viewFun("0xc45a0155", "factory()", {}, p.address),
    gelatoDeployer: viewFun("0x86238765", "gelatoDeployer()", {}, p.address),
    getDeployers: viewFun("0x607c12b5", "getDeployers()", {}, p.array(p.address)),
    getGelatoPools: viewFun("0x562b8103", "getGelatoPools()", {}, p.array(p.address)),
    getPools: viewFun("0x5c39f467", "getPools(address)", {"deployer": p.address}, p.array(p.address)),
    getProxyAdmin: viewFun("0xf3b7dead", "getProxyAdmin(address)", {"pool": p.address}, p.address),
    getTokenName: viewFun("0xbd30dfb9", "getTokenName(address,address)", {"token0": p.address, "token1": p.address}, p.string),
    index: viewFun("0x2986c0e5", "index()", {}, p.uint256),
    initialize: fun("0x485cc955", "initialize(address,address)", {"_implementation": p.address, "_manager_": p.address}, ),
    isPoolImmutable: viewFun("0x95d807f1", "isPoolImmutable(address)", {"pool": p.address}, p.bool),
    makePoolsImmutable: fun("0x260fc2b8", "makePoolsImmutable(address[])", {"pools": p.array(p.address)}, ),
    manager: viewFun("0x481c6a75", "manager()", {}, p.address),
    numDeployers: viewFun("0x098eddb1", "numDeployers()", {}, p.uint256),
    'numPools()': viewFun("0x35c62bc2", "numPools()", {}, p.uint256),
    'numPools(address)': viewFun("0x42f5de99", "numPools(address)", {"deployer": p.address}, p.uint256),
    poolImplementation: viewFun("0xcefa7799", "poolImplementation()", {}, p.address),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setPoolImplementation: fun("0xd6f74898", "setPoolImplementation(address)", {"nextImplementation": p.address}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    upgradePools: fun("0x40aee041", "upgradePools(address[])", {"pools": p.array(p.address)}, ),
    upgradePoolsAndCall: fun("0x0dfc574b", "upgradePoolsAndCall(address[],bytes[])", {"pools": p.array(p.address), "datas": p.array(p.bytes)}, ),
    version: viewFun("0x54fd4d50", "version()", {}, p.string),
}

export class Contract extends ContractBase {

    factory() {
        return this.eth_call(functions.factory, {})
    }

    gelatoDeployer() {
        return this.eth_call(functions.gelatoDeployer, {})
    }

    getDeployers() {
        return this.eth_call(functions.getDeployers, {})
    }

    getGelatoPools() {
        return this.eth_call(functions.getGelatoPools, {})
    }

    getPools(deployer: GetPoolsParams["deployer"]) {
        return this.eth_call(functions.getPools, {deployer})
    }

    getProxyAdmin(pool: GetProxyAdminParams["pool"]) {
        return this.eth_call(functions.getProxyAdmin, {pool})
    }

    getTokenName(token0: GetTokenNameParams["token0"], token1: GetTokenNameParams["token1"]) {
        return this.eth_call(functions.getTokenName, {token0, token1})
    }

    index() {
        return this.eth_call(functions.index, {})
    }

    isPoolImmutable(pool: IsPoolImmutableParams["pool"]) {
        return this.eth_call(functions.isPoolImmutable, {pool})
    }

    manager() {
        return this.eth_call(functions.manager, {})
    }

    numDeployers() {
        return this.eth_call(functions.numDeployers, {})
    }

    'numPools()'() {
        return this.eth_call(functions['numPools()'], {})
    }

    'numPools(address)'(deployer: NumPoolsParams_1["deployer"]) {
        return this.eth_call(functions['numPools(address)'], {deployer})
    }

    poolImplementation() {
        return this.eth_call(functions.poolImplementation, {})
    }

    version() {
        return this.eth_call(functions.version, {})
    }
}

/// Event types
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PoolCreatedEventArgs = EParams<typeof events.PoolCreated>
export type UpdatePoolImplementationEventArgs = EParams<typeof events.UpdatePoolImplementation>

/// Function types
export type DeployVaultParams = FunctionArguments<typeof functions.deployVault>
export type DeployVaultReturn = FunctionReturn<typeof functions.deployVault>

export type FactoryParams = FunctionArguments<typeof functions.factory>
export type FactoryReturn = FunctionReturn<typeof functions.factory>

export type GelatoDeployerParams = FunctionArguments<typeof functions.gelatoDeployer>
export type GelatoDeployerReturn = FunctionReturn<typeof functions.gelatoDeployer>

export type GetDeployersParams = FunctionArguments<typeof functions.getDeployers>
export type GetDeployersReturn = FunctionReturn<typeof functions.getDeployers>

export type GetGelatoPoolsParams = FunctionArguments<typeof functions.getGelatoPools>
export type GetGelatoPoolsReturn = FunctionReturn<typeof functions.getGelatoPools>

export type GetPoolsParams = FunctionArguments<typeof functions.getPools>
export type GetPoolsReturn = FunctionReturn<typeof functions.getPools>

export type GetProxyAdminParams = FunctionArguments<typeof functions.getProxyAdmin>
export type GetProxyAdminReturn = FunctionReturn<typeof functions.getProxyAdmin>

export type GetTokenNameParams = FunctionArguments<typeof functions.getTokenName>
export type GetTokenNameReturn = FunctionReturn<typeof functions.getTokenName>

export type IndexParams = FunctionArguments<typeof functions.index>
export type IndexReturn = FunctionReturn<typeof functions.index>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsPoolImmutableParams = FunctionArguments<typeof functions.isPoolImmutable>
export type IsPoolImmutableReturn = FunctionReturn<typeof functions.isPoolImmutable>

export type MakePoolsImmutableParams = FunctionArguments<typeof functions.makePoolsImmutable>
export type MakePoolsImmutableReturn = FunctionReturn<typeof functions.makePoolsImmutable>

export type ManagerParams = FunctionArguments<typeof functions.manager>
export type ManagerReturn = FunctionReturn<typeof functions.manager>

export type NumDeployersParams = FunctionArguments<typeof functions.numDeployers>
export type NumDeployersReturn = FunctionReturn<typeof functions.numDeployers>

export type NumPoolsParams_0 = FunctionArguments<typeof functions['numPools()']>
export type NumPoolsReturn_0 = FunctionReturn<typeof functions['numPools()']>

export type NumPoolsParams_1 = FunctionArguments<typeof functions['numPools(address)']>
export type NumPoolsReturn_1 = FunctionReturn<typeof functions['numPools(address)']>

export type PoolImplementationParams = FunctionArguments<typeof functions.poolImplementation>
export type PoolImplementationReturn = FunctionReturn<typeof functions.poolImplementation>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetPoolImplementationParams = FunctionArguments<typeof functions.setPoolImplementation>
export type SetPoolImplementationReturn = FunctionReturn<typeof functions.setPoolImplementation>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradePoolsParams = FunctionArguments<typeof functions.upgradePools>
export type UpgradePoolsReturn = FunctionReturn<typeof functions.upgradePools>

export type UpgradePoolsAndCallParams = FunctionArguments<typeof functions.upgradePoolsAndCall>
export type UpgradePoolsAndCallReturn = FunctionReturn<typeof functions.upgradePoolsAndCall>

export type VersionParams = FunctionArguments<typeof functions.version>
export type VersionReturn = FunctionReturn<typeof functions.version>

