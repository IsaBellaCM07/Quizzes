import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/InfoPreExamenStyle.css';

const InfoPreExamen = () => {
    const { studentId, examenId, groupId } = useParams();
    const navigate = useNavigate();
    const [examInfo, setExamInfo] = useState(null);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const examResponse = await fetch(`http://localhost:3001/api/examenes/${examenId}`);
                const examData = await examResponse.json();

                if (!examData || examData.length === 0) {
                    throw new Error('No se encontraron datos del examen');
                }

                const examTitle = examData[0].nombre;
                const message = `Apreciados estudiantes, en el siguiente cuestionario se establecen preguntas relacionadas con la temática vista en todo el desarrollo de la unidad. Tiene un total de ${examData[0].num_preguntas_aleatorias} preguntas, dispuestas para que pueda navegar entre ellas.`;
                const duration = `${examData[0].tiempo} minutos`;
                const attempts = 1;

                const examInfo = {
                    title: examTitle,
                    message: message,
                    duration: duration,
                    attempts: attempts,
                };

                setExamInfo(examInfo);
            } catch (error) {
                console.error('Error al obtener los datos del examen:', error);
            }
        };

        fetchExamData();
    }, [studentId, examenId, groupId]);

    const handleBackClick = () => {
        navigate(`/inicioEstudiante/${studentId}/${groupId}`);
    };

    const handleStartQuizClick = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/registrar-presentacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: studentId,
                    examenId: examenId,
                    groupId: groupId,
                }),
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error('Error al registrar la presentación del examen');
            }

            navigate(`/presentarExamen/${examenId}`)
        } catch (error) {
            console.error('Error al iniciar el cuestionario:', error);
        }
    };

    if (!examInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="back-arrow2-container">
                <FiArrowLeft className="back-arrow2" onClick={handleBackClick} />
            </div>
            <div className="text-container">
                <h1>{examInfo.title}</h1>
            </div>

            <div className="exam-info">
                <p>{examInfo.message}</p>
                <p>Límite de tiempo: {examInfo.duration}</p>
                <p>Intentos permitidos: {examInfo.attempts}</p>
            </div>

            <div>
                <button className="boton-examen" onClick={handleStartQuizClick}>
                    Iniciar cuestionario
                </button>
            </div>
        </div>
    );
};

export default InfoPreExamen;
