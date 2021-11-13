const { Router } = require("express");
const express=require("express");
const app=express();
const connnectDB=require("./config/connectDB");
const cors=require("cors");
const passport=require("passport");
const userRouter=require("./router/api/userRouter");
const auth=require('./router/api/auth');
const address=require("./router/api/user/address");
const categories=require("./router/api/category/Category");
const subcategories=require("./router/api/category/SubCategory");
const product=require("./router/api/product/Product");
const order=require("./router/api/orders/order");


const configPassport=require("./config/passport");
const session=require("express-session");

app.use(session({ secret: 'thisissercet',
                resave: false,
                saveUninitialized: true,
                cookie: { secure: true }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors())

connnectDB();
app.use("/users",userRouter);
app.use("/",auth);
app.use("/addresses",address);
app.use("/categories",categories);
app.use("/subcategories",subcategories);
app.use("/products",product);
app.use("/orders",order);


const PORT=process.env.PORT||3000;

app.listen(PORT,()=>console.log(`Server is listening port ${PORT}`));