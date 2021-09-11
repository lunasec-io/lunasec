import { UserModel } from '@lunasec/demo-back-end';

export interface SuccessApiResponse {
  success: true;
}

export interface FailApiResponse {
  success: false;
  error: string;
}

export type ApiResponse = SuccessApiResponse | FailApiResponse;

interface UserSuccess {
  success: true;
  user: UserModel;
}

export type UserResponse = UserSuccess | FailApiResponse;

interface UserDocumentsSuccess {
  success: true;
  documents: string[];
}

export type UserDocumentsResponse = UserDocumentsSuccess | FailApiResponse;

export type { UserModel };
