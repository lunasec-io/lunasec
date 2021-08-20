import axios from 'axios';
import {UserModel, UserModelProperties} from "../../../../shared/types";

export interface ApiResponse {
  success: boolean
  error: string
}

export interface CurrentUserResponse extends ApiResponse {
  user: UserModel
}

export interface UserDocumentsResponse extends ApiResponse {
  documents: string[]
}

export function loadCurrentUserAPI(): Promise<CurrentUserResponse> {
  return axios.get(`/api/user/me`).then(res => res.data as CurrentUserResponse);
}

export function loadUserDocumentsAPI(): Promise<UserDocumentsResponse> {
  return axios.get(`/api/documents`).then(res => res.data as UserDocumentsResponse);
}

export function performSaveUserPropertiesAPI(properties: UserModelProperties) {
  return axios.post(`/api/user/me`, {properties}).then(res => res.data as ApiResponse);
}

export function performSaveDocumentsAPI(documents: string[]) {
  return axios.post(`/api/documents`, {documents}).then(res => res.data as ApiResponse);
}

export function performLoginAPI(username, password) {
  return axios.post(`/api/auth/login`, {username, password}).then(res => res.data as ApiResponse);
}

export function performSignupAPI(username, password) {
  return axios.post(`/api/auth/signup`, {username, password}).then(res => res.data as ApiResponse);
}
