import { Card, Col, Row, Spin, Statistic } from "antd";
import { useEffect, useState } from "react";
import { WiCloudy, WiDaySunny, WiFog, WiRain, WiSnow } from "react-icons/wi";
import { WeatherDto } from "../../../models/dto/weatherDto";
import { getWeather } from "../../../services/stadisticsService";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWeather();

      if ("temperature" in result) {
        setWeatherData(result);
      } else {
        setError(result.message);
      }
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
        return <WiDaySunny size={50} />;
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
    <Spin spinning={!weatherData && !error}>
      <Card title="Clima Puente Alto, Chile" style={{ height: 400 }}>
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
    </Spin>
  );
};

export default WeatherWidget;
