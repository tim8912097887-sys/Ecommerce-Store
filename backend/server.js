import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
// local module
import { userRouter } from "./src/routes/user.route.js";
import { errorHandler } from "./src/middlewares/errorhandle.js";
import { dbConnection } from "./configs/db.js";
import { productRouter } from "./src/routes/product.route.js";


const app = express();
const PORT = process.env.PORT || 5000;
// body parser
app.use(express.json());
app.use(cookieParser());

// user route
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);

// error handler attatch
app.use(errorHandler);

dbConnection().then(() => {
   app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));
})

// test if the app is alive
app.get('/',(req,res) => {
    res.json({ message: "Hello" });
})