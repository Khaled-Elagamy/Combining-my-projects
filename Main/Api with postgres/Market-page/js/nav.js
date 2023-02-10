var ManuItems = document.getElementById('MenuItems')
var container = document.getElementById('container')

MenuItems.style.maxHeight = '0px'
function menutoggle() {
  if (MenuItems.style.maxHeight == '0px') {
    MenuItems.style.maxHeight = '200px'
    container.style.transform = 'translateY(90px)'
  } else {
    MenuItems.style.maxHeight = '0px'
    container.style.transform = 'translateY(0px)'
  }
}
