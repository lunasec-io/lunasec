import { Instance } from "mobx-state-tree"
import { SettingsAggregateFieldsModelBase } from "./SettingsAggregateFieldsModel.base"

/* The TypeScript type of an instance of SettingsAggregateFieldsModel */
export interface SettingsAggregateFieldsModelType extends Instance<typeof SettingsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for SettingsAggregateFieldsModel */
export { selectFromSettingsAggregateFields, settingsAggregateFieldsModelPrimitives, SettingsAggregateFieldsModelSelector } from "./SettingsAggregateFieldsModel.base"

/**
 * SettingsAggregateFieldsModel
 *
 * aggregate fields of "settings"
 */
export const SettingsAggregateFieldsModel = SettingsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
