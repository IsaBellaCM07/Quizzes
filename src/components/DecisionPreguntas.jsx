
import React from "react";

const DecisionPreguntas = ({onDecision}) => {

    return (
        <div className="login-form">
            <div className="login-box">
                <div className="text-container">
                    <h1 className="gradient-text">Creación de Examen</h1>
                </div>
                <p className="login-description">Selecciona como quieres llenar el el examen:</p>
                <div className="role-buttons">
                    <button
                        className="role-button"
                        onClick={() => onDecision('Escoger')}
                    >
                        Escoger Preguntas
                    </button>
                    <button
                        className="role-button"
                        onClick={() => onDecision('Crear')}
                    >
                        Crear Preguntas
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DecisionPreguntas;

