import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    // this.axiosInstance.interceptors.request.use(
    //   (config: AxiosRequestConfig) => {
    //     const token = "tu_token_bearer_aquí"; // Obtén el token de alguna manera, como desde el localStorage
    //     if (token) {
    //       config.headers = config.headers || {};
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   }
    // );
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

export default ApiService;
