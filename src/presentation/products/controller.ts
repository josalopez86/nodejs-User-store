import { CreateCategoryDto, CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { Request, Response } from "express";
import { ProductService } from "../services";

export class ProductController{

    constructor(
        public readonly productService: ProductService,
    ){

    }

    private handleError = (error: unknown, res: Response)=>{

        console.log({error});

        if(error instanceof(CustomError))
        {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(error);
        return res.status(500).json("Internal server error.");
    }

    public getProducts = (req: Request, res: Response)=> {

        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error)
        {
            return res.status(400).json({error});
        }
        
        this.productService.GetProducts(paginationDto!)
        .then(products => res.json(products))
        .catch(error=> this.handleError(error, res));

    }

    public createProduct = (req: Request, res: Response)=> {
        const [error, createDto] = CreateProductDto.create(req.body);
        
                if(error){
                    return res.status(400).json({error});
                }
        
                this.productService.CreateProduct(createDto!)
                .then(product => res.json(product))
                .catch(error=> this.handleError(error, res));

    }

    public getproductById = (req: Request, res: Response)=> {
        res.json("getCategoryById");

    }
}