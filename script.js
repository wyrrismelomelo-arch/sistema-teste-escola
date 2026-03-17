let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
let usuarioAtual = null

function mostrarCadastro(){
document.getElementById("login").classList.add("hidden")
document.getElementById("cadastro").classList.remove("hidden")
}

function voltarLogin(){
document.getElementById("cadastro").classList.add("hidden")
document.getElementById("login").classList.remove("hidden")
}

function cadastrar(){

let usuario = document.getElementById("cadUsuario").value
let senha = document.getElementById("cadSenha").value
let tipo = document.getElementById("tipo").value

if(!usuario || !senha){
alert("Preencha tudo")
return
}

usuarios.push({usuario, senha, tipo})
localStorage.setItem("usuarios", JSON.stringify(usuarios))

alert("Cadastrado com sucesso!")
voltarLogin()
}

function login(){

let usuario = document.getElementById("loginUsuario").value
let senha = document.getElementById("loginSenha").value

let user = usuarios.find(u => u.usuario === usuario && u.senha === senha)

if(!user){
alert("Usuário não encontrado")
return
}

usuarioAtual = user

document.getElementById("login").classList.add("hidden")
document.getElementById("dashboard").classList.remove("hidden")

document.getElementById("boasVindas").innerText = "Bem-vindo, " + user.usuario

if(user.tipo === "professor"){
document.getElementById("painelProfessor").classList.remove("hidden")
mostrarProfessor()
}else{
document.getElementById("painelAluno").classList.remove("hidden")
mostrarAluno()
}

}

function criarTarefa(){

let texto = document.getElementById("novaTarefa").value
if(!texto) return

tarefas.push({texto, concluida:false})

salvar()
mostrarProfessor()

}

function mostrarProfessor(){

let lista = document.getElementById("listaProfessor")
lista.innerHTML=""

tarefas.forEach((t,index)=>{

let li = document.createElement("li")

if(t.concluida) li.classList.add("concluida")

li.innerHTML = `
${t.texto}
<div class="botoes">
<button class="ok" onclick="toggle(${index})">✔</button>
<button class="remover" onclick="remover(${index})">X</button>
</div>
`

lista.appendChild(li)

})

}

function mostrarAluno(){

let lista = document.getElementById("listaAluno")
lista.innerHTML=""

tarefas.forEach(t=>{

let li = document.createElement("li")

if(t.concluida) li.classList.add("concluida")

li.innerText = t.texto

lista.appendChild(li)

})

}

function toggle(i){
tarefas[i].concluida = !tarefas[i].concluida
salvar()
mostrarProfessor()
}

function remover(i){
tarefas.splice(i,1)
salvar()
mostrarProfessor()
}

function salvar(){
localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function logout(){
location.reload()
}