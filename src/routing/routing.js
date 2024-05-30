const express = require('express');
const { create, fetch, update, deleteEmp } = require('../controller/controller.js');

const router = express.Router();

router.get('', fetch);
router.post('/emp', create);
router.get('/emp', fetch);
router.patch('/emp/:id', update);
router.delete('/emp/:id', deleteEmp);

module.exports = router;