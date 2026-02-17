import { CustomError } from "../errors/custom.error";


export class CategoryEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        
    ){

    }

    static fromObject(obj : {[key:string]:any}){
            const { id, _id, name, available} = obj;
    
            if(!id && !_id){
                throw CustomError.badRequest("Missing id");
            }
    
            if(!name){
                throw CustomError.badRequest("Missing name");
            }
            
            return new CategoryEntity(id||_id, name, available);
        }
}