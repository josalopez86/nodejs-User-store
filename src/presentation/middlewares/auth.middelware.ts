import { NextFunction, Request, Response } from "express";
import { envs, JwtAdapter } from "../../config";
import { UserEntity } from "../../domain";
import { UserModel } from "../../data";


export class AuthMiddelware{    

    constructor(
        public readonly jwtAdapter: JwtAdapter
    ){

    }

    public async validateJWT(req: Request, res: Response, next: NextFunction){

        const authorization = req.header("Authorization");

        if(!authorization){
            return res.status(401).json({error: "No token provided."});
        }

        if(!authorization.startsWith("Bearer ")){
            return res.status(401).json({error: "Invalid bearer token."});
        }

        const token = authorization.split(" ").at(1) || "";

        try{

            const payload = await this.jwtAdapter.validateToken<UserEntity>(token);
            if(!payload || !payload.id)
            {
                res.status(401).json({error: "Invalid token."});
            }

            const user  = await UserModel.findById(payload!.id);

            if(!user)
            {
                res.status(401).json({error: "Invalid user."});
            }

            //TODO: VALIDAR USUARIO ACTIVO;

            req.body.user = 
            {
                id: payload!.id,
                email: payload!.email
            };

            next();
        }
        catch(error){
            console.log({error});
            res.status(500).json({error: "Internal server error."});
        }
    }
    
}