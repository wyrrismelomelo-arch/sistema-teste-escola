let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

function ir(tela){

document.querySelectorAll(".tela").forEach(t=>{
t.classList.add("hidden")
})

document.getElementById(tela).classList.remove("hidden")

if(tela === "tarefas"){
mostrar()
}

}

function criarTarefa(){

let texto = document.getElementById("novaTarefa").value

if(!texto) return

tarefas.push(texto)

salvar()

document.getElementById("novaTarefa").value=""

mostrar()
}

function mostrar(){

let lista = document.getElementById("lista")
lista.innerHTML=""

tarefas.forEach((t,index)=>{

let li = document.createElement("li")

li.innerHTML = `
${t}
<button onclick="remover(${index})">X</button>
`

lista.appendChild(li)

})

}

function remover(i){

tarefas.splice(i,1)

salvar()
mostrar()

}

function salvar(){

localStorage.setItem("tarefas", JSON.stringify(tarefas))

}

function logout(){

location.reload()

}

/* inicial */
document.getElementById("boasVindas").innerText = "Sistema pronto 🚀"
