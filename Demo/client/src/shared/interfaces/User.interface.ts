export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserFormInterface = Partial<UserInterface>;

export interface SigninFormInterface {
  password: string;
  email: string;
}
