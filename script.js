const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector("#boomakr-form");
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmakrsContainer = document.querySelector('#bookmarks-container');

//Show modal 
const showModal = () =>{
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
})
window.addEventListener('click', (e)=>{
    e.target === modal ? modal.classList.remove("show-modal") : false
})