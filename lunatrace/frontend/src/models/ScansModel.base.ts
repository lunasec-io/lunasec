/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { ProjectsModelSelector } from "./ProjectsModel.base"
import { SbomsModel, SbomsModelType } from "./SbomsModel"
import { SbomsModelSelector } from "./SbomsModel.base"
import { RootStoreType } from "./index"


/**
 * ScansBase
 * auto generated base class for the model ScansModel.
 *
 * columns and relationships of "scans"
 */
export const ScansModelBase = ModelBase
  .named('Scans')
  .props({
    __typename: types.optional(types.literal("scans"), "scans"),
    created_at: types.union(types.undefined, types.frozen()),
    db_date: types.union(types.undefined, types.frozen()),
    distro_name: types.union(types.undefined, types.null, types.string),
    distro_version: types.union(types.undefined, types.null, types.string),
    grype_version: types.union(types.undefined, types.string),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    project: types.union(types.undefined, types.null, types.late((): any => ProjectsModel)),
    project_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    sbom: types.union(types.undefined, types.null, types.late((): any => SbomsModel)),
    sbom_id: types.union(types.undefined, types.null, types.frozen()),
    source_type: types.union(types.undefined, types.string),
    target: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ScansModelSelector extends QueryBuilder {
  get created_at() { return this.__attr(`created_at`) }
  get db_date() { return this.__attr(`db_date`) }
  get distro_name() { return this.__attr(`distro_name`) }
  get distro_version() { return this.__attr(`distro_version`) }
  get grype_version() { return this.__attr(`grype_version`) }
  get id() { return this.__attr(`id`) }
  get project_id() { return this.__attr(`project_id`) }
  get sbom_id() { return this.__attr(`sbom_id`) }
  get source_type() { return this.__attr(`source_type`) }
  get target() { return this.__attr(`target`) }
  project(builder?: string | ProjectsModelSelector | ((selector: ProjectsModelSelector) => ProjectsModelSelector)) { return this.__child(`project`, ProjectsModelSelector, builder) }
  sbom(builder?: string | SbomsModelSelector | ((selector: SbomsModelSelector) => SbomsModelSelector)) { return this.__child(`sbom`, SbomsModelSelector, builder) }
}
export function selectFromScans() {
  return new ScansModelSelector()
}

export const scansModelPrimitives = selectFromScans().created_at.db_date.distro_name.distro_version.grype_version.project_id.sbom_id.source_type.target
