
import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";


(async()=>{
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    await main();

    await MongoDatabase.disconnect();

})();

const randomBetween0andX = (x: number): number => {
return Math.floor(Math.random() * x);
}

async function main(){

    //REMOVE ALL
    await Promise.all([
        ProductModel.deleteMany(),
        CategoryModel.deleteMany(),
        UserModel.deleteMany(),
    ]);

    //ADD USERS
    const users = await UserModel.insertMany(seedData.users);

    //ADD CATEGORIES
    const categories = await CategoryModel.insertMany(

        seedData.categories.map(category =>{
            return{
                ...category,
                User: users[randomBetween0andX(users.length-1)].id
            }
        })
    );
    
    
    //ADD PRODUCTS
    const products = seedData.products;

    console.log("SEEDED.");

}