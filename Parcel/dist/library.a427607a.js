const formNewBookTemplate = document.getElementById('form-new-book-template');
const cardBookTemplate = document.getElementById("cardBook-template");
const buttonShowFormNewBook = document.getElementById('addBook');
const main = document.querySelector("main");
const containerImageBook = document.getElementById('img-cover-preview');
const inputFileImageBook = document.getElementById('portada-img');
const imgPreview = document.getElementById('img-cover-preview');
for(let index = 0; index < 3; index++){
    var cardnew = cardBookTemplate.content.cloneNode(true);
    document.getElementById("container-cards").appendChild(cardnew);
}
buttonShowFormNewBook.addEventListener('click', openFormNewBook);
function openFormNewBook() {
    if (main.querySelector('#form-addBook-content')) {
        console.log("form already open");
        return;
    }
    const formnew = formNewBookTemplate.content.cloneNode(true);
    main.appendChild(formnew);
}
inputFileImageBook.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else imgPreview.src = "#"; // Reset to default if no file is selected
});

//# sourceMappingURL=library.a427607a.js.map
