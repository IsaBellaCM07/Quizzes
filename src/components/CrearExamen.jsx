import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/CrearExamenStyle.css';

const CrearExamen = ({ teacherId, cursoId }) => {
    const [examId, setExamId] = useState('');
    const [examName, setExamName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState('');
    const [totalQuestions, setTotalQuestions] = useState('');
    const [availabilityDate, setAvailabilityDate] = useState('');
    const [availabilityTime, setAvailabilityTime] = useState('');
    const [theme, setTheme] = useState('');
    const [categories, setCategories] = useState([]);
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        // Fetch categories and themes from the backend
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch('http://localhost:3001/api/categories');
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);

                const themesResponse = await fetch('http://localhost:3001/api/themes');
                const themesData = await themesResponse.json();
                setThemes(themesData);
            } catch (error) {
                console.error('Error al obtener categorías y temas:', error);
            }
        };

        fetchData();
    }, []);

    const handleExamCreation = async (event) => {
        event.preventDefault();

        const newExam = {
            examId,
            examName,
            description,
            time,
            category,
            totalQuestions,
            availability: `${availabilityDate} ${availabilityTime}`,
            theme,
        };

        try {
            const response = await fetch('http://localhost:3001/api/exams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExam),
            });

            if (response.ok) {
                alert('Examen creado exitosamente');
            } else {
                alert('Error al crear el examen');
            }
        } catch (error) {
            console.error('Error al crear examen:', error);
        }
    };

    return (
        <div>
            <div className="form-container">
                <h2>Crear examen</h2>
                <form onSubmit={handleExamCreation}>
                    <div className="form-group-CE">
                        <label>Nombre del examen:</label>
                        <input
                            type="text"
                            value={examName}
                            onChange={(e) => setExamName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-CE">
                        <label>Descripción:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-CE">
                        <label>Tiempo (en minutos):</label>
                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            min="0"
                        />
                    </div>
                    <div className="form-group-CE">
                        <label>Categoría:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-CE">
                        <label>Total de preguntas:</label>
                        <input
                            type="number"
                            value={totalQuestions}
                            onChange={(e) => setTotalQuestions(e.target.value)}
                            required
                            min="0"
                        />
                    </div>
                    <div className="form-group-CE">
                        <label>Fecha de disponibilidad:</label>
                        <input
                            type="date"
                            value={availabilityDate}
                            onChange={(e) => setAvailabilityDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-CE">
                        <label>Hora de disponibilidad:</label>
                        <input
                            type="time"
                            value={availabilityTime}
                            onChange={(e) => setAvailabilityTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-CE">
                        <label>Tema:</label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecciona un tema</option>
                            {themes.map((theme) => (
                                <option key={theme.id} value={theme.id}>
                                    {theme.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-CE">
                        <button type="submit" className="submit-button">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearExamen;
