import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services";
import { AuthMiddelware } from '../middlewares/auth.middelware';
import { envs, JwtAdapter } from "../../config";

export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new CategoryService();
    const controller = new CategoryController(service);
    const jwtadapter = new JwtAdapter(envs.SEED_TOKEN);
    const authMiddelware = new AuthMiddelware(jwtadapter);
    
    // Definir las rutas
    router.get('/', controller.getCategories );
    router.post('/', [authMiddelware.validateJWT.bind(authMiddelware)], controller.createCategory );
    router.get('/:id', controller.getCategoryById );

    return router;
  }


}

