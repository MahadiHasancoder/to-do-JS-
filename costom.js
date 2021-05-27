const TitleInput = document.querySelector("#TitleInput")
const DesInput = document.querySelector("#DescriptionInput")
const submit = document.querySelector("#submit")
const tbody = document.querySelector("#tbody")



if (!localStorage.getItem("todolist")) {
    localStorage.setItem("todolist", JSON.stringify(new Array()));

}

function Submit(){
    submit.addEventListener("click", function () {
        if (TitleInput.value.trim() == '' || DesInput.value.trim() == '') {
            alert('Error!...You must fill all boxes!')
        } else {
            const createlocalStorage = JSON.parse(localStorage.getItem("todolist"))
            createlocalStorage.push({
                Title: TitleInput.value,
                Description: DesInput.value
            })
    
            localStorage.setItem("todolist", JSON.stringify(createlocalStorage))
            TitleInput.value = ''
            DesInput.value = ''
            alert("success")
        }
        todoDAta();
        modifyTodo()
    })
}
Submit()
function todoDAta() {
    let StorageValue = JSON.parse(localStorage.getItem("todolist"))
    tbody.innerHTML = '';
    let o = 1
    StorageValue.forEach((element, index) => {
        tbody.innerHTML += `
        <tr id="tableBody" data-itemid="${index}">
        <th scope="row">${o}</th>
        <td>${element.Title}</td>
        <td>${element.Description} </td>
        <td>
            <button data-itemid="${index}" type="button" id="edbtn" class="btn btn-warning px-3">Edit</button>
            <button data-itemid="${index}" type="button" class="btn btn-danger" id="Delete">Delete</button>
        </td>
      </tr>
        `
        o++
    });
    Deletebtn()
}
todoDAta()

function Deletebtn() {
    let AllItem = document.querySelectorAll("#tableBody")

    AllItem.forEach(function (item) {
        item.querySelector('#Delete').onclick = function (e) {
            let todoPossion = Number(e.currentTarget.getAttribute("data-itemid"));
            const GetlocalStorage = JSON.parse(localStorage.getItem("todolist"));

            const deleted = GetlocalStorage.filter((value, index) => {
                return index !== todoPossion;
            })
            localStorage.setItem("todolist", JSON.stringify(deleted))

            item.remove;

            todoDAta()
            modifyTodo()

            alert("Data Delete Successfully")

        document.querySelector("#editor").style.display = "none"
        document.querySelector("#Created").style.display = "block"
        };
    });

}

Deletebtn()


function modifyTodo() {
    let AllItem = document.querySelectorAll("#tableBody")
    AllItem.forEach(function (item) {
        item.querySelector('#edbtn').addEventListener("click", function () {
            let Store = JSON.parse(localStorage.getItem("todolist"))
            let getNumber = Number(item.getAttribute("data-itemid"))

            document.querySelector("#editTitle").value = Store[getNumber].Title
            document.querySelector("#editDes").value = Store[getNumber].Description

            document.querySelector("#ArrayIn").value = getNumber

            document.querySelector("#editor").style.display = "block"
            document.querySelector("#Created").style.display = "none"
            todoDAta()
        })
    });


}
modifyTodo()


function updateData(){
    document.querySelector("#Update").addEventListener("click", function(){

    let currentItems = JSON.parse(localStorage.getItem("todolist"));

    let editTitle = document.querySelector("#editTitle").value; 
    let editDes = document.querySelector("#editDes").value;
    
    let obj = {
        Title: editTitle,
        Description: editDes,
    }

    let updateIndex = Number(document.querySelector("#ArrayIn").value)

    console.log(updateIndex);

    currentItems[updateIndex] = obj

    localStorage.clear()

    localStorage.setItem("todolist", JSON.stringify(currentItems))
    
    document.querySelector("#editor").style.display = "none"
    document.querySelector("#Created").style.display = "block"
    
    todoDAta()
    modifyTodo()


    })
    
}
updateData()

function Cancel_B(){
    let Cancelbtn = document.querySelector("#Cancel");

    Cancelbtn.addEventListener("click", function(){

        document.querySelector("#editTitle").value = ""
        document.querySelector("#editDes").value = ""

        document.querySelector("#editor").style.display = "none"
        document.querySelector("#Created").style.display = "block"
        todoDAta()
        modifyTodo()
    })
}
Cancel_B()
