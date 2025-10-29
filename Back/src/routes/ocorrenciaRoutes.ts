import { Router } from 'express';
import * as ocorrenciaController from '../controllers/ocorrenciaController';

const router = Router();

router.get('/', ocorrenciaController.getAllOcorrencias);
router.get('/stats', ocorrenciaController.getOcorrenciasStats);
router.post('api/ocorrencias', ocorrenciaController.createOcorrencia);
router.put('/:id', ocorrenciaController.updateOcorrencia);
router.get('/filter', ocorrenciaController.filterOcorrencias);

export default router;