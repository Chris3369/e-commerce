import { Routes, Route } from 'react-router'
import { ThemeProvider } from 'styled-components'

import Home from './pages/Home'
import CreateProduct from './pages/CreateProduct'

const theme = {
  colors: {
    white: '#fff',
  }
}

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/create" element={<CreateProduct />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App