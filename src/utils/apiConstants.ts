class APIConstants {
  BASE_URL = "http://localhost:8000/api/v1";

  // Controllers
  AUTH = this.BASE_URL + "/auth";
  USER = this.BASE_URL + "/user";
  CASES = this.BASE_URL + "/cases";

  // Auth Endpoints
  LOGIN = this.AUTH + "/login";
  GOOGLE_LOGIN = this.AUTH + "/google-login";

  // User Endpoints
  GET_USER = this.USER + "/";
  SEARCH_PATIENTS = this.USER + "/patients";

  // Cases Endpoints
  FILE_CASE = this.CASES + "/";
}

const API_CONSTANTS = new APIConstants();
export default API_CONSTANTS;
