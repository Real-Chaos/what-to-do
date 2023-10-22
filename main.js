const taskCollection = {
  tasks: [],
}

class tasks {
  constructor({ name, description, date, priority }) {
    ;(this.name = name), (this.description = description), (this.date = date)
    this.priority = priority
    this.index = taskCollection.tasks.length
  }
  addTask(task) {
    taskCollection.tasks.push(task)
    console.log(taskCollection.tasks)
    displayTasks()
    handleTasksModal()
    editTask()
  }

  editTasks() {
    editTask()
  }
}

class projects {
  constructor(name) {
    this.name = name
    this.projectsArray = []
  }

  addProject(project) {
    this.projectsArray.push(project)
    addProjectToSidenavDOM(this.projectsArray)
  }
}

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
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const project = new projects(input.value)
    project.addProject(project)
    input.value = ''
    toggleProjectOptions()
  })
})()

const addProjectToSidenavDOM = (projects) => {
  console.log(projects)
  const projectSidebar = document.querySelector('.project-sidebar')
  projects.forEach((project) => {
    // console.log(project)
    const html = `<div class="project-card" data-index="0">
    <div class="text">
      <i class="fa-solid fa-list-check"></i>
      <h4>${project.name}</h4>
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
  })
}

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

const toggleTasksForm = (function () {
  const toggler = document.querySelector('.add-tasks h4')
  const div = document.querySelector('.add-task-form-div')
  const cancelTask = document.querySelector('.cancel-task')

  toggler.addEventListener('click', () => {
    div.style.display = 'block'
    addTask('create', -1)
  })

  cancelTask.addEventListener('click', () => {
    div.style.display = 'none'
  })
})()

const handleTasksModal = function () {
  const dialogs = document.querySelectorAll('dialog')
  const showButtons = document.querySelectorAll('.details-btn')
  const closeButtons = document.querySelectorAll('.close-dialog')

  // "Show the dialog" button opens the dialog modally
  showButtons.forEach((showButton, index) => {
    showButton.addEventListener('click', () => {
      dialogs[index].showModal()
    })
  })

  closeButtons.forEach((closeButton, index) => {
    closeButton.addEventListener('click', () => {
      dialogs[index].close()
    })
  })
}

const addTask = function (type, ti) {
  const taskForm = document.querySelector('.add-task-form')
  const div = document.querySelector('.add-task-form-div')

  taskForm.addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      const taskObj = {
        name: e.target.elements.taskName.value,
        description: e.target.elements.description.value,
        date: e.target.elements.date.value,
        priority: e.target.elements.priority.value,
      }
      if (type === 'create') {
        const newTask = new tasks(taskObj)
        newTask.addTask(newTask)
      } else {
        taskCollection.tasks.forEach((task, i) => {
          if (task.index === ti) {
            taskCollection.tasks[i] = {...taskObj, index: ti}
            displayTasks(taskCollection.tasks)
          }
        })
      }
      div.style.display = 'none'
      taskForm.reset()
    },
    { once: true }
  )
}

const displayTasks = () => {
  const tasks = taskCollection.tasks
  const tasksDiv = document.querySelector('.task-div')
  tasksDiv.innerHTML = ''
  tasks.forEach((task) => {
    const html = `
    <div class="task" data-index="${task.index}">
    <div class="name">
      <div class="task-completion completed"></div>
      <h3>${task.name}</h3>
    </div>
    <div class="extra-options">
      <button class="details-btn">Details</button>
      <h5>${task.date}</h5>
      <i class="fa-solid fa-user-pen edit-task-btn"></i>
      <i class="fa-solid fa-trash-can"></i>
    </div>
    <dialog>
      <div>
        <h3>${task.name}</h3>
        <i class="fa-regular fa-circle-xmark close-dialog"></i>
      </div>
      <div class="real-details">
        <div>
          <h4>Project:</h4>
          <p>Home</p>
        </div>
        <div>
          <h4>Priority:</h4>
          <p>${task.priority}</p>
        </div>
        <div>
          <h4>Due Date:</h4>
          <p>${task.date}</p>
        </div>
        <div>
          <h4>Description: </h4>
          <p>
            ${task.description}
          </p>
        </div>
      </div>
    </dialog>
  </div>
    `
    tasksDiv.innerHTML += html
  })
}

const editTask = () => {
  const editTasksButton = document.querySelectorAll('.edit-task-btn')
  let taskIndex = ''
  editTasksButton.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      taskIndex = Number(
        e.target.parentElement.parentElement.getAttribute('data-index')
      )
      console.log(
        e.target.parentElement.parentElement.getAttribute('data-index')
      )
      runTasksScan()
    })
  })

  const runTasksScan = () => {
    taskCollection.tasks.forEach((task) => {
      if (task.index === taskIndex) {
        editTaskForm(task)
      }
    })
  }

  // taskCollection.tasks.forEach((task) => console.log(task))
}

const editTaskForm = (task) => {
  const formDiv = document.querySelector('.add-task-form-div')
  const form = document.querySelector('.add-task-form')

  formDiv.style.display = 'block'
  form.elements.taskName.value = task.name
  form.elements.description.value = task.description
  form.elements.date.value = task.date
  form.elements.priority.value = task.priority

  addTask('edit', task.index)
}
