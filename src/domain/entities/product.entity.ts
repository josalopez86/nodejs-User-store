import { CustomError } from "../errors/custom.error";


export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public price: number,
        public description: string,
        public userId: string,
        public categoryId: string,
        
    ){

    }

    static fromObject(obj : {[key:string]:any}){
            const { id, _id, name, available, price, description, User: userId, Category: categoryId} = obj;
    
            if(!id && !_id){
                throw CustomError.badRequest("Missing id");
            }
    
            if(!name){
                throw CustomError.badRequest("Missing name");
            }

            if(!userId){
                throw CustomError.badRequest("Missing user id");
            }

            if(!categoryId){
                throw CustomError.badRequest("Missing category id");
            }
            
            return new ProductEntity(id||_id, name, available, price, description, userId, categoryId);
        }
}