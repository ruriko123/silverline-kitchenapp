import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import myDataSource from "@base/app-data-source";

const getRestaurantNameList : RequestHandler = async(req, res) => {
    try {
        let restaurantNameList = await myDataSource
            .getRepository(TblRestaurant)
            .find({
                where: {
                    menuUploaded: true
                }
            });
        if (!restaurantNameList|| restaurantNameList.length<1) {
            res
                .status(400)
                .json({detail: "Error while requesting restaurant name list."});
            return;
        } else {

            let restaurantListarray:any=[];

            for(let x in restaurantNameList){
                let restaurantdata = restaurantNameList[x];
                let restaurantName = restaurantdata?.Name;
                let restaurantid= restaurantdata?.id;
                let restaurantObject = {
                    value: `${restaurantid}`,
                    label: restaurantName
                };
                restaurantListarray.push(restaurantObject);
            };
            res
                .status(200)
                .json(restaurantListarray);
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {getRestaurantNameList};