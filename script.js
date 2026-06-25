const myLibrary = [];

class Book {
  constructor(name, author, pages, readStatus) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.uid = crypto.randomUUID();
  }

  bookInfo() {
    console.log(this.name, this.author, this.uid, this.pages, this.readStatus);
  }
}

function addBookToLibrary(name, author, pages, readStatus) {
  const newBook = new Book(name, author, pages, readStatus);
  myLibrary.push(newBook);
}

function displayBooks() {
  const mainContainer = document.querySelector(".content-container");
  mainContainer.textContent = "";
  myLibrary.forEach((book, index) => {
    let card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.uid;

    const number = document.createElement("p");
    number.textContent = index + 1;
    card.appendChild(number);

    const title = document.createElement("p");
    title.textContent = book.name;
    card.appendChild(title);

    const author = document.createElement("p");
    author.textContent = book.author;
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = book.pages;
    card.appendChild(pages);

    const status = document.createElement("button");
    status.textContent = book.readStatus;
    status.classList.add("toggleStatusBtn");
    book.readStatus.toLowerCase() === "read"
      ? status.classList.add("read")
      : status.classList.add("unread");
    status.addEventListener("click", () => {
      if (book.readStatus === "Read") {
        book.readStatus = "Unread";
        status.textContent = "Unread";
        status.classList.replace("read", "unread");
      } else {
        book.readStatus = "Read";
        status.textContent = "Read";
        status.classList.replace("unread", "read");
      }
    });
    card.appendChild(status);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => {
      const bookIndex = myLibrary.findIndex((b) => b.uid === book.uid);
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });
    card.appendChild(deleteButton);
    mainContainer.appendChild(card);
  });
}

const dialog = document.querySelector("#book-dialog");
const newBookBtn = document.querySelector(".addButton");
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

document.querySelector("#close-btn").addEventListener("click", () => {
  dialog.close();
});

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");

titleInput.addEventListener("input", () => {
  if (!titleInput.value.trim()) {
    titleInput.setCustomValidity("Title must be filled!");
  } else {
    titleInput.setCustomValidity("");
  }
});

authorInput.addEventListener("input", () => {
  if (!authorInput.value.trim()) {
    authorInput.setCustomValidity("The author name must be filled!");
  } else {
    authorInput.setCustomValidity("");
  }
});

const submitForm = document.querySelector("#book-dialog form");
submitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Set custom messages before letting the form validate itself
  titleInput.setCustomValidity(
    titleInput.value.trim() ? "" : "Title must be filled!",
  );
  authorInput.setCustomValidity(
    authorInput.value.trim() ? "" : "The author name must be filled!",
  );

  // Let the form's built-in validation show the messages
  if (!submitForm.reportValidity()) return;
  const formData = new FormData(submitForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  let readStatus = formData.get("readStatus");
  readStatus = readStatus[0].toUpperCase() + readStatus.slice(1).toLowerCase();
  addBookToLibrary(title, author, pages, readStatus);
  dialog.close();
  displayBooks();
});

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "Read");
addBookToLibrary("1984", "George Orwell", 328, "Unread");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "Read");
addBookToLibrary("Dune", "Frank Herbert", 412, "Unread");
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 310, "Read");
displayBooks();
