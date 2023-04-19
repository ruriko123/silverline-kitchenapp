import crypto from "crypto";

const createOutletHash = async(outletName : string) => {
    try {
        let outletHash = crypto
            .createHash('sha256')
            .update(`${outletName}`, 'binary')
            .digest('hex');
        return outletHash.substring(0, 8);
    } catch (error) {
        return false;
    };
};

export {createOutletHash};