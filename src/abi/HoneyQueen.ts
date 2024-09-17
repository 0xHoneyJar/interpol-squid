import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AutomatonSet: event("0x1871e14a02589324339b3982be238d632b64413eca8a9ce4e07ff4768a8008c6", "AutomatonSet(address,address)", {"oldAutomaton": p.address, "newAutomaton": p.address}),
    FeesSet: event("0x93525d3c7f4fafe56faedbca6d501a13c63f47857d8b30d8282ec2dd806259a7", "FeesSet(uint256,uint256)", {"oldFees": p.uint256, "newFees": p.uint256}),
    MigrationFlagSet: event("0xcebd62c3615cf304c44e71154ec1cea7c0e03871a94cb1971796cd28f0d8b550", "MigrationFlagSet(bytes32,bytes32,bool)", {"fromCodeHash": p.bytes32, "toCodeHash": p.bytes32, "isEnabled": p.bool}),
    OwnershipHandoverCanceled: event("0xfa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92", "OwnershipHandoverCanceled(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipHandoverRequested: event("0xdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d", "OwnershipHandoverRequested(address)", {"pendingOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"oldOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    ProtocolOfTargetSet: event("0x8637326d714cef4d337edfdab0a231d2d7014ea53bf37300a126b4aa38420da6", "ProtocolOfTargetSet(address,string)", {"targetContract": p.address, "protocol": p.string}),
    RewardTokenSet: event("0xc3c9a236de60cbc8c1b10b6d54acff3f7503f6289221ec1795750a5f567a7d3f", "RewardTokenSet(address,bool)", {"token": indexed(p.address), "isRewardToken": p.bool}),
    SelectorAllowedForProtocol: event("0x93c8cba3ad0ff34489fabcb74b05f2f6aad7c694641cbc9a2d20579602b22943", "SelectorAllowedForProtocol(bytes4,string,string,bool)", {"selector": p.bytes4, "action": p.string, "protocol": p.string, "allowed": p.bool}),
    TokenBlocked: event("0x2527b1540af53a1fec39357a4e902487f7e5fe0b6e9c6457520c16aee93c1801", "TokenBlocked(address,bool)", {"token": p.address, "blocked": p.bool}),
    TreasurySet: event("0x21eb548722a564f6e09f039f7aa858ae94c911910f3823b37af2250eeca4f403", "TreasurySet(address,address)", {"oldTreasury": p.address, "newTreasury": p.address}),
    ValidatorSet: event("0xae4e8ea4dbc2ca24cbdb325a1b328d6a2401757cb7e2be71fbc628f262771cd5", "ValidatorSet(address,address)", {"oldValidator": p.address, "newValidator": p.address}),
}

export const functions = {
    BGT: viewFun("0x905d9075", "BGT()", {}, p.address),
    automaton: viewFun("0x8063af4d", "automaton()", {}, p.address),
    beekeeper: viewFun("0xc5bb4c90", "beekeeper()", {}, p.address),
    cancelOwnershipHandover: fun("0x54d1f13d", "cancelOwnershipHandover()", {}, ),
    completeOwnershipHandover: fun("0xf04e283e", "completeOwnershipHandover(address)", {"pendingOwner": p.address}, ),
    computeFees: viewFun("0xbd9124d6", "computeFees(uint256)", {"amount": p.uint256}, p.uint256),
    fees: viewFun("0x9af1d35a", "fees()", {}, p.uint256),
    isMigrationEnabled: viewFun("0x5fa099f1", "isMigrationEnabled(bytes32,bytes32)", {"fromCodeHash": p.bytes32, "toCodeHash": p.bytes32}, p.bool),
    isRewardToken: viewFun("0xb5fd73f8", "isRewardToken(address)", {"token": p.address}, p.bool),
    isSelectorAllowedForProtocol: viewFun("0x21ea3542", "isSelectorAllowedForProtocol(bytes4,string,string)", {"selector": p.bytes4, "action": p.string, "protocol": p.string}, p.bool),
    isSelectorAllowedForTarget: viewFun("0xb8e0fef4", "isSelectorAllowedForTarget(bytes4,string,address)", {"_selector": p.bytes4, "_action": p.string, "_target": p.address}, p.bool),
    isTargetContractAllowed: viewFun("0x097d92e3", "isTargetContractAllowed(address)", {"_target": p.address}, p.bool),
    isTokenBlocked: viewFun("0xcc47abf6", "isTokenBlocked(address)", {"token": p.address}, p.bool),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownershipHandoverExpiresAt: viewFun("0xfee81cf4", "ownershipHandoverExpiresAt(address)", {"pendingOwner": p.address}, p.uint256),
    protocolOfTarget: viewFun("0xe3f81b51", "protocolOfTarget(address)", {"targetContract": p.address}, p.string),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    requestOwnershipHandover: fun("0x25692962", "requestOwnershipHandover()", {}, ),
    setAutomaton: fun("0xbdecfd35", "setAutomaton(address)", {"_automaton": p.address}, ),
    setFees: fun("0x3d18678e", "setFees(uint256)", {"_fees": p.uint256}, ),
    setIsRewardToken: fun("0xe69af9a3", "setIsRewardToken(address,bool)", {"_token": p.address, "_isRewardToken": p.bool}, ),
    setIsSelectorAllowedForProtocol: fun("0x9389821e", "setIsSelectorAllowedForProtocol(bytes4,string,string,bool)", {"_selector": p.bytes4, "_action": p.string, "_protocol": p.string, "_isAllowed": p.bool}, ),
    setIsTokenBlocked: fun("0x766e476b", "setIsTokenBlocked(address,bool)", {"_token": p.address, "_isBlocked": p.bool}, ),
    setMigrationFlag: fun("0x853f4114", "setMigrationFlag(bool,bytes32,bytes32)", {"_isMigrationEnabled": p.bool, "_fromCodeHash": p.bytes32, "_toCodeHash": p.bytes32}, ),
    setProtocolOfTarget: fun("0xb2e02c8a", "setProtocolOfTarget(address,string)", {"_targetContract": p.address, "_protocol": p.string}, ),
    setTreasury: fun("0xf0f44260", "setTreasury(address)", {"_treasury": p.address}, ),
    setValidator: fun("0x1327d3d8", "setValidator(address)", {"_validator": p.address}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    treasury: viewFun("0x61d027b3", "treasury()", {}, p.address),
    validator: viewFun("0x3a5381b5", "validator()", {}, p.address),
}

export class Contract extends ContractBase {

    BGT() {
        return this.eth_call(functions.BGT, {})
    }

    automaton() {
        return this.eth_call(functions.automaton, {})
    }

    beekeeper() {
        return this.eth_call(functions.beekeeper, {})
    }

    computeFees(amount: ComputeFeesParams["amount"]) {
        return this.eth_call(functions.computeFees, {amount})
    }

    fees() {
        return this.eth_call(functions.fees, {})
    }

    isMigrationEnabled(fromCodeHash: IsMigrationEnabledParams["fromCodeHash"], toCodeHash: IsMigrationEnabledParams["toCodeHash"]) {
        return this.eth_call(functions.isMigrationEnabled, {fromCodeHash, toCodeHash})
    }

    isRewardToken(token: IsRewardTokenParams["token"]) {
        return this.eth_call(functions.isRewardToken, {token})
    }

    isSelectorAllowedForProtocol(selector: IsSelectorAllowedForProtocolParams["selector"], action: IsSelectorAllowedForProtocolParams["action"], protocol: IsSelectorAllowedForProtocolParams["protocol"]) {
        return this.eth_call(functions.isSelectorAllowedForProtocol, {selector, action, protocol})
    }

    isSelectorAllowedForTarget(_selector: IsSelectorAllowedForTargetParams["_selector"], _action: IsSelectorAllowedForTargetParams["_action"], _target: IsSelectorAllowedForTargetParams["_target"]) {
        return this.eth_call(functions.isSelectorAllowedForTarget, {_selector, _action, _target})
    }

    isTargetContractAllowed(_target: IsTargetContractAllowedParams["_target"]) {
        return this.eth_call(functions.isTargetContractAllowed, {_target})
    }

    isTokenBlocked(token: IsTokenBlockedParams["token"]) {
        return this.eth_call(functions.isTokenBlocked, {token})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownershipHandoverExpiresAt(pendingOwner: OwnershipHandoverExpiresAtParams["pendingOwner"]) {
        return this.eth_call(functions.ownershipHandoverExpiresAt, {pendingOwner})
    }

    protocolOfTarget(targetContract: ProtocolOfTargetParams["targetContract"]) {
        return this.eth_call(functions.protocolOfTarget, {targetContract})
    }

    treasury() {
        return this.eth_call(functions.treasury, {})
    }

    validator() {
        return this.eth_call(functions.validator, {})
    }
}

/// Event types
export type AutomatonSetEventArgs = EParams<typeof events.AutomatonSet>
export type FeesSetEventArgs = EParams<typeof events.FeesSet>
export type MigrationFlagSetEventArgs = EParams<typeof events.MigrationFlagSet>
export type OwnershipHandoverCanceledEventArgs = EParams<typeof events.OwnershipHandoverCanceled>
export type OwnershipHandoverRequestedEventArgs = EParams<typeof events.OwnershipHandoverRequested>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type ProtocolOfTargetSetEventArgs = EParams<typeof events.ProtocolOfTargetSet>
export type RewardTokenSetEventArgs = EParams<typeof events.RewardTokenSet>
export type SelectorAllowedForProtocolEventArgs = EParams<typeof events.SelectorAllowedForProtocol>
export type TokenBlockedEventArgs = EParams<typeof events.TokenBlocked>
export type TreasurySetEventArgs = EParams<typeof events.TreasurySet>
export type ValidatorSetEventArgs = EParams<typeof events.ValidatorSet>

/// Function types
export type BGTParams = FunctionArguments<typeof functions.BGT>
export type BGTReturn = FunctionReturn<typeof functions.BGT>

export type AutomatonParams = FunctionArguments<typeof functions.automaton>
export type AutomatonReturn = FunctionReturn<typeof functions.automaton>

export type BeekeeperParams = FunctionArguments<typeof functions.beekeeper>
export type BeekeeperReturn = FunctionReturn<typeof functions.beekeeper>

export type CancelOwnershipHandoverParams = FunctionArguments<typeof functions.cancelOwnershipHandover>
export type CancelOwnershipHandoverReturn = FunctionReturn<typeof functions.cancelOwnershipHandover>

export type CompleteOwnershipHandoverParams = FunctionArguments<typeof functions.completeOwnershipHandover>
export type CompleteOwnershipHandoverReturn = FunctionReturn<typeof functions.completeOwnershipHandover>

export type ComputeFeesParams = FunctionArguments<typeof functions.computeFees>
export type ComputeFeesReturn = FunctionReturn<typeof functions.computeFees>

export type FeesParams = FunctionArguments<typeof functions.fees>
export type FeesReturn = FunctionReturn<typeof functions.fees>

export type IsMigrationEnabledParams = FunctionArguments<typeof functions.isMigrationEnabled>
export type IsMigrationEnabledReturn = FunctionReturn<typeof functions.isMigrationEnabled>

export type IsRewardTokenParams = FunctionArguments<typeof functions.isRewardToken>
export type IsRewardTokenReturn = FunctionReturn<typeof functions.isRewardToken>

export type IsSelectorAllowedForProtocolParams = FunctionArguments<typeof functions.isSelectorAllowedForProtocol>
export type IsSelectorAllowedForProtocolReturn = FunctionReturn<typeof functions.isSelectorAllowedForProtocol>

export type IsSelectorAllowedForTargetParams = FunctionArguments<typeof functions.isSelectorAllowedForTarget>
export type IsSelectorAllowedForTargetReturn = FunctionReturn<typeof functions.isSelectorAllowedForTarget>

export type IsTargetContractAllowedParams = FunctionArguments<typeof functions.isTargetContractAllowed>
export type IsTargetContractAllowedReturn = FunctionReturn<typeof functions.isTargetContractAllowed>

export type IsTokenBlockedParams = FunctionArguments<typeof functions.isTokenBlocked>
export type IsTokenBlockedReturn = FunctionReturn<typeof functions.isTokenBlocked>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnershipHandoverExpiresAtParams = FunctionArguments<typeof functions.ownershipHandoverExpiresAt>
export type OwnershipHandoverExpiresAtReturn = FunctionReturn<typeof functions.ownershipHandoverExpiresAt>

export type ProtocolOfTargetParams = FunctionArguments<typeof functions.protocolOfTarget>
export type ProtocolOfTargetReturn = FunctionReturn<typeof functions.protocolOfTarget>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RequestOwnershipHandoverParams = FunctionArguments<typeof functions.requestOwnershipHandover>
export type RequestOwnershipHandoverReturn = FunctionReturn<typeof functions.requestOwnershipHandover>

export type SetAutomatonParams = FunctionArguments<typeof functions.setAutomaton>
export type SetAutomatonReturn = FunctionReturn<typeof functions.setAutomaton>

export type SetFeesParams = FunctionArguments<typeof functions.setFees>
export type SetFeesReturn = FunctionReturn<typeof functions.setFees>

export type SetIsRewardTokenParams = FunctionArguments<typeof functions.setIsRewardToken>
export type SetIsRewardTokenReturn = FunctionReturn<typeof functions.setIsRewardToken>

export type SetIsSelectorAllowedForProtocolParams = FunctionArguments<typeof functions.setIsSelectorAllowedForProtocol>
export type SetIsSelectorAllowedForProtocolReturn = FunctionReturn<typeof functions.setIsSelectorAllowedForProtocol>

export type SetIsTokenBlockedParams = FunctionArguments<typeof functions.setIsTokenBlocked>
export type SetIsTokenBlockedReturn = FunctionReturn<typeof functions.setIsTokenBlocked>

export type SetMigrationFlagParams = FunctionArguments<typeof functions.setMigrationFlag>
export type SetMigrationFlagReturn = FunctionReturn<typeof functions.setMigrationFlag>

export type SetProtocolOfTargetParams = FunctionArguments<typeof functions.setProtocolOfTarget>
export type SetProtocolOfTargetReturn = FunctionReturn<typeof functions.setProtocolOfTarget>

export type SetTreasuryParams = FunctionArguments<typeof functions.setTreasury>
export type SetTreasuryReturn = FunctionReturn<typeof functions.setTreasury>

export type SetValidatorParams = FunctionArguments<typeof functions.setValidator>
export type SetValidatorReturn = FunctionReturn<typeof functions.setValidator>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TreasuryParams = FunctionArguments<typeof functions.treasury>
export type TreasuryReturn = FunctionReturn<typeof functions.treasury>

export type ValidatorParams = FunctionArguments<typeof functions.validator>
export type ValidatorReturn = FunctionReturn<typeof functions.validator>

