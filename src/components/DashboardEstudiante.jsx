import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Importa el icono de flecha hacia atrás
import CourseCard from './CourseCard'; // Importa el componente CourseCard
import '../styles/DashboardEstudianteStyle.css';

const DashboardEstudiante = () => {
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [studentName, setStudentName] = useState('');
    const { studentId } = useParams();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/cursos-estudiante/${studentId}`
                );
                const data = await response.json();
                setCourses(data);

                const responseGroups = await fetch(
                    `http://localhost:3001/api/grupos-estudiante/${studentId}`
                );
                const dataGroups = await responseGroups.json();
                setGroups(dataGroups);

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
        <div className="dashboard-estudiante font">
            <header className="app-header-dash">
                <div className="back-arrow-dashboard-Est">
                    <Link to="/loginEstudiante">
                        <FiArrowLeft className="back-arrow-Est" />
                    </Link>
                </div>
                <div className="title-Est">Moralma</div>
                <div className="greeting-Est">Hola, {studentName}</div>
            </header>
            <hr className="divider" />
            <div className="course-grid">
                {courses.map((course, index) => (
                    // Pasa el ID del grupo como una propiedad llamada grupoId
                    <CourseCard key={index} course={course} studentId={studentId} grupoId={course.id_grupo}/>
                ))}
            </div>

        </div>
    );
};

export default DashboardEstudiante;
