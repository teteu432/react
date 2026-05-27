function Saudacao(props) {
return <h1>olá, {props.nome}!</h1>
}

<Saudacao nome="Mateus"/>

props = {
    nome: "Mateus"
}

function Produto(props) {
    return (
        <div>
            <h2>{props.nome}</h2>
            <p>R${props.preco}</p>
        </div>
    );
}

<Produto nome="Notebook" preco="3500"/>;

function Botao(props) {
    return (
        <buton>
            {props.texto}
        </buton>
    );
}

<Botao texto="Salvar"/>

//Desestruturação

function Saudacao2({nome}) {
    let nome = props.nome
    
}

function Usuario({nome,idade,cidade}) {
    return (
        <div>
            <h1>{nome}</h1>
            <p>{idade}</p>
            <p>{cidade}</p>

        </div>
    );
}

<Usuario
    nome="Lucas"
    idade={35}
    cidade="São Paulo"
/>

//useState


import { useState } from "react";

function Contador() {
    const [contador, setContador] = useState(0);
    return(
        <div>
            <p>Você clicou {contador} vezes</p>
            <button onClick={() => setContador}>clique aqui</button>
        </div>
    )
}

function Nome() {
    const [nome, setNome] = useState("")
    return(
        <div>
            <input onChange={(e) => setNome(e.target.value)}/> 
        </div>
    )
}

function FormularioLogin(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("")

    function enviarFormulario(event) {
        event.preventDefult();
        console.log('Email', email)
        console.log('Senha', senha)
    }
    return (
        <form onSubmit={enviarFormulario}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Digite seu Email" />
            <input type="password" value={senha}
            onChange={(e) => setSenha(e,target.value)} />

            <button type="submit">

            </button>
        </form>
    )
}

const [listaItens, setListaItens] = useState([]);

function adicionarItem(novoItem) {
    setListaItens([...listaItens, novoItem])
}

listaItens.push("React")

function removerItens(itemParaRemover) {
    setListaItens(listaItens.filter(item => item != itemParaRemover))
}