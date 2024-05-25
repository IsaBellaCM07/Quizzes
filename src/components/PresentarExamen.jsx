import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/PresentarExamenStyle.css';

const PresentarExamen = () => {
    const { examenId, studentId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });

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

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];

            if (currentQuestion) {
                const minutes = currentQuestion.tiempo;
                setTimeRemaining({ minutes, seconds: 0 });

                const timer = setInterval(() => {
                    setTimeRemaining(prevTime => {
                        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
                            clearInterval(timer);
                            alert("¡Tiempo agotado!");
                            navigate(`/dashboardEstudiante/${studentId}`);
                            return { minutes: 0, seconds: 0 };
                        } else if (prevTime.seconds === 0) {
                            return { minutes: prevTime.minutes - 1, seconds: 59 };
                        } else {
                            return { ...prevTime, seconds: prevTime.seconds - 1 };
                        }
                    });
                }, 1000);

                return () => clearInterval(timer);
            }
        }
    }, [currentQuestionIndex, questions, navigate, studentId]);

    const processQuestions = (data) => {
        const questionsMap = {};

        data.forEach(item => {
            const questionId = item.ID_PREGUNTA;
            if (!questionsMap[questionId]) {
                questionsMap[questionId] = {
                    id: questionId,
                    descripcion: item.PREGUNTA_DESCRIPCION,
                    tipo: item.TIPO_PREGUNTA,
                    opciones: [],
                    tiempo: item.TIEMPO
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

    const handleAnswerChange = (questionId, answer, currentQuestion) => {
        if (currentQuestion.tipo === 'Selección única') {
            setAnswers({
                ...answers,
                [questionId]: answer
            });
        } else if (currentQuestion.tipo === 'Selección múltiple') {
            const selectedAnswers = answers[questionId] || [];
            const index = selectedAnswers.indexOf(answer);
            if (index === -1) {
                setAnswers({
                    ...answers,
                    [questionId]: [...selectedAnswers, answer]
                });
            } else {
                const updatedAnswers = [...selectedAnswers.slice(0, index), ...selectedAnswers.slice(index + 1)];
                setAnswers({
                    ...answers,
                    [questionId]: updatedAnswers
                });
            }
        } else if (currentQuestion.tipo === 'Completar espacios en blanco') {
            setAnswers({
                ...answers,
                [questionId]: answer
            });
        } else {
            setAnswers({
                ...answers,
                [questionId]: answer
            });
        }
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

    const renderBlankSpaceQuestion = (descripcion, questionId) => {
        const parts = descripcion.split('_');
        const answer = answers[questionId] || '';

        return (
            <div>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {index < parts.length - 1 && (
                            <input
                                type="text"
                                className="blank-space"
                                value={answer}
                                onChange={(e) =>
                                    handleAnswerChange(questionId, e.target.value, { tipo: 'Completar espacios en blanco' })
                                }
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (questions.length > 0) {
        const currentQuestion = questions[currentQuestionIndex];
        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        return (
            <div className="exam-container">
                <div className="back-arrow-container-PE">
                    <FiArrowLeft className="back-arrow" onClick={() => navigate(-1)} />
                </div>

                {currentQuestion && (
                    <>
                        <p>Tiempo restante: {timeRemaining.minutes}:{timeRemaining.seconds < 10 ? '0' : ''}{timeRemaining.seconds}</p>
                        <b><p>Pregunta {currentQuestionIndex + 1} de {questions.length}</p></b>
                        <h2>{currentQuestion.tipo === 'Completar espacios en blanco' ? renderBlankSpaceQuestion(currentQuestion.descripcion, currentQuestion.id) : currentQuestion.descripcion}</h2>
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
                                                onChange={() => handleAnswerChange(currentQuestion.id, opcion.descripcion, currentQuestion)}
                                            />
                                            {opcion.descripcion}
                                        </label>
                                    </div>
                                ))
                            )}
                            {currentQuestion.tipo === 'Selección múltiple' && (
                                currentQuestion.opciones.map((opcion, index) => (
                                    <div key={index} className="option">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name={`question-${currentQuestion.id}`}
                                                value={opcion.descripcion}
                                                checked={answers[currentQuestion.id] && answers[currentQuestion.id].includes(opcion.descripcion)}
                                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.checked ? [...(answers[currentQuestion.id] || []), opcion.descripcion] : (answers[currentQuestion.id] || []).filter(ans => ans !== opcion.descripcion))}
                                            />
                                            {opcion.descripcion}
                                        </label>
                                    </div>
                                ))
                            )}
                            {currentQuestion.tipo === 'Verdadero/Falso' && (
                                <div className="option">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value="Verdadero"
                                            checked={answers[currentQuestion.id] === 'Verdadero'}
                                            onChange={() => handleAnswerChange(currentQuestion.id, 'Verdadero', currentQuestion)}
                                        />
                                        Verdadero
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value="Falso"
                                            checked={answers[currentQuestion.id] === 'Falso'}
                                            onChange={() => handleAnswerChange(currentQuestion.id, 'Falso', currentQuestion)}
                                        />
                                        Falso
                                    </label>
                                </div>
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
                )}
            </div>
        );
    } else {
        return <div>No se encontraron preguntas.</div>;
    }
};

export default PresentarExamen;
