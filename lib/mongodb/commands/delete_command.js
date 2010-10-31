var BaseCommand = require('./base_command').BaseCommand,
  BinaryParser = require('../bson/binary_parser').BinaryParser,
  inherits = require('sys').inherits;

/**
  Command representing a deletion from a database 
@constructor
@augments BaseCommand
@param db Object representing the database
@param collectionName Name of the collection
@param selector criteria for deleting from the collection
**/
var DeleteCommand = exports.DeleteCommand = function(db, collectionName, selector) {
  BaseCommand.call(this);

  this.collectionName = collectionName;
  this.selector = selector;
  this.db = db;
};

inherits(DeleteCommand, BaseCommand);

/** 
Returns the opcode. Inherited from BaseCommand.
*/
DeleteCommand.prototype.getOpCode = function() {
  return BaseCommand.OP_DELETE;
};

/*
struct {
    MsgHeader header;                 // standard message header
    int32     ZERO;                   // 0 - reserved for future use
    cstring   fullCollectionName;     // "dbname.collectionname"
    int32     ZERO;                   // 0 - reserved for future use
    mongo.BSON      selector;               // query object.  See below for details.
}
*/
/**
Generates and returns the command string
*/
DeleteCommand.prototype.getCommand = function() {
  // Generate the command string
  return BinaryParser.fromInt(0) + BinaryParser.encode_cstring(this.collectionName) + BinaryParser.fromInt(0) + this.db.bson_serializer.BSON.serialize(this.selector);
};