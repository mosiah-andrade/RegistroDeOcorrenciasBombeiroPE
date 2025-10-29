import { Router } from 'express';
import * as ocorrenciaController from '../controllers/ocorrenciaController';

const router = Router();

router.get('/', ocorrenciaController.getAllOcorrencias);
router.get('/stats', ocorrenciaController.getOcorrenciasStats);
router.post('/', ocorrenciaController.createOcorrencia);
router.put('/:id', ocorrenciaController.updateOcorrencia);
router.delete('/:id', ocorrenciaController.deleteOcorrencia);
router.get('/filter', ocorrenciaController.filterOcorrencias);
router.get('/opcoes-filtro', ocorrenciaController.getFiltroOptions)

export default router;