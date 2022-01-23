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
