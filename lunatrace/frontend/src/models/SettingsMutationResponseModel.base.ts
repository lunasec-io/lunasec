/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SettingsModel, SettingsModelType } from "./SettingsModel"
import { SettingsModelSelector } from "./SettingsModel.base"
import { RootStoreType } from "./index"


/**
 * SettingsMutationResponseBase
 * auto generated base class for the model SettingsMutationResponseModel.
 *
 * response of any mutation on the table "settings"
 */
export const SettingsMutationResponseModelBase = ModelBase
  .named('SettingsMutationResponse')
  .props({
    __typename: types.optional(types.literal("settings_mutation_response"), "settings_mutation_response"),
    /** number of rows affected by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data from the rows affected by the mutation */
    returning: types.union(types.undefined, types.array(types.late((): any => SettingsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SettingsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | SettingsModelSelector | ((selector: SettingsModelSelector) => SettingsModelSelector)) { return this.__child(`returning`, SettingsModelSelector, builder) }
}
export function selectFromSettingsMutationResponse() {
  return new SettingsMutationResponseModelSelector()
}

export const settingsMutationResponseModelPrimitives = selectFromSettingsMutationResponse().affected_rows
