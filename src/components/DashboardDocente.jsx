import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import '../styles/DashboardDocenteStyle.css';
import CourseCardTeacher from "./CourseCardTeacher.jsx";

const DashboardDocente = () => {
    const [courses, setCourses] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const {teacherId } = useParams();

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/cursos-docente/${teacherId}`
                );
                const data = await response.json();
                setCourses(data);

                const teacherResponse = await fetch(`http://localhost:3001/api/docentes/${teacherId}`);
                const teacherData = await teacherResponse.json();
                setTeacherName(teacherData.NOMBRE);
            } catch (error) {
                console.error("Error al obtener los cursos del docente:", error);
            }
        };
        fetchTeacherData();
    }, [teacherId]);

    return (
        <div className="font">
            <header className="app-header-dash">
                <div className="back-arrow-dashboard">
                    <Link to="/loginDocente">
                        <FiArrowLeft className="back-arrow-Doc" />
                    </Link>
                </div>
                <div className="title-Doce">Moralma</div>
                <div className="greeting-Doce">Hola, {teacherName}</div>
            </header>
            <hr className="divider" />
            <div className="course-grid">
                {courses.map((course, index) => (
                    <CourseCardTeacher key={index} course={course} docenteId={teacherId} />
                ))}
            </div>
        </div>
    );
};

export default DashboardDocente;
