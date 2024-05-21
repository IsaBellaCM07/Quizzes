import { Link } from "react-router-dom";
import '../styles/CourseCardStyle.css'; // Importa los estilos CSS de CourseCard

const CourseCard = ({ course, studentId }) => {
    return (
        <div className="font">
            <div className="course-card">
                <div className="course-header">
                    <Link to={`/inicioEstudiante/${studentId}`} className="course-title">
                        {`${course.nombre_grupo} - ${course.nombre}`}
                    </Link>
                </div>
                <div className="course-info">
                    <div className="course-content">{course.contenido}</div>
                </div>
                <div className="course-footer">
                    <div className="course-professor">Docente: {course.nombre_docente}</div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
