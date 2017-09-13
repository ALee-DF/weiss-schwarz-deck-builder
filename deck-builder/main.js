/* eslint-disable no-unused-vars */
var boosterPacksList = [
  {
    id: 'attack-on-titan-bp',
    cover: 'booster-packs/aot-bp.jpg',
    name: 'Attack on Titan Booster Pack'
  },
  {
    id: 'love-live-bp',
    cover: 'booster-packs/love-live!-bp.jpg',
    name: 'Love Live! Booster Pack'
  },
  {
    id: 'love-live-vol-2-bp',
    cover: 'booster-packs/love-live!-vol-2-bp.jpg',
    name: 'Love Live! Vol.2 Booster Pack'
  },
  {
    id: 'sword-art-online-bp',
    cover: 'booster-packs/sao-bp.jpg',
    name: 'Sword Art Online Booster Pack'
  },
  {
    id: 'sword-art-online-vol-2-bp',
    cover: 'booster-packs/sao-vol-2-bp.jpg',
    name: 'Sword Art Online Vol. 2 Booster Pack'
  }
]

var $boosterPacksSection = document.querySelector('#booster-packs-section')

function renderPack(packObject) {
  var $newPack = document.createElement('button')
  var $newCover = document.createElement('img')
  $newCover.className = 'booster-pack-icon'
  $newCover.src = packObject.cover
  $newCover.alt = packObject.name

  $newPack.id = packObject.id
  $newPack.appendChild($newCover)
  return $newPack
}

for (var i = 0; i < boosterPacksList.length; i++) {
  $boosterPacksSection.appendChild(renderPack(boosterPacksList[i]))
}
