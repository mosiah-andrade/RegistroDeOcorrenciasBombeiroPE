const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');


router.get('/', ocorrenciaController.getOcorrencias);
router.get('/stats', ocorrenciaController.getOcorrenciasStats);
router.post('/', ocorrenciaController.createOcorrencia);
router.put('/:id', ocorrenciaController.updateOcorrencia);
router.get('/filter', ocorrenciaController.filterOcorrencias);
router.delete('/:id', ocorrenciaController.deleteOcorrencia);

module.exports = router;