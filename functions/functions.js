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
async function getData(url){
    try{
        let response = await fetch(url);
        if(response.status === 200){
            return await response.json()
        }else{
            throw new Error('Network error');
        }

    }
    catch(error){
        throw error
    }
}
async function postData(url,data){
    try{
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response.status === 201){
            return await response.json()
        }else{
            throw new Error('Network error');
        }

    }
    catch(error){
        throw error
    }
}
export function createBook(books,color){
    return`
    <div class="book" style="background-color:${color};">
        <h4 id="title">${books.title}</h4>
        <p id="author">${books.author}</p>
        <p id="year">${books.year}</p>
        <div class="action">
            <button id="editBtn" data-id=${books.id}><i class="fa-regular fa-pen-to-square" style="color: #74C0FC;"></i></button>
            <button id="deleteBtn" data-id=${books.id}><i class="fa-solid fa-trash" style="color: #ea5353;"></i></button>
        </div>
    </div>
    `
}
export function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


export {validate, validateLogin, getData,postData}