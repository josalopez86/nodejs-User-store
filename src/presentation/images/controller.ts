import {  CustomError } from "../../domain";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";


export class ImagesController{

    constructor(
    ){

    }

    private handleError = (error: unknown, res: Response)=>{

        if(error instanceof(CustomError))
        {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(error);
        return res.status(500).json("Internal server error.");
    }

    public getFile = (req: Request, res: Response)=> {
        const {type = "", id = ""} = req.params;

        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${id}`);

        if(!fs.existsSync(imagePath)){
            return res.status(404).json("Image not found.");
        }

        res.sendFile(imagePath);
        
    }
}