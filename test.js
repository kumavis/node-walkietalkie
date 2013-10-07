// Dependencies
var WTChannel = require('./index.js')

// ------
console.log(' --- ')
// ------

var WTChannel = require('./index.js')

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

// ------
console.log(' --- ')
// ------

var voxeljs = WTChannel()

console.log('maxogden and harrison in #voxel.js')
var maxogden = voxeljs.WalkieTalkie()
var harrison = voxeljs.WalkieTalkie()

maxogden.on('hello',function() {
  throw 'ERR - maxogden heard himself'
})

harrison.on('hello',function() {
  console.log('harrison heard hello')
})

console.log('maxogden says hello')
maxogden.emit('hello')

console.log('kumavis joins #voxel.js')
var kumavis = voxeljs.WalkieTalkie()

maxogden.on('heyo',function() {
  console.log('maxogden heard heyo')
})

harrison.on('heyo',function() {
  console.log('harrison heard heyo')
})

kumavis.on('heyo',function() {
  throw 'ERR - kumavis heard himself'
})

console.log('kumavis says heyo')
kumavis.emit('heyo')

// ------
console.log(' --- ')
// ------

console.log( 'a secret society hidden among the masses' )
var theMasses = WTChannel()
var secretSociety = WTChannel()

theMasses.WalkieTalkie()
theMasses.WalkieTalkie()
theMasses.WalkieTalkie()
theMasses.WalkieTalkie()
theMasses.WalkieTalkie()

secretSociety.WalkieTalkie()
secretSociety.WalkieTalkie()

secretSociety.subscribers.map(function(subscriber) {
  subscriber.on('conspiracy',function() {
    console.log('secretSociety member heard the conspiracy')
  })
})

theMasses.subscribers.map(function(subscriber) {
  subscriber.on('conspiracy',function() {
    throw 'ERR - theMasses heard the conspiracy'
  })
})

console.log( 'the secret society discusses the conspiracy' )
secretSociety.subscribers[0].emit('conspiracy')

// ------
console.log(' --- ')
// ------
