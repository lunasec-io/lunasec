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
import { Breadcrumb, Button, Col, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { AlertCircle, Bell, BellOff, Home, Search, UserPlus } from 'react-feather';
import useBreadCrumbs from 'use-react-router-breadcrumbs';

import useSidebar from '../../hooks/useSidebar';
import useTheme from '../../hooks/useTheme';

import { NavbarBreadcrumbs } from './NavbarBreadcrumbs';
import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownItem from './NavbarDropdownItem';
import { ProjectSearch } from './NavbarProjectSearch';
import NavbarUser from './NavbarUser';

const notifications = [
  {
    type: 'important',
    title: 'Update completed',
    description: 'Restart server 12 to complete the update.',
    time: '2h ago',
  },
  {
    type: 'default',
    title: 'Lorem ipsum',
    description: 'Aliquam ex eros, imperdiet vulputate hendrerit et.',
    time: '6h ago',
  },
  {
    type: 'login',
    title: 'Login from 192.186.1.1',
    description: '',
    time: '6h ago',
  },
  {
    type: 'request',
    title: 'New connection',
    description: 'Anna accepted your request.',
    time: '12h ago',
  },
];

const NavbarComponent = () => {
  // const { t } = useTranslation();
  const { isOpen, setIsOpen } = useSidebar();

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

        <ProjectSearch />

        <Navbar.Collapse style={{ display: 'flex', justifyContent: 'center' }}>
          <NavbarBreadcrumbs />
        </Navbar.Collapse>

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
          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === 'important') {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === 'login') {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === 'request') {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown>
          {/*<NavbarLanguages />*/}
          <NavbarUser />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
