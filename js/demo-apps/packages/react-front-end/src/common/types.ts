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

// easy-peasy is a simple store based on Redux, with a bad name
import { Action, Computed, Thunk } from 'easy-peasy';

// todo: maybe switch from using easy-peasy, this is clunky
export interface StoreModel {
  // Properties
  user: UserModel | null;
  loggedIn: Computed<StoreModel, boolean>;
  // Actions
  setUser: Action<StoreModel, UserModel>;
  setSsn: Action<StoreModel, string>;
  // Thunks
  saveSsn: Thunk<StoreModel, string, undefined, StoreModel, Promise<ApiResponse>>;
  loadUser: Thunk<StoreModel>;

  loadDocuments: Thunk<StoreModel, undefined, undefined, StoreModel, Promise<UserDocumentsResponse>>;
  uploadDocumentTokens: Thunk<StoreModel, string[], undefined, StoreModel, Promise<ApiResponse>>;
  login: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
  signup: Thunk<StoreModel, { username: string; password: string }, undefined, StoreModel, Promise<UserResponse>>;
}
