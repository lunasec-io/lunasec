import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { IUserDTO } from '../../shared/IUserDTO';
import { loadUsersAPI } from '../utils/api-facade';
import { User } from './User';
import { getUserFullName } from '../../shared/utils';

interface IState {
  users: IUserDTO[];
  isLoading: boolean;
}

export class UsersList extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
    };
  }

  public render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Users List' />
            <CardContent>
              <List>
                {this.state.users.map(user => (
                  <ListItem key={user.userId}>
                    <NavLink to={`/fetch-example/${user.userId}`}>{getUserFullName(user)}</NavLink>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Route
            exact
            path='/fetch-example/:userId'
            render={props => <User user={this.getUserById(props.match.params.userId)} />}
          />
        </Grid>
      </>
    );
  }

  public async componentDidMount() {
    const users = await loadUsersAPI();
    this.setState({ users, isLoading: false });
  }

  private getUserById(userId) {
    return this.state.users.find(u => u.userId === userId);
  }
}
