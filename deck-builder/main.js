/* eslint-disable no-unused-vars */
/* global boosterPacksList */
var $boosterPacksSection = document.querySelector('#booster-packs-section')
var $displayPacksSelected = document.querySelector('#display-packs-selected')
var $cardListSection = document.querySelector('#card-list-section')
var $cardList = document.querySelector('#card-list')
var $cardCountSection = document.querySelector('#card-count-section')
var $characterCounter = document.querySelector('#character-counter')
var $eventCounter = document.querySelector('#event-counter')
var $climaxCounter = document.querySelector('#climax-counter')
var $cardCounter = document.querySelector('#card-counter')
var $confirm = document.querySelector('#confirm')
var $returnBpSection = document.querySelector('#return-bp-section')
var selectedPacks = []
var deckList = []
var uniqueCards = {}
var climaxCardCounter = 0

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

function renderCard(card) {
  var $row = document.createElement('tr')
  var $cardPreview = document.createElement('td')
  var $cardPreviewPic = document.createElement('img')
  var $cardNumber = document.createElement('td')
  var $cardType = document.createElement('td')
  var $cardName = document.createElement('td')
  var $color = document.createElement('td')
  var $colorText = document.createElement('p')

  $cardPreviewPic.className = 'card-preview'
  $cardPreviewPic.src = card.previewPic
  $cardPreviewPic.alt = card.cardName
  $cardPreview.className = 'preview-padding'
  $cardPreview.appendChild($cardPreviewPic)

  $cardNumber.textContent = card.cardNumber
  $cardType.textContent = card.cardType
  $cardName.textContent = card.cardName

  if (card.color === 'yellow') {
    $colorText.className = 'yellow-card'
    $colorText.textContent = 'YELLOW'
  }
  else if (card.color === 'blue') {
    $colorText.className = 'blue-card'
    $colorText.textContent = 'BLUE'
  }
  else if (card.color === 'red') {
    $colorText.className = 'red-card'
    $colorText.textContent = 'RED'
  }
  else if (card.color === 'green') {
    $colorText.className = 'green-card'
    $colorText.textContent = 'GREEN'
  }
  $color.appendChild($colorText)
  $row.id = card.id
  $row.className = card.class
  $row.appendChild($cardPreview)
  $row.appendChild($cardNumber)
  $row.appendChild($cardType)
  $row.appendChild($cardName)
  $row.appendChild($color)
  return $row
}

function displayPacks(packs) {
  var string = 'Packs Selected: '
  for (var p = 0; p < packs.length; p++) {
    for (var q = 0; q < boosterPacksList.length; q++) {
      if (packs[p] === boosterPacksList[q].id) {
        if (p === 0) {
          string = string + boosterPacksList[q].name
        }
        else {
          string = string + ', ' + boosterPacksList[q].name
        }
      }
    }
  }
  return string
}

function clearList() {
  var $existingList = $cardList.childNodes
  while ($existingList.length > 0) {
    $existingList[0].remove()
  }
}

function addCard(card) {
  if (deckList.length === 50) {
    return
  }

  var allCards = []
  for (var i = 0; i < boosterPacksList.length; i++) {
    if (card.class === boosterPacksList[i].id) {
      for (var j = 0; j < boosterPacksList[i].cards.length; j++) {
        allCards = allCards.concat(boosterPacksList[i].cards[j])
      }
    }
  }

  for (var k = 0; k < allCards.length; k++) {
    if (card.cardNumber === allCards[k].id) {
      var targetCard = allCards[k]
    }
  }

  if (targetCard.cardType !== 'Climax') {
    if (uniqueCards.hasOwnProperty(targetCard.cardName)) {
      if (uniqueCards[targetCard.cardName] < 4) {
        uniqueCards[targetCard.cardName] = uniqueCards[targetCard.cardName] + 1
        deckList.push(targetCard)
      }
    }
    else {
      uniqueCards[targetCard.cardName] = 1
      deckList.push(targetCard)
    }
  }
  else if ((targetCard.cardType === 'Climax') && (climaxCardCounter < 8)) {
    if (uniqueCards.hasOwnProperty(targetCard.cardName)) {
      if (uniqueCards[targetCard.cardName] < 4) {
        climaxCardCounter++
        uniqueCards[targetCard.cardName] = uniqueCards[targetCard.cardName] + 1
        deckList.push(targetCard)
      }
    }
    else {
      uniqueCards[targetCard.cardName] = 1
      deckList.push(targetCard)
      climaxCardCounter++
    }
  }
}

function deckCounter() {
  var characterCounter = 0
  var eventCounter = 0
  var climaxCounter = 0

  for (var i = 0; i < deckList.length; i++) {
    if (deckList[i].cardType === 'Character') {
      characterCounter++
    }
    else if (deckList[i].cardType === 'Event') {
      eventCounter++
    }
    else if (deckList[i].cardType === 'Climax') {
      climaxCounter++
    }
  }
  var deckInfo = {
    cardCount: deckList.length,
    characterCount: characterCounter,
    eventCount: eventCounter,
    climaxCount: climaxCounter
  }
  return deckInfo
}

for (var i = 0; i < boosterPacksList.length; i++) {
  $boosterPacksSection.appendChild(renderPack(boosterPacksList[i]))
}

$boosterPacksSection.addEventListener('click', function (event) {
  if (event.target.closest('button') !== null) {
    if (event.target.closest('button').className === 'button-tiles') {
      selectedPacks.push(event.target.closest('button').id)
      event.target.closest('button').setAttribute('class', 'pack-selected')
    }
    else if (event.target.closest('button').className === 'pack-selected') {
      for (var k = 0; k < selectedPacks.length; k++) {
        if (event.target.closest('button').id === selectedPacks[k]) {
          selectedPacks.splice(k, 1)
        }
      }
      event.target.closest('button').setAttribute('class', 'button-tiles')
    }
  }
})

$confirm.addEventListener('click', function () {
  if (selectedPacks.length > 0) {
    $boosterPacksSection.classList.add('hidden')
    $cardListSection.classList.remove('hidden')
    $displayPacksSelected.classList.remove('hidden')
    $confirm.classList.add('hidden')
    $returnBpSection.classList.remove('hidden')
    clearList()
    selectedPacks.sort()
    $displayPacksSelected.textContent = displayPacks(selectedPacks)
    for (var l = 0; l < selectedPacks.length; l++) {
      for (var m = 0; m < boosterPacksList.length; m++) {
        if (selectedPacks[l] === boosterPacksList[m].id) {
          for (var n = 0; n < boosterPacksList[m].cards.length; n++) {
            $cardList.appendChild(renderCard(boosterPacksList[m].cards[n]))
          }
        }
      }
    }
  }
})

$returnBpSection.addEventListener('click', function () {
  $boosterPacksSection.classList.remove('hidden')
  $cardListSection.classList.add('hidden')
  $displayPacksSelected.classList.add('hidden')
  $confirm.classList.remove('hidden')
  $returnBpSection.classList.add('hidden')
})

$cardList.addEventListener('click', function (event) {
  if (event.target.closest('tr') !== null) {
    var $card = {
      cardNumber: event.target.closest('tr').id,
      class: event.target.closest('tr').className
    }
  }
  addCard($card)
  var deckCount = deckCounter()
  $characterCounter.textContent = deckCount.characterCount
  $eventCounter.textContent = deckCount.eventCount
  $climaxCounter.textContent = deckCount.climaxCount
  $cardCounter.textContent = deckCount.cardCount + '/50'
})
