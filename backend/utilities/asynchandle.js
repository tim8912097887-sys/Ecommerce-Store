// simulate the third party express-async-handler
export const asyncHandler = (controller) =>(async (req,res,next) => {
    try {
        await controller(req,res,next);
    } catch (error) {
        // pass down error to the error handler
        next(error);
    }
})