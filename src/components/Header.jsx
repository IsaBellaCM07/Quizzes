import '../styles/HeaderStyle.css';

const Header = () => {
    return (
        <div className="header">
            <div className="text-container">Moralma</div>
            <nav className="nav-links">
                <a href="#principal" className="nav-link">Principal</a>
                <a href="#actividad" className="nav-link">Actividad</a>
                <a href="#clases" className="nav-link">Clases</a>
            </nav>
            <button className="create-button">
                Crear un cuestionario
            </button>
        </div>
    );
};

export default Header;
