import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {Tbluser} from "@model/Tbluser";
import {TblRestaurant} from "@model/TblRestaurant";
import {filterPopular, filterCloudKitchen,filterwithdistance, findOpenClose} from "@utils/USER/homepagefilters";

const gethomepage : RequestHandler = async(req, res) => {

    try {

        let token = req
            ?.headers
                ?.token;
        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(303)
                .json({detail: "error while reading token."});
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
        let userPreferredLocation = userData
            ?.preferredlocation ||"KATHMANDU";
        let userLat = userData
            ?.lat || "27.7172";
        let userlong = userData
            ?.long || "85.3240";
        let restaurantData = await myDataSource
            .getRepository(TblRestaurant)
            .createQueryBuilder("t")
            .select([
                "t.id",
                "t.Name",
                "t.Address",
                "t.long",
                "t.lat",
                "t.coverimage",
                "t.openingTime",
                "t.closingTime",
                "t.isPopular",
                "t.isCloudKitchen"
            ])
            .where({isActive: true, operatingLocation: `${userPreferredLocation}`})
            .getMany();
        if (!restaurantData || restaurantData.length < 1) {
            res
                .status(400)
                .json({detail: "No data available."});
            return;
        };

        try {
            let restaurantDataFilteredWithDistance = await filterwithdistance(restaurantData, userLat, userlong);
            restaurantDataFilteredWithDistance = await findOpenClose(restaurantDataFilteredWithDistance);
            let cloudKitchen = await filterCloudKitchen(restaurantDataFilteredWithDistance);
            let popularonly = await filterPopular(restaurantDataFilteredWithDistance);


            let returnobject : any = {
                near_you: restaurantDataFilteredWithDistance || [],
                popular: popularonly || [],
                cloudKitchen:cloudKitchen||[]

            };
            res
                .status(200)
                .json(returnobject);
            return;
        } catch (error) {
            res
                .status(400)
                .json({detail: error});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {gethomepage};