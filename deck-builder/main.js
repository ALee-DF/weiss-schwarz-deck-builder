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

function renderPack(packObject) {
  var $newPack = document.createElement('button')
  var $newCover = document.createElement('img')
  var $newName = document.createElement('p')
  $newCover.className = 'booster-pack-icon'
  $newCover.src = packObject.cover
  $newCover.alt = packObject.name

  $newName.textContent = packObject.name

  $newPack.id = packObject.id
  $newPack.appendChild($newCover)
  $newPack.appendChild($newName)
  return $newPack
}

for (var i = 0; i < boosterPacksList.length; i++) {
  $boosterPacksSection.appendChild(renderPack(boosterPacksList[i]))
}
