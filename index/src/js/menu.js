const menuBarMd = document.querySelector('.btnControlMd');
const menuBarSm = document.querySelector('.btnControlSm');

const menuMd = document.querySelector(".MenuBarMd")
const menuSm = document.querySelector(".MenuBarSm")

const body = document.body;

menuBarMd.addEventListener('click', () => {
    console.log("enter!!!")
    if (menuMd.classList.contains('-none')) {
        menuMd.classList.remove('-none');
        body.style.overflow = 'hidden'; // 禁止滾動
    } else {
        menuMd.classList.add('-none');
        body.style.overflow = ''; // 恢復預設滾動
    }
});


menuBarSm.addEventListener('click', () => {
    // console.log("enter!!!")
    if (menuSm.classList.contains('-none')) {
        menuSm.classList.remove('-none');
        body.style.overflow = 'hidden'; // 禁止滾動
    } else {
        menuSm.classList.add('-none');
        body.style.overflow = ''; // 恢復預設滾動
    }
});