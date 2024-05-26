import React, { useState } from 'react';
import '../styles/AgregarPreguntasStyle.css';

const AgregarPreguntas = ({ onAddQuestion }) => {
    const [questionType, setQuestionType] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]); // Para selección múltiple
    const [correctAnswer, setCorrectAnswer] = useState(''); // Para verdadero/falso y completar espacios

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleQuestionTextChange = (event) => {
        setQuestionText(event.target.value);
    };

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        setCorrectAnswers(correctAnswers.filter((ans) => ans !== options[index]));
    };

    const handleCorrectAnswerChange = (event) => {
        setCorrectAnswers(event.target.checked ? [...correctAnswers, event.target.value] : correctAnswers.filter(ans => ans !== event.target.value));
    };

    const handleCorrectAnswerRadioChange = (event) => {
        setCorrectAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newQuestion = {
            tipo: questionType,
            descripcion: questionText,
            opciones: options,
            respuestasCorrectas: questionType === 'Selección múltiple' ? correctAnswers : correctAnswer // Si es selección múltiple, se envían las respuestas correctas en un array, sino, una sola respuesta
        };
        onAddQuestion(newQuestion);
        // Reiniciar el estado del formulario
        setQuestionType('');
        setQuestionText('');
        setOptions([]);
        setCorrectAnswers([]);
        setCorrectAnswer('');
    };

    return (
        <div className="add-question-container">
            <h2>Agregar Pregunta</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question-type">Tipo de pregunta:</label>
                    <select id="question-type" value={questionType} onChange={handleQuestionTypeChange} required>
                        <option value="">Selecciona un tipo</option>
                        <option value="Selección única">Selección única</option>
                        <option value="Selección múltiple">Selección múltiple</option>
                        <option value="Verdadero/Falso">Verdadero/Falso</option>
                        <option value="Completar espacios en blanco">Completar espacios en blanco</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="question-text">Pregunta:</label>
                    <textarea id="question-text" value={questionText} onChange={handleQuestionTextChange} required />
                </div>

                {/* Mostrar opciones solo si es necesario */}
                {questionType === 'Selección única' || questionType === 'Selección múltiple' || questionType === 'Verdadero/Falso' ? (
                    <div className="options-container">
                        <h3>Opciones:</h3>
                        {options.map((option, index) => (
                            <div key={index} className="option-item">
                                <input
                                    type={questionType === 'Selección múltiple' ? 'checkbox' : 'radio'}
                                    name={`option-${index}`}
                                    value={option}
                                    checked={questionType === 'Selección múltiple' ? correctAnswers.includes(option) : correctAnswer === option}
                                    onChange={questionType === 'Selección múltiple' ? handleCorrectAnswerChange : handleCorrectAnswerRadioChange}
                                />
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e)}
                                />
                                <button type="button" className="remove-option-button" onClick={() => handleRemoveOption(index)}>×</button>
                            </div>
                        ))}
                        <button type="button" className="add-option-button" onClick={handleAddOption}>Agregar opción</button>
                    </div>
                ) : null}

                {/* Mostrar espacio en blanco solo si es necesario */}
                {questionType === 'Completar espacios en blanco' && (
                    <div className="blank-container">
                        <h3>Respuesta:</h3>
                        <input type="text" disabled value={questionText} />
                        <input type="text" className="hidden-input" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} /> {/* Input oculto para la respuesta */}
                    </div>
                )}

                <button type="submit" className="submit-button">Agregar pregunta</button>
            </form>
        </div>
    );
};

export default AgregarPreguntas;
