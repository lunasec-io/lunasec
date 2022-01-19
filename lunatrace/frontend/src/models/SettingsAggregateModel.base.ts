/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SettingsAggregateFieldsModel, SettingsAggregateFieldsModelType } from "./SettingsAggregateFieldsModel"
import { SettingsAggregateFieldsModelSelector } from "./SettingsAggregateFieldsModel.base"
import { SettingsModel, SettingsModelType } from "./SettingsModel"
import { SettingsModelSelector } from "./SettingsModel.base"
import { RootStoreType } from "./index"


/**
 * SettingsAggregateBase
 * auto generated base class for the model SettingsAggregateModel.
 *
 * aggregated selection of "settings"
 */
export const SettingsAggregateModelBase = ModelBase
  .named('SettingsAggregate')
  .props({
    __typename: types.optional(types.literal("settings_aggregate"), "settings_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => SettingsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late((): any => SettingsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SettingsAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | SettingsAggregateFieldsModelSelector | ((selector: SettingsAggregateFieldsModelSelector) => SettingsAggregateFieldsModelSelector)) { return this.__child(`aggregate`, SettingsAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`nodes`, SettingsModelSelector, builder) }
}
export function selectFromSettingsAggregate() {
  return new SettingsAggregateModelSelector()
}

export const settingsAggregateModelPrimitives = selectFromSettingsAggregate()
