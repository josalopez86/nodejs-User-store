import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { CustomError } from "../../domain";
import { UuidAdapter } from "../../config";


export class FileUploadService{

    constructor(){

    }

    private checkFolder(folderPath: string): boolean{

        try{
            if(!fs.existsSync(folderPath))
            {
                fs.mkdirSync(folderPath);
            }
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async uploadSingle(
        file: UploadedFile,
        folder: string="uploads",
        validExtensions: string[] = ["png", "jpg", "jpeg","gif"]){

            const fileExtension = file.mimetype.split("/").at(1) ?? "";
            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRequest(`Not file extension valid. ${fileExtension}`);
            }
            const destination = path.resolve(__dirname, "../../../", folder );
            if(!this.checkFolder(destination))
            {
                throw CustomError.internalServer("Couldn't create the path.");
            }

            const uuid = UuidAdapter.getUUID();
            const fileName = `${uuid}.${fileExtension}`;

            await file.mv(`${destination}/${fileName}`);

            return { fileName };

    }

    async uploadMultiple(
        files: UploadedFile[],
        folder: string="uploads"
    ){
        try{

            const fileNames = await Promise.all(
                files.map(file => {
                    return this.uploadSingle(file, folder);
                })
             );

        return fileNames;

        }
        catch(error){
            throw error;
        }

    }
}