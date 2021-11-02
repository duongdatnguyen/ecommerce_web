const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/images')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname);
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
                        limits:{fileSize:1024 * 1024} ,
                        filteFile:filteFile }
                           );

module.exports=upload;