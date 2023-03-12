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
const userList = document.querySelector('#user-list');
const viewDetailSection = document.querySelector('#viewDetails')
const registrationFormBox = document.getElementById('registration-form');
const closeBtn = document.querySelectorAll('.close-btn')
const addUserBtn = document.querySelector('.add-user-btn')
const noDataExist = document.querySelector('.no-data-exist');
const viewName = document.querySelector('.view-name');
const viewEmail = document.querySelector('.view-email');
const viewPhoneNo = document.querySelector('.view-phoneNo');
const viewAge = document.querySelector('.view-age');
const viewGander = document.querySelector('.view-gander');
const viewDesc = document.querySelector('.view-desc');
const viewImageText = document.querySelector('.user-img-text');
const userCount = document.querySelector('.user-count');
const userDetailTable = document.querySelector('.user-detail-table');

let userData = [];
let selectedRow = null;
let selectedRowEmail = '';
let isError = false;


window.onload = function () {
    showUserCount()
    if (userData.length === 0) {
        noDataExist.classList.remove('exist')
        userDetailTable.classList.remove('border-bottom');
    } else {
        noDataExist.classList.add('exist')
        userDetailTable.classList.add('border-bottom');
    }
}


addUserBtn.addEventListener('click', function () {
    registrationFormBox.classList.add('active');
})

closeBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (e.target.parentElement.parentElement.parentElement.parentElement.id === 'viewDetails') {
            viewDetailSection.classList.remove('active');
        }
        if (e.target.parentElement.parentElement.parentElement.parentElement.id === 'registration-form' || e.target.parentElement.parentElement.id === 'registration-form') {
            registrationFormBox.classList.remove('active');
        }
    })
})


formSubmit.addEventListener('submit', function (e) {
    e.preventDefault();

    const error = validInputField(); 

    if (!error && fullName.value.trim() && email.value.trim() && phoneNo.value.trim() && age.value.trim() ) {
        // add user Data to list
        addUserData(selectedRow);
    
        // display add user Data 
        displayUserData()
    
        // clear all Input Field
        clearInputField();
    
        // show User Count
        showUserCount();
    
        selectedRow = null;
        selectedRowEmail = '';
        registrationFormBox.classList.remove('active');
        if (userData.length !== 0) {
            noDataExist.classList.add('exist');
            userDetailTable.classList.add('border-bottom');
        }
    }
})

function validInputField() { 
    const emailRegEx = /^([a-zA-z0-9\.\_]+)@([a-zA-Z0-9]+).([A-Za-z]{1,8})([\.a-z]{1,3})$/g;
    const numberRegEx = /^([0-9]{10})$/g;
    const ageRegEx = /^([0-9]{2})$/g;
    if (fullName.value.trim() === '') {
        isError = true;
        setErrorMsg(fullName,'FullName Field is Requier.');
    } else {
        setErrorMsg(fullName,'success');
    }
    if (email.value.trim() === '') {
        isError = true;
        setErrorMsg(email,'Email Field is Requier.');
    } else if (!emailRegEx.test(email.value.trim())) {
        isError = true;
        setErrorMsg(email,'Write proper Email.');
    } else {
        setErrorMsg(email,'success');
    }
    if (phoneNo.value.trim() === '') {
        isError = true;
        setErrorMsg(phoneNo,'Phone No Field is Requier.');
    } else if (!numberRegEx.test(parseInt(phoneNo.value.trim()))) {
        isError = true;
        setErrorMsg(phoneNo,'Enter Must be 10 Number.');
    } else {
        setErrorMsg(phoneNo,'success');
    }
    if (age.value.trim() === '') {
        isError = true;
        setErrorMsg(age,'age Field is Requier.');
    } else if (!ageRegEx.test(parseInt(age.value.trim()))) {
        isError = true;
        setErrorMsg(age,'Age is Invalid.');
    }   else {
        setErrorMsg(age,'success');
    }
    if (emailRegEx.test(email.value.trim()) && numberRegEx.test(parseInt(phoneNo.value.trim())) && ageRegEx.test(parseInt(age.value.trim()))) {
        isError = false;
    }
    return isError
}

function showUserCount() {
    userCount.textContent = userData.length > 1 ? `${userData.length} Counts` : `${userData.length} Count` 
}

function setErrorMsg(field, errorMsg) {
    const smallTag = field.parentElement?.querySelector('small');
    if (errorMsg === 'success') {
        smallTag.textContent = '';
        smallTag.classList.remove('active');
    } else {
        smallTag.textContent = errorMsg;
        smallTag.classList.add('active');
    }
}

// add User Data to List Of Array
function addUserData(selectedRow) {
    const gander = male.checked ? male.value : female.checked ? female.value : '';
    const data = {
        [fullName.name]: fullName.value.trim(),
        [email.name]: email.value.trim(),
        [phoneNo.name]: phoneNo.value.trim(),
        [age.name]: age.value.trim(),
        gander: gander,
        [aboutSelf.name]: aboutSelf.value.trim()
    };
    if (selectedRow) {
        userData = userData.map(user => {
            if (user.email === selectedRowEmail) {
                return data
            } else {
                return user
            }
        })
    } else {
        userData.push(data);
    }
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
    if (!selectedRow) {
        const gander = male.checked ? male.value : female.checked ? female.value : '';
        const tr = document.createElement('tr');
        const td = `<td>${fullName.value.trim() || '-'}</td>
        <td>${email.value.trim() || '-'}</td>
        <td>${phoneNo.value.trim() || '-'}</td>
        <td>${age.value.trim() || '-'}</td>
        <td>${gander || '-'}</td>
        <td class="desc-td">${aboutSelf.value.trim() || '-'}</td>
        <td class="edit-btn-td"><button class="table-btn table-view-btn" type="button"><i class="fa-solid fa-eye"></i></button><button class="table-btn table-edit-btn" type="button"><i class="fa-regular fa-pen-to-square"></i></button> <button class="table-btn table-delete-btn" type="button"><i class="fa-regular fa-trash-can"></i></button></td>`
    
        tr.innerHTML = td;
        tbody.appendChild(tr);
    } else {
        const gander = male.checked ? male.value : female.checked ? female.value : '';
        selectedRow.children[0].textContent = fullName.value || '-';
        selectedRow.children[1].textContent = email.value || '-';
        selectedRow.children[2].textContent = phoneNo.value || '-';
        selectedRow.children[3].textContent = age.value || '-';
        selectedRow.children[4].textContent = gander || '-';
        selectedRow.children[5].textContent = aboutSelf.value || '-';
    }

}

// remove user from list
function removeUser() {
    userData = userData.filter(data => data.email !== selectedRowEmail)
    if (userData.length === 0) {
        noDataExist.classList.remove('exist');
        userDetailTable.classList.remove('border-bottom');
    }
}

// view user Detail Data
function viewUserDetails() {
    const userDetail = userData.find(data => data.email === selectedRowEmail);
    const nameArray = userDetail.fullName.split(' '); 
    const sortName = nameArray.length === 1 ? nameArray[0].charAt(0).toUpperCase() : nameArray[0].charAt(0).toUpperCase() + nameArray[1].charAt(0).toUpperCase() 
    viewImageText.textContent = sortName;
    viewName.textContent = userDetail.fullName || '-';
    viewEmail.textContent = userDetail.email || '-';
    viewPhoneNo.textContent = userDetail.phoneNo || '-';
    viewAge.textContent = userDetail.age || '-';
    viewGander.textContent = userDetail.gander || '-';
    viewDesc.textContent = userDetail.aboutSelf || '-';

    viewDetailSection.classList.add('active');

    selectedRowEmail = '';
}

// delete user Data
userList.addEventListener('click', function (e) {
    const deleteBtn = e.target;

    if (deleteBtn.parentElement.classList.contains('table-delete-btn')) {
        selectedRowEmail = deleteBtn.parentElement.parentElement.parentElement.children[1].textContent;
        removeUser()
        deleteBtn.parentElement.parentElement.parentElement.remove();
        showUserCount()
        selectedRowEmail = ''
    }
})

userList.addEventListener('click', function (e) {
    const editBtn = e.target;

    if (editBtn.parentElement.classList.contains('table-edit-btn')) {
        registrationFormBox.classList.add('active');
        selectedRow = editBtn.parentElement.parentElement.parentElement;
        selectedRowEmail = editBtn.parentElement.parentElement.parentElement.children[1].textContent;
        const selectedUser = userData.filter(data => data.email === selectedRowEmail);
        selectedUser[0].gander
        fullName.value = selectedUser[0].fullName;
        email.value = selectedUser[0].email;
        phoneNo.value = selectedUser[0].phoneNo;
        age.value = selectedUser[0].age;
        if (selectedUser[0].gander === 'Male') {
            male.checked = true;
        } else if (selectedUser[0].gander === 'Female') {
            female.checked = true;
        }
        aboutSelf.value = selectedUser[0].aboutSelf;
    }
})

userList.addEventListener('click', function (e) {
    const viewBtn = e.target;

    if (viewBtn.parentElement.classList.contains('table-view-btn')) {
        selectedRowEmail = viewBtn.parentElement.parentElement.parentElement.children[1].textContent;
        viewUserDetails();
    }
})


