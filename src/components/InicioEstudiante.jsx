import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/InicioEstudianteStyle.css';

const InicioEstudiante = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
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
                console.log(examsData)

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
            <div className="back-arrow-container">
                <FiArrowLeft className="back-arrow" onClick={() => navigate('/loginEstudiante')} />
            </div>
            <div className="text-container">
                <h1>Hola, {student.NOMBRE}</h1>
            </div>

            <div className="profile-section">
                <h2 className="text-titles">Perfil del Estudiante</h2>
                <p><strong>Identificación:</strong> {student.ID_ESTUDIANTE}</p>
                <p><strong>Nombre completo:</strong> {student.NOMBRE} {student.APELLIDO}</p>

            </div>

            <div className="exams-section">
                <h2 className="text-titles">Exámenes Disponibles</h2>
                <p>
                    {exams.map((exam, index) => (
                        <li key={index}>
                            <Link to={`/takeExam/${exam.ID_EXAMEN}`}>
                                <button className="exam-button">
                                    {exam.NOMBRE} - Iniciar Examen
                                </button>
                            </Link>
                        </li>
                    ))}
                </p>
            </div>

            <div className="presented-exams-section">
                <h2 className="text-titles">Exámenes Presentados</h2>
                <p>
                    {presentedExams.map((exam, index) => (
                        <li key={index}>
                            <Link to={`/examResults/${exam.ID_EXAMEN}`}>
                                <button className="exam-button">
                                    {exam.NOMBRE} - Ver Resultados
                                </button>
                            </Link>
                        </li>
                    ))}
                </p>
            </div>
        </div>
    );
};

InicioEstudiante.propTypes = {
    studentId: PropTypes.string.isRequired,
};

export default InicioEstudiante;
