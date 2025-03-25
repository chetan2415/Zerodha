const mongoose = require("mongoose");

const WithdrawSchema = new mongoose.Schema({
    withdrawAmount: {type:Number, required:true},
},{ timestamps: true });

const WithdrawModel = mongoose.model("Withdraw", WithdrawSchema);
module.exports = WithdrawModel;