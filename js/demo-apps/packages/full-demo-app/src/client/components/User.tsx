import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IUserDTO } from '../../shared/IUserDTO';
import { getUserFullName } from '../../shared/utils';

interface IProps {
  user: IUserDTO;
}

export const User: React.FunctionComponent<IProps> = ({ user }) => (
  <Card>
    <CardHeader title={`User: ${getUserFullName(user)}`} />
    <CardContent>
      <Typography>Id: {user.userId}</Typography>
      <Typography>Image Url: {user.imageUrl}</Typography>
    </CardContent>
  </Card>
);
