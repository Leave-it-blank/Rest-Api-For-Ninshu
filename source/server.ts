/** source/server.ts */
// @ts-ignore
import http from 'http';
// @ts-ignore
import express, { Express } from 'express';
// @ts-ignore
import morgan from 'morgan';
// @ts-ignore
import routes from './routes/killcounter';
import IORedis from "ioredis";
const cron = require('node-cron');
const fetch = require("node-fetch");

// @ts-ignore
export const redis = new IORedis(6379, "46.4.63.213"
    ,{
        lazyConnect: true,
        password: "password",
    });

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

cron.schedule('0 8 * * 1',
    () => {  fetch('http://localhost:6060/flush_kills').then(() =>{
            console.log("Task is running every monday 8 am " + new Date())
    });
        console.log("LeaderBoard is Wiped Now  " + new Date());
    });
