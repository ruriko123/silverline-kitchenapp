import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_restaurant_third_party_links", { schema: "kitchenDB" })
export class TblRestaurantThirdPartyLinks {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "ThirdPartyName", nullable: true, length: 50 })
  thirdPartyName: string | null;

  @Column("varchar", { name: "RestaurantName", nullable: true, length: 50 })
  restaurantName: string | null;

  @Column("bigint", { name: "RestaurantID", nullable: true })
  restaurantId: string | null;
}
