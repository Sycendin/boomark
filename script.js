const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector("#boomark-form");
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#bookmarks-container');

let bookmarks = [];
//Show modal 
const showModal = () =>{
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}
// Modal event listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
})
window.addEventListener('click', (e)=>{
    e.target === modal ? modal.classList.remove("show-modal") : false;
})

const validate= (nameValue, urlValue)=>{
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('Please submit values for both fields');
        return false;
    }

    if (!urlValue.match(regex)){
        alert('Please provide a valid address');
        return false;
    }
    return true;
}
// Build bookmarks DOM
const buildBookmarks = () =>{
    // Remove all bookmarks
    bookmarksContainer.textContent='';
    bookmarks.forEach((bookmark)=>{
        const {name, url} = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times')
        closeIcon.setAttribute('title', 'Delete Bookmark')
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Link container
        const linkInfo = document.createElement('div')
        linkInfo.classList.add('name')
        const icon = document.createElement('img')
        icon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
        icon.setAttribute('alt', "Icon")
        //link
        const link = document.createElement('a')
        link.setAttribute('href', `${url}`)
        link.setAttribute('target', '_blank')
        link.textContent = name;
        // Append to bookmarks container
        linkInfo.append(icon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    })
}
// Fetch bookmarks from localstorage
const fetchBookmarks = () =>{
    if (localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
    else{
        //Create bookmarks array in localStorage
        bookmarks = [
            {
                name: 'Google',
                url: "https://google.com",
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}
// Delete bookmark
const deleteBookmark = (url) =>{
    bookmarks.forEach((bookmark, i)=>{
        if (bookmark.url === url){
            // If found delete one item at index 1 (that bookmark)
            bookmarks.splice(i, 1)
        }
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}
// Store Bookmark
const storeBookmark = (e) =>{
    e.preventDefault();
    const nameValue= websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`; 
    }
    if(!validate(nameValue,urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark)

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteUrlEl.focus();
}

// Event listeners
bookmarkForm.addEventListener('submit', storeBookmark);

// On page load, fetch bookmarks
fetchBookmarks();

