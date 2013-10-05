var WalkieTalkie = require('./index.js')

console.log('maxogden and harrison in #voxel.js')
var maxogden = new WalkieTalkie({ channel: 'voxeljs' })
var harrison = new WalkieTalkie({ channel: 'voxeljs' })

maxogden.on('hello',function() {
  throw 'maxogden heard himself'
})

harrison.on('hello',function() {
  console.log('harrison heard hello')
})

console.log('maxogden says hello')
maxogden.emit('hello')

// -----

console.log('kumavis joins #voxel.js')
var kumavis = new WalkieTalkie({ channel: 'voxeljs' })

maxogden.on('heyo',function() {
  console.log('maxogden heard heyo')
})

harrison.on('heyo',function() {
  console.log('harrison heard heyo')
})

kumavis.on('heyo',function() {
  throw 'kumavis heard himself'
})

console.log('kumavis says heyo')
kumavis.emit('heyo')

// ------

var theMasses = []
var secretSociety = []

theMasses.push(new WalkieTalkie({ channel: 'public' }))
theMasses.push(new WalkieTalkie({ channel: 'public' }))
theMasses.push(new WalkieTalkie({ channel: 'public' }))

secretSociety.push(new WalkieTalkie({ channel: 'secret' }))
secretSociety.push(new WalkieTalkie({ channel: 'secret' }))

secretSociety.map(function(subscriber) {
  subscriber.on('secret',function() {
    console.log('secretSociety member heard the secret')
  })
})

theMasses.map(function(subscriber) {
  subscriber.on('secret',function() {
    throw 'theMasses heard the secret'
  })
})

secretSociety[0].emit('secret')

// ------

var television = nTimes(6,function(index){ return new WalkieTalkie({ channel: index }) })
var channelSurfer = new WalkieTalkie()

channelSurfer.on('commercial',function() {
  var currentChannel = channelSurfer.channels[0]
  throw 'surfer saw commercial')
})
channelSurfer.on('show',function() {
  var currentChannel = channelSurfer.channels[0]
  console.log('surfer saw show on',currentChannel)
})

channelSurfer.setChannels([0])
television[0].emit('show')
channelSurfer.setChannels([1])
television[1].emit('show')
channelSurfer.setChannels([2])
television[2].emit('show')
channelSurfer.setChannels([3])
television[3].emit('show')

television[0].emit('commercial')
television[1].emit('commercial')
television[2].emit('commercial')
channelSurfer.removeAllChannels()
television[3].emit('commercial')

// ------

// utility to run a function n times, and return an array of the returned values
function nTimes(times,func) {
  return Array(+times).join('-').split('-').map(function(_,index){
    return func(index)
  })
}

