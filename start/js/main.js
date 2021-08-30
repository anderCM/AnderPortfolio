const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
// VALDIATE IF CONSTS EXISTS 
    //SHOW
if(navToggle){
    navToggle.addEventListener("click",()=>{
        navMenu.classList.add("show-menu");
    });
};
//HIDE
if(navClose){
    navClose.addEventListener("click",()=>{
        navMenu.classList.remove("show-menu");
    });
};
//HIDE WHEN CLICK A NAV_LINK
const navLink=document.querySelectorAll(".nav_link");
function linkAnction(){
    const navMenu=document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
};
navLink.forEach(n=>n.addEventListener("click",linkAnction))

//SHOW - HIDE SKILLS
const skillsContent = document.getElementsByClassName("skills_content"),
skillsHeader = document.querySelectorAll(".skills_header")

function toggleSkills(){
    let itemClass = this.parentNode.className;
    for(i = 0; i<skillsContent.length; i++){
        skillsContent[i].className="skills_content skills_close"
    }
    if(itemClass === "skills_content skills_close"){
        this.parentNode.className="skills_content skills_open"
    }
}
skillsHeader.forEach((el)=>{
    el.addEventListener("click",toggleSkills)
})


//  career / work

const tabs = document.querySelectorAll("[data-target]"),
tabContents = document.querySelectorAll("[data-content]")

tabs.forEach(tab =>{
    tab.addEventListener("click",()=>{
        const target=document.querySelector(tab.dataset.target);
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove("qualification_active");
        });
        target.classList.add("qualification_active");
        tabs.forEach(tab =>{
            tab.classList.remove("qualification_active");
        })
        tab.classList.add("qualification_active");
    })
})

//services

const modalViews = document.querySelectorAll(".services_modal"),
    modalBtns = document.querySelectorAll(".services_button"),
    modalCloses = document.querySelectorAll(".services_modal-close")

    let modal = function(modalClick){
        modalViews[modalClick].classList.add("active-modal")
    }

    modalBtns.forEach((modalBtn,i)=>{
        modalBtn.addEventListener("click",()=>{
            modal(i)
        })
    })

    modalCloses.forEach((modalClose)=>{
        modalClose.addEventListener("click",()=>{
            modalViews.forEach((modalView) =>{
                modalView.classList.remove("active-modal")
            })
        })
    })

 //Carousel portfaolio

      let swiperPortfolio = new Swiper(".portfolio_container", {
        cssMode: true,
        loop:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable:true,
          /* dynamicBullets:true, */
        },
      });

//swiper testimonial

let swiperTestimonial = new Swiper(".testimonial_container", {
    loop:true,
    grabCursor:true,
    spaceBetween:48,
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
         dynamicBullets:true, 
    },
    breakpoints:{
        568:{
            slidesPerView:1,
        }
    }
  });

//active link
  const sections = document.querySelectorAll('section[id]')

  function scrollActive(){
      const scrollY = window.pageYOffset
  
      sections.forEach(current =>{
          const sectionHeight = current.offsetHeight
          const sectionTop = current.offsetTop - 50;
          sectionId = current.getAttribute('id')
  
          if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
          }else{
              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
          }
      })
  }
  window.addEventListener('scroll', scrollActive);

//change background header
  function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader) 

/* show scroll up */
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* Dark theme */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/* Send email */
/* openning your default mail app
 const $form = document.querySelector("#form");
const $buttonMailTo = document.querySelector("#openmail");
$form.addEventListener("submit",handleSubmit)

function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(this);
    console.log(form.get("name"));
    $buttonMailTo.setAttribute("href",`mailto:andercm15@gmail.com?subject= My project is about:  ${form.get("project")} - Name: ${(form.get("name"))} My email is: <${(form.get("email"))}>  &body= ${form.get("message")}`);
    $buttonMailTo.click();
} */

//using an API
const $form = document.querySelector("#form")
$form.addEventListener("submit",handleSubmit)

async function handleSubmit(e){
    e.preventDefault();
    const form = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers:{
            "Accept" : "application/json"
        }
    })
    if(response.ok){
        this.reset();
        alert("Gracias por contactarme, te escribiré pronto 😁")
    }
}

/* styling alert */
