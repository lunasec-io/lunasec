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
import React, { ReactNode } from 'react';

const noop = () => {
  return;
};

export function DocsButton(props: {
  title: string;
  href?: string;
  unresponsive: boolean;
  testid: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <a href={props.href || '#'} onClick={props.onClick || noop}>
      {props.title}
    </a>
  );
}

export function MarginCard(props: { wide?: boolean; children: React.ReactNode }) {
  return <>{props.children}</>;
}

export function Head(props: { children: ReactNode }) {
  return <>{props.children}</>;
}

export function CenterLink(props: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  return (
    <a href={props.href || '#'} onClick={props.onClick || noop}>
      {props.children}
    </a>
  );
}

export function Link(props: { children: React.ReactNode; href?: string }) {
  return <a href={props.href || '#'}>{props.children}</a>;
}

export function ActionCard(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
