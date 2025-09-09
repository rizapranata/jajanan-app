export interface RegisterUserResponse {
  message: string;
  data:    RegisterUserType;
}

export interface RegisterUserType {
  full_name:   string;
  email:       string;
  password:    string;
  role:        string;
  token:       string;
  _id:         string;
  createdAt:   Date;
  updatedAt:   Date;
  customer_id: number;
  __v:         number;
}
