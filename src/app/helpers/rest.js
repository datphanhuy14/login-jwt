const express = require('express');
const helper = require('./helper');

const restRoutes = (ModelController) => {
  const router = express.Router();

  // List
  router.get('/', async (req, res) => {
    const payload = await ModelController.fetchAll();
    res.json(helper.formatOutputData(payload, '{{common.success}}'));
  });

  // Retrieve
  router.get('/:id', async (req, res) => {
    const payload = await ModelController.fetch(req.params.id);

    if (payload) {
      res.json(helper.formatOutputData(payload, '{{common.success}}'));
    } else {
      res.status(404).json(helper.displayErrorMessage({message: 'Not found'}));
    }
  });

  // Create
  router.post('/', async (req, res) => {
    try {
      const payload = await ModelController.create(req.body);
      res.status(201).json(helper
          .formatOutputData(payload, '{{common.success}}'));
    } catch (error) {
      res.status(500).json(helper.displayErrorMessage(error));
    }
  });

  // Update
  router.patch('/:id', async (req, res) => {
    try {
      const payload = await ModelController.update(req.params.id, req.body);
      res.status(204).json(helper
          .formatOutputData(payload, '{{common.success}}'));
    } catch (error) {
      res.status(500).json(helper.displayErrorMessage(error));
    }
  });

  // Delete
  router.delete('/:id', async (req, res) => {
    try {
      await ModelController.delete(req.params.id);
      res.json({message: 'true'});
    } catch (error) {
      res.status(404).json(helper.displayErrorMessage(error));
    }
  });

  return router;
};

module.exports = restRoutes;
