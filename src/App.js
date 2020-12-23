import React from 'react';
import AppRouter from './Router'
import './App.css';
import './assets/css/style.css';
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  );
}

export default App;
