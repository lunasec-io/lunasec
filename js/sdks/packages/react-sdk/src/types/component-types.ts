import { LunaSecError } from '../../../isomorphic-common';

type errorHandlerCallback = (errorObject: LunaSecError) => void;
interface BaseComponentProps {
  errorHandler: errorHandlerCallback;
  name?: string;
  token?: string;
}

interface SecureInputPropsWithoutValidator extends BaseComponentProps {
  placeholder?: string;
  validator: never;
  onValidate: never;
}

interface SecureInputPropsWithValidator extends BaseComponentProps {
  validator: 'Email' | 'SSN' | 'EIN' | 'SSN_EIN';
  onValidate: (isValid: boolean) => void;
  placeholder?: string;
}

// Doesnt extend base props
interface SecureUploadProps {
  errorHandler: errorHandlerCallback;
  token: never;
  name?: string;
  // special file picker types:
  filetokens?: string[];
  onTokenChange?: (token: Array<string>) => void;
}

export type SecureInputProps = SecureInputPropsWithoutValidator | SecureInputPropsWithValidator;
export type SecureTextAreaProps = BaseComponentProps;
export type SecureParagraphProps = BaseComponentProps;
export type SecureDownloadProps = BaseComponentProps;

export type LunaSecComponentPropertiesLookup<T extends keyof Lookup> = Lookup[T];

export type ComponentLookupUnionType =
  | SecureParagraphProps
  | SecureDownloadProps
  | SecureUploadProps
  | SecureTextAreaProps
  | SecureInputProps;

export interface Lookup {
  Paragraph: SecureParagraphProps;
  Downloader: SecureDownloadProps;
  Uploader: SecureUploadProps;
  TextArea: SecureTextAreaProps;
  Input: SecureInputProps;
}
