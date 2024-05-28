import {FiArrowLeft} from "react-icons/fi";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const DetalleExamen = () => {
    const { studentId, groupId } = useParams();
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const examResponse = await fetch(`http://localhost:3001/api/examsPres/${studentId}/${groupId}`);
                const examData = await examResponse.json();
                // Filtra los resultados para mostrar solo un registro por examen
                const uniqueExams = examData.reduce((unique, current) => {
                    const index = unique.findIndex((exam) => exam.ID_EXAMEN === current.ID_EXAMEN);
                    if (index === -1) {
                        unique.push(current);
                    }
                    return unique;
                }, []);
                setExams(uniqueExams);
            } catch (error) {
                console.error('Error al obtener los datos del examen:', error);
            }
        };

        fetchExamData();
    }, [studentId, groupId]);

    if (exams.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detalle-examen-container">
            <div className="back-arrow-container-detail">
                <FiArrowLeft className="back-arrow-detail" onClick={() => navigate(`/inicioEstudiante/${studentId}/${groupId}`)} />
            </div>
            <div className="text-container-detail">
                <h1>Detalle del Examen</h1>
            </div>
            {exams.map((examData, index) => (
                <div key={index} className="exam-section-detail">
                    <h2 className="text-titles-detail">Docente</h2>
                    <p><strong>Nombre:</strong> {examData.DOCENTE_NOMBRE} {examData.DOCENTE_APELLIDO}</p>

                    <h2 className="text-titles-detail">Información</h2>
                    <p><strong>Nombre:</strong> {examData.NOMBRE}</p>
                    <p><strong>Descripción:</strong> {examData.DESCRIPCION}</p>
                    <p><strong>Fecha de presentación:</strong> {examData.FECHA_PRESENTACION}</p>
                    <p><strong>Calificación:</strong> {examData.CALIFICACION}</p>
                </div>
            ))}
        </div>
    );
};
export default DetalleExamen;