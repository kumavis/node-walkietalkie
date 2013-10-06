// external dependencies
var extend = require('extend')
var EventEmitter = require('events').EventEmitter
// local dependencies
var Channel = require('./lib/channel.js')

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
  for (var channelName in self.channels) {
    self.removeChannel(channelName)
  }
}

WalkieTalkie.prototype.removeChannel = function(channelName) {
  var self = this
  // get channel
  var channel = WalkieTalkie.channels[channelName]
  delete self.channels[channelName]
  // remove self from channel
  channel.unsubscribe(self)
}

WalkieTalkie.prototype.addChannel = function(channelName) {
  var self = this
  // get channel, create if new
  if (!WalkieTalkie.channels[channelName]) WalkieTalkie.channels[channelName] = new Channel({name: channelName})
  var channel = WalkieTalkie.channels[channelName]
  // add channel to subscribed channels list
  self.channels[channelName] = {
    _: channel,
    name: channelName,
    // expose an emit function that adds a ref to the emitting walkietalkie
    emit: function emit() {
      // normalize args array
      var args = [].concat.apply([],arguments)
      // add walkietalkie as first arg
      args.unshift(self)
      // emit event with modified args
      this.emit.apply(this,args)
    }.bind(channel),
    on: function on() {
      var emitter = self.emitter
      emitter.on.apply(emitter,arguments)
    },
  }
  // add self to channel
  channel.subscribe(self)
}

WalkieTalkie.prototype.emit = function() {
  var self = this
  // forward to all subscribed channels
  for (var channelName in self.channels) {
    var channel = self.channels[channelName]
    channel.emit.apply(channel,arguments)
  }
}

WalkieTalkie.prototype.on = function() {
  var self = this
  // forward to all subscribed channels
  for (var channelName in self.channels) {
    var channel = self.channels[channelName]
    channel.on.apply(channel,arguments)
  }
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
  self.emitter = new EventEmitter()
  // set initial channels
  self.channels = {}
  var channelNames = opts.channels || opts.channel ? [opts.channel] : []
  self.setChannels(channelNames)
}
