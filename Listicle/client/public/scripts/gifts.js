

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
                window.location.href = `http://localhost:3001/gifts/${gift.id}`
            })
            bottomContainer.appendChild(infoButton)
            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })

        // Add a test card for 404 error
        const testCard = document.createElement('div')
        testCard.classList.add('card')
        testCard.style.position = 'relative'
        testCard.style.border = '2px dashed #ff6b6b'
        testCard.style.opacity = '0.8'
        
        const testTopContainer = document.createElement('div')
        testTopContainer.classList.add('top-container')
        testTopContainer.style.backgroundColor = '#ff6b6b'
        testTopContainer.style.display = 'flex'
        testTopContainer.style.alignItems = 'center'
        testTopContainer.style.justifyContent = 'center'
        testTopContainer.style.color = 'white'
        testTopContainer.style.fontSize = '24px'
        testTopContainer.textContent = '404'
        
        const testBottomContainer = document.createElement('div')
        testBottomContainer.classList.add('bottom-container')
        
        const testName = document.createElement('h3')
        testName.textContent = 'Test 404 Error'
        testName.style.color = '#ff6b6b'
        testBottomContainer.appendChild(testName)
        
        const testDescription = document.createElement('p')
        testDescription.textContent = 'Click to test 404 error handling'
        testDescription.style.fontStyle = 'italic'
        testBottomContainer.appendChild(testDescription)
        
        const testButton = document.createElement('button')
        testButton.textContent = 'Test 404'
        testButton.style.position = 'absolute'
        testButton.style.bottom = '10px'
        testButton.style.right = '10px'
        testButton.style.backgroundColor = '#ff6b6b'
        testButton.style.color = 'white'
        testButton.style.border = 'none'
        testButton.style.borderRadius = '4px'
        testButton.style.padding = '8px 12px'
        testButton.style.cursor = 'pointer'
        testButton.addEventListener('click', () => {
            // Use an invalid ID that doesn't exist
            window.location.href = `http://localhost:3001/gifts/999999`
        })
        
        testBottomContainer.appendChild(testButton)
        testCard.appendChild(testTopContainer)
        testCard.appendChild(testBottomContainer)
        mainContent.appendChild(testCard)
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

// Only call renderGifts when we're on the main gifts page
renderGifts()
