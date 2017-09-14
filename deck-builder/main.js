/* eslint-disable no-unused-vars */
var boosterPacksList = [
  {
    id: 'attack-on-titan-bp',
    cover: 'booster-packs/aot-card-list/aot-bp.jpg',
    name: 'Attack on Titan',
    cards: [
      {
        id: 's35-e001',
        cardName: '"Beyond the Walls" Eren',
        cardNumber: 'AOT/S35-E001',
        expansion: 'Attack on Titan',
        cardType: 'Character',
        level: 0,
        power: 1000,
        trigger: '-',
        rarity: 'R',
        side: 'S',
        color: 'yellow',
        cost: 0,
        soul: 1,
        attribute: ['Corps', 'Weapon'],
        text: '【CONT】 During your turn, your other character in the middle ' +
          'position of the center stage gets +1000 power.\n【ACT】 Brainstorm ' +
          '[(1) 【REST】 this card] Reveal four cards from the top of your ' +
          'deck, and put them into your waiting room. For each climax ' +
          'revealed, search your deck for up to one 《Corps》 character, ' +
          'reveal it to your opponent, and put it into your hand. Shuffle ' +
          'your deck afterwards.',
        previewPic: 'booster-packs/aot-card-list/card-preview/s35-e001-preview.jpg',
        picture: 'booster-packs/aot-card-list/card/s35-e001.jpg'
      }
    ]
  },
  {
    id: 'love-live-bp',
    cover: 'booster-packs/love-live!-card-list/love-live!-bp.jpg',
    name: 'Love Live!'
  },
  {
    id: 'love-live-vol-2-bp',
    cover: 'booster-packs/love-live!-vol-2-card-list/love-live!-vol-2-bp.jpg',
    name: 'Love Live! Vol.2'
  },
  {
    id: 'sword-art-online-bp',
    cover: 'booster-packs/sao-card-list/sao-bp.jpg',
    name: 'Sword Art Online'
  },
  {
    id: 'sword-art-online-vol-2-bp',
    cover: 'booster-packs/sao-vol-2-card-list/sao-vol-2-bp.jpg',
    name: 'Sword Art Online Vol. 2'
  }
]

var $boosterPacksSection = document.querySelector('#booster-packs-section')
var $confirm = document.querySelector('#confirm')
var $selectedPacks = []

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

// Populate booster packs list
for (var i = 0; i < boosterPacksList.length; i++) {
  $boosterPacksSection.appendChild(renderPack(boosterPacksList[i]))
}

// Create Event Listeners for each button in the booster packs list
var $buttons = document.querySelectorAll('.button-tiles')
for (var j = 0; j < $buttons.length; j++) {
  $buttons[j].addEventListener('click', function (event) {
    // If booster pack is selected, the button's class is changed to
    // 'pack-selected' and the selected booster pack is recorded into
    // $selectedPacks array
    if (event.currentTarget.getAttribute('class') === 'button-tiles') {
      $selectedPacks.push(event.currentTarget.getAttribute('id'))
      event.currentTarget.setAttribute('class', 'pack-selected')
    }
    else {
      // If booster pack is unselected, the button's class returns to
      // 'button-tiles' and the unselected booster pack is removed from
      // $selectedPacks array.
      for (var k = 0; k < $selectedPacks.length; k++) {
        if (event.currentTarget.getAttribute('id') === $selectedPacks[k]) {
          $selectedPacks.splice(k, 1)
        }
      }
      event.currentTarget.setAttribute('class', 'button-tiles')
    }
  })
}
