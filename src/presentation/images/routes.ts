import { Router } from "express";
import { FileUploadService } from "../services";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { ImagesController } from "./controller";
import { get } from 'env-var';

export class ImagesRoutes {


  static get routes(): Router {

    const controller = new ImagesController();

    const router = Router();
    // Definir las rutas
    router.get('/:type/:id', controller.getFile);
    

    return router;
  }


}

