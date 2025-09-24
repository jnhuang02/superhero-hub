const renderGift = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    
    const response = await fetch('/gifts')
    const data = await response.json()
    
    const giftContent = document.getElementById('gift-content')
    
    let gift
    
    if (data) {
        gift = data.find(gift => gift.id === requestedID)
    }
    
    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.name
        document.getElementById('age').textContent = 'Age: ' + gift.age
        document.getElementById('location').textContent = 'Location: ' + gift.location
        document.getElementById('story').textContent = gift.story
        document.title = `SuperHero Hub - ${gift.name}`
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Superhero Available 😞'
        giftContent.appendChild(message)
    }
}

renderGift()
