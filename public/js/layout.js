const navbar = document.querySelector('header');
const nav = document.querySelector('header nav');
const navList = document.querySelector('header nav ul');
const navButton = document.querySelector('header button');
let navClosed = true;

navButton.addEventListener('click', () => {
    navClosed = !navClosed;
    handleNav();
});

function handleNav() {
    navButton.children[0].classList.toggle('bi-x');
    if (!navClosed) {
        nav.style.maxHeight = nav.scrollHeight + 'px';
        navList.style.opacity = 1;
    } else {
        nav.style.maxHeight = null;
        navList.style.opacity = 0;
    }
}