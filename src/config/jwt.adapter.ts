import { error } from "console";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError, UserEntity } from "../domain";


export class JwtAdapter {

    constructor(public readonly SEED_TOKEN: string){
    }
    

    public generateToken(payload: any, durationHours: number = 2): string{

        return jwt.sign(payload, this.SEED_TOKEN, { expiresIn: durationHours});
    }

    public validateToken<T>(token: string): T | null{

        try{            
            const payload = jwt.verify(token, this.SEED_TOKEN);
            if (typeof payload !== "string") {
                const { email, id } = payload as JwtPayload;                
                return {id, email} as T;
            }
            return null;
        }catch(error){
            throw CustomError.internalServer(`${error}`);
        }

    }

}