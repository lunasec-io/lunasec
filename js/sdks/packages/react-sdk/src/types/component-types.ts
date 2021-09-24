import { LunaSecError } from '../../../isomorphic-common';

type errorHandlerCallback = (errorObject: LunaSecError) => void;
interface BaseComponentProps {
  errorHandler: errorHandlerCallback;
  name?: string;
  token?: string;
}

interface SecureInputPropsWithoutValidator extends BaseComponentProps {
  placeholder?: string;
}

interface SecureInputPropsWithValidator extends BaseComponentProps {
  validator: 'Email' | 'SSN' | 'EIN' | 'SSN_EIN';
  onValidate: (isValid: boolean) => void;
  placeholder?: string;
}

export type SecureInputProps = SecureInputPropsWithoutValidator | SecureInputPropsWithValidator;
export type SecureTextAreaProps = BaseComponentProps;
export type SecureParagraphProps = BaseComponentProps;
export type SecureDownloadProps = BaseComponentProps;
// Doesnt extend base props
interface SecureUploadProps {
  token?: never;
  name?: string;
  // special file picker types:
  filetokens?: string[];
  onTokenChange?: (token: Array<string>) => void;
  errorHandler: errorHandlerCallback;
}

export interface LunaSecComponentPropertiesLookup {
  Paragraph: SecureParagraphProps;
  Downloader: SecureDownloadProps;
  Uploader: SecureUploadProps;
  TextArea: SecureTextAreaProps;
  Input: SecureInputProps;
}
