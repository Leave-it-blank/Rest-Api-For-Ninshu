/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
const db = require("../database/mysql");

const home = async (req: Request, res: Response, next: NextFunction) => {
    let connection;
    connection = db.dbConnection();
    try{
        let sql_quests_table = "create table if not exists users (id INT AUTO_INCREMENT PRIMARY KEY, character_id VARCHAR(255) UNIQUE, quests VARCHAR(255), updated_at Date)";
        connection.query(sql_quests_table, function (err: any, result: any) {
            if (err) throw err;
        });
        connection.end();
        return res.status(200).json({
            message: "TABLE CREATED"
        });
    } catch (e){

        return res.status(302).json({
            message: "TABLE NOT CREATED"
        });
    }


};

const getData = async (req: Request, res: Response, next: NextFunction) => {
    let Quests: any[] = [];
   // let name: string =   req.params.name;
    let connection: { query: (arg0: string, arg1: string, arg2: (err: any, result: any) => void) => void; end: () => void; };
    connection = db.dbConnection();

    try{
        let get_user = "SELECT * FROM users WHERE character_id = ?";

        // @ts-ignore
        let quests = new Promise((resolve, reject) => {
            setTimeout(function() {

                connection.query(get_user, req.params.uid, function (err: any, result: any) {
            if (err) throw err;
            //console.log(result);
                    result.forEach((element: { quests: string; }) => {

                        Quests.push(element.quests);
                    });
                    resolve(Quests);
                // console.log(Quests);
            });

        });
            // @ts-ignore
            }, 250);
        quests.then((successMessage) => {
            connection.end();
            return res.status(200).json({
                quests: successMessage
            });
        })

    } catch (e){
       // console.log(e);
        return res.status(404).json({
            message: "USER NOT FOUND",
            quests: null
        });
    }



};
const updateDatabase = async (req: Request, res: Response, next: NextFunction) => {

    let connection: { query: (arg0: string, arg1: string[], arg2: (err: any, result: any) => void) => void; end: () => void; };
    connection = db.dbConnection();

    // @ts-ignore
    try{
        let create_user = "INSERT INTO users (character_id, quests) values ('" + req.params.uid +"' , '" + req.params.data + "')" ;
        let update_user = `UPDATE users SET quests = '${req.params.data}' WHERE character_id = ? `;
        let quests = new Promise((resolve, reject) => {
            setTimeout(function() {
                connection.query(update_user, [req.params.uid], function (err: any, result: any) {
                    if (err) throw err;
                    console.log(result.affectedRows);
                    if (result.affectedRows == 0) {
                        console.log("yes");
                        connection.query(create_user, [ ], function (err: any, result: any) {
                            if (err) throw err;
                        })
                    }

                    resolve(result);
                });

            });
            // @ts-ignore
        }, 250);
        quests.then((successMessage) => {
            connection.end();
            return res.status(200).json({
                message: "updated User"
            });
        })

    } catch (e){
        // console.log(e);
        return res.status(404).json({
            message: "USER NOT FOUND"
        });
    }


};

const updateJsonDB = async (req: Request, res: Response, next: NextFunction) => {

    let connection: { query: (arg0: string, arg1: string[], arg2: (err: any, result: any) => void) => void; end: () => void; };
    connection = db.dbConnection();
     console.log(req.body);
    // @ts-ignore
    try{
        let create_user = "INSERT INTO users (character_id, quests) values ('" + req.params.uid +"' , '" + req.body.foo + "')" ;
        let update_user = `UPDATE users SET quests = '${JSON.stringify( req.body)}' WHERE character_id = ? `;
        let quests = new Promise((resolve, reject) => {
            setTimeout(function() {
                connection.query(update_user, [req.params.uid], function (err: any, result: any) {
                    if (err) throw err;
                    console.log(result.affectedRows);
                    if (result.affectedRows == 0) {
                        console.log("yes");
                        connection.query(create_user, [ ], function (err: any, result: any) {
                            if (err) throw err;
                        })
                    }

                    resolve(result);
                });

            });
            // @ts-ignore
        }, 250);
        quests.then((successMessage) => {
            connection.end();
            return res.status(200).json({
                message: "updated User"
            });
        })

    } catch (e){
        // console.log(e);
        return res.status(404).json({
            message: "USER NOT FOUND"
        });
    }


};



export default {  updateDatabase, getData , home, updateJsonDB};