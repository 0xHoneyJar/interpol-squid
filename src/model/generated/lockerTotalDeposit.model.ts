import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class LockerTotalDeposit {
    constructor(props?: Partial<LockerTotalDeposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    locker!: string

    @StringColumn_({nullable: false})
    token!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({array: true, nullable: false})
    nftIds!: (string | undefined | null)[]

    @BigIntColumn_({nullable: true})
    lockExpiration!: bigint | undefined | null
}
