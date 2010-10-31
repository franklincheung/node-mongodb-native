var BaseCommand = require('./base_command').BaseCommand,
  BinaryParser = require('../bson/binary_parser').BinaryParser,
  inherits = require('sys').inherits;

/**
  Get More Document Command
@constructor
@augments BaseCommand
@param db Object representing the database
@param collectionName String representing the name of the collection
@param numberToReturn
@param cursorId
*/
var GetMoreCommand = exports.GetMoreCommand = function(db, collectionName, numberToReturn, cursorId) {
  BaseCommand.call(this);

  this.collectionName = collectionName;
  this.numberToReturn = numberToReturn;
  this.cursorId = cursorId;
  this.db = db;
};

inherits(GetMoreCommand, BaseCommand);

/**
Returns the opcode
*/
GetMoreCommand.prototype.getOpCode = function() {
  return BaseCommand.OP_GET_MORE;
};

/**
Generates and returns the command string
*/
GetMoreCommand.prototype.getCommand = function() {
  // Generate the command string
  return BinaryParser.fromInt(0) + BinaryParser.encode_cstring(this.collectionName) + BinaryParser.fromInt(this.numberToReturn) + this.db.bson_serializer.BSON.encodeLong(this.cursorId);
};