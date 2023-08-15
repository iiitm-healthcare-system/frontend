import { IUser } from "./IUser";

export interface ICase {
  _id: string;
  patient: IUser;
  doctor: IUser;
  attendant?: IUser;
  status: "pending" | "ongoing" | "completed";
  vitals: {
    height: number;
    weight: number;
    pulse: number;
    temperature: number;
    bloodPressure: string;
  };
  complaints: {
    description: string;
    duration: number;
    severity: "moderate" | "high" | "mild";
    frequency: "constant" | "hourly" | "daily" | "weekly" | "rarely";
    since: string;
  }[];
  diagnosis: string[];
  prescriptions: {
    medications: {
      name: string;
      quantity: number;
      dosage?: {
        morning: {
          beforeMeal: boolean;
          afterMeal: boolean;
        };
        afternoon: {
          beforeMeal: boolean;
          afterMeal: boolean;
        };
        evening: {
          beforeMeal: boolean;
          afterMeal: boolean;
        };
        night: {
          beforeMeal: boolean;
          afterMeal: boolean;
        };
      };
      notes?: string;
    }[];
    advice: string;
  }[];
  createdAt: Date;
}
