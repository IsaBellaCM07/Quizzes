import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el ícono de la flecha izquierda
import '../styles/LoginDocenteStyle.css'; // Importa el archivo CSS para el estilo

const LoginDocente = () => {
    const [docentes, setDocentes] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Lógica para obtener estudiantes desde el backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/docentes');
                const data = await response.json();
                setDocentes(data);
                console.log(data)
            } catch (error) {
                console.error('Error al obtener docentes:', error);
            }
        };

        fetchData();
    }, []);

    const handleTeacherSelect = (event) => {
        const selectedId = event.target.value;
        const selected = docentes.find(teacher => teacher.ID_DOCENTE === selectedId);
        setSelectedTeacher(selected);
    };

    const handleLogin = () => {
        if (selectedTeacher) {
            navigate('/inicioDocente', { state: { teacher: selectedTeacher } });
        } else {
            alert('Por favor selecciona un docente.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-box">
                    <div className="back-arrow-container"> {/* Contenedor de la flecha */}
                        <FiArrowLeft className="back-arrow" onClick={() => navigate('/login')} /> {/* Flecha izquierda con evento onClick para redirigir al login */}
                    </div>
                    <div className="text-container">
                        <h1 className="gradient-text">¿Qué docente eres?</h1>
                    </div>
                    <p className="login-description">Selecciona una opción:</p>
                    <div className="role-buttons">
                        <select
                            className="teacher-dropdown"
                            value={selectedTeacher ? selectedTeacher.ID_DOCENTE : ''}
                            onChange={handleTeacherSelect}
                        >
                            <option value="" disabled>Docentes</option>
                            {docentes.map((docente) => (
                                <option key={docente.ID_DOCENTE} value={docente.ID_DOCENTE}>
                                    {docente.NOMBRE} {docente.APELLIDO}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="role-buttons">
                        <button className="role-button" onClick={handleLogin}>Ingresar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginDocente;
