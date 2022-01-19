import { Instance } from "mobx-state-tree"
import { SettingsMutationResponseModelBase } from "./SettingsMutationResponseModel.base"

/* The TypeScript type of an instance of SettingsMutationResponseModel */
export interface SettingsMutationResponseModelType extends Instance<typeof SettingsMutationResponseModel.Type> {}

/* A graphql query fragment builders for SettingsMutationResponseModel */
export { selectFromSettingsMutationResponse, settingsMutationResponseModelPrimitives, SettingsMutationResponseModelSelector } from "./SettingsMutationResponseModel.base"

/**
 * SettingsMutationResponseModel
 *
 * response of any mutation on the table "settings"
 */
export const SettingsMutationResponseModel = SettingsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
