import { Response, Request } from "express";
import { GetStoreByIdService } from "../../services/store/GetByIdService";

export class GetStoreByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { storeId } = req.params; // Obtém o storeId diretamente dos parâmetros
      
      const storeService = new GetStoreByIdService();
      const result = await storeService.execute({ storeId: Number(storeId) }); // Converte para número

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        error: `Controller: ${error instanceof Error ? error.message : 'error getting store by id.'}` 
      });
    }
  }
}

