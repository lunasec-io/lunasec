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
import { AlertCircle, Bell, BellOff, Home, UserPlus } from 'react-feather';

import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownItem from './NavbarDropdownItem';
// TODO: this is not currently being used, just left for posterity if we want notifications in the future

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

export const NavbarNotifications: React.FC = () => {
  return (
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
  );
};
