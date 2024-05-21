import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios
      .get("http://192.168.0.101:3002/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = (questionId) => {
    const correctAnswer = questions.find((q) => q.id === questionId).answer;
    const isCorrect = selectedOptions[questionId] === correctAnswer;
    setSubmittedAnswers((prev) => ({ ...prev, [questionId]: isCorrect }));
  };

  const handleRefresh = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2em" }}>
      <Button
        onClick={handleRefresh}
        variant="outlined"
        style={{ marginBottom: "1em" }}
      >
        Refresh Questions
      </Button>
      {questions.map((question) => (
        <Paper
          key={question.id}
          style={{
            marginBottom: "2em",
            padding: "1em",
            backgroundColor:
              submittedAnswers[question.id] !== undefined
                ? submittedAnswers[question.id]
                  ? "lightgreen"
                  : "lightcoral"
                : "inherit",
          }}
        >
          <Typography variant="h5">{question.question}</Typography>
          <FormControl component="fieldset">
            <hr />
            <FormLabel component="legend"></FormLabel>
            <RadioGroup
              name={`options${question.id}`}
              value={selectedOptions[question.id] || ""}
              onChange={(e) => handleOptionChange(question.id, e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => handleSubmit(question.id)}
            disabled={!selectedOptions[question.id]}
            style={{ marginTop: "210px" }}
          >
            Check Answer
          </Button>
          {submittedAnswers[question.id] !== undefined && (
            <Box mt={2}>
              <Typography variant="h6">
                {submittedAnswers[question.id]
                  ? "Correct Answer!"
                  : "Wrong Answer"}
              </Typography>
              {!submittedAnswers[question.id] && (
                <Typography variant="body1">
                  The correct answer is: {question.answer}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      ))}
    </Container>
  );
};

export default QuestionList;
