const LoginPassword = {
    login: "levon@levon.levon",
    password: "levon5"
};
let validatorModule = new Validator();


let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule,LoginPassword);
loginForm.initComponent(LoginPassword);
