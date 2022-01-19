import { Instance } from "mobx-state-tree"
import { SettingsAggregateModelBase } from "./SettingsAggregateModel.base"

/* The TypeScript type of an instance of SettingsAggregateModel */
export interface SettingsAggregateModelType extends Instance<typeof SettingsAggregateModel.Type> {}

/* A graphql query fragment builders for SettingsAggregateModel */
export { selectFromSettingsAggregate, settingsAggregateModelPrimitives, SettingsAggregateModelSelector } from "./SettingsAggregateModel.base"

/**
 * SettingsAggregateModel
 *
 * aggregated selection of "settings"
 */
export const SettingsAggregateModel = SettingsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
