const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { syncUserModel, syncAdminModel } = require("./util/syncModels");
const { connectDB, closeDB } = require("./util/dbCheck");
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "100MB" }));
app.use(cors({ credentials: true, origin: true }));

const startServer = async () => {
    try {
        await connectDB();
        server.listen(process.env.PORT, () => {
            console.log(chalk.black.bgGreen("Server Started ! "));
        });
        await syncUserModel();
        await syncAdminModel();

        app.use("/", routes);
    } catch (e) {
        console.log(chalk.bgRed("Error : ", e));
    }
    //     await closeDB();
};

startServer();
