class APIConstants {
  BASE_URL = "http://localhost:8000/api/v1";

  // Controllers
  AUTH = this.BASE_URL + "/auth";

  // Customer Endpoints
  LOGIN = this.AUTH + "/login";
  GOOGLE_LOGIN = this.AUTH + "/google-login";
}

const API_CONSTANTS = new APIConstants();
export default API_CONSTANTS;
