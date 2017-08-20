const { ipcRenderer } = require('electron');

let ipataque = document.querySelector('#ipataque');
let numataque = document.querySelector('#numataque');

let btnAtaque = document.querySelector('#buttonataque');

let listaataque = document.querySelector('#listaataque');

let count = document.querySelector('#count');

let contador = 0;
btnAtaque.addEventListener('click',()=>{
    ipcRenderer.send('evento-ataque',ipataque.value,numataque.value);
})

ipcRenderer.on('volta-do-ataque',(event,res)=>{
    contador++;
    count.textContent = contador;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(res));
    li.setAttribute("id", "list-ataque");
    if(res===null)
        alert('Talvez sua url esteja inválida...Tente adicionar http:// ou https://');
    else
        listaataque.appendChild(li);
})
