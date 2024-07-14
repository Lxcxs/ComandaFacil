export interface CreateUserDTO {
  userName: string;
  userEmail: string;
  userPassword: string;
  userDocument: string;
}
export interface DeleteUserDTO {
  id: number;
}
export interface UpdateUserDTO {
  id: number,
  userEmail: string,
}