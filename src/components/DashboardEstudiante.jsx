import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Importa el icono de flecha hacia atrás
import CourseCard from './CourseCard'; // Importa el componente CourseCard
import '../styles/DashboardEstudianteStyle.css';

const DashboardEstudiante = () => {
    const [courses, setCourses] = useState([]);
    const [studentName, setStudentName] = useState('');
    const {studentId} = useParams();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/cursos-estudiante/${studentId}`
                );
                const data = await response.json();
                setCourses(data);

                // Obtener el nombre del estudiante y establecerlo en el estado
                const studentResponse = await fetch(`http://localhost:3001/api/estudiantes/${studentId}`);
                const studentData = await studentResponse.json();
                setStudentName(studentData.NOMBRE);
            } catch (error) {
                console.error("Error al obtener los cursos del estudiante:", error);
            }
        };
        fetchStudentData();
    }, [studentId]);

    return (
        <div className="font">
            <header className="app-header-dash">
                <div className="back-arrow-dashboard">
                    <Link to="/loginEstudiante">
                        <FiArrowLeft className="back-arrow" />
                    </Link>
                </div>
                <div className="title">Moralma</div>
                <div className="greeting">Hola, {studentName}</div>
            </header>
            <hr className="divider" />
            <div className="course-grid">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} studentId={studentId} />
                ))}
            </div>
        </div>
    );
};

export default DashboardEstudiante;
