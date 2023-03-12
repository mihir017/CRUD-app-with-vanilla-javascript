// Variable
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phoneNo = document.getElementById('phoneNo');
const age = document.getElementById('age');
const aboutSelf = document.getElementById('aboutSelf');
const male = document.getElementById('male');
const female = document.getElementById('female');
const formSubmit = document.querySelector(".form");
const tbody = document.querySelector('tbody');

const userData = [];


formSubmit.addEventListener('submit', function (e) {
    e.preventDefault();
    // add user Data to list
    addUserData();

    //display User Data
    displayUserData()

    // clear all Input Field
    clearInputField();
    
})

// add User Data to List Of Array
function addUserData() {
    const gander = male.checked ? male.value : female.checked ? female.value : '';
    data = {
        [fullName.name]: fullName.value,
        [email.name]: email.value,
        [phoneNo.name]: phoneNo.value,
        [age.name]: age.value,
        gander: gander,
        [aboutSelf.name]: aboutSelf.value
    };
    userData.push(data);
}

// clear all Input Field
function clearInputField() {
    fullName.value = '';
    email.value = '';
    phoneNo.value = '';
    age.value = '';
    male.checked = false;
    female.checked = false;
    aboutSelf.value = '';

}

// display User Data List
function displayUserData() {
    const tbody = document.querySelector('tbody');
    const tr = userData.map(function (data) {
        return `<tr>
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.phoneNo}</td>
        <td>${data.age}</td>
        <td>${data.gander}</td>
        <td>${data.aboutSelf}</td>
        <td><button class="table-btn" type="button">Edit</button> <button class="table-btn" type="button">delete</button></td>
    </tr>`
    })
    tbody.innerHTML = tr.join('');
}