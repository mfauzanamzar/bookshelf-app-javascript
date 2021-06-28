const UNCOMPLETED_READ_BOOK_ID = "books";
const COMPLETED_READ_BOOK_ID = "cbooks";
const BOOK_ITEMID = "itemID"

function addBook() {
    const uncompletedREADBook = document.getElementById(UNCOMPLETED_READ_BOOK_ID)
    const completedREADBook = document.getElementById(COMPLETED_READ_BOOK_ID)
    const checkBox = document.getElementById("inputBookIsComplete")

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;

    console.log(title)
    console.log(author)
    console.log(year)

    if (checkBox.checked == true){
        const book = makeBook(title, author, year, true);
        const bookObject = composeBookObject(title, author, year, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
    
        completedREADBook.append(book)
        updateDataToStorage();
      } else {
        const book = makeBook(title, author, year, false);
        const bookObject = composeBookObject(title, author, year, false);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
    
        uncompletedREADBook.append(book)
        updateDataToStorage();
      }

   

}

function makeBook(judul, penulis, tahun, isCompleted) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = judul;
   

    const textAuthor = document.createElement("p");
    textAuthor.innerText = penulis;

    const textYear = document.createElement("p");
    textYear.innerText = tahun;



    const textContainer = document.createElement("a");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);



    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton());
    }

    return container;
}

function searchBook(){
    let input = document.getElementById("searchBookTitle");
    filter = input.value.toLowerCase();
    let x = document.getElementById('col-2');
    let y = x.getElementsByClassName('item');
   
   

    for (i = 0; i < y.length; i++) {
        a = y[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            y[i].style.display = "";
        } else {
            y[i].style.display = "none";
        }
    }

   
}


function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_READ_BOOK_ID);
    const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > p").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
    const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > p").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);


    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}


function removeTaskFromCompleted(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    
    taskElement.remove();
    updateDataToStorage();
   
    
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
        notificationBox();
                
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function notificationBox(){
    const modal = document.getElementById("myModal")
    modal.style.display = "block";

}

function clsModal(){
    const modal = document.getElementById("myModal")
    modal.style.display= "none"
}






