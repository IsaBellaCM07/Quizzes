import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/DetalleExamenStyle.css'; // Importa el archivo CSS

const DetalleExamen = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const examResponse = await fetch(`http://localhost:3001/api/examsPres/${studentId}`);
                const examData = await examResponse.json();
                setExam(examData);
            } catch (error) {
                console.error('Error al obtener los datos del examen:', error);
            }
        };

        fetchExamData();
    }, [studentId]);

    if (!exam) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detalle-examen-container">
            <div className="back-arrow-container-detail">
                <FiArrowLeft className="back-arrow-detail" onClick={() => navigate(`/inicioEstudiante/${studentId}`)} />
            </div>
            <div className="text-container-detail">
                <h1>Detalles del Examen</h1>
            </div>
            {exam.map((examData, index) => (
                <div key={index} className="exam-section-detail">
                    <h2 className="text-titles-detail">Docente</h2>
                    <p><strong>Nombre:</strong> {examData.NOMBRE_1} {examData.APELLIDO}</p>

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
