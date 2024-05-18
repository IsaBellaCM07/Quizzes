import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/InicioEstudianteStyle.css';
import { useParams } from 'react-router-dom';

const InicioEstudiante = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [exams, setExams] = useState([]);
    const [presentedExams, setPresentedExams] = useState([]);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentResponse = await fetch(`http://localhost:3001/api/estudiantes/${studentId}`);
                const studentData = await studentResponse.json();
                setStudent(studentData);

                const examsResponse = await fetch(`http://localhost:3001/api/examsDis/${studentId}`);
                const examsData = await examsResponse.json();
                setExams(examsData);

                const presentedExamsResponse = await fetch(`http://localhost:3001/api/examsPres/${studentId}`);
                const presentedExamsData = await presentedExamsResponse.json();
                setPresentedExams(presentedExamsData);

            } catch (error) {
                console.error('Error al obtener datos del estudiante:', error);
            }
        };

        fetchStudentData();
    }, [studentId]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Bienvenido/a, {student.NOMBRE}</h1>

            <div className="profile-section">
                <h2>Perfil del Estudiante</h2>
                <p><strong>Identificación:</strong> {student.ID_ESTUDIANTE}</p>
                <p><strong>Nombre completo:</strong> {student.NOMBRE} {student.APELLIDO}</p>
            </div>

            <div className="exams-section">
                <h2>Exámenes Disponibles</h2>
                <ul>
                    {exams.map((exam, index) => (
                        <li key={index}>
                            <Link to={`/takeExam/${exam.ID_EXAMEN}`}>
                                <button className="exam-button">
                                    {exam.NOMBRE} - Iniciar Examen
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="presented-exams-section">
                <h2>Exámenes Presentados</h2>
                <ul>
                    {presentedExams.map((exam, index) => (
                        <li key={index}>
                            <Link to={`/examResults/${exam.ID_EXAMEN}`}>
                                <button className="exam-button">
                                    {exam.NOMBRE} - Ver Resultados
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

InicioEstudiante.propTypes = {
    studentId: PropTypes.string.isRequired,
};

export default InicioEstudiante;