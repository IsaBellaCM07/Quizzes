import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ExamenesCreados from './ExamenesCreados.jsx';
import CrearExamen from './CrearExamen.jsx';
import EstudiantesCurso from "./EstudiantesCurso.jsx";
import '../styles/InicioDocenteStyle.css';

const InicioDocente = () => {
    const { teacherId, cursoId } = useParams();
    const [docenteName, setDocenteName] = useState('');
    const [exams, setExams] = useState([]);
    const [activeTab, setActiveTab] = useState('createdExams'); // Estado para la pestaña activa

    useEffect(() => {
        const fetchDocenteData = async () => {
            const docenteResponse = await fetch(`http://localhost:3001/api/docentes/${teacherId}`);
            const docenteData = await docenteResponse.json();
            setDocenteName(docenteData.NOMBRE);
        };
        fetchDocenteData();
    }, [teacherId, cursoId]);

    return (
        <div className="inicio-docente font">
            <header className="app-header-dash">
                <div className="back-arrow-dashboard">
                    <Link to={`/dashboardDocente/${teacherId}`}>
                        <FiArrowLeft className="back-arrow"/>
                    </Link>
                </div>
                <div className="title">Moralma</div>
                {/* Tabs en el header */}
                <div className="tabs-container">
                    <div className={`tab ${activeTab === 'createdExams' && 'active'}`}
                         onClick={() => setActiveTab('createdExams')}>Exámenes publicados
                    </div>
                    <div className={`tab ${activeTab === 'createExam' && 'active'}`}
                         onClick={() => setActiveTab('createExam')}>Crear examen
                    </div>
                    <div className={`tab ${activeTab === 'studentsCourse' && 'active'}`}
                         onClick={() => setActiveTab('studentsCourse')}>Estudiantes del curso
                    </div>
                </div>
            </header>
            <hr className="divider"/>
            <div className="tab-content">
                {activeTab === 'createdExams' && (
                    <ExamenesCreados teacherId={teacherId} courseId={cursoId} />
                )}
                {activeTab === 'createExam' && (
                    <CrearExamen teacherId={teacherId} cursoId={cursoId} />
                )}
                {activeTab === 'studentsCourse' && (
                    <EstudiantesCurso teacherId={teacherId} cursoId={cursoId} />
                )}
            </div>
        </div>
    );
};

export default InicioDocente;
