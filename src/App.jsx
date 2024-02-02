import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import { getFormattedWeatherData } from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [city, setCity] = useState("Mumbai");
  const [unit, setUnit] = useState("c");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      toast.info("Fetching weather for " + city);
      await getFormattedWeatherData(city).then((data) => {
        toast.success(`Fetched ${data.loc_name}, ${data.loc_country}`);
        setWeather(data);
      })
      .catch((error) => {
        toast.error(`Invalid Place ${city}`);
      });
    };

    fetchWeather();
  }, [city, unit]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    return weather.is_day
      ? "from-yellow-700 to-orange-700"
      : "from-cyan-700 to-blue-700";
  };

  return (
    <div className={`max-w-screen-md mx-auto mt-4 p-4 bg-gradient-to-br ${formatBackground()} shadow-xl shadow-gray-400 rounded-lg text-white`}>
      <TopButtons setCity={setCity} />
      <Inputs setCity={setCity} unit={unit} setUnit={setUnit} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} unit={unit} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Forecast
              title="hourly forecast"
              unit={unit}
              forecast={weather.hourlyForecast}
            />
            <Forecast
              title="daily forecast"
              unit={unit}
              forecast={weather.dailyForecast}
            />
          </div>
        </>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
};

export default App;
