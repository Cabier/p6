const multer = require('multer');
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
}

const storage = multer.diskStorage({
    destination: (req,file, callback) => {
       callback(null,'images')   
    },
    filename:(req,file,callback) => {
        console.log("file", file)
        let name = file.originalname.replace(".png", "");
        name = name.replace(".jpg", "");
        name = name.replace(".jpeg", "");
        const extension = MIME_TYPES[file.mimetype];
        console.log("Image name => => => => =>", name)
        callback(null, name+Date.now()+'.'+ extension);
    }
});

module.exports = multer({storage}).single('image');