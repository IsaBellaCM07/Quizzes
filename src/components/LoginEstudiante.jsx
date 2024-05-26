import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/LoginEstudianteStyle.css';

const LoginEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
        if (selectedStudent) {
            navigate(`/dashboardEstudiante/${selectedStudent.ID_ESTUDIANTE}`);         }
        else {
            alert('Por favor selecciona un estudiante.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-box">
                    <div className="back-arrow-container-Login">
                        <FiArrowLeft className="back-arrow" onClick={() => navigate('/login')} />
                    </div>
                    <div className="text-container-Est">
                        <h1 className="gradient-text">¿Qué estudiante eres?</h1>
                    </div>
                    <p className="login-description-Est">Selecciona una opción:</p>
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
                        <button className="role-button" onClick={() => handleLogin()}>Ingresar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginEstudiante;
