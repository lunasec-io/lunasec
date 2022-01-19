import { Instance } from "mobx-state-tree"
import { SettingsMinFieldsModelBase } from "./SettingsMinFieldsModel.base"

/* The TypeScript type of an instance of SettingsMinFieldsModel */
export interface SettingsMinFieldsModelType extends Instance<typeof SettingsMinFieldsModel.Type> {}

/* A graphql query fragment builders for SettingsMinFieldsModel */
export { selectFromSettingsMinFields, settingsMinFieldsModelPrimitives, SettingsMinFieldsModelSelector } from "./SettingsMinFieldsModel.base"

/**
 * SettingsMinFieldsModel
 *
 * aggregate min on columns
 */
export const SettingsMinFieldsModel = SettingsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
