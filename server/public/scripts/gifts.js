let allGifts = []
let currentSearch = ''
let currentAttr = 'all'
let currentUniverse = 'all'

const createCard = (gift) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.style.position = 'relative'
    // use universe OR publisher so filtering always has data
    card.dataset.universe = gift.universe || gift.publisher || ''

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
        // run locally: go to static details page with query param
        window.location.href = `/gift.html?id=${gift.id}`
    })

    bottomContainer.appendChild(infoButton)
    card.appendChild(topContainer)
    card.appendChild(bottomContainer)
    return card
}

const renderFiltered = (filter, attr = 'all', universeFilter = 'all') => {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''
    let list = allGifts

    // Apply universe filter first (case-insensitive, supports publisher/universe)
    if (universeFilter && universeFilter !== 'all') {
        const f = universeFilter.toLowerCase()
        list = list.filter(g => {
            const u = (g.universe || g.publisher || '').toLowerCase()
            if (!u) return false
            if (f.includes('dc')) return u.includes('dc')
            if (f.includes('marvel')) return u.includes('marvel')
            return u === f
        })
    }

    // Then apply search filter if there's a search query
    if (filter) {
        list = list.filter(g => {
            const q = filter.toLowerCase()
            const powers = Array.isArray(g.powers) ? g.powers.join(' ') : g.powers || ''

            if (!attr || attr === 'all') {
                return (
                    (g.name || '').toLowerCase().includes(q) ||
                    (g.universe || g.publisher || '').toLowerCase().includes(q) ||
                    (g.location || '').toLowerCase().includes(q) ||
                    powers.toLowerCase().includes(q)
                )
            }

            switch (attr) {
                case 'name':
                    return (g.name || '').toLowerCase().includes(q)
                case 'universe':
                    return (g.universe || g.publisher || '').toLowerCase().includes(q)
                case 'location':
                    return (g.location || '').toLowerCase().includes(q)
                case 'powers':
                    return powers.toLowerCase().includes(q)
                default:
                    return (
                        (g.name || '').toLowerCase().includes(q) ||
                        (g.universe || g.publisher || '').toLowerCase().includes(q) ||
                        (g.location || '').toLowerCase().includes(q) ||
                        powers.toLowerCase().includes(q)
                    )
            }
        })
    }

    // NEW: sort by universe, then by name for stable ordering
    list.sort((a, b) => {
        const ua = (a.universe || a.publisher || '').toLowerCase()
        const ub = (b.universe || b.publisher || '').toLowerCase()
        if (ua === ub) {
            return (a.name || '').localeCompare(b.name || '')
        }
        return ua.localeCompare(ub)
    })

    if (list.length === 0) {
        const message = document.createElement('h2')
        message.className = 'message'
        message.textContent = 'No heroes match your filters.'
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
    testBtn.addEventListener('click', () => {
        // local 404 test using non-existent id
        window.location.href = '/gift.html?id=999999'
    })
    testBottom.appendChild(testBtn)
    testCard.appendChild(testTop)
    testCard.appendChild(testBottom)
    mainContent.appendChild(testCard)
}

const debounce = (fn, wait = 250) => {
    let t
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait) }
}

// FRONT-END ONLY: load data from /data/gifts.js (no backend fetch)
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

const fetchAndInit = async () => {
    try {
        allGifts = await loadGifts()

        const input = document.getElementById('search-input')
        const attrSelect = document.getElementById('search-attr')
        const universeSelect = document.getElementById('universe-filter')

        // initialize UI from current state
        if (input) input.value = currentSearch
        if (attrSelect) attrSelect.value = currentAttr
        if (universeSelect) universeSelect.value = currentUniverse

        // initial render
        renderFiltered(currentSearch, currentAttr, currentUniverse)

        // universe dropdown
        if (universeSelect) {
            universeSelect.addEventListener('change', (e) => {
                currentUniverse = e.target.value || 'all'
                renderFiltered(currentSearch, currentAttr, currentUniverse)
            })
        }

        // search wiring
        if (input) {
            const onInput = debounce((e) => {
                currentSearch = e.target.value.trim()
                currentAttr = (attrSelect || {}).value || 'all'
                renderFiltered(currentSearch, currentAttr, currentUniverse)
            }, 250)

            input.addEventListener('input', onInput)

            const form = document.getElementById('search-form')
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault()
                    currentSearch = input.value.trim()
                    currentAttr = (attrSelect || {}).value || 'all'
                    renderFiltered(currentSearch, currentAttr, currentUniverse)
                })
            }

            if (attrSelect) {
                attrSelect.addEventListener('change', (e) => {
                    currentAttr = e.target.value || 'all'
                    currentSearch = input.value.trim()
                    renderFiltered(currentSearch, currentAttr, currentUniverse)
                })
            }

            const clearBtn = document.getElementById('clear-search')
            if (clearBtn) clearBtn.addEventListener('click', () => {
                input.value = ''
                currentSearch = ''
                if (attrSelect) {
                    attrSelect.value = 'all'
                    currentAttr = 'all'
                }
                renderFiltered(currentSearch, currentAttr, currentUniverse)
            })
        }
    } catch (err) {
        console.error('Error initializing gifts:', err)
        const mainContent = document.getElementById('main-content')
        const errorMessage = document.createElement('h2')
        errorMessage.textContent = 'Error loading heroes. Please check the console.'
        errorMessage.style.color = 'red'
        mainContent.appendChild(errorMessage)
    }
}

// initialize on page load
fetchAndInit()
