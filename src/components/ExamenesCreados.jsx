import { useState, useEffect } from "react";
import '../styles/ExamenesCreadosStyle.css';

const ExamenesCreados = ({ teacherId, courseId }) => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExamsData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/examenes-creados/${teacherId}/${courseId}`
                );
                const data = await response.json();
                setExams(data);
            } catch (error) {
                console.error("Error al obtener los exámenes creados:", error);
            }
        };
        fetchExamsData();
    }, [teacherId, courseId]);

    return (
        <div className="examenes-creados font">
            <div className="exam-grid">
                {exams.map((exam, index) => (
                    <div key={index} className="exam-card">
                        <h3 className="exam-title">{exam.NOMBRE}</h3>
                        <p className="exam-details">Descripción: {exam.DESCRIPCION}</p>
                        <p className="exam-details">Tema: {exam.TEMA_TITULO}</p>
                        <p className="exam-details">Número de preguntas: {exam.NUM_PREGUNTAS}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamenesCreados;
