'use strict'

const animateHeader = require('text-animate').header
const animateLabel  = require('text-animate').label
const animateText   = require('text-animate').text
const controller      = require('text-animate').controller


const anim = controller()

const seed = Math.random() // enables consistent randomness for this session

const p5 = {
  color: [ 0, 0, 0 ],  // [ r, g, b ]
  duration: 300,
  delay: 200,      // milliseconds to wait before animation starts
  seed
}

const headers = document.querySelectorAll('h1,h2')

for(let i=0; i < headers.length; i++) {
  if(headers[i].classList.contains('no-animation')) {
    continue
  }

  p5.delay += Math.floor(50 + Math.random() * 50)
  anim.add(animateHeader(headers[i], p5))
}


const p3 = {
  delay: 400,
  etchSpeed: 10 + Math.round(Math.random() * 4), // milliseconds/character
  targetBGColor: 'rgb(255,255,255)',
  targetFGColor: 'rgb(40, 40, 40)',
  etchBGColor:   'rgb(62, 62, 62)',
  etchFGColor:   'rgb(255,20,147)',
  seed
}

const lis = document.querySelectorAll('li,p')
for(let i=0; i < lis.length; i++) {
  if(lis[i].classList.contains('no-animation')) {
    continue
  }

  anim.add(animateText(lis[i], p3))
}

const p4 = {
  delay: 600,
  color: [ 30, 144, 255 ],
  seed
}

const aas = document.querySelectorAll('a')
for(let i=0; i < aas.length; i++) {
  aas[i].style.color = 'dodgerblue'
}
anim.add(animateLabel(aas[aas.length-1], p4))

anim.start()
