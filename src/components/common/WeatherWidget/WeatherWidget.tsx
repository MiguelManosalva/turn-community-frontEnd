import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { WiCloudy, WiDaySunny, WiFog, WiRain, WiSnow } from "react-icons/wi";
import { WeatherDto } from "../../../models/dto/weatherDto";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherDto | null>(null);

  useEffect(() => {
    // Aquí iría tu lógica para obtener los datos del clima
    // Simularemos con datos estáticos para este ejemplo
    const fetchData = async () => {
      // Reemplaza con la llamada a tu API
      const result: WeatherDto = {
        temperature: 26.95,
        temperatureMin: 25.53,
        temperatureMax: 29.22,
        humidity: 38,
        weather: "clear sky",
        precipitation: "no",
      };

      setWeatherData(result);
    };

    fetchData();
  }, []);

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "clear sky":
        return <WiDaySunny size={50} />;
      case "cloudy":
        return <WiCloudy size={50} />;
      case "rain":
        return <WiRain size={50} />;
      case "snow":
        return <WiSnow size={50} />;
      case "fog":
        return <WiFog size={50} />;
      default:
        return <WiDaySunny size={50} />; // Ícono por defecto
    }
  };

  const getWeatherName = (weather: string) => {
    switch (weather) {
      case "clear sky":
        return "Cielo Despejado";
      case "cloudy":
        return "Nublado";
      case "rain":
        return "Lluvia";
      case "snow":
        return "Nieve";
      case "fog":
        return "Niebla";
      default:
        return "Cielo Despejado";
    }
  };

  return (
    <Card title="Clima Puente Alto, Chile">
      {weatherData && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Statistic
              title="Temperatura"
              value={weatherData.temperature}
              suffix="°C"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Statistic
              title="Humedad"
              value={weatherData.humidity}
              suffix="%"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Statistic
              title="Temp. Mínima"
              value={weatherData.temperatureMin}
              suffix="°C"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Statistic
              title="Temp. Máxima"
              value={weatherData.temperatureMax}
              suffix="°C"
            />
          </Col>
          <Col xs={24} style={{ textAlign: "center" }}>
            {getWeatherIcon(weatherData.weather)}
            <p>Estado: {getWeatherName(weatherData.weather)}</p>
            <p>Precipitación: {weatherData.precipitation}</p>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default WeatherWidget;
