module.exports = Channel

function Channel(opts) {
  // force instantiation via `new` keyword 
  if(!(this instanceof Channel)) { return new Channel(opts) }
  this.initialize(opts)
}

//
// Public
//

Channel.prototype.emit = function(subscriber,eventName) {
  var self = this
  // grab args array, without the source subscriber
  var args = [].concat.apply([],arguments).slice(1)
  // emit to all subscribers
  self.subscribers.map(function(target) {
    debugger
    // don't emit back to source subscriber
    if (target === subscriber) return 
    // emit event with modified args
    var emitter = target.emitter
    emitter.emit.apply(emitter,args)
  })
}

Channel.prototype.subscribe = function(subscriber) {
  var self = this
  self.subscribers.push(subscriber)
}

Channel.prototype.unsubscribe = function(subscriber) {
  var self = this
  removeItemFromArray(subscriber,self.subscribers)
}

//
// Private
//

Channel.prototype.initialize = function(opts) {
  var self = this
  self.name = opts.name
  self.subscribers = []
}

//
// Utility
//

function removeItemFromArray(item,array) {
  var index = array.indexOf(item);
  if (index !== -1) array.splice(index, 1);
}