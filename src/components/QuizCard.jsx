
import { useNavigate } from 'react-router-dom';
import '../styles/QuizCardStyle.css';

const QuizCard = ({ quiz, studentId, type, groupId }) => {
    const navigate = useNavigate();

    const handleQuizClick = () => {
        if (type === 'presented') {
            navigate(`/informacionExamen/${studentId}/${groupId}`);
        } else {
            navigate(`/infoPreExamen/${studentId}/${groupId}/${quiz.ID_EXAMEN}`);
        }
    };

    return (
        <div className="quiz-card" onClick={handleQuizClick}>
            <h3 className="quiz-title">{quiz.NOMBRE}</h3>
            <button className="quiz-button">
                {type === 'presented' ? 'Ver Resultados' : 'Presentar Examen'}
            </button>
        </div>
    );
};

export default QuizCard;
