import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import {TblMenu} from "@model/TblMenu";
import myDataSource from "@base/app-data-source";

const uploadMenu : RequestHandler = async(req, res) => {
    try {
        let menudata = req.body
            ?.menudata;
        let restaurantID = req.body
            ?.restaurantID;
        let restaurantName = req.body
            ?.restaurantName;

        if (!restaurantName || !restaurantID || !menudata) {
            res
                .status(400)
                .json({error: "Missing Parameters."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    Name: `${restaurantName}`,
                    id: restaurantID
                }
            });
        if (!(userData)) {
            res
                .status(400)
                .json({error: "Restaurant does not exist."});
            return;
        } else {
            menudata.map(async(e : any, index : any) => {
                if (index && index > 0) {
                    try {
                        let itemname = e[1] || "";
                        let checkItemExists = await myDataSource
                            .getRepository(TblMenu)
                            .findOne({
                                where: {
                                    ItemName: `${itemname}`,
                                    restaurantID: restaurantID
                                }
                            });
                        if (!checkItemExists) {
                            const menuTable = new TblMenu();
                            menuTable.Category = e[0] || "";
                            menuTable.ItemName = e[1] || "";
                            menuTable.costPrice = e[2] || "";
                            menuTable.sellingPrice = e[3] || "";
                            menuTable.sellingPricewithTax = e[4] || "";
                            menuTable.description = e[5] || "";
                            menuTable.Taxable = e[6] || true;
                            menuTable.restaurantID = restaurantID;
                            await myDataSource
                                .manager
                                .save(menuTable);
                        } else {
                            let Category = e[0] || "";
                            let ItemName = e[1] || "";
                            let costPrice = e[2] || "";
                            let sellingPrice = e[3] || "";
                            let sellingPricewithTax = e[4] || "";
                            let description = e[5] || "";
                            let Taxable = e[6] || true;

                            await myDataSource
                                .createQueryBuilder()
                                .update(TblMenu)
                                .set({
                                    Taxable: Taxable,
                                    description: description,
                                    sellingPricewithTax: sellingPricewithTax,
                                    sellingPrice: sellingPrice,
                                    costPrice: costPrice,
                                    isActive: true,
                                    Category: Category,
                                    ItemName: ItemName
                                })
                                .where({idMenu: checkItemExists.idMenu})
                                .execute();

                        }
                    } catch (error) {}
                };
            });

            await myDataSource
            .createQueryBuilder()
            .update(TblRestaurant)
            .set({
                menuUploaded: true,
            })
            .where({id: restaurantID})
            .execute();

            res
                .status(200)
                .json({"success": "Menu uploaded successfully."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {uploadMenu};