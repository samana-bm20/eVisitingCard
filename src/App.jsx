import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmployeeCard } from './components/EmpCard'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/e-visiting" element={<EmployeeCard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
