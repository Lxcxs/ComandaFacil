import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { GetStoreTableService } from "../../services/tableServices/GetStoreTableService";

class GetStoreTableController {

  async handle(req: Request, res: Response) {

    const tableService = new GetStoreTableService();

    try {
      const token = findHeaders(req, "authorization");
      const idPath = req.path;
  
      if (`/${token?.storeId}` !== idPath) {
        return res
          .status(403)
          .json({ error: "The path doesn't match the token." });
      }

      const storeId = parseInt(token?.storeId);
      const result = tableService.execute(storeId);
      return res.status(200).json(result);

    } catch(error) {
      console.error;
      res.status(500).json({ error: "Controller: An internal server error occurred." })
    }
  }
}
export { GetStoreTableController };