import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import {user_Tblordertrackerdetails} from "./user_Tblordertrackerdetails";
import {TblRestaurant} from "./TblRestaurant";


@Entity()
export class user_Tblordertracker {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;

    @Column("int", {
        name: "outlet_orderid",
        nullable: true
    })
    outletOrderid : number | null;

    @Column("varchar", {
        name: "customerName",
        nullable: true,
        length: 70
    })
    customerName : string | null;

    @Column("varchar", {
        name: "customerPhone",
        nullable: true,
        length: 30
    })
    customerPhone : string | null;


    @Column("varchar", {
        name: "deliverycustomerName",
        nullable: true,
        length:70
    })
    deliverycustomerName : string | null;

    @Column("varchar", {
        name: "deliverycustomerPhone",
        nullable: true,
        length: 30
    })
    deliverycustomerPhone : string | null;

    @Column("varchar", {
        name: "altdeliverycustomerPhone",
        nullable: true,
        length: 30
    })
    altdeliverycustomerPhone : string | null;

    @Column("varchar", {
        name: "deliverycustomerAddress",
        nullable: true,
        length: 250
    })
    deliverycustomerAddress : string | null;


    @Column("int", {
        name: "restaurantID",
        nullable: true
    })
    restaurantID : number | null;

    
    @ManyToOne(() => TblRestaurant, (restaurant) => restaurant.id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    })
    @JoinColumn([
        {
            name: "restaurantID",
            referencedColumnName: "id"
        }
    ])
    restaurant : TblRestaurant



    @Column("varchar", {
        name: "Address",
        nullable: true,
        length: 200
    })
    Address : string | null;

    @Column("varchar", {
        name: "deliveryVia",
        nullable: true,
        length: 50
    })
    deliveryVia : string | null;

    @Column("date", {
        name: "date",
        nullable: true
    })
    date : string | null;

    @Column("varchar", {
        name: "tablenum",
        nullable: true,
        length: 10
    })
    tablenum : string | null;

    @Column("varchar", {
        name: "orderedat",
        nullable: true,
        length: 20
    })
    orderedat : string | null;

    @Column("varchar", {
        name: "completedat",
        nullable: true,
        length: 10
    })
    completedat : string | null;

    @Column("varchar", {
        name: "totaltime",
        nullable: true,
        length: 10
    })
    totaltime : string | null;

    @Column("varchar", {
        name: "ordertype",
        nullable: true,
        length: 20
    })
    ordertype : string | null;

    @Column("varchar", {
        name: "currentstate",
        nullable: true,
        length: 20
    })
    currentstate : string | null;

    @Column("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2
    })
    quantity : string | null;

    @Column("varchar", {
        name: "outlet_name",
        nullable: true,
        length: 150
    })
    outletName : string | null;

    @Column("varchar", {
        name: "employee",
        nullable: true,
        length: 50
    })
    employee : string | null;

    @Column("int", {
        name: "guest_count",
        nullable: true
    })
    guestCount : number | null;

    @Column("varchar", {
        name: "kotid",
        nullable: true,
        length: 20
    })
    kotid : string | null;

    @OneToMany(() => user_Tblordertrackerdetails, (user_tblordertrackerdetails) => user_tblordertrackerdetails.ordertracker)
    user_tblordertrackerdetails : user_Tblordertrackerdetails[];
}
