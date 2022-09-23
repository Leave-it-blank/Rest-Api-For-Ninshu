/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import {redis} from "../server";

interface Player {
    name: String;
}

// getting all posts
const weekly_flush = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    // @ts-ignore
    const flush = await redis.del('weekly-leaderboards')
    // @ts-ignore
    //const cached2 = await redis.zrevrangebyscore('weekly-leaderboards', '+inf', '-inf' ,`withscores`, 'limit' ,0 ,10);

    return res.status(200).json({
        message: "DONE"
    });
};

// getting a single post
const update_kills = async (req: Request, res: Response, next: NextFunction) => {
    // get the user id from the req

    let name: string =   req.params.name;
    const c = await  redis.zincrby('weekly-leaderboards', 1, name);
    // @ts-ignore
    const cached2 = await redis.zrevrangebyscore('weekly-leaderboards', '+inf', '-inf' ,`withscores`, 'limit' ,0 ,10);
    return res.status(200).json({
        message: cached2
    });
};

export default { weekly_flush, update_kills  };