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

const changeTaskHeader = function (text) {
  console.log(text)
  const taskHeader = document.querySelector('.tasks-header .title')
  taskHeader.textContent = text
}

const alternateTasks = (function () {
  const taskSections = document.querySelectorAll('.side-nav-home div')
  const projectCards = document.querySelectorAll('.project-card')

  const helperFunc = (arr) => {
    arr.forEach((a) => {
      a.addEventListener('click', () => {
        arr.forEach((a) => (a.style.borderLeft = 'none'))
        a.style.borderLeft = '5px solid var(--green-hover)'
        changeTaskHeader(a.getElementsByTagName('H4')[0].textContent)
      })
    })
  }
  // taskSections.forEach((section) => {
  //   // section.addEventListener('click', () => {
  //   //   taskSections.forEach((section) => {
  //   //     section.style.borderLeft = 'none'
  //   //   })
  //   //   section.style.borderLeft = '5px solid var(--green-hover)'
  //   //   changeTaskHeader(section.lastElementChild.textContent)
  //   // })
  //   helper
  // })

  helperFunc(taskSections)
  helperFunc(projectCards)
})()



const addProjectToSidenav = (function () {
  const addProjectForm = document.querySelector('.add-project-form')
  const input = document.querySelector('#project-name')
  const projectSidebar = document.querySelector('.project-sidebar')
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const html = `<div class="project-card" data-index="0">
    <div class="text">
      <i class="fa-solid fa-list-check"></i>
      <h4>${input.value}</h4>
    </div>
    <div class="options">
      <i class="fa-solid fa-ellipsis-vertical options-toggler"></i>

      <div class="options-text">
        <h5>Rename</h5>
        <h5>Delete</h5>
      </div>
    </div>
  </div>`
    projectSidebar.innerHTML += html
    input.value = ''
    toggleProjectOptions()
  })
})()

const toggleProjectOptions = function () {
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
}


const toggleTasksForm = (function(){
  const toggler = document.querySelector('.add-tasks h4')
  const div = document.querySelector('.add-task-form-div')
  const cancelTask = document.querySelector('.cancel-task')

  toggler.addEventListener('click', () => {
    div.style.display = 'block'
  })

  cancelTask.addEventListener('click', () => {
    div.style.display = 'none'
  })
}())