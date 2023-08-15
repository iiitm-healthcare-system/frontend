class APIConstants {
  BASE_URL = "http://localhost:8080";

  // Controllers
  GENERAL = this.BASE_URL + "/general";
  USER = this.BASE_URL + "/general/customer";

  // Customer Endpoints
  LOGIN = this.USER + "/authenticate";
  GET_USER = this.USER + "/getCustomerDetailsByJwtToken";
}

const API_CONSTANTS = new APIConstants();
export default API_CONSTANTS;
