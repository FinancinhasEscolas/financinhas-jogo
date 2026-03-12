// ================================
// MOSTRAR CADASTRO
// ================================

function mostrarCadastro(){

document.getElementById("login").style.display="none"
document.getElementById("cadastro").style.display="block"

}


// ================================
// CADASTRAR
// ================================

function cadastrar(){

let nome=document.getElementById("reg-nome").value
let email=document.getElementById("reg-email").value
let pass=document.getElementById("reg-pass").value

if(nome=="" || email=="" || pass==""){

alert("Preencha todos os campos")
return

}

let user={

nome:nome,
email:email,
pass:pass,
moedas:0

}

localStorage.setItem("financinhas_user",JSON.stringify(user))

alert("Conta criada com sucesso!")

document.getElementById("cadastro").style.display="none"
document.getElementById("login").style.display="block"

}


// ================================
// LOGIN
// ================================

function login(){

let email=document.getElementById("login-email").value
let pass=document.getElementById("login-pass").value

let user=localStorage.getItem("financinhas_user")

if(!user){

alert("Você precisa criar uma conta primeiro!")
return

}

user=JSON.parse(user)

if(email===user.email && pass===user.pass){

document.getElementById("login").style.display="none"
document.getElementById("avatar").style.display="block"

}else{

alert("Email ou senha incorretos")

}

}


// ================================
// ESCOLHER PERSONAGEM
// ================================

function escolher(nome){

let user=JSON.parse(localStorage.getItem("financinhas_user"))

user.avatar=nome

localStorage.setItem("financinhas_user",JSON.stringify(user))

document.getElementById("avatar").style.display="none"
document.getElementById("cidade").style.display="block"

document.getElementById("player").innerText="Personagem: "+nome
document.getElementById("moedas").innerText=user.moedas

}


// ================================
// PERGUNTAS
// ================================

let perguntaAtual

const perguntas=[

{
p:"Para que serve o dinheiro?",
r:["Comprar coisas","Jogar fora"],
c:0
},

{
p:"O que é economizar?",
r:["Guardar dinheiro","Gastar tudo"],
c:0
},

{
p:"Quem guarda dinheiro?",
r:["Banco ou cooperativa","Lixeira"],
c:0
}

]


// ================================
// MISSÃO
// ================================

function missao(){

document.getElementById("cidade").style.display="none"
document.getElementById("missao").style.display="block"

perguntaAtual=Math.floor(Math.random()*perguntas.length)

let p=perguntas[perguntaAtual]

document.getElementById("pergunta").innerText=p.p
document.getElementById("a0").innerText=p.r[0]
document.getElementById("a1").innerText=p.r[1]

}


// ================================
// RESPONDER
// ================================

function responder(op){

let p=perguntas[perguntaAtual]

if(op==p.c){

alert("Acertou! +10 moedas")

let user=JSON.parse(localStorage.getItem("financinhas_user"))

user.moedas+=10

localStorage.setItem("financinhas_user",JSON.stringify(user))

document.getElementById("moedas").innerText=user.moedas

}else{

alert("Resposta errada")

}

document.getElementById("missao").style.display="none"
document.getElementById("cidade").style.display="block"

}
