import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {Tbluser} from "@model/Tbluser";
import {TblRestaurant} from "@model/TblRestaurant";
import {getdistancefromuser, findOpenClose,sortMenu} from "@utils/USER/restaurantdatafilters";
import {TblMenu} from "@model/TblMenu";
const getRestaurant : RequestHandler = async(req, res) => {
    try {
        let token = req
            ?.headers
                ?.token;
        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(400)
                .json({detail: "error while reading token."});
            return;
        };
        let restaurantID = req?.body?.id;
        if(!restaurantID){
            res
            .status(400)
            .json({detail: "Restaurant ID not supplied."});
        return;
        };
        let userid : number = tokendata
            ?.id;
        let userdisplayname : string = tokendata
            ?.displayname;
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid,
                    displayname: `${userdisplayname}`
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User not found."});
            return;
        };
        let userLat = userData
            ?.lat || "27.7172";
        let userlong = userData
            ?.long || "85.3240";
        let restaurantData = await myDataSource
            .getRepository(TblRestaurant)
            .createQueryBuilder("t")
            .select([
                "t.Name",
                "t.Address",
                "t.long",
                "t.lat",
                "t.coverimage",
                "t.openingTime",
                "t.closingTime",
                "t.isPopular",
                "t.slogan",
                "t.details",
                "t.Address",
                "t.logo",
                "t.id"
            ])
            .where({isActive: true, id:restaurantID})
            .getMany();
        if (!restaurantData || restaurantData.length < 1) {
            res
                .status(400)
                .json({"error": "No data available."});
            return;
        };

        let menudata = await myDataSource
            .getRepository(TblMenu)
            .createQueryBuilder("")
            .select([
                "IDMenu",
                "Category",
                "ItemName",
                "costPrice",
                "sellingPrice",
                "sellingPricewithTax",
                "description",
                "restaurantID",
                "Taxable",
                "isActive",
            ])
            .where({restaurantID:restaurantID}).andWhere({isActive: true})
            .getRawMany() || [];





        try {
            let sortedMenu = await sortMenu(menudata)||[];

            let restaurantDataFilteredWithDistance = await getdistancefromuser(restaurantData, userLat, userlong);
            restaurantDataFilteredWithDistance = await findOpenClose(restaurantDataFilteredWithDistance);

            let responsejson = {restaurantDetails:restaurantDataFilteredWithDistance[0]||{},menu:sortedMenu||[]};
            res
                .status(200)
                .json(responsejson);
            return;
        } catch (error) {
            res
                .status(400)
                .json({"error": error});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {getRestaurant};