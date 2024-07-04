import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/quizzes');
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    return (
        <div>
            <h2>Quizzes</h2>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.quiz_id}>
                        <a href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
