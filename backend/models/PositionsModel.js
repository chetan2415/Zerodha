const {model} = require("mongoose");

const {positionsSchema} = require("../schemas/PositionsSchema");

const PositionsModel = new model("Position", positionsSchema);

module.exports = {PositionsModel};