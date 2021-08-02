import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import scanQR from "./staff/scanQR";
import homeStaff from "./staff/homeStaff";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={homeStaff} />
        
        
        
          <Route path="/scanqr" component={scanQR}/>
        
         
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
