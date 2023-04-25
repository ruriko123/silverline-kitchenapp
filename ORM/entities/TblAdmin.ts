import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblAdmin {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;

    @Column("varchar", {
        name: "userName",
        nullable: true,
        length: 50
    })
    userName : string | null;

    @Column("varchar", {
        name: "Password",
        nullable: true,
        length: 200
    })
    Password : string | null;

    @Column("boolean", {
        name: "isMainAdmin",
        default:false
    })
    isMainAdmin :boolean;


    @Column("varchar", {
        name: "PermissionType",
        nullable: true,
        length: 30
    })
    PermissionType : string | null;


    @Column("varchar", {
        name: "Token",
        nullable: true,
        length: 200
    })
    Token : string | null;

    @Column("boolean", {
        name: "isActive",
        default:true
    })
    isActive : string | null;

    @Column("varchar", {
        name: "addedBy",
        nullable: true,
        length: 50
    })
    addedBy : string | null;
    @Column("varchar", {
        name: "addedDate",
        nullable: true,
        length: 50
    })
    addedDate : string | null;

}
