const header = document.querySelector('header')
header.style.position = 'sticky'
header.style.top = '0'
header.style.width = '100%'
header.style.backgroundColor = '#1a1a1a'
header.style.boxShadow = 'none'

const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'
headerContainer.style.display = 'flex'
headerContainer.style.justifyContent = 'space-between'
headerContainer.style.alignItems = 'center'
headerContainer.style.padding = '10px 20px'

const headerLogo = document.createElement('img')
headerLogo.src = '../logo.png'
headerLogo.style.width = '50px'
headerLogo.style.height = '50px'

const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Superheros'
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
headerButton.style.padding = '8px 16px'
headerButton.style.backgroundColor = '#2a2a2a'
headerButton.style.color = '#4a9eff'
headerButton.style.border = '2px solid #4a9eff'
headerButton.style.borderRadius = '4px'
headerButton.style.cursor = 'pointer'
    
headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

headerRight.appendChild(headerButton)

headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)

header.appendChild(headerContainer)



