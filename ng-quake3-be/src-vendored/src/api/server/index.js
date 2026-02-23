'use strict';

const Router = require('express').Router;
const controller = require('./server.controller');

let router = new Router();

router.get('/mode', controller.getMode);
router.post('/mode', controller.setMode);
router.get('/instagib', controller.getInstagib);
router.post('/instagib', controller.setInstagib);
router.get('/settings', controller.getSettings);
router.post('/settings', controller.setSetting);

module.exports = router;
