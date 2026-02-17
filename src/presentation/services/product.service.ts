import { ProductModel } from "../../data";
import { CustomError, PaginationDto } from "../../domain";
import { Types } from "mongoose";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { Category } from '../../data/mongo/models/category.model';


export class ProductService{
    constructor(){        
    }

    public async CreateProduct(createProductDto: CreateProductDto){
        
        try{

            const productExist = await ProductModel.findOne({name: createProductDto.name});

            if(productExist)
            {
                throw CustomError.badRequest("Product already exist.");
            }

            const newProduct = new ProductModel({
                ...createProductDto, 
                User: new Types.ObjectId(createProductDto.userId), 
                Category: new Types.ObjectId(createProductDto.categoryId) });
                
            await newProduct.save();
    
            //const product = ProductEntity.fromObject(newProduct);    
                
    
                return {
                    newProduct
                };
    
            }catch(error){
                throw CustomError.internalServer(`${error}`);
            }
        }

        public async GetProducts(paginationDto: PaginationDto){
        
        try{

            const {page, limit} = paginationDto;

            const [total, products] = await Promise.all([ProductModel.countDocuments(), 
                ProductModel.find()
                .skip((page-1)*limit)
                .limit(limit)
                .populate("User")
                //opulate("User", "name email")
                .populate("Category")
            ]);

            if(!products)
            {
                throw CustomError.notFound("Products not found.");
            }

            return{
                page: page,
                limit: limit,
                total: total,
                products: products
            }
            
                
    
            }catch(error){
                throw CustomError.internalServer(`${error}`);
            }
        }
}