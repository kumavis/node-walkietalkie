var Stream = require('stream')
var Through = require('through')
var DuplexStream = require('duplexer')
var DuplexEmitter = require('duplex-emitter')
var extend = require('extend')

module.exports = WalkieTalkie

function WalkieTalkie(opts) {
  // force instantiation via `new` keyword 
  if(!(this instanceof WalkieTalkie)) { return new WalkieTalkie(opts) }
  this.initialize(opts)
}

//
// Public
//

WalkieTalkie.prototype.setChannels = function(channelNames) {
  var self = this
  self.removeAllChannels()
  channelNames.map(function(channelName) {
    self.addChannel(channelName)
  })
}

WalkieTalkie.prototype.removeAllChannels = function() {
  var self = this
  self.channels.map(function(channelName) {
    self.removeChannel(channelName)
  })
}

WalkieTalkie.prototype.removeChannel = function(channelName) {
  var self = this
  // get channel
  var channel = WalkieTalkie.channels[channelName]
  // remove self from channel
  removeItemFromArray(self,channel)
  removeItemFromArray(channelName,self.channels)
  // disconnect from channel
  channel.map(function(subscriber) {
    // self.outgoing.unpipe(subscriber.incomming)
    // subscriber.outgoing.unpipe(self.incomming)
  })

  function removeItemFromArray(item,array) {
    var index = array.indexOf(item);
    if (index !== -1) array.splice(index, 1);
  }
}

WalkieTalkie.prototype.addChannel = function(channelName) {
  var self = this
  // get channel, create if new
  if (!WalkieTalkie.channels[channelName]) WalkieTalkie.channels[channelName] = []
  var channel = WalkieTalkie.channels[channelName]
  // connect to channel
  channel.map(function(subscriber) {
    self.outgoing.pipe(subscriber.incomming)
    subscriber.outgoing.pipe(self.incomming)
  })
  // add self to channel
  channel.push(self)
  self.channels.push(channelName)
}

//
// Private
//

WalkieTalkie.channels = {}
WalkieTalkie.nextId = 0

WalkieTalkie.prototype.initialize = function(opts) {
  var self = this
  opts = opts || {}

  //set id
  self.id = WalkieTalkie.nextId++

  // create comms
  self.incomming = Through()
  self.outgoing = Through()
  self.stream = DuplexStream(self.outgoing,self.incomming)
  self.emitter = DuplexEmitter(self.stream)
  // duplex emitters require to have been listening from the emit
  // this is a hack to force the first emit
  self.emitter.emit('prewarm')
  self.incomming.write('[[]')

  // expose emitter api
  extend(self, self.emitter)

  // set initial channels
  self.channels = []
  var channelNames = opts.channels || opts.channel ? [opts.channel] : []
  self.setChannels(channelNames)

}