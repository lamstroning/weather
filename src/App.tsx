import Header from './components/Header';
import Weather from './components/Home/Weather';
import {FutureWeather} from './components/Home/FutureWeather';
import {saveUser} from './service/user';
function App() {
	saveUser();
	return (
		<div className='App'>
			<Header/>
			<Weather/>
			<FutureWeather/>
		</div>
	);
}

export default App;
