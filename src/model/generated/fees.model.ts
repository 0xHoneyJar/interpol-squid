import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Fees {
    constructor(props?: Partial<Fees>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    referral!: string

    @StringColumn_({nullable: false})
    tokenAddress!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({nullable: false})
    transactionHash!: string
}
