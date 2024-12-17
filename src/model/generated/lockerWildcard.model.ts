import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class LockerWildcard {
    constructor(props?: Partial<LockerWildcard>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    locker!: string

    @Index_()
    @StringColumn_({nullable: false})
    vault!: string

    @IntColumn_({nullable: false})
    func!: number

    @StringColumn_({nullable: false})
    args!: string

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @StringColumn_({nullable: false})
    transactionHash!: string
}
