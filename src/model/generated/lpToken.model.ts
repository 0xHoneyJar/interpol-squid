import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class LPToken {
    constructor(props?: Partial<LPToken>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    address!: string

    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @StringColumn_({nullable: true})
    symbol!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: false})
    factory!: string

    @Index_()
    @StringColumn_({nullable: false})
    factoryType!: string

    @Index_()
    @StringColumn_({nullable: false})
    token0!: string

    @Index_()
    @StringColumn_({nullable: false})
    token1!: string

    @BigIntColumn_({nullable: true})
    fee!: bigint | undefined | null
}
