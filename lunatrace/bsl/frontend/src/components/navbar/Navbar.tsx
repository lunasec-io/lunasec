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
import React, {useEffect} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {BsMoon, BsSun} from "react-icons/bs";

import useAppSelector from '../../hooks/useAppSelector';
import useSidebar from '../../hooks/useSidebar';
import useTheme from '../../hooks/useTheme';
import { selectIsAuthenticated } from '../../store/slices/authentication';

import { ProjectSearch } from './NavbarProjectSearch';
import NavbarUser from './NavbarUser';

interface NavbarComponentProps {
  setupWizardOpen: boolean
}

const NavbarComponent: React.FunctionComponent<NavbarComponentProps> = ({ setupWizardOpen }) => {
  const { isOpen, setIsOpen } = useSidebar();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  }

  useEffect(() => {
    setIsOpen(!setupWizardOpen);
  }, [setupWizardOpen]);

  const drawerToggle = (
    <span
      className="sidebar-toggle d-flex"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <i className="hamburger align-self-center" />
    </span>
  );

  return (
    <Navbar variant="light" expand="lg" className="navbar-bg">
      <Container fluid>
        {!setupWizardOpen && drawerToggle}

        {isAuthenticated && !setupWizardOpen ? <ProjectSearch /> : null}

        <Nav className="navbar-align flex-row">
          <span className="d-inline-block login-navbar-button btn lighter p-2" onClick={toggleTheme}>
            { theme === 'dark' ? <BsMoon size="30px" /> : <BsSun size="30px" /> }
          </span>
          <NavbarUser />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
