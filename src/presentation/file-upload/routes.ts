import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new FileUploadService();
    const controller = new FileUploadController(service);

    const validTypes = ["users", "categories", "products"];
    
    
    router.use(TypeMiddleware.validType(validTypes));
    router.use(FileUploadMiddleware.containFiles);
    // Definir las rutas
    router.post('/multiple/:type', controller.UploadMultipleFiles );
    router.post('/single/:type', controller.UploadFile );

    return router;
  }


}

