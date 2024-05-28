import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/InicioEstudianteStyle.css';
import QuizCard from "./QuizCard.jsx";
import QuizCardExamenes from "./QuizCardExamenes.jsx";

const InicioEstudiante = () => {
    const { studentId, groupId } = useParams();
    const [studentName, setStudentName] = useState('');
    const [presentedExams, setPresentedExams] = useState([]);
    const [missingExams, setMissingExams] = useState([]);
    const [noExamsAvailable, setNoExamsAvailable] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                // Obtener datos del estudiante
                const studentResponse = await fetch(`http://localhost:3001/api/estudiantes/${studentId}`);
                const studentData = await studentResponse.json();
                setStudentName(studentData.NOMBRE);

                // Obtener exámenes presentados
                const presentedExamsResponse = await fetch(`http://localhost:3001/api/examsPres/${studentId}/${groupId}`);
                const presentedExamsData = await presentedExamsResponse.json();
                setPresentedExams(presentedExamsData);

                // Obtener exámenes faltantes
                const missingExamsResponse = await fetch(`http://localhost:3001/api/missing-exams/${studentId}/${groupId}`);
                const missingExamsData = await missingExamsResponse.json();

                setMissingExams(missingExamsData.missingExams);
                // Verificar si no hay exámenes disponibles
                setNoExamsAvailable(missingExamsData.length === 0 && presentedExamsData.length === 0);

            } catch (error) {
                console.error('Error al obtener datos del estudiante:', error);
            }
        };

        fetchStudentData();
    }, [studentId, groupId]);

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
                                <QuizCard key={index} quiz={exam} studentId={studentId} groupId={groupId}
                                          type="presented"/>
                            ))
                        )}
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="section available-exams">
                    <h2>Exámenes Pendientes</h2>
                    <div className="course-grid">
                        {missingExams.length === 0 ? (
                            <div className="no-exams-message-box">
                                <div className="no-exams-message">No hay exámenes pendientes.</div>
                            </div>
                        ) : (
                            // Recorrer la matriz missingExams
                            <>
                                {missingExams.map((exam, index) => (
                                    <QuizCardExamenes key={index} studentId={studentId} groupId={groupId} exam={exam}/>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioEstudiante;
