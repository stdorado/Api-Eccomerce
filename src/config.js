import mongoose from "mongoose";

const MongoUri = "mongodb+srv://SantinoDorado:Loshermanos13@codecluster.z68rxjp.mongodb.net/Eccomerce?retryWrites=true&w=majority"

mongoose.connect(MongoUri)
.then(() => {
    console.log("data base connection")
}).catch((err) => {
    console.log("error to connection")
});

export default mongoose