import { types } from "util";
import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { Types } from "mongoose";


export class CategoryService{
    constructor(){        
    }

    public async CreateCategory(createCategoryDto: CreateCategoryDto){
        
        try{

            const categoryExist = await CategoryModel.findOne({name: createCategoryDto.name});

            if(categoryExist)
            {
                throw CustomError.badRequest("Category already exist.");
            }

            const newCategory = new CategoryModel({
                ...createCategoryDto, User: new Types.ObjectId(createCategoryDto.userId)});
                
            await newCategory.save();
    
            const category = CategoryEntity.fromObject(newCategory);    
                
    
                return {
                    category
                };
    
            }catch(error){
                throw CustomError.internalServer(`${error}`);
            }
        }

        public async GetCategories(paginationDto: PaginationDto){
        
        try{

            const {page, limit} = paginationDto;

            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find()
            // .skip((page-1)*limit)
            // .limit(limit);

            const [total, categories] = await Promise.all([CategoryModel.countDocuments(), 
                CategoryModel.find()
                .skip((page-1)*limit)
                .limit(limit)
            ]);

            if(!categories)
            {
                throw CustomError.notFound("Categories not found.");
            }

            return{
                page: page,
                limit: limit,
                total: total,
                categories: categories.map(category=> (
                {
                    id: category._id,
                    name: category.name,
                    available: category.available
                })
            ),
            }
            
                
    
            }catch(error){
                throw CustomError.internalServer(`${error}`);
            }
        }
}