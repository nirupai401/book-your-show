class ApiError extends Error{
    constructor(message){
        super(message);
    }
}


class BadRequestError extends ApiError{
 constructor(message='BadRequest'){
     super(message);
     this.status=400;
 }
}

class AuthenticationError extends ApiError{
    constructor(message='Authentication Error'){
        super(message);
        this.status=401;
    }
}

class NotFoundError extends ApiError{
    constructor(message='NotFound'){
        super(message);
        this.status=404;
    }
}

class AuthorizationError extends ApiError{
    constructor(message='Authorization Error'){
        super(message);
        this.status=403;
    }
}

module.exports={
    BadRequestError,
    AuthenticationError,
    ApiError,
    NotFoundError,
    AuthorizationError
}