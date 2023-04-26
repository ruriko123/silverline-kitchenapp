import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_admin", { schema: "kitchenDB" })
export class TblAdmin {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "userName", nullable: true, length: 50 })
  userName: string | null;

  @Column("varchar", { name: "Password", nullable: true, length: 200 })
  password: string | null;

  @Column("tinyint", { name: "isMainAdmin", default: () => "'0'" })
  isMainAdmin: number;

  @Column("varchar", { name: "PermissionType", nullable: true, length: 30 })
  permissionType: string | null;

  @Column("tinyint", { name: "isActive", default: () => "'1'" })
  isActive: number;

  @Column("varchar", { name: "Token", nullable: true, length: 200 })
  token: string | null;

  @Column("varchar", { name: "addedBy", nullable: true, length: 50 })
  addedBy: string | null;

  @Column("varchar", { name: "addedDate", nullable: true, length: 50 })
  addedDate: string | null;
}
