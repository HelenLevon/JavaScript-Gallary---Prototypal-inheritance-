

const  Validator = function() {};

Validator.prototype = {
    isCorrectData: function () {
        let checkFormResult = this.checkForm();
        let checkLoginResult = this.checkLogin(checkFormResult);
        let checkPasswordResult = this.checkPassword(checkLoginResult);
        let checkAllFormResult = this.checkAllForm(checkPasswordResult);
        return checkAllFormResult;
    },
    checkForm: function () {
        //console.log(inputLogin.value);
        if (inputLogin.value.length == 0 || inputPassword.value.length == 0) {
            this.showOrHideAlert("visible", "Следует заполнить все поля формы!");
            setTimeout(this.showOrHideAlert, 4000, "hidden");
            return false;
        } else {
            return true;
        }
    },
    checkLogin: function (previousResult) {
        if (previousResult) {
            let regular = /\S+@\S+\.\S+/;
            if (!regular.test(inputLogin.value)) {
                this.showOrHideAlert("visible", "Логин не верный!");
                setTimeout(this.showOrHideAlert, 4000, "hidden");
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    checkPassword: function (previousResult) {
        let regularExpression = /^[a-zA-Z]+$/;
        if (previousResult) {
            if (inputPassword.value.length < 5) {
                this.showOrHideAlert("visible", "Пароль должен содержать > \
                5 символов!");
                setTimeout(this.showOrHideAlert, 4000, "hidden");
                return false;
            } else {
                console.log(regularExpression.test(inputPassword.value));
                if (regularExpression.test(inputPassword.value)) {
                    this.showOrHideAlert("visible", "Пароль должен содержать \
                    как минимум одну цифру или спецсимвол!");
                    setTimeout(this.showOrHideAlert, 4000, "hidden");
                    return false;
                }
                return true;
            }
        } else {
            return false;
        }
    },
    checkAllForm: function (previousResult) {
        if (previousResult) {
            let result = this.checkWithLocalStorage();
            console.log(result);
            return result;
        } else {
            return false;
        }
    },
    checkWithLocalStorage: function () {
        if ((localStorage.getItem('login') === inputLogin.value) &
            (localStorage.getItem('password') === inputPassword.value)) {
            return true;
        } else {
            if (localStorage.getItem('login') === inputLogin.value) {
                this.showOrHideAlert("visible", "Не верный пароль!");
                setTimeout(this.showOrHideAlert, 4000, "hidden");
                return false;
            } else {
                this.showOrHideAlert("visible", "Не верные логин и пароль!");
                setTimeout(this.showOrHideAlert, 4000, "hidden");
                return false;
            }
        }
    },
    showOrHideAlert: function (visability, text) {
        switch (visability) {
            case "visible":
                alertMsg.style.visibility = 'visible';
                alertMsg.innerHTML = text;
                break;
            case "hidden":
                alertMsg.style.visibility = 'hidden';
                break;
        }
    }
}