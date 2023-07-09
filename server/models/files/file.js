const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sharedWith: [
    {
      email: {
        type: String,
        required: true
      },
      accessLevel: {
        type: String,
        enum: ['view', 'comment'],
        default: 'view'
      }
    }
  ]
});

module.exports = mongoose.model('File', fileSchema);
