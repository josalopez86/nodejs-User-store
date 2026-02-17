import { Router } from "express";
import { AuthMiddelware } from '../middlewares/auth.middelware';
import { envs, JwtAdapter } from "../../config";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new ProductService();
    const controller = new ProductController(service);
    const jwtadapter = new JwtAdapter(envs.SEED_TOKEN);
    const authMiddelware = new AuthMiddelware(jwtadapter);
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', [authMiddelware.validateJWT.bind(authMiddelware)], controller.createProduct );
    router.get('/:id', controller.getproductById );

    return router;
  }


}

