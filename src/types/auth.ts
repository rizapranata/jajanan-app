
export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  data: {
    _id: string;
    full_name: string;
    email: string;
    role: string;
    user_id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    user: {
      _id: string;
      full_name: string;
      email: string;
      role: string;
      user_id: number;
    };
    token: string;
  };
}

export interface UserType {
  _id:         string;
  full_name:   string;
  email:       string;
  role:        string;
  user_id: number;
}
