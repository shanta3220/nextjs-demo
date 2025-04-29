export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
}

export interface ProfileData {
  name: string;
  email: string;
}

export interface User extends ProfileData {
  passwordHash?: string;
}
