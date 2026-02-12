import { regularExps } from "../../../config";
import { CustomError } from "../../errors/custom.error";


export class LoginUserDto{
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    static create(obj : {[key: string]: any}): [string?, LoginUserDto?]{
        const {email, password}= obj;

        if(!email){
            return ["Missing email", undefined];
        }

        if(!password){
            return ["Missing password", undefined];
        }

        return [undefined, new LoginUserDto(email, password)];
    }
}