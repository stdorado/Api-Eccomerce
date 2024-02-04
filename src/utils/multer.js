import multer from "multer"

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        if(file.fieldname === "profileImage"){
            cb(null, "uploads/profile")
        }else if (file.fieldname === "productImage"){
            cb(null, "uploads/products")
        }else{
            cb(null,"uploads/documents")
        }
    },
    filename : (req,file,cb) =>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

export {upload}