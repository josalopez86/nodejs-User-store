import { Validators } from "../../../config";


export class CreateProductDto{

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly userId: string,
        public readonly categoryId: string,
        ){}

    static create(obj : {[key: string]: any}): [string?, CreateProductDto?]{
            const {name, available= false, price = 0, description, categoryId, user: {id: userId}  }= obj;            
            let availableBoolean = available;
    
            if(!name){
                return ["Missing name", undefined];
            }

            if(!userId){
                return ["Missing user Id", undefined];
            }

            if(! Validators.isMongoId( userId )){
                return ["Invalid user Id", undefined];
            }

            if(!categoryId){
                return ["Missing category Id", undefined];
            }

            if(! Validators.isMongoId( categoryId )){
                return ["Invalid category Id", undefined];
            }

            if(typeof available !== "boolean"){
                availableBoolean = (available ==="true");
            }
    
            return [undefined, new CreateProductDto(name, availableBoolean, price, description, userId, categoryId)];
        }



}