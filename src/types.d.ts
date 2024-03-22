export interface DataRegister {
  fullName: string;
  user: string;
  email: string;
  password: string;
}
export interface DataLogin {
  user: string;
  password: string;
}

export interface InputFormProps {
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameValue: string;
  tCss?: string;
  placeholder?: string;
  type?: string;
  name: string;
}

// Errors
export interface Errors {
  fullName?: string | undefined;
  user?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  password2?: string | undefined;
  passwordConfirm?: string | undefined;
}
export interface ErrorApi {
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface ErrorMessage {
  message?: string;
}

// Fetchs return Data
export interface AuthAPIRegister extends StateUserType {
  userObject: AuthRegister;
}

interface StateTypeUser {
  userObject: UserObject;
}

export interface AuthRegister {
  fullName: string;
  user: string;
  email: string;
  isActive: boolean;
  roles: string[];
  assignedProjects: string[];
  assignedTasks: string[];
  _id: string;
  __v: number;
}
export interface AuthAPILogin extends StateUserType {
  user?: string;
  id?: string;
}

type StateUserType = AuthAPIRegister | AuthAPILogin;

export interface VerificationToken {
  id?: string;
  user?: string;
  email?: string;
}
