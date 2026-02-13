import { regularExps } from "../../../config";
import { CustomError } from "../../errors/custom.error";


export class ValidateEmailDto{
    private constructor(
        public readonly token: string        
    ){}

    static create(obj : {[key: string]: any}): [string?, ValidateEmailDto?]{
        const {token}= obj;


        if(!token){
            return ["Missing token", undefined];
        }

        return [undefined, new ValidateEmailDto(token)];
    }
}