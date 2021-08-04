import { AuthProvider } from './authentication';
import { Base } from './base';

import './App.css';
import React from "react";

function App() {
  return (
    <AuthProvider>
      <Base />
    </AuthProvider>
  );
}

export default App;
