/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SettingsMaxFieldsBase
 * auto generated base class for the model SettingsMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const SettingsMaxFieldsModelBase = ModelBase
  .named('SettingsMaxFields')
  .props({
    __typename: types.optional(types.literal("settings_max_fields"), "settings_max_fields"),
    created_at: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SettingsMaxFieldsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
}
export function selectFromSettingsMaxFields() {
  return new SettingsMaxFieldsModelSelector()
}

export const settingsMaxFieldsModelPrimitives = selectFromSettingsMaxFields().created_at
