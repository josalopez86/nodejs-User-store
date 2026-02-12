import mongoose from "mongoose";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdapter } from "../../config";



export class AuthService{
    constructor(){

    }

    public async registerUser(registerUserDto: RegisterUserDto){

        const existUser = await this.GetUserByEmail(registerUserDto.email);

        if(existUser){
            throw CustomError.badRequest("Email already exist.");
        }

        try{
            const newUser = new UserModel(registerUserDto);

            newUser.password = bcryptAdapter.hash(registerUserDto.password!);

            await newUser.save();

            const user = UserEntity.fromObject(newUser);

            const {password, ...rest} = user;

            return {
                user: rest,
                token:"1234"
            };

        }catch(error){
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto){

        const existUser = await this.GetUserByEmail(loginUserDto.email);

        if(!existUser){
            throw CustomError.badRequest("Email not found");
        }

        const match = bcryptAdapter.compare(loginUserDto.password, existUser.password!);

            if(!match){
                throw CustomError.badRequest("Wrong email or password.");
            }

        const {password, ...user} = UserEntity.fromObject(existUser);

        return {
            user: user,
            token:"1234"
        };

    }

    private async GetUserByEmail(email: string) {
        return await UserModel.findOne({email: email});

    }

}