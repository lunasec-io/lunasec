import { Instance } from "mobx-state-tree"
import { SettingsMaxFieldsModelBase } from "./SettingsMaxFieldsModel.base"

/* The TypeScript type of an instance of SettingsMaxFieldsModel */
export interface SettingsMaxFieldsModelType extends Instance<typeof SettingsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for SettingsMaxFieldsModel */
export { selectFromSettingsMaxFields, settingsMaxFieldsModelPrimitives, SettingsMaxFieldsModelSelector } from "./SettingsMaxFieldsModel.base"

/**
 * SettingsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SettingsMaxFieldsModel = SettingsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
