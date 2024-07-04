import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ text: '', choices: ['', '', ''], correct_answer: 0 }]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', choices: ['', '', ''], correct_answer: 0 }]);
    };

    const handleQuestionChange = (e, index) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/quizzes', {
                title,
                questions
            });
            console.log('Quiz created with ID:', response.data.quiz_id);
            // Redirect or show success message
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div>
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                {questions.map((question, index) => (
                    <div key={index}>
                        <label>Question {index + 1}:</label>
                        <input type="text" name="text" value={question.text} onChange={(e) => handleQuestionChange(e, index)} required />
                        <label>Choices:</label>
                        {question.choices.map((choice, choiceIndex) => (
                            <input type="text" key={choiceIndex} name={`choice_${choiceIndex}`} value={choice} onChange={(e) => handleQuestionChange(e, index)} required />
                        ))}
                        <label>Correct Answer:</label>
                        <select name="correct_answer" value={question.correct_answer} onChange={(e) => handleQuestionChange(e, index)} required>
                            {question.choices.map((_, choiceIndex) => (
                                <option key={choiceIndex} value={choiceIndex}>{`Choice ${choiceIndex + 1}`}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="button" onClick={addQuestion}>Add Question</button>
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default QuizForm;
