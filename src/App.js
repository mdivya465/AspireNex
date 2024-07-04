import React from 'react';
import { BrowserRouter as Route, Routes, Switch } from 'react-router-dom';
import QuizList from './QuizList';
import QuizForm from './QuizForm';
import Quiz from './Quiz';

function App() {
    return (
        
            <div className="App">
              
                    <Route path="/" exact component={QuizList} />
                    <Route path="/create" component={QuizForm} />
                    <Route path="/quiz/:id" component={Quiz} />
               
            </div>
        
    );
}

export default App;
