"use client"
import React, { Key, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Cloud, CloudRain, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
interface WeatherData {
  location: any;
  forecast?: {
    items?: {
      weather: any;
      temperature: any;
      date: string; // Assuming date is a string, update to appropriate type if needed
      astronomy?: {
        sunrise?: string;
        sunset?: string;
      };
    }[];
  };
  // Add other properties as needed
}

// Define the type of weatherData as WeatherData

const Main = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [searchCity, setSearchCity] = useState("");

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://weatherbackend-production-9ddd.up.railway.app/getweatherdata?country=${searchCity}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error: any) {
        alert("CORS policy error")
      console.log('Error fetching weather data:', error.message);
    }
  };

  const sunriseTime = weatherData?.forecast?.items?.[0]?.astronomy?.sunrise;
  const formattedSunriseTime = sunriseTime ? new Date(sunriseTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
  
  const sunsetTime = weatherData?.forecast?.items?.[0]?.astronomy?.sunset;
  const formattedSunsetTime = sunsetTime ? new Date(sunsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
  
  const videos = {
    v1: 'foggy.mp4',
    v2: 'strom.mp4',
    v3: 'sunrise.mp4',
    v4: 'winter.mp4',
  }

  const getVideoByWeatherCondition = (weatherCondition: any) => {
    switch (weatherCondition) {
      case 'sonnig':
        return videos.v3;
      case 'rainy':
        return videos.v2;
      case 'windy':
        return videos.v4;
      default:
        return videos.v1;
    }
  };

  const getWeatherIconByCondition = (weatherCondition: any) => {
    switch (weatherCondition) {
      case 'sonnig':
        return <Sun color='yellow' size={20} />;
      case 'rainy':
        return <CloudRain color='blue' size={20} />;
      case 'night':
        return <Moon color='gray' size={20} />;
      case 'leicht bewölkt':
        return <Cloud color='gray' size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full relative top-0 h-screen flex items-center justify-around'>
      <Input type="text" placeholder="Enter valid Country" className='w-60' value={searchCity} onChange={(e) => setSearchCity(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()} />

      {weatherData && (
        <div className="bg-white border-[20px] border-gray-200 rounded shadow relative w-1/3">
          <div className='relative w-70'>
            
            <div className='text'>
            <div className='flex items-center text-4xl'>
  {weatherData?.forecast?.items?.[0] && (
    <>
      {getWeatherIconByCondition(weatherData.forecast.items[0].weather.text.toLowerCase())}
      <h2 className="font-semibold px-2">{weatherData.location.name}</h2>
      <p>{weatherData.forecast.items[0].temperature.max}°C</p>
    </>
  )}
</div>
<div className='text-xs flex'>
  <p className='bg-slate-50 rounded m-1 p-1'>Lat: {weatherData?.location?.coordinates?.latitude}</p>
  <p className='bg-slate-50 rounded m-1 p-1'>Long: {weatherData?.location?.coordinates?.longitude}</p>
</div>
<div className='flex w-full flex-wrap'>
  {weatherData?.forecast?.items?.slice(-4).reverse().map((item) => (
    <p className='border p-1 rounded-xl flex m-1 bg-slate-50 items-center' key={item.date}>
      {getWeatherIconByCondition(item.weather.text.toLowerCase())}
      {item.date}
    </p>
  ))}
</div>

              <div className='flex w-full'>
                <p className='border p-1 rounded-xl flex m-1 bg-slate-50 items-center'><Sun /> {formattedSunriseTime}</p>
                <p className='border p-1 rounded-xl flex m-1 bg-slate-50 items-center'><Moon /> {formattedSunsetTime}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Main;
