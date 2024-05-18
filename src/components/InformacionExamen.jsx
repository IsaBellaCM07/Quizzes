import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/InformacionExamenStyle.css';
import PropTypes from "prop-types";
import InicioEstudiante from "./InicioEstudiante.jsx";

const InformacionExamen = () => {
    const { studentId, examId } = useParams();
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
        <div className="dashboard-container">
            <div className="back-arrow-container">
                <FiArrowLeft className="back-arrow" onClick={() => navigate(`/inicioEstudiante/${studentId}`)}/>
            </div>
            <div className="text-container">
                <h1>Detalles del Examen</h1>
            </div>

            <div className="exam-section">
                <h2 className="text-titles">Docente</h2>
                <p>
                    <strong>Nombre:</strong> {exam.map((exam, index) => (
                    <span key={index}> {exam.NOMBRE_1} {exam.APELLIDO}
                    </span>
                ))}
                </p>
            </div>

            <div className="exam-section">
                <h2 className="text-titles">Información</h2>
                <p>
                    <strong>Nombre:</strong> {exam.map((exam, index) => (
                    <span key={index}> {exam.NOMBRE}
                    </span>
                    ))}
                </p>

                <p>
                    <strong>Descripción:</strong> {exam.map((exam, index) => (
                    <span key={index}> {exam.DESCRIPCION}
                    </span>
                ))}
                </p>
                <p>
                    <strong>Fecha de presentación:</strong> {exam.map((exam, index) => (
                    <span key={index}> {exam.FECHA_PRESENTACION}
                    </span>
                ))}
                </p>
                <p>
                    <strong>Calificación:</strong> {exam.map((exam, index) => (
                    <span key={index}> {exam.CALIFICACION}
                    </span>
                ))}
                </p>
            </div>
        </div>
    );
};

InicioEstudiante.propTypes = {
    studentId: PropTypes.string.isRequired,
};

export default InformacionExamen;
