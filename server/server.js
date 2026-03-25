require('dotenv').config();
const app=require('./app');
const AppDataSource=require('./src/data-source');
const PORT= process.env.PORT || 3000;


(async () =>{
  try{
    await AppDataSource.connect();
    console.log('DB connection open');
   app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
   })
  }
  catch(err){
    console.log(err);
  }
})()