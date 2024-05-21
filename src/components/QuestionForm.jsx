// src/components/QuestionForm.js
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Container,
} from "@mui/material";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://192.168.0.101:3002/questions", {
        question,
        options,
        answer,
      })
      .then((response) => {
        console.log("Question created:", response.data);
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
      })
      .catch((error) => {
        console.error("There was an error creating the question!", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2em", marginTop: "2em" }}>
        <Typography variant="h4" gutterBottom>
          Create a Question
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Question"
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              variant="outlined"
            />
          </Box>
          {options.map((option, index) => (
            <Box mb={2} key={index}>
              <TextField
                label={`Option ${index + 1}`}
                fullWidth
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                variant="outlined"
              />
            </Box>
          ))}
          <Box mb={2}>
            <TextField
              label="Answer"
              fullWidth
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              variant="outlined"
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Create Question
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default QuestionForm;
