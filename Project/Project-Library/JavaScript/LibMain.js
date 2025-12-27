const dialog = document.querySelector("#book-dialog");
const cancelBtn = document.querySelector("#cancel-btn");
const addBookBtn = document.querySelector("#new-book-btn");
const form = document.querySelector("#book-form");

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator...");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

let myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBook() {
  const bookList = document.querySelector("#library-grid");
  bookList.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.dataset.id = book.id;
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>作者：${book.author}</p>
      <p>页数：${book.pages}</p>
      <p>已读：${book.read ? "是" : "否"}</p>
      <button class="delete-btn">删除</button>
      <button class="toggle-read-btn">切换已读</button>
    `;
    bookList.appendChild(bookItem);
    const deleteBtn = bookItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      const bookID = e.target.closest(".book-item").dataset.id;
      myLibrary = myLibrary.filter((book) => book.id !== bookID);
      displayBook();
    });
    const toggleReadBtn = bookItem.querySelector(".toggle-read-btn");
    toggleReadBtn.addEventListener("click", (e) => {
      const bookID = e.target.closest(".book-item").dataset.id;
      const book = myLibrary.find((book) => book.id === bookID);
      book.toggleRead();
      displayBook();
    });
  });
}


addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read-status").checked;
  addBookToLibrary(title, author, pages, read);
  displayBook();
  dialog.close();
  form.reset();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

addBookToLibrary("霍比特人", "J.R.R. 托尔金", 295, false);
addBookToLibrary("1984", "乔治·奥威尔", 328, true);
displayBook();
