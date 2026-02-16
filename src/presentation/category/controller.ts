import { CustomError } from "../../domain";
import { Request, Response } from "express";

export class CategoryController{

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

    public getCategories = (req: Request, res: Response)=> {
        res.json("getCategories");

    }

    public createCategory = (req: Request, res: Response)=> {
        res.json("category");

    }

    public getCategoryById = (req: Request, res: Response)=> {
        res.json("getCategoryById");

    }
}