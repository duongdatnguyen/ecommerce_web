const multer=require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  }
})

const filteFile=(req, file, cb)=>{
    const arrayfilter=["image/jpeg","image/png","image/webp"];

    if(!arrayfilter.includes(filename.mimetype))
    {
        cb(null, true);
    }
    else{
        cb({ message: "Unsupported file format" }, false);
    }
}


const upload = multer({ storage: storage,
                        limits:{fileSize:50000 * 50000} ,
                        filteFile:filteFile }
                           );




module.exports=upload;