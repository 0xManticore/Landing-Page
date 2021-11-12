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

// Define Global Variables
var navbar = document.getElementById("navbar__list");
var sections = document.querySelectorAll("section");
var counter = 1;


// build the nav
for(var section of sections)
{
    title = section.dataset.nav;
    var listItem = document.createElement("li");
    var anchor = document.createElement("a");
    listItem.appendChild(anchor);
    listItem.setAttribute("class", "menu__link");
    anchor.setAttribute("class", "menu__link");
    navbar.appendChild(listItem);
    anchor.innerHTML = title;
    counter++;
}

// Scroll to anchor ID using scrollTO event
function addScrollEvent() {
    var items = document.querySelectorAll("li");
    var sections = document.querySelectorAll("section");
    for(let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function(){sections[i].scrollIntoView({behavior:"smooth"});});
    }
    /* Another Approach
    for(var i = 0; i < 3; i++) {
        items[i].setAttribute("onclick", `sections[${i}].scrollIntoView()`);
    }
    */
}

// add active class to elements appearing in the screen
// and removing active class from elements when they out of screen
function addActiveClass() {
    const observers = [];
    var items = document.querySelectorAll("li");
    var sections = document.querySelectorAll("section");
    for(let i = 0; i < sections.length; i++){
        observers[i] = new IntersectionObserver(
        function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) { // Add class 'active' to section when near top of viewport
                entry.target.classList.add("your-active-class");
                items[Number(String(entry.target.id)[7])-1].classList.add("your-active-class");
            }
            else { // remove class from section when out of viewport
                entry.target.classList.remove("your-active-class");
                items[Number(String(entry.target.id)[7])-1].classList.remove("your-active-class");
            }
            });
        }
        , {threshold : 0.7});
        observers[i].observe(sections[i]);
    }
}


// Add new section button
var body = document.getElementsByTagName("body")[0];
var newSectionButton = document.createElement("button");
newSectionButton.setAttribute("onclick", "createSection();addScrollEvent();addActiveClass();");
var header = document.getElementsByClassName("page__header")[0];
header.appendChild(newSectionButton);
newSectionButton.innerHTML = "Add Section";
newSectionButton.style.position = "fixed";
newSectionButton.style.zIndex = "99";
newSectionButton.style.top = "0px";
newSectionButton.style.right = "0px";
newSectionButton.style.width = "200px";
newSectionButton.style.height = "55px";
newSectionButton.style.backgroundColor = "white";
newSectionButton.style.color = "black";
newSectionButton.style.borderRadius= "4px";
newSectionButton.style.fontSize= "18px";

function createSection() {
    var currentCount = document.querySelectorAll("li").length;
    var listItem = document.createElement("li");
    var anchor = document.createElement("a");
    listItem.appendChild(anchor);
    listItem.setAttribute("class", "menu__link");
    anchor.setAttribute("class", "menu__link");
    navbar.appendChild(listItem);
    anchor.innerHTML = `Section ${currentCount+1}`;
    var section = 
    `<section id="section${currentCount+1}" data-nav="Section ${currentCount+1}">
        <div class="landing__container">
            <h2>Section ${currentCount+1}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
    </section>`
    var main = document.getElementsByTagName("main")[0];
    main.insertAdjacentHTML("beforeend", section);
}


// Back to top button
var body = document.getElementsByTagName("body")[0];
var topButton = document.createElement("button");
topButton.setAttribute("onclick", "location.href='#top'");
var footer = document.getElementsByClassName("page__footer")[0];
footer.appendChild(topButton);
topButton.innerHTML = "&#8593;";



// style the top button
topButton.style.position = "fixed";
topButton.style.zIndex = "99";
topButton.style.bottom = "30px";
topButton.style.right = "20px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.backgroundColor = "lightblue";
topButton.style.borderRadius= "4px";
topButton.style.fontSize= "30px";

// call main functions
addScrollEvent();
addActiveClass();