import React from 'react';
import '../styles/QuizCardStyle.css';
import {useNavigate} from "react-router-dom";

const QuizCardExamened = ({ exam, studentId, groupId }) => {
    const navigate = useNavigate();

    const handleQuizClick = () => {
        navigate(`/infoPreExamen/${studentId}/${groupId}/${exam[0]}`);
    };


    return (
        <div className="quiz-card" onClick={handleQuizClick}>
            <h3 className="quiz-title">{exam[1]}</h3>
            <button className="quiz-button">
                Presentar Examen
            </button>
        </div>
    );
};

export default QuizCardExamened;
