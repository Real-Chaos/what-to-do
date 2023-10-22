const toggleTheme = (function () {
  const checkboxToggler = document.querySelector('.checkbox-toggle')
  const root = document.documentElement
  root.className = 'light'
  checkboxToggler.addEventListener('change', () => {
    checkboxToggler.checked
      ? (root.className = 'dark')
      : (root.className = 'light')
  })
})()

const toggleNav = (function () {
  const navToggler = document.querySelector('.nav-toggler')
  const sideNav = document.querySelector('.side-nav')
  navToggler.addEventListener('click', () => {
    console.log(sideNav.style.display)
    console.log(sideNav.style.transform)
    if (sideNav.style.transform == 'translateX(-20vw)') {
      sideNav.style.transform = 'translateX(0vw)'
      sideNav.style.width = '20vw'
    } else {
      sideNav.style.transform = 'translateX(-20vw)'
      sideNav.style.width = '0vw'
    }

    sideNav.style.transform === 'translateX(0vw)'
      ? console.log('left -20vw')
      : console.log('left: 0vw')
  })
})()

const toggleAddForm = (function () {
  const addProjectText = document.querySelector('.add-project-text')
  const addProjectForm = document.querySelector('.add-project-form')
  const hideProjectForm = document.querySelector('.cancel')
  addProjectText.addEventListener('click', () => {
    addProjectForm.style.display = 'block'
  })

  hideProjectForm.addEventListener('click', () => {
    addProjectForm.style.display = 'none'
  })
})()

const alternateTasks = (function () {
  const taskSections = document.querySelectorAll('.side-nav-home div')
  taskSections.forEach((section) => {
    section.addEventListener('click', () => {
      taskSections.forEach((section) => {
        section.style.borderLeft = 'none'
      })
      section.style.borderLeft = '5px solid var(--green-hover)'
      changeTaskHeader(section.lastElementChild.textContent)
    })
  })
})()

const changeTaskHeader = function (text) {
  const taskHeader = document.querySelector('.tasks-header .title')
  taskHeader.textContent = text
}

const addProjectToSidenav = (function () {
  const addProjectForm = document.querySelector('.add-project-form')
  const input = document.querySelector('#project-name')
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(input.value)
  })
})()

const toggleProjectOptions = (function () {
  const optionsToggler = document.querySelectorAll('.options-toggler')
  const optionsText = document.querySelectorAll('.options-text')
  let optionClicked = {
    option: '',
    toggle: '',
    style: 'none',
  }

  optionsToggler.forEach((toggle, i) => {
    toggle.addEventListener('click', () => {
      if (optionClicked.style === 'none') {
        optionsText[i].style.display = 'block'
        optionClicked.option = optionsText[i]
        optionClicked.toggle = toggle
      }
    })
  })

  const detectDocument = () => {
    document.addEventListener('click', (e) => {
      if (optionClicked.option.contains(e.target)) {
        optionClicked.option.style.display = 'block'
        optionClicked.style = 'block'
      } else if (
        optionClicked.style === 'none' &&
        e.target === optionClicked.toggle
      ) {
        optionClicked.option.style.display = 'block'
        optionClicked.style = 'block'
      } else if (optionClicked.option.style.display === 'block') {
        console.log(optionClicked.style)
        optionClicked.option.style.display = 'none'
        optionClicked.style = 'none'
        console.log()
      } else {
        optionClicked.option.style.display = 'none'
      }
    })
  }

  const intervalFunc = () => {
    if (optionClicked.option.className === 'options-text') {
      detectDocument()
      clearInterval(optionInterval)
    }
  }

  const optionInterval = setInterval(intervalFunc, 500)
})()
