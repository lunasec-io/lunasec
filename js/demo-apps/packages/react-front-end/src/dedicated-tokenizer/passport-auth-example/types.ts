import { UserModel } from '@lunasec/demo-back-end';

export interface ApiResponse {
  success: boolean;
  error: string;
}

export interface CurrentUserResponse extends ApiResponse {
  user: UserModel;
}

export interface UserDocumentsResponse extends ApiResponse {
  documents: string[];
}
