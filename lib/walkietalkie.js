// external dependencies
var extend = require('extend')
var async = require('async')
var EventEmitter = require('events').EventEmitter

module.exports = WalkieTalkie

function WalkieTalkie(opts) {
  // force instantiation via `new` keyword 
  if(!(this instanceof WalkieTalkie)) { return new WalkieTalkie(opts) }
  this._initialize(opts)
}

//
// Public
//

WalkieTalkie.prototype.emit = function() {
  var self = this
  var args = arguments
  async.nextTick(function() {
    // forward emit to channel
    self.channel._emit(self,args)
  })
}

WalkieTalkie.prototype.on = function() {
  var self = this
  // add event listener
  var emitter = self.emitter
  emitter.on.apply(emitter,arguments)
}

WalkieTalkie.prototype.destroy = function() {
  var self = this
  // remove emitter
  if (self.emitter) delete self.emitter
  // unsubscribe from channel, if still connected already
  self.channel._unsubscribe(self)
}

//
// Private
//

WalkieTalkie.prototype._initialize = function(channel) {
  var self = this
  // record channel
  self.channel = channel
  // create event emitter
  self.emitter = new EventEmitter()
}
