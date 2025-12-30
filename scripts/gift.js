// FRONT-END ONLY: load data from /data/gifts.js
const loadGifts = async () => {
    try {
        // use BASE_URL so this works on GitHub Pages (/superhero-hub/) and in dev (/)
        const url = `${import.meta.env.BASE_URL}data/gifts.js`
        const mod = await import(url)
        return mod.default || mod.gifts || mod.data || []
    } catch (err) {
        console.error('Error loading gifts module:', err)
        return []
    }
}

const renderGift = async () => {
    // read id from query string, e.g. /gift.html?id=3
    const params = new URLSearchParams(window.location.search)
    const requestedID = parseInt(params.get('id'), 10)

    const data = await loadGifts()
    const giftContent = document.getElementById('gift-content')

    let gift
    if (data && Number.isFinite(requestedID)) {
        gift = data.find(gift => gift.id === requestedID)
    }

    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.name
        document.getElementById('age').textContent = 'Age: ' + gift.age
        document.getElementById('location').textContent = 'Location: ' + gift.location
        document.getElementById('story').textContent = gift.story
        document.title = `SuperHero Hub - ${gift.name}`
    } else {
        const message = document.createElement('h2')
        message.textContent = 'No Superhero Available 😞'
        giftContent.appendChild(message)
    }
}

// run after DOM is loaded so elements are present
document.addEventListener('DOMContentLoaded', () => {
    renderGift()
})
