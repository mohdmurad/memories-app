import React from 'react'
import { Container } from '@mui/material';
  import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { createTheme,ThemeProvider } from '@mui/material/styles';




const theme = createTheme({
  palette: {
    primary: {
      main: '#6e306e',
    },
  },
});
const App = () => {


  return (
    <Router>
    <Container maxidth="lg">
    <ThemeProvider theme={theme}>
      <Navbar/>

    </ThemeProvider>
      <Routes>
        <Route path="/"  element={<Home/>}/>
      <Route path="/auth"  element={<Auth/>}/> 
      </Routes>
  
</Container>


    </Router>
  )
}

export default App