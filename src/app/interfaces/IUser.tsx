export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "doctor" | "patient" | "attendant" | "admin";
  dob: "string";
  gender: "Male" | "Female" | "Others";
}
