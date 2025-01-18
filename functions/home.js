import { createBook, getData, postData, randomColor } from "./functions.js";

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const year = document.querySelector('#year');
const addBtn = document.querySelector('#btn')
const search = document.querySelector('#search');
const books = document.querySelector('#books');
const form = document.querySelector('.form');


async function editData(url,data){
    try{
        let response = await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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
async function deleteData(url){
    try{
        let response = await fetch(url,{
            method: 'DELETE',
        });
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
function editBook(allBooks){
    const editBtn = document.querySelectorAll('#editBtn');
        editBtn.forEach((btn)=>{
            btn.addEventListener('click', (e)=>{
                e.preventDefault();
                const Id = btn.getAttribute('data-id');
                let oldValue = allBooks.find(book=>book.id==Id)  
                let title = prompt('Nomi',oldValue.title)
                let author = prompt('Authori',oldValue.author)
                let year = prompt('Yili',oldValue.year)
                const newBook = {
                    id: oldValue.id,
                    title: title,
                    author: author,
                    year: year
                }
                editData(`https://trello.vimlc.uz/books/${Id}`,newBook)
                .then(data=>{
                    books.innerHTML=''
                Getdata()
                })
                .catch(error=>
                    console.log(error)
                )
            })
        })
}
function Getdata(){
    getData('https://trello.vimlc.uz/books')
    .then((data) => {
        let allBooks = data
        if(search){
            search.addEventListener('input', (e) => {
                let searchText = e.target.value.toLowerCase();
                 const filteredBooks = allBooks.filter(book =>
                    book.title.toLowerCase().includes(searchText) ||
                    book.author.toLowerCase().includes(searchText) ||
                    book.year.toString().includes(searchText)
                  );
                books.innerHTML = '';
                filteredBooks.forEach(book=>{
                    let color = randomColor();
                    createBook(book,color)
                    books.innerHTML += createBook(book,color);
                })
            })
        }
        data.reverse().forEach(book=>{
            let color = randomColor();
            createBook(book,color)
            books.innerHTML += createBook(book,color);
        })
        editBook(allBooks)
        deleteBook()
        
    })
    .catch((error) => {
        console.log(error);
        
    });
    
}
function deleteBook(){
    const deleteBtn = document.querySelectorAll('#deleteBtn');
    deleteBtn.forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            let confirmDelete=confirm("Bu kitob o'chirilsinmi?")
            const id = btn.getAttribute('data-id');
            if(confirmDelete){
                deleteData(`https://trello.vimlc.uz/books/${id}`)
                   .then(()=>{
                        books.innerHTML=''
                        Getdata()
                    })
                   .catch(error=>
                        console.log(error)
                    )
            }
            
        })
    })
}

document.addEventListener("DOMContentLoaded", function () {
   Getdata()
});


addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let titleValue = title.value;
    let authorValue = author.value;
    let yearValue = year.value;
    if (!titleValue ||!authorValue ||!yearValue) {
        alert('Please fill all fields');
        return;
    }
    let newBook = {
        title: titleValue,
        author: authorValue,
        year: yearValue
    };
    postData('https://trello.vimlc.uz/books', newBook)
       .then((data) => {
            form.reset()
            books.innerHTML=''
            Getdata()
        })
       .catch((error) => {
            console.log(error);
            
        });
        
});
