export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}