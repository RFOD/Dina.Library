let library = []
let bookOrder = 0
const container = document.querySelector('[data-library]')
const createBookButton = document.querySelector('[data-create-book]')
let changeStatus


function Book()
{
    this.title = ''
    this.author = ''
    this.pages = ''
    this.readingStatus = false
    this.language = ''
    this.index = ''
}

function createBookObject()
{
    const book = new Book()
    book.title = prompt("What's the title of the book?")
    book.author = prompt('Who is the author of the book?')
    book.pages = prompt('How many pages does the book have?')
    book.language = prompt('In which language was the book written?')
    book.index = bookOrder
    bookOrder++
    appendToLibrary(book)
}
function appendToLibrary(object)
{
    library.push(object)
    generateBook(object.title, object.author, object.pages,object.language)
}
function generateBook(title, author, pages, language) {
    const book = document.createElement("div");
    book.setAttribute('class', 'center-flex mainBook');
    book.dataset.index = bookOrder;
    book.innerHTML = `
        <div class="book">
        <h2 data-title class="bookTitle">Title: ${title}</h2>
        <p data-author class="bookAuthor">Author: ${author}</p>
        <p data-language class="bookLanguage">Language: ${language}</p>
        <p data-pages class="bookPages">Pages: ${pages}</p>
        <div class="button bookReadingStatusFalse" data-toggle-status>Read</div>
        <div class="button bookDelete" data-delete-book>Delete</div>
    `;
    container.addEventListener('click', (event) => removeBook(event))
    container.appendChild(book);
    bookOrder++;
    changeStatus = document.querySelectorAll('[data-toggle-status]')
    changeStatus.forEach(button => {
        button.addEventListener('click', changeReadingStatus);
    });
}
function removeBook(event)
{
    if (event.target.classList.contains('bookDelete'))
        {
            const book = event.target.closest('.mainBook')
            container.removeChild(book)
            const index = library.findIndex((book) => book.index === parseFloat(event.target.dataset.index) )
            if(index !== -1)
                {
                    library.splice(index, 1)
                }
        }
}
function changeReadingStatus(event) {
    let button = event.target;
    if (button.classList.contains('bookReadingStatusFalse')) {
        button.classList.remove('bookReadingStatusFalse');
        button.classList.add('bookReadingStatusTrue');
    } else if (button.classList.contains('bookReadingStatusTrue')) {
        button.classList.remove('bookReadingStatusTrue');
        button.classList.add('bookReadingStatusFalse');
    } else {
        console.log('No such class as bookReadingStatusFalse or bookReadingStatusTrue!');
    }
}
createBookButton.addEventListener('click', createBookObject);
if(changeStatus)
    {
        container.addEventListener('click', function(event) {
            if (event.target.matches('[data-toggle-status]')) {
                changeReadingStatus(event);
            }
        });
    }