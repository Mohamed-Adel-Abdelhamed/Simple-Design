//HANDLE AVTIVE FUNCTION
function handle_active(event) {
    event.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    event.target.classList.add("active");
}

/*----------------------------------------------------------------------------------------------------------------*/

//ADD COLOR TO LOCAL STORAGE
let main_color = localStorage.getItem("color-option");
//GET COLOR ON LOCAL STORAGE
if (main_color !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));
    //REMOVE ACTIVE FROM COLORS LIST
    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.color === main_color) {
            //ADD ACTIVE TO COLOR
            element.classList.add("active");
        }
    });
}
/*-----------------------------------------------------------------------------------------*/

//SETTING BUTTON

let button = document.querySelector(".toggle-gear .fa-gear");

let setting = document.querySelector(".setting");

button.onclick = function () {
    button.classList.toggle("fa-spin");

    setting.classList.toggle("open");
};

/*-----------------------------------------------------------------------------------------*/
//CHANGING COLOR
const color_li = document.querySelectorAll(".colors-list li");

color_li.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    //SET COLOR ON LOCAL STORAGE
    localStorage.setItem("color-option", e.target.dataset.color);

        //ADD & REMOVE ACTIVE FROM COLORS
        handle_active(e);
    });
});
/*---------------------------------------------------------------------------------------------------------------*/
//BACKGROUND VARIABLE 
let background_option = true;
//BACKGROUND INTERVAL VARIABLE
let background_interval;

//GET LOCAL STORAGE
let background_item = localStorage.getItem("background-option");

//CHECK IT IS EMPTY OR NOT
if (background_item !== null) {

    //REMOVE ACTIVE FROM ALL
    document.querySelectorAll(".option-background span").forEach((element) => {
        element.classList.remove("active");
    });

    if (background_item === "true") {
        background_option = true;
        document.querySelector(".option-background .yes").classList.add("active");
    }
    else {
        background_option = false;
        document.querySelector(".option-background .no").classList.add("active");
    }
}


//CHANGE BACKGROUND
const back_ground = document.querySelectorAll(".option-background span");

back_ground.forEach((span) => {
    span.addEventListener("click", (e) => {
        //ADD & REMOVE ACTIVE FROM BACKGROUND
        handle_active(e);

        if (e.target.dataset.background === "yes") {
            background_option = true;
            randomize_background();
            localStorage.setItem("background-option", true);
        }
        else {
            background_option = false;
            clearInterval(background_interval);
            localStorage.setItem("background-option", false);
        }
        
    });
});
/*-----------------------------------------------------------------------------------------*/
let landing_page = document.querySelector(".landing");

let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

//CHANGE BACKGROUND RANDOMLY

function randomize_background() {
    if (background_option === true) {
        background_interval = setInterval(() => {
            let random_number = Math.floor(Math.random() * imgs.length);

            landing_page.style.backgroundImage = 'url("Images/' + imgs[random_number] + '")';

        }, 3000);
    }
}
randomize_background();

//SKILLS DATA-PROGRESS

let our_skills = document.querySelector(".container");

window.onscroll = function () {
    let skills_offset_top = our_skills.offsetTop;

    let skills_offset_height = our_skills.offsetHeight;

    let window_height = this.innerHeight;

    let window_scroll_top = this.pageYOffset;

    if (window_scroll_top > (skills_offset_top + skills_offset_height - window_height)) {

        let all_skills = document.querySelectorAll(".skill-box .skill-progress span");
        all_skills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

/*------------------------------------------------------------------------------------------------------------------------*/
// DISPLAY THE OVERLAY WITH THE IMAGE ONCLICK

let our_gallery = document.querySelectorAll(".gallery .images-box img");

our_gallery.forEach((img) => {

    img.addEventListener("click", (e) => {
        //CREATE IMAGE OVERLAY

        let popup_overlay = document.createElement("div");

        popup_overlay.className = "popup-overlay";

        document.body.appendChild(popup_overlay);
        //CREATE IMAGE COVER

        let popup_cover = document.createElement("div");

        popup_cover.className = "popup-cover";
        //CREATE IMAGE HEADER

        if (img.alt !== null) {
            let img_head = document.createElement("h3");

            img_head.className = "img-head";

            let img_head_text = document.createTextNode(img.alt);

            img_head.appendChild(img_head_text);

            popup_cover.appendChild(img_head);
        }
        //CREATE IMG 
        let popup_img = document.createElement("img");

        popup_img.src = img.src;

        popup_cover.appendChild(popup_img);

        document.body.appendChild(popup_cover);

        //CREATE CLOSE BUTTON

        let close_button = document.createElement("span");

        close_button.className = "close-button";

        let close_button_text = document.createTextNode("X");

        close_button.appendChild(close_button_text);

        popup_cover.appendChild(close_button);

        //CLICK ON CLOSE BUTTON

        close_button.addEventListener("click", (e) => {

            if (e.target.className === "close-button") {
                //REMOVE IMAGE 
                e.target.parentNode.remove();
                //REMOVE OVERLAY
                document.querySelector(".popup-overlay").remove();
            }
        });
    });
})
/*------------------------------------------------------------------------------------------------------------------------*/ 
//SCROLL THE VIEW WITH THE BULLETS

const all_bullets = document.querySelectorAll(".nav-bullets .bullet");

all_bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
})
/*-----------------------------------------------------------------------------------------------------------------------*/

//BULLETS DISPLAY OPTION 

let div_bullets = document.querySelector(".nav-bullets");

let bullet_btn = document.querySelectorAll(".option-bullets span");

let bullet_local_item = localStorage.getItem("option_bullet");

if (bullet_local_item !== null) {

    bullet_btn.forEach((span) => {
        span.classList.remove("active");
    });

    if (bullet_local_item === "block") {
        document.querySelector(".option-bullets .yes").classList.add("active");
        div_bullets.style.display = "block";
    }
    else {
        document.querySelector(".option-bullets .no").classList.add("active");
        div_bullets.style.display = "none";
    }
}


bullet_btn.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (span.dataset.bullets === "show") {
            div_bullets.style.display = "block";

            localStorage.setItem("option_bullet", "block");
        }
        else {
            div_bullets.style.display = "none";

            localStorage.setItem("option_bullet", "none");
        }
        handle_active(e);
    });
})

/*-----------------------------------------------------------------------------------------------------------------*/

document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("option_bullet");

    window.location.reload();
}
/*--------------------------------------------------------------------------------------------------------------------*/

//DISPLAY MENU-BAR 

let menu_button = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

menu_button.onclick = function (e) {
    e.stopPropagation();

    this.classList.toggle("menu-active");

    links.classList.toggle("open");
    
}

document.addEventListener(("click"), (e) => {
    if (e.target !== menu_button && e.target !== links) {

        if (links.classList.contains("open")) {
            menu_button.classList.toggle("menu-active");

            links.classList.toggle("open");
        }
    }
})


links.onclick = function (e) {
    e.stopPropagation();
}