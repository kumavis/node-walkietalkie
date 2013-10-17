# WalkieTalkie

### About
For managining 2-way communication between multiple autonomous entities

Create a channel,
then a bunch of 'walkie-talkies',
then send and receive events over them!

each walkie-talkie acts like a [duplex-emitter](https://github.com/pgte/duplex-emitter)

### Examples

<a class="requirebin-link" target="_blank" href="http://requirebin.com/?gist=7031031"><img src="http://requirebin.com/badge.png"></a>
```javascript
var WTChannel = require('walkietalkie')

var team = WTChannel()

var shaggy = team.WalkieTalkie()
var scooby = team.WalkieTalkie()
var daphne = team.WalkieTalkie()
var fred   = team.WalkieTalkie()
var velma  = team.WalkieTalkie()

shaggy.on('ruh-oh',function() {
  console.log('zoinks!')
})

scooby.emit('ruh-oh')
```


See [tests](https://github.com/kumavis/node-walkietalkie/blob/master/test.js) for more examples
