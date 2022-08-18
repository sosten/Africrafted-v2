import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
