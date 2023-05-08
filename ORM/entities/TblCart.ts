import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import {TblRestaurant} from "./TblRestaurant";
import {Tbluser} from './Tbluser';
import {TblCartItems} from './TblCartItems';

@Entity()
export class TblCart {

    @PrimaryGeneratedColumn({type: "int", name: "IDCart"})
    idCart : number;

    @Column("int", {
        name: "customerID",
        nullable: true
    })
    customerID : number | null;

    @Column("int", {
        name: "restaurantID",
        nullable: true
    })
    restaurantID : number | null;

    @Column("decimal", {
        name: "taxable",
        nullable: true,
        precision: 10,
        scale: 2
    })
    taxable : number | null;

    @Column("decimal", {
        name: "taxAmount",
        nullable: true,
        precision: 10,
        scale: 2
    })
    taxAmount : number | null;

    @Column("decimal", {
        name: "nontaxable",
        nullable: true,
        precision: 10,
        scale: 2
    })
    nontaxable : number | null;


    @Column("decimal", {
        name: "subTotal",
        nullable: true,
        precision: 10,
        scale: 2
    })
    subTotal : number | null;

    @Column("decimal", {
        name: "Total",
        nullable: true,
        precision: 10,
        scale: 2
    })
    Total : number | null;


    @Column("decimal", {
        name: "deliveryCharge",
        nullable: true,
        precision: 10,
        scale: 2
    })
    deliveryCharge : number | null;



    @Column("varchar", {
        name: "checkoutAt",
        nullable: true,
        length: 120
    })
    checkoutAt : string | null;



    @Column("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2
    })
    quantity : string | null;

    @Column("boolean", {
        name: "isActive",
        default: true
    })
    isActive : boolean | string | null;

    @Column("boolean", {
        name: "isRemoved",
        default: false
    })
    isRemoved : boolean | string | null;

    @ManyToOne(() => Tbluser, (user) => user.id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    })
    @JoinColumn([
        {
            name: "customerID",
            referencedColumnName: "id"
        }
    ])
    customer : Tbluser

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

    @OneToMany(() => TblCartItems, cartitem => cartitem.idCartitem, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    })
    @JoinColumn()
    cartItems : TblCartItems;

}
