// local dependencies
var WalkieTalkie = require('./walkietalkie.js')

module.exports = Channel

function Channel(opts) {
  // force instantiation via `new` keyword 
  if(!(this instanceof Channel)) { return new Channel(opts) }
  this._initialize(opts)
}

//
// Public
//

// create a WalkieTalkie on this channel
Channel.prototype.WalkieTalkie = function() {
  var self = this
  // create new WalkieTalkie
  var newWalkieTalkie = new WalkieTalkie(self)
  // add to subscribers list
  self.subscribers.push(newWalkieTalkie)
  // give new WalkieTalkie to consumer
  return newWalkieTalkie
}

//
// Private
//

Channel.prototype._initialize = function(opts) {
  var self = this
  self.subscribers = []
}

Channel.prototype._emit = function(origin,args) {
  var self = this
  // emit to all subscribers except the origin
  self.subscribers.map(function(target) {
    // don't emit back to origin subscriber
    if (target === origin) return 
    // emit event with original args
    var emitter = target.emitter
    emitter.emit.apply(emitter,args)
  })
}

// remove a WalkieTalkie from the internal subscriber list
Channel.prototype._unsubscribe = function(subscriber) {
  var self = this
  // if subscriber belongs to channel, remove and destroy
  if (-1 === self.subscribers.indexOf(subscriber)) {
    removeItemFromArray(subscriber,self.subscribers)
    subscriber.destroy()  
  } 
}

//
// Utility
//

function removeItemFromArray(item,array) {
  var index = array.indexOf(item);
  if (index !== -1) array.splice(index, 1);
}