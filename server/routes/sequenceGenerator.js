var Sequence = require('../models/sequence');

var maxItemId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        console.log(err);
      }

      sequenceId = sequence._id;
      maxItemId = sequence.maxItemId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'items':
      maxItemId++;
      updateObject = {maxItemId: maxItemId};
      nextId = maxItemId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();