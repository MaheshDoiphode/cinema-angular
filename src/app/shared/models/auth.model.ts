export interface JwtRequest {
    email: string;
    password: string;
  }
  
  export interface JwtResponse {
    jwtToken: string;
    username: string;
  }
  
  export interface PasswordUpdateRequest {
    email: string;
    oldPassword: string;
    newPassword: string;
  }