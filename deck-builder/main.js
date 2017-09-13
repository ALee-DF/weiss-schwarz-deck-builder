/* eslint-disable no-unused-vars */
var boosterPacksList = [
  {
    id: 'attack-on-titan-bp',
    cover: 'booster-packs/aot-bp.jpg',
    name: 'Attack on Titan'
  },
  {
    id: 'love-live-bp',
    cover: 'booster-packs/love-live!-bp.jpg',
    name: 'Love Live!'
  },
  {
    id: 'love-live-vol-2-bp',
    cover: 'booster-packs/love-live!-vol-2-bp.jpg',
    name: 'Love Live! Vol.2'
  },
  {
    id: 'sword-art-online-bp',
    cover: 'booster-packs/sao-bp.jpg',
    name: 'Sword Art Online'
  },
  {
    id: 'sword-art-online-vol-2-bp',
    cover: 'booster-packs/sao-vol-2-bp.jpg',
    name: 'Sword Art Online Vol. 2'
  }
]

var $boosterPacksSection = document.querySelector('#booster-packs-section')

function renderPack(pack) {
  var $pack = document.createElement('button')
  var $cover = document.createElement('img')
  var $name = document.createElement('p')
  $cover.className = 'booster-pack-icon'
  $cover.src = pack.cover
  $cover.alt = pack.name

  $name.className = 'pack-title'
  $name.textContent = pack.name

  $pack.id = pack.id
  $pack.className = 'button-tiles'
  $pack.appendChild($cover)
  $pack.appendChild($name)
  return $pack
}

for (var i = 0; i < boosterPacksList.length; i++) {
  $boosterPacksSection.appendChild(renderPack(boosterPacksList[i]))
}
