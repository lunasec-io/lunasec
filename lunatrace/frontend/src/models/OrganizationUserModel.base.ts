/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { OrganizationsModelSelector } from "./OrganizationsModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { RootStoreType } from "./index"


/**
 * OrganizationUserBase
 * auto generated base class for the model OrganizationUserModel.
 *
 * join table   columns and relationships of "organization_user"
 */
export const OrganizationUserModelBase = ModelBase
  .named('OrganizationUser')
  .props({
    __typename: types.optional(types.literal("organization_user"), "organization_user"),
    created_at: types.union(types.undefined, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    organization: types.union(types.undefined, types.late((): any => OrganizationsModel)),
    organization_id: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    user: types.union(types.undefined, types.late((): any => UsersModel)),
    user_id: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class OrganizationUserModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get id() { return this.__attr(`id`) }
  get organization_id() { return this.__attr(`organization_id`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get user_id() { return this.__attr(`user_id`) }
  organization(builder?: string | OrganizationsModelSelector | ((selector: OrganizationsModelSelector) => OrganizationsModelSelector)) { return this.__child(`organization`, OrganizationsModelSelector, builder) }
  user(builder?: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector)) { return this.__child(`user`, UsersModelSelector, builder) }
}
export function selectFromOrganizationUser() {
  return new OrganizationUserModelSelector()
}

export const organizationUserModelPrimitives = selectFromOrganizationUser().created_at.organization_id.updated_at.user_id
