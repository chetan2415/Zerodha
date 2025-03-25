const mongoose = require("mongoose");

const AddFundsSchema = new mongoose.Schema({
    amount:{type:Number, required: true},
},{ timestamps: true });

const AddFundsModel = mongoose.model("AddFund", AddFundsSchema);
module.exports = AddFundsModel;