class ApiResponse {
   constructor(success,payload,message){
    this.success=this.success;
    this.payload=payload;
    this.message=message;
   }

   static build(success,payload,message){
    return new ApiResponse(success,payload,message);
   }
} 

module.exports=ApiResponse;