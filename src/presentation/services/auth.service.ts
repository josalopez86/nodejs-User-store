import mongoose from "mongoose";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity, ValidateEmailDto } from "../../domain";
import { bcryptAdapter, JwtAdapter } from "../../config";
import { link } from "fs";
import { EmailService } from "./index";



export class AuthService{
    constructor(
        private readonly emailService: EmailService,
        private readonly jwtAdapter:JwtAdapter,
        private readonly apiHost: string

    ){

    }
    
    //private emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
//    private jwtAdapter = new JwtAdapter(envs.SEED_TOKEN);

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

            const {email, id} = rest;

            const token = this.jwtAdapter.generateToken({email, id},2000);

            if(!token)
            {
                throw CustomError.internalServer("Error while creating JWT.");
            }
            const link = `${this.apiHost}/auth/validate-email/${token}`;

            const htmlBody =`
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email.</p>
            <a href="${link}">Validate your email: ${email}</a>`

            this.sendEmail(htmlBody, "validate email", email);

            return {
                user: rest,
                token: token
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

            if(!existUser.emailValidated){
                throw CustomError.badRequest("Email not validated.");
            }

        const {password, ...user} = UserEntity.fromObject(existUser);
        const {email, id}= user;

        const token = this.jwtAdapter.generateToken({email, id},2000);

            if(!token)
            {
                throw CustomError.internalServer("Error while creating JWT.");
            }

        return {
            user: user,
            token: token
        };
    }

    public async validateEmail(validateEmailDto: ValidateEmailDto): Promise<UserEntity>{

        const payload = this.jwtAdapter.validateToken(validateEmailDto.token);

        if(!payload){
            throw CustomError.badRequest("Couldn't get the payload.");
        }

        const user = await this.GetUserByEmail(payload.email);

        if(!user){
            throw CustomError.badRequest("Couldn't find the user.");
        }

        if(payload.id !== user.id){
            throw CustomError.badRequest("Bad data.");
        }

        const userUpdated = await UserModel.updateOne(
            {_id: user.id},
            {emailValidated: true}
        );

        console.log(userUpdated);

        payload.emailValidated = true;
        
        return payload;

    }

    private async GetUserByEmail(email: string) {
        return await UserModel.findOne({email: email});
    }

    private async sendEmail(htmlBody: string, subject: string, to: string ){
        await this.emailService.sendEmail({htmlBody: htmlBody, subject:subject, to: to});
        
    }

}