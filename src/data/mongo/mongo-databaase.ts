import mongoose from "mongoose";


interface Options{
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase{

    static async conect(options: Options){

        const {mongoUrl, dbName} = options;

        try{

            await mongoose.connect(mongoUrl, {dbName: dbName});

            return true;

        }catch(error){
            console.log(error);
            throw error;
        }

    }
}