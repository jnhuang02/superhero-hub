const loadGifts = async () => {
    try {
        const mod = await import('/data/gifts.js')
        return mod.default || mod.gifts || mod.data || []
    } catch (err) {
        console.error('Error loading /data/gifts.js:', err)
        return []
    }
}

const renderGifts = async () => {
    try {
        // use local data loader (no backend fetch)
        const data = await loadGifts()
        const mainContent = document.getElementById('main-content')
        mainContent.innerHTML = ''

        if (data && data.length) {
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
                    // run locally: static detail page with query param
                    window.location.href = `/gift.html?id=${gift.id}`
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
                // local 404 test: id that doesn't exist in data
                window.location.href = '/gift.html?id=999999'
            })
            
            testBottomContainer.appendChild(testButton)
            testCard.appendChild(testTopContainer)
            testCard.appendChild(testBottomContainer)
            mainContent.appendChild(testCard)
        } else {
            const message = document.createElement('h2')
            message.textContent = 'No Gifts Available 😞'
            mainContent.appendChild(message)
        }
    } catch (error) {
        console.error('Error loading gifts:', error)
        const mainContent = document.getElementById('main-content')
        const errorMessage = document.createElement('h2')
        errorMessage.textContent = 'Error loading gifts. Please check the console for details.'
        errorMessage.style.color = 'red'
        mainContent.appendChild(errorMessage)
    }
}

// Only call renderGifts when we're on the main gifts page
renderGifts()
