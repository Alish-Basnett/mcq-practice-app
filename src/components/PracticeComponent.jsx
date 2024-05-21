import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PracticeComponent = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://192.168.0.101:3002/questions/${id}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the question!", error);
      });
  }, [id]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsCorrect(selectedOption === question.answer);
  };

  if (!question) {
    return <p>Loading question...</p>;
  }

  return (
    <div style={{ marginTop: "2em" }}>
      <h3>{question.question}</h3>
      <form>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="options"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitted || !selectedOption}
          style={{ marginTop: "16px" }}
        >
          Check Answer
        </button>
      </form>
      {isSubmitted && (
        <div>
          <h3>{isCorrect ? "Correct Answer!" : "Wrong Answer"}</h3>
          {!isCorrect && <p>The correct answer is: {question.answer}</p>}
        </div>
      )}
    </div>
  );
};

export default PracticeComponent;
