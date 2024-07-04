import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ match }) => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quizzes/${match.params.id}`);
                setQuiz(response.data);
                setAnswers(new Array(response.data.questions.length).fill(null));
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [match.params.id]);

    const handleAnswerChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = parseInt(e.target.value);
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/quizzes/${match.params.id}/submit`, { answers });
            console.log('Quiz submitted, Score:', response.data.score);
            // Show score or redirect
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{quiz.title}</h2>
            <form onSubmit={handleSubmit}>
                {quiz.questions.map((question, index) => (
                    <div key={index}>
                        <p>{question.text}</p>
                        {question.choices.map((choice, choiceIndex) => (
                            <label key={choiceIndex}>
                                <input
                                    type="radio"
                                    name={`question_${index}`}
                                    value={choiceIndex}
                                    checked={answers[index] === choiceIndex}
                                    onChange={(e) => handleAnswerChange(e, index)}
                                />
                                {choice}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default Quiz;
