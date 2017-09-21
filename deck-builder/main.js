/* eslint-disable no-unused-vars */
/* global boosterPacksList */
var $boosterPacksSection = document.querySelector('#booster-packs-section')
var $displayPacksSelected = document.querySelector('#display-packs-selected')
var $cardListSection = document.querySelector('#card-list-section')
var $filters = document.querySelector('#filters')
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
var $returnPrevious = document.querySelector('#return')
var listOfCards = []
var selectedPacks = []
var deckList = []
var uniqueCardNames = {}
var climaxCardCounter = 0
var uniqueCardNumbers = {}
var currentDesiredLevel = 'all-levels'
var currentDesiredCost = 'all-costs'
var currentDesiredColor = 'all-colors'
var currentDesiredRarity = 'all-rarities'

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

function searchCardInfo(card) {
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
  return targetCard
}

function addCard(card) {
  if (deckList.length === 50) {
    return null
  }

  var targetCard = searchCardInfo(card)

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

function removeCardInDeck(card) {
  var previousNumCopy = uniqueCardNumbers[card.id]
  delete uniqueCardNumbers[card.id]
  uniqueCardNames[card.cardName] = uniqueCardNames[card.cardName] - previousNumCopy
  if (uniqueCardNames[card.cardName] === 0) {
    delete uniqueCardNames[card.cardName]
  }

  var removeCardIndex = []
  for (var i = 0; i < deckList.length; i++) {
    if (card === deckList[i]) {
      removeCardIndex.push(i)
    }
  }
  removeCardIndex.reverse()
  for (var j = 0; j < removeCardIndex.length; j++) {
    deckList.splice(removeCardIndex[j], 1)
  }
}

function updateCardInDeck(card, currentCardCopies, desiredCopies, difference) {
  if (desiredCopies > currentCardCopies) {
    uniqueCardNumbers[card.id] = uniqueCardNumbers[card.id] + difference
    uniqueCardNames[card.cardName] = uniqueCardNames[card.cardName] + difference
    for (var i = 0; i < difference; i++) {
      deckList.push(card)
    }
  }
  else {
    uniqueCardNumbers[card.id] = uniqueCardNumbers[card.id] - difference
    uniqueCardNames[card.cardName] = uniqueCardNames[card.cardName] - difference
    var removeCardIndex = []
    for (var j = 0; j < deckList.length; j++) {
      if (card === deckList[j]) {
        removeCardIndex.push(j)
      }
    }
    removeCardIndex.reverse()
    for (var k = 0; k < difference; k++) {
      deckList.splice(removeCardIndex[k], 1)
    }
  }
}

function levelFilter(array, desiredLevel) {
  var levelFilteredArray = array.filter(function (card) {
    return (card.level === desiredLevel)
  })
  return levelFilteredArray
}

function costFilter(array, desiredCost) {
  var costFilteredArray = array.filter(function (card) {
    return (card.cost === desiredCost)
  })
  return costFilteredArray
}

function colorFilter(array, desiredColor) {
  var colorFilteredArray = array.filter(function (card) {
    return (card.color === desiredColor)
  })
  return colorFilteredArray
}

function rarityFilter(array, desiredRarity) {
  var rarityFilteredArray = array.filter(function (card) {
    return (card.rarity === desiredRarity)
  })
  return rarityFilteredArray
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
    $filters.classList.remove('hidden')
    $viewCards.classList.add('hidden')
    $viewPacks.classList.remove('hidden')
    clearList()
    selectedPacks.sort()
    $displayPacksSelected.textContent = displayPacks(selectedPacks)
    for (var l = 0; l < selectedPacks.length; l++) {
      for (var m = 0; m < boosterPacksList.length; m++) {
        if (selectedPacks[l] === boosterPacksList[m].id) {
          for (var n = 0; n < boosterPacksList[m].cards.length; n++) {
            listOfCards.push(boosterPacksList[m].cards[n])
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
  $filters.classList.add('hidden')
  $filters.reset()
  $viewCards.classList.remove('hidden')
  $viewPacks.classList.add('hidden')
  listOfCards = []
  currentDesiredLevel = 'all-levels'
  currentDesiredCost = 'all-costs'
  currentDesiredColor = 'all-colors'
  currentDesiredRarity = 'all-rarities'
})

$filters.addEventListener('change', function (event) {
  var $targetSelectElement = event.target
  var desiredChoice = event.target.selectedIndex
  var filteredCards = listOfCards.slice('')

  if ($targetSelectElement.id === 'level-filter') {
    if ($targetSelectElement[desiredChoice].value === 'all-levels') {
      currentDesiredLevel = 'all-levels'
    }
    else {
      currentDesiredLevel = desiredChoice - 1
    }
  }
  else if ($targetSelectElement.id === 'cost-filter') {
    if ($targetSelectElement[desiredChoice].value === 'all-costs') {
      currentDesiredCost = 'all-costs'
    }
    else {
      currentDesiredCost = desiredChoice - 1
    }
  }
  else if ($targetSelectElement.id === 'color-filter') {
    currentDesiredColor = $targetSelectElement[desiredChoice].value
  }
  else if ($targetSelectElement.id === 'rarity-filter') {
    currentDesiredRarity = $targetSelectElement[desiredChoice].value
  }

  if (currentDesiredLevel !== 'all-levels') {
    filteredCards = levelFilter(filteredCards, currentDesiredLevel)
  }

  if (currentDesiredCost !== 'all-costs') {
    filteredCards = filteredCards = costFilter(filteredCards, currentDesiredCost)
  }

  if (currentDesiredColor !== 'all-colors') {
    filteredCards = colorFilter(filteredCards, currentDesiredColor)
  }

  if (currentDesiredRarity !== 'all-rarities') {
    filteredCards = rarityFilter(filteredCards, currentDesiredRarity)
  }
  clearList()
  for (var i = 0; i < filteredCards.length; i++) {
    $cardList.appendChild(renderCard(filteredCards[i]))
  }
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
    $returnPrevious.classList.remove('hidden')
  }
})

$returnPrevious.addEventListener('click', function () {
  $boosterPackAndCardListSection.classList.remove('hidden')
  $deckListSection.classList.add('hidden')
  $cardsAndPacksButtons.classList.remove('invisible')
  $viewDeck.classList.remove('hidden')
  $returnPrevious.classList.add('hidden')
})

$deckListSection.addEventListener('change', function (event) {
  var $targetSelectElement = event.target
  var desiredCopies = event.target.selectedIndex
  var $card = {
    cardNumber: $targetSelectElement.getAttribute('card-number'),
    class: $targetSelectElement.getAttribute('pack')
  }
  var fullCardInfo = searchCardInfo($card)
  if (desiredCopies === 0) {
    $targetSelectElement.parentNode.remove()
    removeCardInDeck(fullCardInfo)
  }
  else {
    var currentCardCopies = uniqueCardNumbers[fullCardInfo.id]
    var currentNameCopies = uniqueCardNames[fullCardInfo.cardName]
    var difference = Math.abs(desiredCopies - currentCardCopies)
    if ((desiredCopies > currentCardCopies) &&
      (currentNameCopies + difference <= 4) &&
      (deckList.length + difference <= 50)) {
      $targetSelectElement.options[currentCardCopies].removeAttribute('selected')
      $targetSelectElement.options[desiredCopies].setAttribute('selected', '')
      updateCardInDeck(fullCardInfo, currentCardCopies, desiredCopies, difference)
    }
    else if (desiredCopies < currentCardCopies) {
      $targetSelectElement.options[currentCardCopies].removeAttribute('selected')
      $targetSelectElement.options[desiredCopies].setAttribute('selected', '')
      updateCardInDeck(fullCardInfo, currentCardCopies, desiredCopies, difference)
    }
    else {
      $targetSelectElement.options[currentCardCopies].removeAttribute('selected')
      $targetSelectElement.options[currentCardCopies].setAttribute('selected', '')
      $targetSelectElement.selectedIndex = currentCardCopies
    }
  }
  var deckCount = deckCounter()
  $characterCounter.textContent = deckCount.characterCount
  $eventCounter.textContent = deckCount.eventCount
  $climaxCounter.textContent = deckCount.climaxCount
  $cardCounter.textContent = deckCount.cardCount + '/50'
})
