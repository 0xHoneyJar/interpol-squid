import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class VaultBalance {
    constructor(props?: Partial<VaultBalance>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    vaultAddress!: string

    @Index_()
    @StringColumn_({nullable: false})
    tokenAddress!: string

    @BigIntColumn_({nullable: false})
    balance!: bigint
}
