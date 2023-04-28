import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {Tbluser} from "@model/Tbluser";
import {TblRestaurant} from "@model/TblRestaurant";
import {getdistancefromuser, findOpenClose} from "@utils/USER/restaurantdatafilters";

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
        }

    
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
        let userPreferredLocation = userData
            ?.preferredlocation;
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
                "t.logo"
            ])
            .where({isActive: true, id:restaurantID})
            .getMany();
        if (!restaurantData || restaurantData.length < 1) {
            res
                .status(400)
                .json({"error": "No data available."});
            return;
        };

        try {
            let restaurantDataFilteredWithDistance = await getdistancefromuser(restaurantData, userLat, userlong);
            restaurantDataFilteredWithDistance = await findOpenClose(restaurantDataFilteredWithDistance);
            res
                .status(200)
                .json(restaurantDataFilteredWithDistance[0]||{});
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