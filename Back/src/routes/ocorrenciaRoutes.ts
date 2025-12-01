import { Router } from 'express';
import { upload } from "../middlewares/upload";
import * as ocorrenciaController from '../controllers/ocorrenciaController';


const router = Router();

router.get('/', ocorrenciaController.getAllOcorrencias);
router.get('/stats', ocorrenciaController.getOcorrenciasStats);
router.post('/', ocorrenciaController.createOcorrencia);
router.put('/:id', ocorrenciaController.updateOcorrencia);
router.delete('/:id', ocorrenciaController.deleteOcorrencia);
router.get('/filter', ocorrenciaController.filterOcorrencias);
router.get('/opcoes-filtro', ocorrenciaController.getFiltroOptions);
router.post("/:id/midias", upload.array("midias", 10), ocorrenciaController.addMidia);
router.post("/sync", ocorrenciaController.syncOcorrenciasOffline);
export default router;