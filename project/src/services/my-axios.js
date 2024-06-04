import axios from "axios";
const baseURL = "http://192.168.1.3/3t/laravel/public/";
const myAxios = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 120,
});
// Add a response interceptor
myAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 429) {
      return alert("Server bị quá tải do thao tác quá nhanh!");
    }
    return alert("Yêu cầu quá hạn \nKiểm tra kết nối mạng");
    // return Promise.reject(error);
  }
);
export { myAxios, baseURL };
