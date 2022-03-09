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
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AlertCircle, Bell, BellOff, Home, UserPlus } from 'react-feather';

import useAppSelector from '../../hooks/useAppSelector';
import useSidebar from '../../hooks/useSidebar';
import useTheme from '../../hooks/useTheme';
import { selectIsAuthenticated } from '../../store/slices/authentication';

import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownItem from './NavbarDropdownItem';
import { ProjectSearch } from './NavbarProjectSearch';
import NavbarUser from './NavbarUser';

const NavbarComponent = () => {
  // const { t } = useTranslation();
  const { isOpen, setIsOpen } = useSidebar();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { theme, setTheme } = useTheme();

  return (
    <Navbar variant="light" expand="lg" className="navbar-bg">
      <Container fluid>
        <span
          className="sidebar-toggle d-flex"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <i className="hamburger align-self-center" />
        </span>

        {isAuthenticated ? <ProjectSearch /> : null}

        <Nav className="navbar-align">
          {/*<NavbarDropdown*/}
          {/*  header="New Messages"*/}
          {/*  footer="Show all messages"*/}
          {/*  icon={MessageCircle}*/}
          {/*  count={messages.length}*/}
          {/*  showBadge*/}
          {/*>*/}
          {/*  {messages.map((item, key) => {*/}
          {/*    return (*/}
          {/*      <NavbarDropdownItem*/}
          {/*        key={key}*/}
          {/*        icon={<img className="avatar img-fluid rounded-circle" src={item.avatar} alt={item.name} />}*/}
          {/*        title={item.name}*/}
          {/*        description={item.description}*/}
          {/*        time={item.time}*/}
          {/*        spacing*/}
          {/*      />*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</NavbarDropdown>*/}
          <BootstrapSwitchButton
            checked={theme === 'dark'}
            onChange={(checked: boolean) => {
              setTheme(checked ? 'dark' : 'light');
            }}
            onstyle="outline-secondary"
            onlabel="Dark"
            offstyle="outline-secondary"
            offlabel="Light"
            style="border"
            size="sm"
          />

          {/*<NavbarLanguages />*/}
          <NavbarUser />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
