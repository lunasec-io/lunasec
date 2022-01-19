import { Instance } from "mobx-state-tree"
import { SettingsModelBase } from "./SettingsModel.base"

/* The TypeScript type of an instance of SettingsModel */
export interface SettingsModelType extends Instance<typeof SettingsModel.Type> {}

/* A graphql query fragment builders for SettingsModel */
export { selectFromSettings, settingsModelPrimitives, SettingsModelSelector } from "./SettingsModel.base"

/**
 * SettingsModel
 *
 * columns and relationships of "settings"
 */
export const SettingsModel = SettingsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
