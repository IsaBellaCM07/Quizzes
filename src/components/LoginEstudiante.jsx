import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el ícono de la flecha izquierda
import '../styles/LoginEstudianteStyle.css'; // Importa el archivo CSS para el estilo

const LoginEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Lógica para obtener estudiantes desde el backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/estudiantes');
                const data = await response.json();
                setEstudiantes(data);
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
            }
        };

        fetchData();
    }, []);

    const handleStudentSelect = (event) => {
        const selectedId = event.target.value;
        const selected = estudiantes.find(student => student.ID_ESTUDIANTE === selectedId);
        setSelectedStudent(selected);
    };

    const handleLogin = () => {
        // Implementa la lógica de inicio de sesión
        if (selectedStudent) {
            navigate('/inicioEstudiante'); // Redirige al dashboard después del inicio de sesión
        } else {
            alert('Por favor selecciona un estudiante.'); // Muestra un mensaje de alerta si no se ha seleccionado un estudiante
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
                        <h1 className="gradient-text">¿Qué estudiante eres?</h1>
                    </div>
                    <p className="login-description">Selecciona una opción:</p>
                    <div className="role-buttons">
                        <select
                            className="student-dropdown"
                            value={selectedStudent ? selectedStudent.ID_ESTUDIANTE : ''}
                            onChange={handleStudentSelect}
                        >
                            <option value="" disabled>Estudiantes</option>
                            {estudiantes.map((estudiante) => (
                                <option key={estudiante.ID_ESTUDIANTE} value={estudiante.ID_ESTUDIANTE}>
                                    {estudiante.NOMBRE} {estudiante.APELLIDO}
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

export default LoginEstudiante;
