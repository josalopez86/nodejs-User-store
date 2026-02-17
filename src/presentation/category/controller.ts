import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { Request, Response } from "express";
import { CategoryService } from "../services";

export class CategoryController{

    constructor(
        public readonly CategoryService: CategoryService,
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

        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error)
        {
            return res.status(400).json({error});
        }
        
        this.CategoryService.GetCategories(paginationDto!)
        .then(categories => res.json(categories))
        .catch(error=> this.handleError(error, res));

    }

    public createCategory = (req: Request, res: Response)=> {
        const [error, createDto] = CreateCategoryDto.create(req.body);
        
                if(error){
                    return res.status(400).json({error});
                }
        
                this.CategoryService.CreateCategory(createDto!)
                .then(category => res.json(category))
                .catch(error=> this.handleError(error, res));

    }

    public getCategoryById = (req: Request, res: Response)=> {
        res.json("getCategoryById");

    }
}