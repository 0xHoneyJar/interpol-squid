import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Vault} from "./vault.model"

@Entity_()
export class KodiakStake {
    constructor(props?: Partial<KodiakStake>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Vault, {nullable: true})
    vault!: Vault

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @IntColumn_({nullable: false})
    lockDuration!: number

    @Index_()
    @StringColumn_({nullable: false})
    kekId!: string

    @DateTimeColumn_({nullable: false})
    timestamp!: Date
}
