import {RequestHandler} from "express";
import {TbloperatingLocations} from "@model/TbloperatingLocations";
import myDataSource from "@base/app-data-source";
declare global {
    namespace Express {
        interface Request {
            file : any;
        }
    }
}

const addOperatingLocation : RequestHandler = async(req, res) => {

    try {
        if (!req.file || Object.keys(req.file).length === 0) {
            return res
                .status(400)
                .send('No files were uploaded.');
        };
        let filepath = `/uploads/${req.file.filename}`;
        var fullUrl = req.protocol + '://' + req.get('host') + filepath;
        let locationName = req
            ?.body
                ?.locationName;
        locationName=`${locationName}`.toUpperCase();
        let checkLocationExists = await myDataSource
            .getRepository(TbloperatingLocations)
            .findOne({
                where: {
                    LocationName:`${locationName}`
                }
            });
        if (checkLocationExists) {
            res
                .status(400)
                .json({"error": "Operating location already exists."});
            return;
        } else {
            const operatingLocations = new TbloperatingLocations();
            operatingLocations.LocationName = `${locationName}`
            operatingLocations.IMAGEURL = fullUrl;
            operatingLocations.isActive = true;
            await myDataSource
                .manager
                .save(operatingLocations);
            res
                .status(200)
                .json({success: "File uploaded.", url: fullUrl});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {addOperatingLocation};