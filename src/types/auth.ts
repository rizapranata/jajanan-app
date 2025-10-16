export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role?: string;
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

export interface UsersResponse {
  status: string;
  data: UserData[];
  count: number;
}

export interface UserData {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
  token: string[];
  is_active: number;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  __v: number;
}

export interface UserType {
  _id: string;
  full_name: string;
  email: string;
  role: string;
  user_id: number;
  password?: string;
  is_active?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export interface CreateUserResponse {
  message: string;
  data: {
    full_name: string;
    email: string;
    password: string;
    role: string;
    token: any[];
    is_active: number;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    user_id: number;
    __v: number;
  };
}
export interface DetailUserResponse {
  message: string;
  data: {
    full_name: string;
    email: string;
    password: string;
    role: string;
    token: any[];
    is_active: number;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    user_id: number;
    __v: number;
  };
}

export interface UpdateUserRequest {
  id: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export interface ProfileUserResponse {
  message: string;
  data: {
    is_active: number;
    _id: string;
    full_name: string;
    email: string;
    role: string;
    customer_id: number;
    iat: number;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}