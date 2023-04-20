import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tblordertrackerdetails } from "./Tblordertrackerdetails";

@Entity()
export class Tblordertracker {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("int", { name: "outlet_orderid", nullable: true })
  outletOrderid: number | null;

  @Column("varchar", { name: "customerName", nullable: true, length: 50 })
  customerName: string | null;

  @Column("varchar", { name: "customerPhone", nullable: true, length: 20 })
  customerPhone: string | null;

  @Column("varchar", { name: "Address", nullable: true, length: 100 })
  Address: string | null;

  @Column("varchar", { name: "deliveryVia", nullable: true, length: 50 })
  deliveryVia: string | null;


  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("varchar", { name: "tablenum", nullable: true, length: 10 })
  tablenum: string | null;

  @Column("varchar", { name: "orderedat", nullable: true, length: 10 })
  orderedat: string | null;

  @Column("varchar", { name: "completedat", nullable: true, length: 10 })
  completedat: string | null;

  @Column("varchar", { name: "totaltime", nullable: true, length: 10 })
  totaltime: string | null;

  @Column("varchar", { name: "ordertype", nullable: true, length: 20 })
  ordertype: string | null;

  @Column("varchar", { name: "currentstate", nullable: true, length: 20 })
  currentstate: string | null;

  @Column("decimal", {
    name: "quantity",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  quantity: string | null;

  @Column("varchar", { name: "outlet_name", nullable: true, length: 50 })
  outletName: string | null;

  @Column("varchar", { name: "employee", nullable: true, length: 50 })
  employee: string | null;

  @Column("int", { name: "guest_count", nullable: true })
  guestCount: number | null;

  @Column("varchar", { name: "kotid", nullable: true, length: 20 })
  kotid: string | null;



  @OneToMany(
    () => Tblordertrackerdetails,
    (tblordertrackerdetails) => tblordertrackerdetails.ordertracker
  )
  tblordertrackerdetails: Tblordertrackerdetails[];
}
