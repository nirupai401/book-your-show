const express=require('express');
const cors=require('cors');
const { ApiError } = require('./src/core/ApiError');
const { JsonWebTokenError } = require('jsonwebtoken');

//routes
const healthcheckRoutes = require('./src/routes/health');
const moviesRoutes=require('./src/routes/movies');
const userRoutes=require('./src/routes/user');
const theatreRoutes=require('./src/routes/theatre');
const bookingRoutes=require('./src/routes/bookings');
const paymentRoutes=require('./src/routes/payments');


const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use(healthcheckRoutes);
app.use('/api/v1/movies',moviesRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/theatres',theatreRoutes);
app.use('/api/v1/bookings',bookingRoutes);
app.use('/api/v1/payments',paymentRoutes);

//Global Exception handler
app.use((err,req,res,next)=>{
    if((!err instanceof JsonWebTokenError)){
        console.log(err);
    }
    if(err instanceof ApiError)
    {
        const {status= 500 ,message ='Internal server error'}=err;
     return res.status(status).json({
        success:false,
        message:message
    })
    }
    return res.status(500).json({
        success:false,
        message:'something went wrong'
    })
})

module.exports=app;