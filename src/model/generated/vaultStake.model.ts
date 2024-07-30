import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Vault} from "./vault.model"
import {LPToken} from "./lpToken.model"

@Entity_()
export class VaultStake {
    constructor(props?: Partial<VaultStake>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Vault, {nullable: true})
    vault!: Vault

    @Index_()
    @ManyToOne_(() => LPToken, {nullable: true})
    token!: LPToken

    @Index_()
    @StringColumn_({nullable: false})
    stakingContract!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @DateTimeColumn_({nullable: false})
    timestamp!: Date
}
