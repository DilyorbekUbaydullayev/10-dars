function validate(userName, email, password, confirm_password) {
    if (!userName.value || !email.value || !password.value || !confirm_password.value) {
        alert('Please fill all fields');
        return false;
    }

    if (password.value !== confirm_password.value) {
        alert('Passwords do not match');
        return false;
    }

    return true;
}
function validateLogin(loginName,loginPassword){
    if(!loginName||!loginPassword){
        alert('Please fill in both fields');
        return false;
    }
    return true;
} 


export {validate, validateLogin}