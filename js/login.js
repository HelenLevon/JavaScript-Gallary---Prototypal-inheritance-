const btnSubmit = document.getElementById("submit");
const inputLogin = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const alertMsg = document.getElementById("alert");
const infoUser = document.getElementById("info-user");
const form = document.getElementById("form");
const btnShowPassword = document.getElementById('btnShowPassword');
const emailAddress = document.getElementById("emailAddress");
const passwordField = document.getElementById("passwordField");
const btnPreviousePage = document.getElementById("previousePage");
const userMenu = document.getElementById("menu");
const jsExpert = document.getElementById("jsExpert");
const btnGallery = document.getElementById("go_gallery");
const btnAboutUser = document.getElementById("go_about_user");
const btnExit = document.getElementById("go_exit");
const galleryContainer = document.getElementById("galleryContainer");

let LoginForm = function (validatorModule, galleryModule, LoginPassword) {
    this.validator = validatorModule;
    this.gallery = galleryModule;
    this.flag = true;
    this._aboutHandler = (event) => { // public
        event.preventDefault();
        this.showBox("aboutUser")
        this.initPageAboutUser();
    };
    this._galleryHandler = (event) => {
        event.preventDefault();
        this.showBox("gallery");
    };
    this._exitHandler = (event) => {
        event.preventDefault();
        this.exitFromUserPage();
    }
    this._showPasswordHandler = () => {
        if (this.flag) {
            this.flag = !this.flag;
            this.showPassword(localStorage.getItem("password"));
            btnShowPassword.innerHTML = "Скрыть пароль";
        } else {
            this.flag = !this.flag;
            this.hidePassword(localStorage.getItem("password"));
            btnShowPassword.innerHTML = "Показать пароль";
        }
    };

}
LoginForm.prototype = {

    initComponent: function ({
        login: email,
        password: password
    }) {
        btnSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            this.validateUserData();
        });
        this.setLocalStorageData(email, password)
        this.gallery.initComponentListener();
        this.initUserMenuListeners();
        this.initListenersAboutUser();
        
    },
    setLocalStorageData: function (email, password) {
        localStorage.setItem("login", email);
        localStorage.setItem("password", password);
        localStorage.setItem("status", "null")
    },
    initUserMenuListeners: function () {
        btnGallery.addEventListener('click', this._galleryHandler);
        btnAboutUser.addEventListener("click", this._aboutHandler);
        btnExit.addEventListener('click', this._exitHandler);
    },
    initListenersAboutUser: function () {
        btnShowPassword.addEventListener("click", this._showPasswordHandler)
    },
    validateUserData: function () {
        let isCorrectData = this.validator.isCorrectData();
        if (isCorrectData) {
            this.setStatus("userTrue");
            this.showBox("gallery");
            this.showUserMenu();
            this.gallery.initComponentGallary();
        }
    },
    setStatus: function (status) {
        localStorage.setItem("status", status);
    },
    showBox: function (btn) {
        btnGallery.classList.remove("btn-primary");
        btnAboutUser.classList.remove("btn-primary");
        btnExit.classList.remove("btn-primary");
        galleryContainer.style.display = 'none';
        form.style.display = 'none';
        infoUser.style.display = 'none';
        switch (btn) {
            case "gallery":
                btnGallery.classList.add("btn-primary");
                galleryContainer.style.display = 'block';
                break;
            case "aboutUser":
                btnAboutUser.classList.add("btn-primary");
                infoUser.style.display = 'block';
                break;
            case "exit":
                form.style.display = 'block';
                break;
        }
    },
    showUserMenu: function () {
        userMenu.style.display = 'block';
    },
    hidePassword: function (passwordValue) {
        document.getElementById("passwordField").value = passwordValue;
        document.getElementById("passwordField").type = "password";
    },
    showPassword: function (passwordValue) {
        document.getElementById("passwordField").value = passwordValue;
        document.getElementById("passwordField").type = "text";
    },
    hideUserMenu: function () {
        userMenu.style.display = 'none';
    },
    initPageAboutUser: function () {
        emailAddress.value = localStorage.getItem("login");
        btnShowPassword.innerHTML = "Показать пароль";
        this.hidePassword(inputPassword.value);
    },
    exitFromUserPage: function () {
        this.showBox("exit");
        this.hideUserMenu();
        this.setStatus("null");
        spaceForGalary.innerHTML = " ";
        this.gallery.visibleGalary = [];
        this.gallery.newData = [];
        this.gallery.newDataCopy = [];
        countRestImages.innerHTML = "0";
        countImages.innerHTML = "0";
    }
}

