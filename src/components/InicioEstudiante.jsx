import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import QuizCard from './QuizCard'; // Importa el componente QuizCard
import '../styles/InicioEstudianteStyle.css';

const InicioEstudiante = () => {
    const { studentId } = useParams();
    const [studentName, setStudentName] = useState('');
    const [exams, setExams] = useState([]);
    const [presentedExams, setPresentedExams] = useState([]);
    const [noExamsAvailable, setNoExamsAvailable] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentResponse = await fetch(`http://localhost:3001/api/estudiantes/${studentId}`);
                const studentData = await studentResponse.json();
                setStudentName(studentData.NOMBRE);

                const examsResponse = await fetch(`http://localhost:3001/api/examsDis/${studentId}`);
                const examsData = await examsResponse.json();
                setExams(examsData);

                const presentedExamsResponse = await fetch(`http://localhost:3001/api/examsPres/${studentId}`);
                const presentedExamsData = await presentedExamsResponse.json();
                setPresentedExams(presentedExamsData);

                // Si no hay exámenes disponibles, mostrar el aviso
                if (examsData.length === 0) {
                    setNoExamsAvailable(true);
                } else {
                    setNoExamsAvailable(false);
                }

            } catch (error) {
                console.error('Error al obtener datos del estudiante:', error);
            }
        };

        fetchStudentData();
    }, [studentId]);

    return (
        <div className="inicio-estudiante font">
            <header className="app-header-dash">
                <div className="back-arrow-dashboard">
                    <Link to={`/dashboardEstudiante/${studentId}`}>
                        <FiArrowLeft className="back-arrow" />
                    </Link>
                </div>
                <div className="title">Moralma</div>
                <div className="greeting">Hola, {studentName}</div>
            </header>
            <hr className="divider" />
            <div className="main-container">
                <div className="section presented-exams">
                    <h2>Exámenes Presentados</h2>
                    <div className="course-grid">
                        {presentedExams.length === 0 ? (
                            <div className="no-exams-message-box">
                                <div className="no-exams-message">Aún no has presentado ningún examen.</div>
                            </div>
                        ) : (
                            presentedExams.map((exam, index) => (
                                <QuizCard key={index} quiz={exam} studentId={studentId} type="presented" />
                            ))
                        )}
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="section available-exams">
                    <h2>Exámenes Disponibles</h2>
                    <div className="course-grid">
                        {noExamsAvailable ? (
                            <div className="no-exams-message-box">
                                <div className="no-exams-message">¡Estás al día!</div>
                            </div>
                        ) : (
                            exams.map((exam, index) => (
                                <QuizCard key={index} quiz={exam} studentId={studentId} type="available" />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioEstudiante;
