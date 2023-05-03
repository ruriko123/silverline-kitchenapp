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
    customerID : number  | null;

    @Column("int", {
        name: "restaurantID",
        nullable: true
    })
    restaurantID : number | null;


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
