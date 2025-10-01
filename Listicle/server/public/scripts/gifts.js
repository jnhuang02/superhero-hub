

let allGifts = []

const createCard = (gift) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.style.position = 'relative'

    const topContainer = document.createElement('div')
    topContainer.classList.add('top-container')
    topContainer.style.backgroundImage = `url(${gift.image})`

    const bottomContainer = document.createElement('div')
    bottomContainer.classList.add('bottom-container')

    const name = document.createElement('h3')
    name.textContent = gift.name
    bottomContainer.appendChild(name)

    const powers = document.createElement('p')
    powers.textContent = 'Powers: ' + (Array.isArray(gift.powers) ? gift.powers.join(', ') : gift.powers)
    bottomContainer.appendChild(powers)

    const universe = document.createElement('p')
    universe.textContent = 'Universe: ' + gift.universe
    bottomContainer.appendChild(universe)

    const infoButton = document.createElement('button')
    infoButton.textContent = 'Info'
    infoButton.className = 'info-button'
    infoButton.addEventListener('click', () => {
        window.location.href = `http://localhost:3001/gifts/${gift.id}`
    })

    bottomContainer.appendChild(infoButton)
    card.appendChild(topContainer)
    card.appendChild(bottomContainer)
    return card
}

const renderFiltered = (filter, attr = 'all') => {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''
    const list = allGifts.filter(g => {
        if (!filter) return true
        const q = filter.toLowerCase()
        const powers = Array.isArray(g.powers) ? g.powers.join(' ') : g.powers || ''

        if (!attr || attr === 'all') {
            return (
                (g.name || '').toLowerCase().includes(q) ||
                (g.universe || '').toLowerCase().includes(q) ||
                (g.location || '').toLowerCase().includes(q) ||
                powers.toLowerCase().includes(q)
            )
        }

        switch (attr) {
            case 'name':
                return (g.name || '').toLowerCase().includes(q)
            case 'universe':
                return (g.universe || '').toLowerCase().includes(q)
            case 'location':
                return (g.location || '').toLowerCase().includes(q)
            case 'powers':
                return powers.toLowerCase().includes(q)
            default:
                return (
                    (g.name || '').toLowerCase().includes(q) ||
                    (g.universe || '').toLowerCase().includes(q) ||
                    (g.location || '').toLowerCase().includes(q) ||
                    powers.toLowerCase().includes(q)
                )
        }
    })

    if (list.length === 0) {
        const message = document.createElement('h2')
        message.className = 'message'
        message.textContent = 'No heroes match your search.'
        mainContent.appendChild(message)
        return
    }

    list.forEach(gift => mainContent.appendChild(createCard(gift)))

    // keep test 404 card for manual testing
    const testCard = document.createElement('div')
    testCard.classList.add('card')
    testCard.style.border = '2px dashed #ff6b6b'
    testCard.style.opacity = '0.9'
    const testTop = document.createElement('div')
    testTop.classList.add('top-container')
    testTop.style.background = '#ff6b6b'
    testTop.style.display = 'flex'
    testTop.style.alignItems = 'center'
    testTop.style.justifyContent = 'center'
    testTop.style.color = 'white'
    testTop.style.fontSize = '24px'
    testTop.textContent = '404'
    const testBottom = document.createElement('div')
    testBottom.classList.add('bottom-container')
    const testName = document.createElement('h3')
    testName.textContent = 'Test 404 Error'
    testName.style.color = '#ff6b6b'
    testBottom.appendChild(testName)
    const testDesc = document.createElement('p')
    testDesc.textContent = 'Click to test 404 error handling'
    testDesc.style.fontStyle = 'italic'
    testBottom.appendChild(testDesc)
    const testBtn = document.createElement('button')
    testBtn.textContent = 'Test 404'
    testBtn.addEventListener('click', () => window.location.href = 'http://localhost:3001/gifts/999999')
    testBottom.appendChild(testBtn)
    testCard.appendChild(testTop)
    testCard.appendChild(testBottom)
    mainContent.appendChild(testCard)
}

const debounce = (fn, wait = 250) => {
    let t
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait) }
}

const fetchAndInit = async () => {
    try {
        const res = await fetch('/gifts')
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        allGifts = await res.json()

    // check for query param and attribute param
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q') || ''
    const attr = params.get('attr') || 'all'
    const input = document.getElementById('search-input')
    const select = document.getElementById('search-attr')
    if (input) input.value = q
    if (select) select.value = attr

    renderFiltered(q, attr)

        // wire up search
        if (input) {
            const onInput = debounce((e) => {
                const val = e.target.value.trim()
                const selVal = (document.getElementById('search-attr') || {}).value || 'all'
                // update URL
                const url = new URL(window.location.href)
                if (val) url.searchParams.set('q', val)
                else url.searchParams.delete('q')
                if (selVal && selVal !== 'all') url.searchParams.set('attr', selVal)
                else url.searchParams.delete('attr')
                window.history.replaceState({}, '', url)
                renderFiltered(val, selVal)
            }, 250)

            input.addEventListener('input', onInput)
            // handle Enter / form submit to trigger immediate search
            const form = document.getElementById('search-form')
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault()
                    const val = input.value.trim()
                    const selVal = (document.getElementById('search-attr') || {}).value || 'all'
                    const url = new URL(window.location.href)
                    if (val) url.searchParams.set('q', val)
                    else url.searchParams.delete('q')
                    if (selVal && selVal !== 'all') url.searchParams.set('attr', selVal)
                    else url.searchParams.delete('attr')
                    window.history.replaceState({}, '', url)
                    renderFiltered(val, selVal)
                })
            }
            // handle attribute select changes
            const select = document.getElementById('search-attr')
            if (select) {
                select.addEventListener('change', (e) => {
                    const sel = e.target.value || 'all'
                    const val = input.value.trim()
                    const url = new URL(window.location.href)
                    if (val) url.searchParams.set('q', val)
                    else url.searchParams.delete('q')
                    if (sel && sel !== 'all') url.searchParams.set('attr', sel)
                    else url.searchParams.delete('attr')
                    window.history.replaceState({}, '', url)
                    renderFiltered(val, sel)
                })
            }
            const clearBtn = document.getElementById('clear-search')
            if (clearBtn) clearBtn.addEventListener('click', () => {
                input.value = ''
                const select = document.getElementById('search-attr')
                if (select) select.value = 'all'
                input.dispatchEvent(new Event('input'))
            })
        }
    } catch (err) {
        console.error('Error fetching gifts:', err)
        const mainContent = document.getElementById('main-content')
        const errorMessage = document.createElement('h2')
        errorMessage.textContent = 'Error loading heroes. Please check the console.'
        errorMessage.style.color = 'red'
        mainContent.appendChild(errorMessage)
    }
}

// initialize on page load
fetchAndInit()
