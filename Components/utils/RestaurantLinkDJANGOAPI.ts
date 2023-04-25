import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
interface DJANGOJSONOBJECT {
    name : string | null,
    Address : string | null,
    contact_number : string | null,
    tax_number : string | null,
    Type : string | null,
    BASEURL : string | null,
    email:string|null,
    KEY:string|null|undefined,
};

const RestaurantLinkDJANGOAPI = async(data : DJANGOJSONOBJECT) => {
    data["KEY"]=process.env.DJANGO_KEY;
    try {
        let djangoAPIURL = `${data.BASEURL}/`;
        axios
            .post(djangoAPIURL, data)
            .then(function (response) {})
            .catch(function (error) {
                console.log(error);
            });
        return;
    } catch (error) {
        console.log(error);
        return;
    };
};

export {RestaurantLinkDJANGOAPI};