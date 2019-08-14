let Navbar = {    
    render : async () => { 
        let view = /*html*/`
            <nav>
                <a href = "./#/">TOGETHER-CLICK</a><br>
                <a href = "./#/login">Incia sesión</a>
                <a href = "./#/register"> Crea tu cuenta</a>
            </nav>
        `
        return view
    }
    ,after_render : async () => {}
}

export default Navbar;