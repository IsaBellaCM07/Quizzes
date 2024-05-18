import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyle.css';

const Login = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        if (role === 'estudiante') {
            navigate('/loginEstudiante');
        } else if (role === 'docente') {
            navigate('/loginDocente');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-box">
                    <div className="text-container">
                        <h1 className="gradient-text">Bienvenido a Moralma</h1>
                    </div>
                    <p className="login-description">Selecciona tu rol:</p>
                    <div className="role-buttons">
                        <button
                            className={`role-button ${selectedRole === 'estudiante' ? 'active' : ''}`}
                            onClick={() => handleRoleClick('estudiante')}
                        >
                            Soy Estudiante
                        </button>
                        <button
                            className={`role-button ${selectedRole === 'docente' ? 'active' : ''}`}
                            onClick={() => handleRoleClick('docente')}
                        >
                            Soy Docente
                        </button>
                    </div>
                </div>
            </div>
            <div className="login-text">
                <h2 className="text">Somos más que una plataforma educativa</h2>
                <p>Te ofrecemos una solución integral para la creación, administración y evaluación de exámenes en línea, brindando herramientas tanto para docentes como para estudiantes, y facilitando el seguimiento y análisis del rendimiento académico.</p>
            </div>
        </div>
    );
};

export default Login;