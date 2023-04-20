import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import myDataSource from "@base/app-data-source";

const addRestaurant : RequestHandler = async(req, res) => {

    try {

        let Outlet_Name = req.body
            ?.Outlet_Name;
        let Address = req.body?.Address;
        let Email = req.body?.Email;
        let Phone = req.body?.Phone;
        let baseURL = req.body?.baseURL;
        let addedDate=new Date().toLocaleString('en-US', {timeZone: 'Asia/Kathmandu'});

        let userData = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    Name: `${Outlet_Name}`
                }
            });
        if(userData){
            res
            .status(400)
            .json({"error": "Outlet is already registered."});
            return;
        } else {
            const restaurantTable = new TblRestaurant();
            restaurantTable.Name=Outlet_Name;
            restaurantTable.Address=Address;
            restaurantTable.Email=Email;
            restaurantTable.Phone=Phone;
            restaurantTable.baseURL=baseURL;
            restaurantTable.addedDate=addedDate;

            await myDataSource
            .manager
            .save(restaurantTable);
            res
            .status(200)
            .json({"success": "Outlet registered successfully."});
            return;
        }

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
            return;

    }

};

export {addRestaurant};