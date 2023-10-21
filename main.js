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
    sideNav.style.transform == 'translateX(-20vw)'
      ? sideNav.style.transform = 'translateX(0vw)'
      : sideNav.style.transform = 'translateX(-20vw)'

      sideNav.style.transform === 'translateX(0vw)' ? console.log('left -20vw') : console.log('left: 0vw')
  })
})()
