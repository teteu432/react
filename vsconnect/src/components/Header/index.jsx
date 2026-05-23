import "./style.css"
import imgLogo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";


function Header() {

    function showMenu() {
        let menu = document.getElementById("menu_links");

        let sombra = document.getElementById("sombra");

        let menu_barras = document.getElementById("menu_barras");

        let body = document.getElementsByTagName("body")[0];

        if (window.getComputedStyle(menu).left != "10px") {
            menu.style.left = "10px";
            sombra.style.right = "-10vw";
            menu_barras.setAttribute("aria-expanded", "true");
            menu_barras.setAttribute("aria-label", "fechar menu");
            body.style.overflow = "hidden"
        } else {
            menu.style.left = "-300px";
            sombra.style.right = "110vw";
            menu_barras.setAttribute("aria-expanded", "false");
            menu_barras.setAttribute("aria-label", "abrir menu");
            body.style.overflow = "auto"
        }
        menu_barras.classList.toggle("ativo");
    }

    return(
        <div>
            <div id="sombra"></div>

            <header>
                <div className="container header_conteudo">
                    <a href="#"
                        className="menu_barras"
                        id="menu_barras"
                        aria-label="abrir-menu"
                        aria-expanded="false"
                        aria-controls="menu_links"
                        onClick={showMenu}
                    >
                        <div className="barras"></div>
                    </a>
                    <img  src={imgLogo} alt=""/>

                    <nav>
                        <div id="menu_links" className="menu_links">
                            <Link to="/">home</Link>
                            <Link to="/lista/servicos">serviços</Link>
                            <Link to="/cadastrar/usuario">cadastro</Link>
                        </div>

                        <Link className="header_icone_login" to="/login">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                            </svg>
                        </Link>
                        <Link className="header_botao_login" to="/login">login</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}