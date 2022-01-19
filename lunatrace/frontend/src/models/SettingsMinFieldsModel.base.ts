/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SettingsMinFieldsBase
 * auto generated base class for the model SettingsMinFieldsModel.
 *
 * aggregate min on columns
 */
export const SettingsMinFieldsModelBase = ModelBase
  .named('SettingsMinFields')
  .props({
    __typename: types.optional(types.literal("settings_min_fields"), "settings_min_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SettingsMinFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
}
export function selectFromSettingsMinFields() {
  return new SettingsMinFieldsModelSelector()
}

export const settingsMinFieldsModelPrimitives = selectFromSettingsMinFields().created_at
