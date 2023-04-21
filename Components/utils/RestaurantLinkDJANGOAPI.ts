import axios from 'axios';

interface DJANGOJSONOBJECT {
    CompanyName : string | null,
    Address : string | null,
    Phone : string | null,
    Pan : string | null,
    Type : string | null,
    BASEURL : string | null
};

const RestaurantLinkDJANGOAPI = async(data : DJANGOJSONOBJECT) => {
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