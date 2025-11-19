import apiClient from './apiClient';

export const fetchWeather = async () => {
  const { data } = await apiClient.get('/weather/today');
  return data;
};

export const fetchMarketPrices = async () => {
  const { data } = await apiClient.get('/market/prices');
  return data;
};

export const requestIrrigationSuggestion = async (payload) => {
  const { data } = await apiClient.post('/irrigation/suggest', payload);
  return data;
};

export const uploadPestImage = async (formData) => {
  const { data } = await apiClient.post('/pest/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const fetchCropAdvisory = async () => {
  const { data } = await apiClient.get('/advisory/crop');
  return data;
};

export const fetchAlerts = async () => {
  const { data } = await apiClient.get('/alerts/all');
  return data;
};


