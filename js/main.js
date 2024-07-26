var bookMarkName = document.getElementById("BookMarkNameInput");
var bookMarkUrl = document.getElementById("BookMarkUrlInput");

var modelBookMarkNameInput = document.getElementById("modelBookMarkNameInput");
var modelBookMarkUrlInput = document.getElementById("modelBookMarkUrlInput");

var addBookMarkBtn = document.getElementById("addBookMarkBtn");
var searchInput = document.getElementById("searchInput");

var bookMarkArr = [];
var favBookMarkArr = [];

var index;

addBookMarkBtn.addEventListener("click", addBookMark);

// @==== show table data function implementation ===>
function showTableData(htmlId) {
  document
    .getElementById(`${htmlId}`)
    .classList.replace("invisible", "visible");
}

// @==== hide table data function implementation ===>
function hideTableData(htmlId) {
  document
    .getElementById(`${htmlId}`)
    .classList.replace("visible", "invisible");
}

// @==== add book mark function implementation ===>
function addBookMark() {
  var bookMarkObj = {
    bookMarkName: bookMarkName.value,
    bookMarkUrl: bookMarkUrl.value,
  };

  bookMarkArr.push(bookMarkObj);

  showTableData("tableData");
  clearInputs([bookMarkName, bookMarkUrl]);
  displayBookMarks(bookMarkArr);

  console.log(bookMarkArr);
}

// @==== clear inputs function implementation ===>
function clearInputs(selectedInputs) {
  for (var i = 0; i < selectedInputs.length; i++) {
    selectedInputs[i].value = "";
  }
}

// @==== display data and search function implementation ===>
function displayBookMarks(arr) {
  var searchTerm = searchInput.value;
  var dataContainer = "";

  for (var i = 0; i < arr.length; i++) {
    if (
      bookMarkArr[i].bookMarkName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      dataContainer += `
              <tr id='tableRowContentOf${i}'>
                <td>${i + 1}</td>
                <td>${arr[i].bookMarkName}</td>
                <td>${arr[i].bookMarkUrl}</td>
                <td>
                  <span>
                    <i id ='likeIcon${i}'onclick="toggleLIcon('likeIcon${i}' , 'text-primary')" class="me-2 fa-solid fa-thumbs-up fa-i-cursor ">
                    </i>
                  </span>
                  <span>
                    <i id='hurtIcon${i}' onclick="toggleLIcon('hurtIcon${i}' , 'text-danger')" class="fa-solid fa-heart fa-i-cursor"></i>
                  </span>
                </td>
                <td>
                  <a href="${
                    arr[i].bookMarkUrl
                  }" class="btn btn-outline-primary" target="_blank"> Visit</a>
                </td>
                <td>
                  <button onclick="setBookMarkDataIntoModel(${i})" class="btn btn-outline-warning" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
                </td>
                <td>
                  <button onclick="deleteBookMark(${i} , bookMarkArr , 'tableData')" class="btn btn-outline-danger">Delete</button>
                </td>
                <td>
                  <button onclick="addBookMarkToFavorite(${i})" class="btn btn-outline-success">Add to favorite</button>
                </td>
              </tr>
      `;
    }
  }
  document.getElementById("showData").innerHTML = dataContainer;
}

// @==== change icon text color function implementation ===>
function toggleLIcon(selectedIcon, toggleTextColor) {
  document.getElementById(selectedIcon).classList.toggle(toggleTextColor);
}

// @==== set values into model function implementation ===>
function setBookMarkDataIntoModel(selectedModelBookMark) {
  index = selectedModelBookMark;
  modelBookMarkNameInput.value =
    bookMarkArr[selectedModelBookMark].bookMarkName;
  modelBookMarkUrlInput.value = bookMarkArr[selectedModelBookMark].bookMarkUrl;
  console.log(selectedModelBookMark);
  toggleModelBtn();
}

// @==== toggle model btn function implementation ===>
function toggleModelBtn() {
  setTimeout(() => {
    document.getElementById("addModelBtn").classList.add("d-none");
    document
      .getElementById("updateModelBtn")
      .classList.replace("d-none", "d-block");
  }, 1000);
}

// @==== update book mark function implementation ===>
function updateBookMark() {
  bookMarkArr[index].bookMarkName = modelBookMarkNameInput.value;
  bookMarkArr[index].bookMarkUrl = modelBookMarkUrlInput.value;
  displayBookMarks(bookMarkArr);
}

// @==== delete book mark function implementation ===>
function deleteBookMark(selectedBookMark, targetedArr, hideTable) {
  targetedArr.splice(selectedBookMark, 1);
  displayBookMarks(targetedArr);

  if (targetedArr.length == 0) {
    hideTableData(hideTable);
  }
}

// @==== delete book mark function implementation ===>
function deleteFavBookMark(selectedBookMark, targetedArr, hideTable) {
  targetedArr.splice(selectedBookMark, 1);
  displayFavBookMarks(targetedArr);

  if (targetedArr.length == 0) {
    hideTableData(hideTable);
  }
}

// @==== add fav book mark function implementation ===>
function addBookMarkToFavorite(item) {
  var favBookMarkObj = {
    favBookMarkName: bookMarkArr[item].bookMarkName,
    favBookMarkUrl: bookMarkArr[item].bookMarkUrl,
  };

  favBookMarkArr.push(favBookMarkObj);
  console.log(favBookMarkArr);

  showTableData("favTable");
  deleteBookMark(index, bookMarkArr, "tableData");
  displayFavBookMarks(favBookMarkArr);
}

// @==== display fav book mark function implementation ===>
function displayFavBookMarks(arr) {
  var favTableRorContainer = "";
  for (var j = 0; j < arr.length; j++) {
    favTableRorContainer += `
            <tr>
              <td>${j + 1}</td>
              <td>${arr[j].favBookMarkName}</td>
              <td>${arr[j].favBookMarkUrl}</td>
              <td>
                <a href="${
                  arr[j].favBookMarkUrl
                }" class="btn btn-outline-primary" target="_blank"> Visit</a>
              </td>
              <td>
                <button onclick="deleteFavBookMark(${j} , favBookMarkArr , 'favTable')" class="btn btn-outline-danger">Delete From Favorite</button>
              </td>
            </tr>
    `;
  }

  document.getElementById("shawFavBody").innerHTML = favTableRorContainer;
}
