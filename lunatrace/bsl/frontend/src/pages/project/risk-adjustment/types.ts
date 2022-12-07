import { ProjectInfo } from '../types';

export type FolderSetting = NonNullable<ProjectInfo['project_folder_settings']>[number];

export type FolderSettingPartial = Pick<
  FolderSetting,
  'root' | 'project_id' | 'path_glob' | 'folder_environmental_adjustments'
>;
