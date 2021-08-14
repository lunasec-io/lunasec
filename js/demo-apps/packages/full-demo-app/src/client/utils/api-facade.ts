import axios from 'axios';
import { IUserDTO } from '../../shared/IUserDTO';

export function loadUsersAPI() {
  return axios.get(`/api/users`).then(res => res.data as IUserDTO[]);
}
