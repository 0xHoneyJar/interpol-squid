import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Locker {
    constructor(props?: Partial<Locker>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    owner!: string

    @StringColumn_({nullable: true})
    treasury!: string | undefined | null

    @StringColumn_({nullable: true})
    operator!: string | undefined | null

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @StringColumn_({nullable: false})
    address!: string

    @BooleanColumn_({nullable: false})
    unlocked!: boolean

    @StringColumn_({nullable: false})
    referrer!: string
}
