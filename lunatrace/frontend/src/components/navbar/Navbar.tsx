/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import React, { useContext } from 'react';
import { Button, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { AlertCircle, Bell, BellOff, Home, Search, UserPlus } from 'react-feather';

// import { useTranslation } from 'react-i18next';

// import avatar3 from '../../assets/img/avatars/avatar-3.jpg';
// import avatar4 from '../../assets/img/avatars/avatar-4.jpg';
// import avatar5 from '../../assets/img/avatars/avatar-5.jpg';
// import avatar1 from '../../assets/img/avatars/avatar.jpg';
import { ThemeContext } from '../../contexts/ThemeContext';
import usePalette from '../../hooks/usePalette';
import useSidebar from '../../hooks/useSidebar';
import useTheme from '../../hooks/useTheme';

import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownItem from './NavbarDropdownItem';
// import NavbarLanguages from './NavbarLanguages';
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
    <Navbar variant="light" expand className="navbar-bg">
      <span
        className="sidebar-toggle d-flex"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Form inline="true" className="d-none d-sm-inline-block">
        <InputGroup className="input-group-navbar">
          <Form.Control placeholder="Search Projects" aria-label="Search Projects" />
          <Button variant="">
            <Search className="feather" />
          </Button>
        </InputGroup>
      </Form>

      <Navbar.Collapse>
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
