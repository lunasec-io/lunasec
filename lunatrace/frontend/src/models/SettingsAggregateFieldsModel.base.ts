/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SettingsMaxFieldsModel, SettingsMaxFieldsModelType } from "./SettingsMaxFieldsModel"
import { SettingsMaxFieldsModelSelector } from "./SettingsMaxFieldsModel.base"
import { SettingsMinFieldsModel, SettingsMinFieldsModelType } from "./SettingsMinFieldsModel"
import { SettingsMinFieldsModelSelector } from "./SettingsMinFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * SettingsAggregateFieldsBase
 * auto generated base class for the model SettingsAggregateFieldsModel.
 *
 * aggregate fields of "settings"
 */
export const SettingsAggregateFieldsModelBase = ModelBase
  .named('SettingsAggregateFields')
  .props({
    __typename: types.optional(types.literal("settings_aggregate_fields"), "settings_aggregate_fields"),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => SettingsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => SettingsMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SettingsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder?: string | SettingsMaxFieldsModelSelector | ((selector: SettingsMaxFieldsModelSelector) => SettingsMaxFieldsModelSelector)) { return this.__child(`max`, SettingsMaxFieldsModelSelector, builder) }
  min(builder?: string | SettingsMinFieldsModelSelector | ((selector: SettingsMinFieldsModelSelector) => SettingsMinFieldsModelSelector)) { return this.__child(`min`, SettingsMinFieldsModelSelector, builder) }
}
export function selectFromSettingsAggregateFields() {
  return new SettingsAggregateFieldsModelSelector()
}

export const settingsAggregateFieldsModelPrimitives = selectFromSettingsAggregateFields().count
