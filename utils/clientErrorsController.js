class apiErrorsModel extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode;
        
        this.status=String(statuscode).startsWith('4')?"please check your request":"server error";
        this.applicationError = true;
        Error.captureStackTrace(this);
    }
}
export default apiErrorsModel;