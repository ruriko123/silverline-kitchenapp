import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_thirdparty", { schema: "kitchenDB" })
export class TblThirdparty {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "CompanyName", nullable: true, length: 50 })
  companyName: string | null;

  @Column("varchar", { name: "Address", nullable: true, length: 50 })
  address: string | null;

  @Column("varchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "Pan", nullable: true, length: 50 })
  pan: string | null;

  @Column("varchar", { name: "AltPhone", nullable: true, length: 50 })
  altPhone: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 50 })
  email: string | null;

  @Column("varchar", { name: "Token", nullable: true, length: 200 })
  token: string | null;

  @Column("tinyint", { name: "isActive", default: () => "'1'" })
  isActive: number;

  @Column("varchar", { name: "deletedBy", nullable: true, length: 50 })
  deletedBy: string | null;

  @Column("varchar", { name: "addedBy", nullable: true, length: 50 })
  addedBy: string | null;

  @Column("varchar", { name: "addedDate", nullable: true, length: 50 })
  addedDate: string | null;

  @Column("varchar", { name: "deletedDate", nullable: true, length: 50 })
  deletedDate: string | null;

  @Column("varchar", { name: "baseURL", nullable: true, length: 50 })
  baseUrl: string | null;
}
