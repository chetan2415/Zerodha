const mongoose = require("mongoose");

const AddFundsSchema = new mongoose.Schema({
    amount:{type:Number, required: true},
},{ timestamps: true });

const AddFundsModel = mongoose.model("AddFunds", AddFundsSchema);
module.exports = AddFundsModel;
