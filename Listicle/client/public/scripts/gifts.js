

const renderGifts = async () => {
    try {
        const response = await fetch('/gifts')
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Received data:', data)

        const mainContent = document.getElementById('main-content')

    if (data) {
        data.map(gift => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.style.position = 'relative'
            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')
            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')
            topContainer.style.backgroundImage = `url(${gift.image})`
            const name = document.createElement('h3')
            name.textContent = gift.name
            bottomContainer.appendChild(name)
            const powers = document.createElement('p')
            powers.textContent = 'Powers: ' + gift.powers
            bottomContainer.appendChild(powers)
            const universe = document.createElement('p')
            universe.textContent = 'Universe: ' + gift.universe
            bottomContainer.appendChild(universe)
            const infoButton = document.createElement('button')
            infoButton.textContent = 'Info'
            infoButton.style.position = 'absolute'
            infoButton.style.bottom = '10px'
            infoButton.style.right = '10px'
            infoButton.style.backgroundColor = '#4a9eff'
            infoButton.style.color = 'white'
            infoButton.style.border = 'none'
            infoButton.style.borderRadius = '4px'
            infoButton.style.padding = '8px 12px'
            infoButton.style.cursor = 'pointer'
            infoButton.addEventListener('click', () => {
                window.location.href = `/gifts/${gift.id}`
            })
            bottomContainer.appendChild(infoButton)
            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(message)
    }
    } catch (error) {
        console.error('Error fetching gifts:', error)
        const mainContent = document.getElementById('main-content')
        const errorMessage = document.createElement('h2')
        errorMessage.textContent = 'Error loading gifts. Please check the console for details.'
        errorMessage.style.color = 'red'
        mainContent.appendChild(errorMessage)
    }
}

renderGifts()

