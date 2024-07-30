import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class BGTBoost {
    constructor(props?: Partial<BGTBoost>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    vaultAddress!: string

    @Index_()
    @StringColumn_({nullable: false})
    validator!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({nullable: false})
    status!: string

    @DateTimeColumn_({nullable: false})
    timestamp!: Date
}
