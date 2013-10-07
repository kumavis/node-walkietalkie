# WalkieTalkie

### About
Create a bunch of 'walkie-talkies'
that can talk on and listen to different channels

each walkie-talkie acts like a [duplex-emitter][1]

For managining 2-way communication between multiple autonomous entities

### Examples

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

See [tests][0] for more

[0]:[https://github.com/kumavis/node-walkietalkie/blob/master/test.js]
[1]:[https://github.com/pgte/duplex-emitter]