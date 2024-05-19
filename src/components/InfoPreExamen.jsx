import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/InfoPreExamenStyle.css';

const InfoPreExamen = () => {
    const { studentId, examenId } = useParams();
    const navigate = useNavigate();
    const [examInfo, setExamInfo] = useState(null);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const examResponse = await fetch(`http://localhost:3001/api/examsDis/${studentId}`);
                const examData = await examResponse.json();
                setExams(examData);

                if (!examData || examData.length === 0) {
                    throw new Error('No se encontraron datos del examen');
                }

                const examTitle = examData.map((examData) => examData.NOMBRE);
                const teacher = examData.map((examData) => `${examData.NOMBRE_1} ${examData.APELLIDO}`);
                const questions = examData.map((examData) => examData.NUM_PREGUNTAS_ALEATORIAS);
                const time = examData.map((examData) => examData.TIEMPO_1);

                const examInfo = {
                    title: examTitle,
                    message: `Apreciados estudiantes, en el siguiente cuestionario se establecen preguntas relacionadas con la temática vista en todo el desarrollo de la unidad. Tiene un total de ${questions} preguntas, dispuestas para que pueda navegar entre ellas.`,
                    duration: `${time} minutos`,
                    attempts: 1,
                    teacher: teacher + ".",
                };
                setExamInfo(examInfo);
            } catch (error) {
                console.error('Error al obtener los datos del examen:', error);
            }
        };
        fetchExamData();
    }, [studentId,examenId]);

    if (!examInfo) {
        return <div>Loading...</div>;
    }

    const handleBackClick = () => {
        navigate(`/inicioEstudiante/${studentId}`);
    };

    const handleStartQuizClick = () => {
        navigate(`/presentarExamen/${studentId}/${examenId}`);
    };

    return (
        <div className="dashboard-container">
            <div className="back-arrow-container">
                <FiArrowLeft className="back-arrow" onClick={handleBackClick}/>
            </div>
            <div className="text-container">
                <h1>{examInfo.title}</h1>
            </div>

            <div className="exam-info">
                <p> {examInfo.message} <br/></p>
                <p> Límite de tiempo: {examInfo.duration} <br/></p>
                <p> Intentos permitidos: {examInfo.attempts} <br/></p>
                <p> Atentamente, <br/></p>
                <p> {examInfo.teacher} <br/></p>
            </div>
            <p>
                {exams.map((exam, index) => (
                    <li key={index}>
                        <button
                            className="boton-examen"
                            onClick={() => handleStartQuizClick()}>
                            Iniciar cuestionario
                        </button>
                    </li>
                ))}
            </p>


        </div>
    );
};

export default InfoPreExamen;
