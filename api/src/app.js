import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import productsRoute from "./routes/products.route.js";

const app = express();

app.use("api/auth", authRoute);
app.use("api/user", userRoute);
app.use("api/products", productsRoute);
app.listen(3000, () => {
    console.log("Server is running!");
});