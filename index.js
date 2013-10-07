// local dependencies
var Channel = require('./lib/channel.js')

module.exports = function createChannel() {
  return new Channel()
}