import { validate, validateLogin } from "./functions/functions.js";
const userName = document.getElementById('username');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const email = document.getElementById('email');
const loginName = document.getElementById('username-login');
const loginPassword = document.getElementById('password-login');
const registerButton = document.getElementById('register-btn');
const loginButton = document.getElementById('login-btn');
const form = document.getElementById('form');
const form_login = document.getElementById('login-form');

const baseUrl = window.location.origin;


registerButton &&registerButton.addEventListener('click', function (e) {
        e.preventDefault();

       
        let isValid = validate(userName, email, password, confirm_password);
        if (!isValid) {
            return;
        }
        let user = {
            username: userName.value,
            password: password.value,
            email: email.value,
        };
        
        fetch('https://auth-rg69.onrender.com/api/auth/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response){
            if(!response.ok){
                throw new Error('Networkda xatolik');
            }
            return response.json();
        })
        .then(function(data){
            alert('Registration successful');
            window.location.href =`${baseUrl}/pages/login.html`;
            form.reset();
        })
        .catch(function(error){
            console.error('Error:', error);
        });
    });

    loginButton && loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        let isValid = validateLogin(loginName, loginPassword);
        if (!isValid) {
            return;
        }
        const login={
            username: loginName.value,
            password: loginPassword.value
        }
        fetch('https://auth-rg69.onrender.com/api/auth/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        .then(function(response){
            if(!response.ok){
                throw new Error('Networkda xatolik');
            }
            return response.json();
        })
        .then(function(data){
            alert('Login successful');
            localStorage.setItem('token', data.accessToken);
           let token = localStorage.getItem('token')
        if(token){
            
            window.location.href =`${baseUrl}/pages/home.html`;
            form_login.reset();
        }
        else{
            window.location.href =`${baseUrl}/pages/index.html`;
            form_login.reset();
        }
        })
        .catch(function(error){
            console.error('Error:', error);
        });
        
    })
