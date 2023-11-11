const express = require('express');
const router =  express.Router();
const {healthCheck} = require('./serverHealthCheck')
const {processImage} = require('./processImage')

router.get('/status',healthCheck);
router.post('/process-image',processImage);

module.exports = {router}