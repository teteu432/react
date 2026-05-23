import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home";
import CadastroUsuario from "./pages/CadastroUsuario";
//import CadastroServico from "./pages/CadastroServico";
import ListaDevs from "./pages/ListaDevs";
import ListaServicos from "./pages/ListaServico";
import Login from "./pages/Login";
import PerfilUsuario from "./pages/PerfilUsuario";
import VisualizarServico from "./pages/VisualizarServico";

import Header from "./components/Header";

import "./index.css";

import {BrowserRouter, Routes, Route} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>
    <BrowserRouter>
    <Header/>                  
    <Routes>
      <Route path="/" element={<Home/>}/>         // "/"" sozinha significa home
      <Route path="cadastrar/servico" element={<CadastroServico/>}/>         
      <Route path="cadastrar/usuario" element={<CadastroUsuario/>}/>         
      <Route path="lista/devs" element={<ListaDevs/>}/>        
      <Route path="lista/servicos" element={<ListaServicos/>}/>         
      <Route path="login" element={<Login/>}/>        
      <Route path="perfil/:idUsuario" element={<PerfilUsuario/>}/>        
      <Route path="visualizar/:idServico" element={<VisualizarServico/>}/>        
    </Routes>
    </BrowserRouter>
</React.StrictMode>

);
