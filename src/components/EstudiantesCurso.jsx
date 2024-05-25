import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/EstudiantesCursoStyle.css';

const EstudiantesCurso = () => {
    const { teacherId, cursoId } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/estudiantes-curso/${teacherId}/${cursoId}`);
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error al obtener los estudiantes del curso:', error);
            }
        };

        fetchStudentsData();
    }, [teacherId, cursoId]);

    return (
            <div className="students-container">
                <h2>Listado de Estudiantes</h2>
                <table className="students-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.nombre}</td>
                            <td>{student.apellido}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    );
};

export default EstudiantesCurso;
