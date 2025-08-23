export interface ICreateUserDto {
  email: string;
  name?: string;
}

export interface IUpdateUserDto {
  email?: string;
  name?: string;
}
