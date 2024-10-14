// models/Invoice.js
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    amount: Number,
    status: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);
