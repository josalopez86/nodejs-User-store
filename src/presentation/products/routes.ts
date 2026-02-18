import { Router } from "express";
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { envs, JwtAdapter } from "../../config";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new ProductService();
    const controller = new ProductController(service);
    const jwtadapter = new JwtAdapter(envs.SEED_TOKEN);
    const authMiddleware = new AuthMiddleware(jwtadapter);
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', [authMiddleware.validateJWT.bind(authMiddleware)], controller.createProduct );
    router.get('/:id', controller.getproductById );

    return router;
  }


}

