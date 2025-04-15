import Footer from './components/Footer';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flexGrow: 1, padding: '32px', textAlign: 'center' }}>
        <h1>GoodPoint</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
