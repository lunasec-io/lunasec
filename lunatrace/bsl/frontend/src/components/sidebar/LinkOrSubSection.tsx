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

import { Link } from './Link';
import { SubSection } from './SubSection';
import { SidebarItem } from './types';

interface SidebarLinkOrSectionProps {
  item: SidebarItem;
  depth: number;
}

export const SidebarLinkOrSection: React.FunctionComponent<SidebarLinkOrSectionProps> = (props) => {
  const { item, ...otherprops } = props;
  if ('children' in item) {
    // its a section
    return <SubSection key={item.href} section={item} {...otherprops} />;
  }
  // its a link
  return <Link key={item.href} link={item} {...otherprops} />;
};
