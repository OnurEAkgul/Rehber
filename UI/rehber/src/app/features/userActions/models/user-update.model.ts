export interface UserUpdate{
    userName: string;
  userEmail: string;
  newPassword?: string; // Optional property
  currentPassword: string;
}