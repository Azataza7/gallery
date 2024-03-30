export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  googleID: string | null;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface Gallery {
  _id: string;
  user: User;
  title: string;
  image: string;
}

export interface GalleryData {
  user: string;
  title: string;
  image: File | null;
}