/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LogOut, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { logout, selectSession } from '../../store/slices/authentication';
import { displayName } from '../../utils/display-name';
// import avatar1 from '../../assets/img/avatars/avatar.jpg';

const NavbarUser: React.FunctionComponent = () => {
  const user = useAppSelector(selectSession);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const doLogout = () => void dispatch(logout(navigate));

  if (!user) {
    return null;
  }

  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          {user.identity.traits?.picture ? (
            <img
              src={user.identity.traits.picture}
              className="avatar img-fluid rounded-circle me-2 "
              alt="Users display image"
            />
          ) : (
            <User size={18} className="me-1" />
          )}

          <span className="text-dark d-none d-md-inline">{displayName(user.identity.traits)}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu>
        {/*<Dropdown.Item>*/}
        {/*  <User size={18} className="align-middle me-2" />*/}
        {/*  Profile*/}
        {/*</Dropdown.Item>*/}
        {/*<Dropdown.Item>*/}
        {/*  <PieChart size={18} className="align-middle me-2" />*/}
        {/*  Analytics*/}
        {/*</Dropdown.Item>*/}
        {/*<Dropdown.Divider />*/}
        {/*<Dropdown.Item>Settings & Privacy</Dropdown.Item>*/}
        {/*<Dropdown.Item>Help</Dropdown.Item>*/}
        <Dropdown.Item onClick={() => doLogout()}>
          <LogOut size={18} className="align-middle me-2" />
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
