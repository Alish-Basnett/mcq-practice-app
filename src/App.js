import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import PracticeComponent from "./components/PracticeComponent";
import { Button, Box } from "@mui/material";

function App({ toggleColorMode }) {
  return (
    <Router>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="20px"
        >
          <Button variant="contained" onClick={toggleColorMode}>
            Toggle Theme{" "}
          </Button>{" "}
          <Box marginLeft="20px">
            <Link to="/create"> Create Question </Link>{" "}
          </Box>{" "}
          <Box marginLeft="20px">
            <Link to="/practice"> Practice </Link>{" "}
          </Box>{" "}
        </Box>{" "}
        <Routes>
          <Route path="/create" element={<QuestionForm />} />{" "}
          <Route path="/practice" element={<QuestionList />} />{" "}
          <Route path="/practice/:id" element={<PracticeComponent />} />{" "}
        </Routes>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
