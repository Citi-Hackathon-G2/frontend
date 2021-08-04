import { AuthProvider } from './authentication';
import { Base } from './base';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Base />
    </AuthProvider>
  );
}

export default App;
