export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRegisterDto {
  email: string;
  password: string;
  name?: string;
}

export interface IRefreshTokenDto {
  refreshToken: string;
}

export interface IForgotPasswordDto {
  email: string;
}

export interface IResetPasswordDto {
  token: string;
  password: string;
}

export interface IAuthResponse {
  user: IUserWithoutPassword;
  tokens: ITokenPair;
}

export interface IUserWithoutPassword {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
