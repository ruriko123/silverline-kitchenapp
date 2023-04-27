const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {

        cb(null,__dirname+"../../../public/images/")
    },
    filename: function (req:any, file:any, cb:any) {
        let ext = ''; // set default extension (if any)
        if (file.originalname.split(".").length>1) // checking if there is an extension or not.
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
})
var upload = multer({ storage: storage });
export {upload};