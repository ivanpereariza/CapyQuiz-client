import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <AppRoutes />
      </>
    </div>
  );
}

export default App;
