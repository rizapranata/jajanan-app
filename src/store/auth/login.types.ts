export interface ResponseUserLogin {
  message: string;
  data:    LoginType;
}

export interface LoginType {
  user:  UserType;
  token: string;
}

export interface UserType {
  _id:         string;
  full_name:   string;
  email:       string;
  role:        string;
  customer_id: number;
}
