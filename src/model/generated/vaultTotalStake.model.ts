import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class VaultTotalStake {
    constructor(props?: Partial<VaultTotalStake>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    vaultAddress!: string

    @StringColumn_({nullable: false})
    tokenAddress!: string

    @Index_()
    @StringColumn_({nullable: false})
    stakingContract!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
