const header = document.querySelector('header')
if (!header) throw new Error('No <header> element found')

// Make header sticky and full-width
header.style.position = 'sticky'
header.style.top = '0'
header.style.width = '100%'
header.style.backgroundColor = '#1a1a1a'
header.style.boxShadow = 'none'

// If the markup was already added (e.g. index.html contains header markup with search),
// just add the Home button into the existing `.header-right` to avoid duplicates.
const existingContainer = header.querySelector('.header-container')
if (existingContainer) {
  let headerRight = existingContainer.querySelector('.header-right')
  if (!headerRight) {
    headerRight = document.createElement('div')
    headerRight.className = 'header-right'
    existingContainer.appendChild(headerRight)
  }

  // If Home button already exists, don't add another
  if (!headerRight.querySelector('button')) {
    const headerButton = document.createElement('button')
    headerButton.textContent = 'Home'
    headerButton.type = 'button'
    headerButton.addEventListener('click', () => { window.location = '/' })
    headerRight.appendChild(headerButton)
  }
} else {
  // Build the header dynamically (fallback)
  const headerContainer = document.createElement('div')
  headerContainer.className = 'header-container'

  const headerLogo = document.createElement('img')
  headerLogo.src = '/logo.png'
  headerLogo.style.width = '50px'
  headerLogo.style.height = '50px'

  const headerTitle = document.createElement('h1')
  headerTitle.textContent = 'SuperHero Hub'
  headerTitle.style.margin = '0'

  const headerLeft = document.createElement('div')
  headerLeft.className = 'header-left'
  headerLeft.style.display = 'flex'
  headerLeft.style.alignItems = 'center'
  headerLeft.style.gap = '15px'

  headerLeft.appendChild(headerLogo)
  headerLeft.appendChild(headerTitle)

  const headerRight = document.createElement('div')
  headerRight.className = 'header-right'
  headerRight.style.display = 'flex'
  headerRight.style.alignItems = 'center'

  const headerButton = document.createElement('button')
  headerButton.textContent = 'Home'
  headerButton.type = 'button'
  headerButton.addEventListener('click', () => { window.location = '/' })

  headerRight.appendChild(headerButton)
  headerContainer.appendChild(headerLeft)
  headerContainer.appendChild(headerRight)
  header.appendChild(headerContainer)
}



