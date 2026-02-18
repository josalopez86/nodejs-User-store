import {  CustomError } from "../../domain";
import { Request, Response } from "express";
import { FileUploadService } from "../services";
import { UploadedFile } from "express-fileupload";

export class FileUploadController{

    constructor(
        public readonly fileUploadService: FileUploadService

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

    public UploadFile = (req: Request, res: Response)=> {
        const type = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;
        
        this.fileUploadService.uploadSingle(file, `uploads/${type}`)
        .then(uploaded => {return res.json(uploaded)})
        .catch(error=> {
            return this.handleError(error, res);
        });
    }

    public UploadMultipleFiles = (req: Request, res: Response)=> {
        
        const files = req.body.files as UploadedFile[];
        const type = req.params.type;
        
        this.fileUploadService.uploadMultiple(files, `uploads/${type}`)
        .then(uploaded => {return res.json(uploaded)})
        .catch(error=> {
            return this.handleError(error, res);
        });
    }
}