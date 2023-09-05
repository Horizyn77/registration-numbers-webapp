import express from "express";
import { engine } from "express-handlebars";
import 'dotenv/config';
import session from "express-session";
import flash from "express-flash";
import pgPromise from 'pg-promise';
import cors from "cors";

import RegistrationNumbersFactory from "./registration-numbers-factory.js";
import RegistrationNumbersService from "./services/registration-numbers-service.js";
import RegistrationNumbersRoutes from "./routes/registration-numbers-routes.js";

const app = express();
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString)

const PORT = process.env.PORT || 3000;
const registrationService = RegistrationNumbersService(db)
const registrationFactory = RegistrationNumbersFactory(registrationService);
const registrationRoutes = RegistrationNumbersRoutes(registrationService, registrationFactory)

app.engine("handlebars", engine({
    layoutsDir: "./views/layouts"
}));

app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(flash());


app.get("/", registrationRoutes.showHome)

app.post("/add", registrationRoutes.add)

app.post("/filter", registrationRoutes.filter)

app.post("/showAll", registrationRoutes.showAll)

app.post("/deleteAll", registrationRoutes.deleteAll)

app.post("/delete", registrationRoutes.deleteReg)

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));