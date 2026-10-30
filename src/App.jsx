import './App.css'
import MainContent from './components/MainContent.jsx'

// IMPPORT MATERIAL UI COMPONENTS
import Container from '@mui/material/Container'

function App() {
  return (
    <>
      <Container
        maxWidth={false}
        className="app-shell"
        sx={{
          minHeight: '100dvh',
          boxSizing: 'border-box',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        <MainContent />
      </Container>
    </>
  )
}

export default App
