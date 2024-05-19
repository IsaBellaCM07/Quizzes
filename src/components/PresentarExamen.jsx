import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/PresentarExamenStyle.css';

const PresentarExamen = () => {
    const { examenId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/preguntas-examen/${examenId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las preguntas del examen');
                }
                const data = await response.json();
                const processedQuestions = processQuestions(data);
                setQuestions(processedQuestions);
                setLoading(false);
            } catch (error) {
                console.error('Error en fetchQuestions:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [examenId]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const processQuestions = (data) => {
        const questionsMap = {};

        data.forEach(item => {
            const questionId = item.ID_PREGUNTA;
            if (!questionsMap[questionId]) {
                questionsMap[questionId] = {
                    id: questionId,
                    descripcion: item.PREGUNTA_DESCRIPCION,
                    tipo: item.TIPO_PREGUNTA,
                    opciones: []
                };
            }

            if (item.ID_RESPUESTA_PREGUNTA) {
                questionsMap[questionId].opciones.push({
                    id: item.ID_RESPUESTA_PREGUNTA,
                    descripcion: item.RESPUESTA_DESCRIPCION,
                    es_correcta: item.ES_CORRECTA
                });
            }
        });

        return Object.values(questionsMap);
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleFinish = () => {
        // Lógica para finalizar el examen
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="exam-container">
            <div className="back-arrow-container">
                <FiArrowLeft className="back-arrow" onClick={() => navigate(-1)} />
            </div>
            {currentQuestion ? (
                <>  <b><p>Pregunta {currentQuestionIndex + 1} de {questions.length}</p></b>

                    <h2>{currentQuestion.descripcion}</h2>
                    <div className="options-container">
                        {currentQuestion.tipo === 'Selección única' && (
                            currentQuestion.opciones.map((opcion, index) => (
                                <div key={index} className="option">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value={opcion.descripcion}
                                            checked={answers[currentQuestion.id] === opcion.descripcion}
                                            onChange={() => handleAnswerChange(currentQuestion.id, opcion.descripcion)}
                                        />
                                        {opcion.descripcion}
                                    </label>
                                </div>
                            ))
                        )}
                        {currentQuestion.tipo === 'Pregunta abierta' && (
                            <textarea
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            />
                        )}
                        {currentQuestion.tipo === 'Completar' && (
                            <input
                                type="text"
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            />
                        )}
                    </div>
                    <div className="navigation-buttons">
                        <button className="button-" onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}>
                            Anterior
                        </button>
                        {isLastQuestion ? (
                            <button className="button-finalizar" onClick={handleFinish}>
                                Finalizar
                            </button>
                        ) : (
                            <button className="button-" onClick={handleNextQuestion}>
                                Siguiente
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div>No se encontraron preguntas.</div>
            )}
        </div>
    );
};

export default PresentarExamen;
