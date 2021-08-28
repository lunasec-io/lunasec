export interface UserModel {
  id: string;
  username: string;
  ssnToken?: string;
}

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
