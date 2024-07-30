import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class KodiakStake {
    constructor(props?: Partial<KodiakStake>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    vaultAddress!: string

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
