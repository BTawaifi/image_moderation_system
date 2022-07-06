import { AppDataSource } from "./data-source"
import express from "express";
import router from "./routes";
import cors from "cors";
import helmet from "helmet";

const PORT = process.env["BACKEND_LOCAL_PORT"] ? +process.env["BACKEND_LOCAL_PORT"] : 3000;

async function initializeDB() {
    let waitingModifier = 1;
    while (waitingModifier != 0) {
        try {
            console.log("Connecting to mysql at port " + process.env["MYSQL_LOCAL_PORT"]);
            await AppDataSource.initialize().then(() => {
                console.log("DB Connection established");
            }).catch(err => { throw new Error(err) });
            break;
        } catch (error) {
            waitingModifier += 1
            console.log(error)
            console.log("Waiting time to DB reconnection: " + waitingModifier + "s");
            await sleep(1000 * waitingModifier);
        }
    }
}

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

initializeDB();

const app = express();
app.use(express.json());
app.use(cors({ "origin": "*" }))
app.use(helmet())
app.use('/stats', (req) => console.log(req))
app.use('/', router)

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));

