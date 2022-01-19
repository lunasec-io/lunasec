/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SettingsBase
 * auto generated base class for the model SettingsModel.
 *
 * columns and relationships of "settings"
 */
export const SettingsModelBase = ModelBase
  .named('Settings')
  .props({
    __typename: types.optional(types.literal("settings"), "settings"),
    created_at: types.union(types.undefined, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    is_org_settings: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SettingsModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get is_org_settings() { return this.__attr(`is_org_settings`) }
}
export function selectFromSettings() {
  return new SettingsModelSelector()
}

export const settingsModelPrimitives = selectFromSettings().created_at.is_org_settings
