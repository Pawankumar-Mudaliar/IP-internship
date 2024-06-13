// src/components/Question.jsx
import React from 'react';

const Question = ({ question, questionIndex, userAnswers, setUserAnswers }) => {
  const handleOptionChange = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  return (
    <div className="allQuestions">
      <div className="questionDiv">
        <h3>{question.question}</h3>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name={`q${questionIndex}`}
              value={option.value}
              checked={userAnswers[questionIndex] === option.value}
              onChange={handleOptionChange}
            />
            <label>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
