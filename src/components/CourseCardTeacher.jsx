import { Link } from "react-router-dom";
import '../styles/CourseCardTeacherStyle.css';

const CourseCard = ({ course, docenteId}) => {
    return (
        <div className="font">
            <div className="course-card">
                <div className="course-header">
                    <Link to={`/inicioDocente/${docenteId}/${course.id_curso}`} className="course-title">
                        {`${course.nombre_grupo} - ${course.nombre}`}
                    </Link>
                </div>
                <div className="course-info">
                    <div className="course-content">{course.contenido}</div>
                </div>
                <div className="course-footer">
                    <div className="course-professor">Estudiantes inscritos: {course.numero_estudiantes}</div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
