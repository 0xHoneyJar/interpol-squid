import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class XKDKRedeem {
    constructor(props?: Partial<XKDKRedeem>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    vaultAddress!: string

    @BigIntColumn_({nullable: false})
    xKodiakAmount!: bigint

    @BigIntColumn_({nullable: false})
    kodiakAmount!: bigint

    @BigIntColumn_({nullable: false})
    duration!: bigint

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @StringColumn_({nullable: false})
    transactionHash!: string
}
