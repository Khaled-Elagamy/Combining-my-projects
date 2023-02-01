/* eslint-disable */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll('section')
const navMenu = document.getElementById('navbar__list')
const newFragment = document.createDocumentFragment()

/**
 * End Global Variables
 */

// build the nav

sections.forEach(section => {
  const secTitle = section.getAttribute('data-nav')
  const navItem = document.createElement('li')
  const navLink = document.createElement('a')
  navLink.className = 'menu__link'
  navLink.innerText = secTitle

  // Scroll to section on link click

  navLink.addEventListener('click', function() {
    section.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  navItem.appendChild(navLink)

  newFragment.appendChild(navItem)
})

navMenu.appendChild(newFragment)

/**
 * Begin Main Functions
 */

function isInViewport(elem) {
  const rect = elem.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.top <=
      0.3 * (window.innerHeight || document.documentElement.clientHeight)
  )
}

// Add class 'active' to section when near top of viewport

function setActiveClass() {
  for (const section of sections) {
    if (isInViewport(section)) {
      section.classList.add('your-active-class')
      setActiveLink(section)
    } else {
      section.classList.remove('your-active-class')
    }
  }
}

// Add class 'active' to navbar when the corresponding section appear

function setActiveLink(section) {
  const links = document.querySelectorAll('a')
  const activeSection = section.getAttribute('data-nav')
  links.forEach(link => {
    if (link.innerText === activeSection) {
      link.classList.add('menu__link-active')
    } else {
      link.classList.remove('menu__link-active')
    }
  })
}
// Set sections as active

document.addEventListener('scroll', function() {
  setActiveClass()
})

// Hide navbar when not scrolling

let hide
window.addEventListener('scroll', function(event) {
  window.clearTimeout(hide)
  hide = setTimeout(function() {
    navMenu.style.top = '-100px'
  }, 3000)
  navMenu.style.top = '0'
})

function getDifference(a, b) {
  return a.filter(element => {
    return !b.includes(element)
  })
}
//To view images dynamiclly from the folder
function deleteimage(image) {
  var imgstag = document.getElementsByTagName('img')
  var inputList = Array.prototype.slice.call(imgstag)

  inputList.forEach(tempimg => {
    if (tempimg.alt == image) {
      var wantToDeleted = tempimg
      console.log(wantToDeleted)
      document.querySelector('figure').removeChild(wantToDeleted)
    }
  })
}

let images
let index
let temp = []
async function call() {
  //try {
  //await new Promise(resolve => setTimeout(resolve, 500))

  const response = await fetch('/api/image')
  images = await response.json()

  //to check if the images is already found
  //var b = new Set(temp)
  //var images = [...images].filter(x => !b.has(x))
  images = getDifference(images, temp)
  console.log(images)
  if (images.length >= 0) {
    temp = temp.concat(images)
  }
  console.log(temp)
  //sda
  images.forEach(image => {
    createimage(image)
  })

  /*
    const content = document.querySelector('figure')
    const imgfragment = document.createDocumentFragment()
    images.forEach(image => {
      const div1 = document.createElement('div')
      div1.className = 'responsive'
      const div2 = document.createElement('div')
      div2.className = 'gallery'
      const link = document.createElement('a')
      link.target = '_blank'
      link.href = image
      div2.appendChild(link)
      const img = document.createElement('img')
      const figcaption = document.createElement('figcaption')

      img.src = '../images/' + image
      img.alt = image
      img.width = '600'
      img.height = '400'
      //;(img.width = 500), (height = 300)
      figcaption.innerText = image

      link.appendChild(img)
      div2.appendChild(figcaption)
      div1.appendChild(div2)
      imgfragment.appendChild(div1)
    })
    //To create option deop list
    const options = document.querySelector('select')
    const optfragment = document.createDocumentFragment()
    images.forEach(image => {
      const option = document.createElement('option')
      option.value = image
      option.innerText = image
      optfragment.appendChild(option)
    })

    /*const option = document.createElement('option')
    option.value = 'none'
    option.innerText = 'Upload image'
    optfragment.appendChild(option)
    
    options.appendChild(optfragment)
    content.appendChild(imgfragment)
  } catch (err) {
    console.error(err)
  }
  */
}

const options = document.querySelector('select')
const content = document.querySelector('picture')
let constantOption = options.options[options.options.length - 1]

function createimage(image) {
  try {
    const imgfragment = document.createDocumentFragment()
    const div1 = document.createElement('div')
    div1.className = 'responsive'
    const div2 = document.createElement('div')
    div2.className = 'gallery'
    const link = document.createElement('a')
    link.target = '_blank'
    link.href = image
    div2.appendChild(link)
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')

    img.src = '../images/' + image
    img.alt = image
    img.width = '600'
    img.height = '400'
    //;(img.width = 500), (height = 300)
    figcaption.innerText = image

    link.appendChild(img)
    div2.appendChild(figcaption)
    div1.appendChild(div2)
    imgfragment.appendChild(div1)
    content.appendChild(imgfragment)

    //To create option deop list
    const option = document.createElement('option')
    option.value = image
    option.innerText = image
    //options.options[options.options.length] = new Option(image, image)
    options.insertBefore(option, constantOption)
  } catch (err) {
    console.error(err)
  }
}

//     const content = document.querySelector('figure')
//     const imgfragment = document.createDocumentFragment()
//     images.forEach(image => {
//       const div = document.createElement('div')
//       const img = document.createElement('img')
//       const figcaption = document.createElement('figcaption')
//       div.className = 'column'

//       img.src = '../images/' + image
//       img.alt = image
//       // prettier-ignore
//       img.style = "width:100%";
//       //;(img.width = 500), (height = 300)
//       figcaption.innerText = image

//       div.appendChild(img)
//       div.appendChild(figcaption)

//       imgfragment.appendChild(div)
//     })

//     content.appendChild(imgfragment)
//   } catch (err) {
//     console.error(err)
//   }
// }

// var aTags = document.querySelectorAll('span[data-href]')

// for (var i = 0; i < aTags.length; i++) {
//   var aTag = aTags[i]
//   aTag.addEventListener('click', function(e) {
//     var ele = e.target
//     window.location.replace(ele.getAttribute('data-href'))
//   })
// }

function fileValidation() {
  var fileInput = document.getElementById('fileToUpload')

  var filePath = fileInput.value

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

  if (!allowedExtensions.exec(filePath)) {
    alert('Invalid file type')
    fileInput.value = ''
    return false
  } else {
    // Image preview
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader()
      reader.onload = function(e) {
        document.getElementById('imagePreview').innerHTML =
          '<img src="' + e.target.result + '"/ width=400 height=400>'
      }

      reader.readAsDataURL(fileInput.files[0])
    }
  }
}

const Uploadedimagediv = document.getElementById('UploadedImage')
const Uploadinput = document.getElementById('fileToUpload')
function check() {
  if (options.value == 'none') {
    Uploadinput.disabled = false
    Uploadedimagediv.hidden = false
    Uploadinput.required = true
  } else {
    Uploadinput.disabled = true
    Uploadedimagediv.hidden = true
  }
}

const optionvalidate = document.getElementById('options')
function validate() {
  if (optionvalidate.value == 'selectoption') {
    alert('Please select an image')
    optionvalidate.focus()
  }
}
