import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class LPToken {
    constructor(props?: Partial<LPToken>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @StringColumn_({nullable: true})
    symbol!: string | undefined | null
}
