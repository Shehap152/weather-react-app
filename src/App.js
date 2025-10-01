import WeatherBox from './Components/WeatherBox'
import WeatherProvider from './Contexts/WeatherContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherProvider>
          <WeatherBox />
        </WeatherProvider>
      </header>
    </div>
  );
}

export default App;
