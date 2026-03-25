const mongoose = require('mongoose');
//const dbUrl='mongodb://localhost:27017/bookmyshow'

const dbUrl=process.env.MONGO_DB_URL;
class AppDataSource{
   static async  connect(){
    await mongoose.connect(dbUrl)
   }
   static async disconnect(){
    await mongoose.disconnect();
   }
}

module.exports=AppDataSource;
