export interface Errors {
  fullName?: string | undefined;
  user?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  password2?: string | undefined;
  passwordConfirm?: string | undefined;
}

export interface Data {
  fullName: string;
  user: string;
  email: string;
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

export interface ErrorApi {
  message?: string;
  error?: string;
  statusCode?: number;
}
export interface AuthAPIRegister {
  userObject: AuthRegister;
}

export interface AuthRegister {
  fullName: string;
  user: string;
  email: string;
  isActive: boolean;
  roles: string[];
  assignedProjects: any[];
  assignedTasks: any[];
  _id: string;
  __v: number;
  token: string;
}

export interface ErrorMessage {
  message?: string;
}
