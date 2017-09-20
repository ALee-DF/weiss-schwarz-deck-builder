/* eslint-disable no-unused-vars */
/* global boosterPacksList */
var $boosterPacksSection = document.querySelector('#booster-packs-section')
var $displayPacksSelected = document.querySelector('#display-packs-selected')
var $cardListSection = document.querySelector('#card-list-section')
var $deckListSection = document.querySelector('#deck-list-section')
var $boosterPackAndCardListSection = document.querySelector('#booster-pack-and-card-list-section')
var $cardsAndPacksButtons = document.querySelector('#cards-and-packs-buttons')
var $cardList = document.querySelector('#card-list')
var $cardCountSection = document.querySelector('#card-count-section')
var $characterCounter = document.querySelector('#character-counter')
var $eventCounter = document.querySelector('#event-counter')
var $climaxCounter = document.querySelector('#climax-counter')
var $cardCounter = document.querySelector('#card-counter')
var $level0 = document.querySelector('#level-0')
var $level1 = document.querySelector('#level-1')
var $level2 = document.querySelector('#level-2')
var $level3 = document.querySelector('#level-3')
var $event = document.querySelector('#event')
var $climax = document.querySelector('#climax')
var $viewCards = document.querySelector('#view-cards')
var $viewPacks = document.querySelector('#view-packs')
var $viewDeck = document.querySelector('#view-deck')
var $return = document.querySelector('#return')
var selectedPacks = []
var deckList = []
var uniqueCardNames = {}
var climaxCardCounter = 0
var uniqueCardNumbers = {}

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
    return null
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
    if (uniqueCardNames.hasOwnProperty(targetCard.cardName)) {
      if (uniqueCardNames[targetCard.cardName] < 4) {
        uniqueCardNames[targetCard.cardName] = uniqueCardNames[targetCard.cardName] + 1
        deckList.push(targetCard)
        return targetCard
      }
    }
    else {
      uniqueCardNames[targetCard.cardName] = 1
      deckList.push(targetCard)
      return targetCard
    }
  }
  else if ((targetCard.cardType === 'Climax') && (climaxCardCounter < 8)) {
    if (uniqueCardNames.hasOwnProperty(targetCard.cardName)) {
      if (uniqueCardNames[targetCard.cardName] < 4) {
        climaxCardCounter++
        uniqueCardNames[targetCard.cardName] = uniqueCardNames[targetCard.cardName] + 1
        deckList.push(targetCard)
        return targetCard
      }
    }
    else {
      uniqueCardNames[targetCard.cardName] = 1
      deckList.push(targetCard)
      climaxCardCounter++
      return targetCard
    }
  }
  return null
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

function renderDeckListCard(card) {
  var $div = document.createElement('div')
  var $img = document.createElement('img')
  var $p = document.createElement('p')
  var $select = document.createElement('select')
  var $option0 = document.createElement('option')
  var $option1 = document.createElement('option')
  var $option2 = document.createElement('option')
  var $option3 = document.createElement('option')
  var $option4 = document.createElement('option')

  if (card.cardType === 'Climax') {
    $div.className = 'climax-card-icons'
    $img.className = 'full-climax-card-illustration'
  }
  else {
    $div.className = 'card-icons'
    $img.className = 'full-card-illustration'
  }
  $img.src = card.picture
  $img.alt = card.cardName

  $p.className = 'card-title'
  $p.textContent = card.cardName + ' (' + card.rarity + ')'

  $option0.value = 0
  $option0.textContent = 0
  $option1.value = 1
  $option1.textContent = 1
  $option1.setAttribute('selected', '')
  $option2.value = 2
  $option2.textContent = 2
  $option3.value = 3
  $option3.textContent = 3
  $option4.value = 4
  $option4.textContent = 4

  $select.setAttribute('card-number', card.id)
  $select.setAttribute('pack', card.class)
  $select.className = 'select-bar'
  $select.appendChild($option0)
  $select.appendChild($option1)
  $select.appendChild($option2)
  $select.appendChild($option3)
  $select.appendChild($option4)

  $div.appendChild($img)
  $div.appendChild($p)
  $div.appendChild($select)

  return $div
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

$viewCards.addEventListener('click', function () {
  if (selectedPacks.length > 0) {
    $boosterPacksSection.classList.add('hidden')
    $cardListSection.classList.remove('hidden')
    $displayPacksSelected.classList.remove('hidden')
    $viewCards.classList.add('hidden')
    $viewPacks.classList.remove('hidden')
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

$viewPacks.addEventListener('click', function () {
  $boosterPacksSection.classList.remove('hidden')
  $cardListSection.classList.add('hidden')
  $displayPacksSelected.classList.add('hidden')
  $viewCards.classList.remove('hidden')
  $viewPacks.classList.add('hidden')
})

$cardList.addEventListener('click', function (event) {
  if (event.target.closest('tr') !== null) {
    var $card = {
      cardNumber: event.target.closest('tr').id,
      class: event.target.closest('tr').className
    }
  }
  var fullCardInfo = addCard($card)
  var deckCount = deckCounter()
  $characterCounter.textContent = deckCount.characterCount
  $eventCounter.textContent = deckCount.eventCount
  $climaxCounter.textContent = deckCount.climaxCount
  $cardCounter.textContent = deckCount.cardCount + '/50'

  if (fullCardInfo === null) {
    return
  }
  if (uniqueCardNumbers.hasOwnProperty(fullCardInfo.id)) {
    var $selectElementsList = document.querySelectorAll('select')
    for (var i = 0; i < $selectElementsList.length; i++) {
      if ($selectElementsList[i].hasAttribute('card-number')) {
        if ($selectElementsList[i].getAttribute('card-number') === fullCardInfo.id) {
          var $targetSelectElement = $selectElementsList[i]
        }
      }
    }

    if (uniqueCardNumbers[fullCardInfo.id] === 1) {
      $targetSelectElement.options[1].removeAttribute('selected')
      $targetSelectElement.options[2].setAttribute('selected', '')
    }
    else if (uniqueCardNumbers[fullCardInfo.id] === 2) {
      $targetSelectElement.options[2].removeAttribute('selected')
      $targetSelectElement.options[3].setAttribute('selected', '')
    }
    else if (uniqueCardNumbers[fullCardInfo.id] === 3) {
      $targetSelectElement.options[3].removeAttribute('selected')
      $targetSelectElement.options[4].setAttribute('selected', '')
    }
    uniqueCardNumbers[fullCardInfo.id] = uniqueCardNumbers[fullCardInfo.id] + 1
  }
  else {
    uniqueCardNumbers[fullCardInfo.id] = 1
    var levels = [$level0, $level1, $level2, $level3]
    if (fullCardInfo.cardType === 'Character') {
      levels[fullCardInfo.level].appendChild(renderDeckListCard(fullCardInfo))
    }
    else if (fullCardInfo.cardType === 'Event') {
      $event.appendChild(renderDeckListCard(fullCardInfo))
    }
    else if (fullCardInfo.cardType === 'Climax') {
      $climax.appendChild(renderDeckListCard(fullCardInfo))
    }
  }

})

$viewDeck.addEventListener('click', function () {
  if (deckList.length > 0) {
    $boosterPackAndCardListSection.classList.add('hidden')
    $deckListSection.classList.remove('hidden')
    $cardsAndPacksButtons.classList.add('invisible')
    $viewDeck.classList.add('hidden')
    $return.classList.remove('hidden')
  }
})

$return.addEventListener('click', function () {
  $boosterPackAndCardListSection.classList.remove('hidden')
  $deckListSection.classList.add('hidden')
  $cardsAndPacksButtons.classList.remove('invisible')
  $viewDeck.classList.remove('hidden')
  $return.classList.add('hidden')
})

$deckListSection.addEventListener('change', function (event) {
  var $targetSelectElement = event.target
  var selectedIndex = event.target.selectedIndex

  if (selectedIndex === 0) {
    $targetSelectElement.parentNode.remove()
  }
  else {
    updateDeck($targetSelectElement)
  }
})

function updateDeck(selectElement) {
  var cardNumber = selectElement.getAttribute('card-number')
  var pack = selectElement.getAttribute('pack')
  var selectedIndex = selectElement.selectedIndex

  console.log(cardNumber)
  console.log(pack)
  console.log(selectedIndex)
}
