import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblRestaurantThirdPartyLinks {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id : number;
    @Column("varchar", {
        name: "ThirdPartyName",
        default:null,

        nullable: true,
        length: 50
    })
    ThirdPartyName : string | null;
    @Column("varchar", {
        name: "RestaurantName",
        nullable: true,
        default:null,

        length: 50
    })
    RestaurantName : string | null;
    
    @Column("bigint", { name: "RestaurantID", nullable: true })
    RestaurantID: string | null|number;



}
