/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navMenu = document.getElementById('navbar__list');
const newFragment = document.createDocumentFragment();

/**
 * End Global Variables
*/


// build the nav

sections.forEach( (section) => { 
    const secTitle = section.getAttribute('data-nav');
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.className= "menu__link"
    navLink.innerText = secTitle;
    
// Scroll to section on link click

    navLink.addEventListener("click", function(){

        section.scrollIntoView({behavior: "smooth",block:"center"});

    })
    navItem.appendChild(navLink);

    newFragment.appendChild(navItem);

});

navMenu.appendChild(newFragment);


/**
 * Begin Main Functions
*/

function isInViewport (elem) {
    const rect = elem.getBoundingClientRect();
    return (
        rect.top >=0 &&
        rect.top <=
        0.4 * (window.innerHeight || document.documentElement.clientHeight)
    );
};


//Make sections collapsible.

var collection=document.getElementsByClassName("collapse");

for(let i=0 ; i < collection.length; i++){
    collection[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var content=this.nextElementSibling;
        if (content.style.display==="block"){
            content.style.display="none";
        }else{
            content.style.display ="block";
        }
    });
}


// Add class 'active' to section when near top of viewport

function setActiveClass(){
    for (const section of sections){
        if (isInViewport(section)){
            section.classList.add("your-active-class");
            setActiveLink(section);
        }else{
            section.classList.remove("your-active-class");
        };
    };
};

// Add class 'active' to navbar when the corresponding section appear

function setActiveLink(section){
    const links =document.querySelectorAll("a");
    const activeSection = section.getAttribute("data-nav")
    links.forEach((link) =>{
        if(link.innerText === activeSection){
            link.classList.add("menu__link-active")
        }else{
            link.classList.remove("menu__link-active")
        }
    })
}



// Set sections as active

document.addEventListener('scroll', function(){
    setActiveClass();
    
});




// Hide navbar when not scrolling

var hide;
window.addEventListener('scroll',function(event) {
    window.clearTimeout( hide);
    hide= setTimeout(function() {
    navMenu.style.top="-100px"; }, 3000);
    navMenu.style.top="0";
});


