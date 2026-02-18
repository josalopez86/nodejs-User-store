import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services";
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { envs, JwtAdapter } from "../../config";

export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new CategoryService();
    const controller = new CategoryController(service);
    const jwtadapter = new JwtAdapter(envs.SEED_TOKEN);
    const authMiddleware = new AuthMiddleware(jwtadapter);
    
    // Definir las rutas
    router.get('/', controller.getCategories );
    router.post('/', [authMiddleware.validateJWT.bind(authMiddleware)], controller.createCategory );
    router.get('/:id', controller.getCategoryById );

    return router;
  }


}

