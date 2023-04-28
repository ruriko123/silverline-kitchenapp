import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {Tbluser} from "@model/Tbluser";
import {TblRestaurant} from "@model/TblRestaurant";



const gethomepage : RequestHandler = async(req, res) => {

    try {

        let token = req?.headers?.token;

        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(400)
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
        let userPreferredLocation = userData?.preferredlocation;
        let userLat=userData?.lat;
        let userlong = userData?.long;


        let restaurantData =await myDataSource
        .getRepository(TblRestaurant)
        .createQueryBuilder("t")
        .select(["t.Name","t.Address","t.long","t.lat","t.coverimage","t.openingTime","t.closingTime"])
        .where({isActive: true,
            operatingLocation:`${userPreferredLocation}`})
        .getMany();


    if (!restaurantData || restaurantData.length<1) {
        res
            .status(400)
            .json({"error": "No data available."});
        return;
    };



    

                res
                .status(200)
                .json(restaurantData);
            return;

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;

    };


};

export {gethomepage};