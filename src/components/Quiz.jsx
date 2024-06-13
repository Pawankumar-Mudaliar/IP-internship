// src/components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import Timer from './Timer.jsx';

const quizQuestions = [
  {
    question: "What is the value of PI?",
    options: [
      { value: "A", text: "3.14" },
      { value: "B", text: "3" },
      { value: "C", text: "300" },
      { value: "D", text: "22" }
    ],
    correctAnswer: "A"
  },
  {
    question: "What is the capital of France?",
    options: [
      { value: "A", text: "Berlin" },
      { value: "B", text: "Madrid" },
      { value: "C", text: "Paris" },
      { value: "D", text: "Rome" }
    ],
    correctAnswer: "C"
  },
  {
    question: "What is 2 + 2?",
    options: [
      { value: "A", text: "3" },
      { value: "B", text: "4" },
      { value: "C", text: "5" },
      { value: "D", text: "6" }
    ],
    correctAnswer: "B"
  },
  {
    question: "What is the color of the sky?",
    options: [
      { value: "A", text: "Green" },
      { value: "B", text: "Red" },
      { value: "C", text: "Blue" },
      { value: "D", text: "Yellow" }
    ],
    correctAnswer: "C"
  },
  {
    question: "What is the capital of Japan?",
    options: [
      { value: "A", text: "Beijing" },
      { value: "B", text: "Seoul" },
      { value: "C", text: "Tokyo" },
      { value: "D", text: "Bangkok" }
    ],
    correctAnswer: "C"
  },
  {
    question: "What is the chemical symbol for water?",
    options: [
      { value: "A", text: "H2O" },
      { value: "B", text: "O2" },
      { value: "C", text: "CO2" },
      { value: "D", text: "NaCl" }
    ],
    correctAnswer: "A"
  }
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(quizQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(60);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer);
  }, []);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(interval);
          calculateResult();
          reloadQuestions();
          return 60;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const reloadQuestions = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quizQuestions.length).fill(null));
    setTimeLeft(60);
    startTimer();
  };

  const calculateResult = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    alert(`Your score is ${score} out of ${quizQuestions.length}`);
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitClick = () => {
    clearInterval(timer);
    calculateResult();
    reloadQuestions();
  };

  return (
    <div className="quiz">
      <Question
        question={quizQuestions[currentQuestionIndex]}
        questionIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        setUserAnswers={setUserAnswers}
      />
      <div id="controls">
        <input
          type="button"
          id="btnPrevious"
          value="Previous"
          onClick={handlePreviousClick}
          disabled={currentQuestionIndex === 0}
        />
        <input
          type="button"
          id="btnNext"
          value="Next"
          onClick={handleNextClick}
          style={{ display: currentQuestionIndex === quizQuestions.length - 1 ? 'none' : 'inline' }}
        />
        <input
          type="button"
          id="btnSubmit"
          value="Submit"
          onClick={handleSubmitClick}
          style={{ display: currentQuestionIndex === quizQuestions.length - 1 ? 'inline' : 'none' }}
        />
      </div>
      <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default Quiz;
