var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');


const Item = require('../models/item');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Item.find()
    .then(items => {
      res.status(200).json({
        message: 'Items fetched successfully',
        items: items
      });
    })
    .catch(error => {
      returnError(res, error);
    });
  }
);

router.post('/', (req, res, next) => {
  const maxItemId = sequenceGenerator.nextId("items");

  const item = new Item({
    id: maxItemId,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  });

  item.save()
    .then(createdItem => {
      res.status(201).json({
        message: 'Item added successfully',
        item: createdItem
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Item.findOne({ id: req.params.id })
    .then(item => {
      item.title = req.body.title;
      item.description = req.body.description;
      item.image = req.body.image;

      Item.updateOne({ id: req.params.id }, item)
        .then(result => {
          res.status(204).json({
            message: 'Item updated successfully'
          })
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Item not found.',
        error: { item: 'Item not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Item.findOne({ id: req.params.id })
    .then(item => {
      Item.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: "Item deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;