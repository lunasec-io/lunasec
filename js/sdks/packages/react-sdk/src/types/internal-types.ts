/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
import { ReadElementStyle } from '@lunasec/browser-common';
import React, { CSSProperties, RefObject } from 'react';

import Downloader from '../components/elements/downloader';
import Input from '../components/elements/input';
import Paragraph from '../components/elements/paragraph';
import TextArea from '../components/elements/textarea';
import Uploader from '../components/elements/uploader';
import { LunaSecConfigContextType } from '../providers/LunaSecConfigContext';
import { SecureFormContextType } from '../providers/SecureFormContext';

import { AnySecureProps } from './component-types';

/**
 * @ignore
 */
export interface ClassLookup {
  Paragraph: typeof Paragraph;
  Downloader: typeof Downloader;
  Uploader: typeof Uploader; // fragile, fix this later by manually passing the class as a type argument into WrapComponent
  TextArea: typeof TextArea;
  Input: typeof Input;
}
/**
 * @ignore
 */
export interface TagLookup {
  Paragraph: 'p';
  Downloader: 'a';
  Uploader: 'input';
  TextArea: 'textarea';
  Input: 'input';
}

export const componentNames: Array<keyof ClassLookup> = ['Paragraph', 'Downloader', 'Uploader', 'TextArea', 'Input'];
export type ComponentNames = keyof ClassLookup;

export type WrapperProps<C extends keyof ClassLookup> = AnySecureProps &
  Partial<React.ComponentPropsWithoutRef<TagLookup[C]>>;

interface Providers {
  formContext: SecureFormContextType;
  lunaSecConfigContext: LunaSecConfigContextType;
}
export type WrapperPropsWithProviders<C extends keyof ClassLookup> = WrapperProps<C> & Providers;

// These props are what is passed between the wrapper and the wrapped component found in ./components/elements
// As above, it is combined with the native react props for the given element
export interface LunaSecWrappedComponentProps<C extends keyof ClassLookup> {
  renderData: RenderData<C>;
  // inputRef?: any; // Hack: This was leaking in somehow so I put it here as an optional type so we can filter it.
}

export type WrappedComponentProps<C extends keyof ClassLookup> = LunaSecWrappedComponentProps<C> &
  React.ComponentPropsWithoutRef<TagLookup[C]>;

// Just a property we pass into the wrapped component's props to keep things more organized rather than putting everything in flat
export interface RenderData<C extends keyof ClassLookup> {
  frameId: string;
  frameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  containerClass: string;
  frameClass: string;
  hiddenElementClass: string;
  frameRef: RefObject<HTMLIFrameElement>;
  dummyRef: RefObject<HTMLElementTagNameMap[TagLookup[C]]>;
  dummyInputStyleRef: RefObject<HTMLInputElement>;
  mountedCallback: () => void;
  parentContainerStyle: CSSProperties;
  dummyElementStyle: CSSProperties;
}
