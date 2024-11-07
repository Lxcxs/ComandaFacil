export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  document: string;
}
export interface DeleteUserDTO {
  id: number;
}
export interface UpdateUserDTO {
  id: number,
  email: string,
}