import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TbloperatingLocations {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;
    @Column("varchar", {
        name: "LocationName",
        nullable: true,
        length: 50
    })
    LocationName : string | null;
    @Column("varchar", {
        name: "IMAGEURL",
        nullable: true,
        length: 300
    })
    IMAGEURL : string | null;
    
    @Column("boolean", {
        name: "isActive",
        default:true
    })
    isActive : boolean|string | null;



}
