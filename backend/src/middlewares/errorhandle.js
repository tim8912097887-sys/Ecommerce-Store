export const errorHandler = (err,req,res,next) => {
   // if no status code specified,use 500   
   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({ success: false,message: err.message });
}