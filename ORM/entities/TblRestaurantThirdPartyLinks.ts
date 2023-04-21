import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblRestaurantThirdPartyLinks {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;
    @Column("varchar", {
        name: "ThirdPartyName",
        nullable: true,
        length: 50
    })
    ThirdPartyName : string | null;
    @Column("varchar", {
        name: "RestaurantName",
        nullable: true,
        length: 50
    })
    RestaurantName : string | null;

}
