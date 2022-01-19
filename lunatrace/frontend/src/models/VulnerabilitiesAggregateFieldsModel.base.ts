/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { VulnerabilitiesAvgFieldsModel, VulnerabilitiesAvgFieldsModelType } from "./VulnerabilitiesAvgFieldsModel"
import { VulnerabilitiesAvgFieldsModelSelector } from "./VulnerabilitiesAvgFieldsModel.base"
import { VulnerabilitiesMaxFieldsModel, VulnerabilitiesMaxFieldsModelType } from "./VulnerabilitiesMaxFieldsModel"
import { VulnerabilitiesMaxFieldsModelSelector } from "./VulnerabilitiesMaxFieldsModel.base"
import { VulnerabilitiesMinFieldsModel, VulnerabilitiesMinFieldsModelType } from "./VulnerabilitiesMinFieldsModel"
import { VulnerabilitiesMinFieldsModelSelector } from "./VulnerabilitiesMinFieldsModel.base"
import { VulnerabilitiesStddevFieldsModel, VulnerabilitiesStddevFieldsModelType } from "./VulnerabilitiesStddevFieldsModel"
import { VulnerabilitiesStddevFieldsModelSelector } from "./VulnerabilitiesStddevFieldsModel.base"
import { VulnerabilitiesStddevPopFieldsModel, VulnerabilitiesStddevPopFieldsModelType } from "./VulnerabilitiesStddevPopFieldsModel"
import { VulnerabilitiesStddevPopFieldsModelSelector } from "./VulnerabilitiesStddevPopFieldsModel.base"
import { VulnerabilitiesStddevSampFieldsModel, VulnerabilitiesStddevSampFieldsModelType } from "./VulnerabilitiesStddevSampFieldsModel"
import { VulnerabilitiesStddevSampFieldsModelSelector } from "./VulnerabilitiesStddevSampFieldsModel.base"
import { VulnerabilitiesSumFieldsModel, VulnerabilitiesSumFieldsModelType } from "./VulnerabilitiesSumFieldsModel"
import { VulnerabilitiesSumFieldsModelSelector } from "./VulnerabilitiesSumFieldsModel.base"
import { VulnerabilitiesVarPopFieldsModel, VulnerabilitiesVarPopFieldsModelType } from "./VulnerabilitiesVarPopFieldsModel"
import { VulnerabilitiesVarPopFieldsModelSelector } from "./VulnerabilitiesVarPopFieldsModel.base"
import { VulnerabilitiesVarSampFieldsModel, VulnerabilitiesVarSampFieldsModelType } from "./VulnerabilitiesVarSampFieldsModel"
import { VulnerabilitiesVarSampFieldsModelSelector } from "./VulnerabilitiesVarSampFieldsModel.base"
import { VulnerabilitiesVarianceFieldsModel, VulnerabilitiesVarianceFieldsModelType } from "./VulnerabilitiesVarianceFieldsModel"
import { VulnerabilitiesVarianceFieldsModelSelector } from "./VulnerabilitiesVarianceFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * VulnerabilitiesAggregateFieldsBase
 * auto generated base class for the model VulnerabilitiesAggregateFieldsModel.
 *
 * aggregate fields of "vulnerabilities"
 */
export const VulnerabilitiesAggregateFieldsModelBase = ModelBase
  .named('VulnerabilitiesAggregateFields')
  .props({
    __typename: types.optional(types.literal("vulnerabilities_aggregate_fields"), "vulnerabilities_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesAvgFieldsModel)),
    count: types.union(types.undefined, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late((): any => VulnerabilitiesVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VulnerabilitiesAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder?: string | VulnerabilitiesAvgFieldsModelSelector | ((selector: VulnerabilitiesAvgFieldsModelSelector) => VulnerabilitiesAvgFieldsModelSelector)) { return this.__child(`avg`, VulnerabilitiesAvgFieldsModelSelector, builder) }
  max(builder?: string | VulnerabilitiesMaxFieldsModelSelector | ((selector: VulnerabilitiesMaxFieldsModelSelector) => VulnerabilitiesMaxFieldsModelSelector)) { return this.__child(`max`, VulnerabilitiesMaxFieldsModelSelector, builder) }
  min(builder?: string | VulnerabilitiesMinFieldsModelSelector | ((selector: VulnerabilitiesMinFieldsModelSelector) => VulnerabilitiesMinFieldsModelSelector)) { return this.__child(`min`, VulnerabilitiesMinFieldsModelSelector, builder) }
  stddev(builder?: string | VulnerabilitiesStddevFieldsModelSelector | ((selector: VulnerabilitiesStddevFieldsModelSelector) => VulnerabilitiesStddevFieldsModelSelector)) { return this.__child(`stddev`, VulnerabilitiesStddevFieldsModelSelector, builder) }
  stddev_pop(builder?: string | VulnerabilitiesStddevPopFieldsModelSelector | ((selector: VulnerabilitiesStddevPopFieldsModelSelector) => VulnerabilitiesStddevPopFieldsModelSelector)) { return this.__child(`stddev_pop`, VulnerabilitiesStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder?: string | VulnerabilitiesStddevSampFieldsModelSelector | ((selector: VulnerabilitiesStddevSampFieldsModelSelector) => VulnerabilitiesStddevSampFieldsModelSelector)) { return this.__child(`stddev_samp`, VulnerabilitiesStddevSampFieldsModelSelector, builder) }
  sum(builder?: string | VulnerabilitiesSumFieldsModelSelector | ((selector: VulnerabilitiesSumFieldsModelSelector) => VulnerabilitiesSumFieldsModelSelector)) { return this.__child(`sum`, VulnerabilitiesSumFieldsModelSelector, builder) }
  var_pop(builder?: string | VulnerabilitiesVarPopFieldsModelSelector | ((selector: VulnerabilitiesVarPopFieldsModelSelector) => VulnerabilitiesVarPopFieldsModelSelector)) { return this.__child(`var_pop`, VulnerabilitiesVarPopFieldsModelSelector, builder) }
  var_samp(builder?: string | VulnerabilitiesVarSampFieldsModelSelector | ((selector: VulnerabilitiesVarSampFieldsModelSelector) => VulnerabilitiesVarSampFieldsModelSelector)) { return this.__child(`var_samp`, VulnerabilitiesVarSampFieldsModelSelector, builder) }
  variance(builder?: string | VulnerabilitiesVarianceFieldsModelSelector | ((selector: VulnerabilitiesVarianceFieldsModelSelector) => VulnerabilitiesVarianceFieldsModelSelector)) { return this.__child(`variance`, VulnerabilitiesVarianceFieldsModelSelector, builder) }
}
export function selectFromVulnerabilitiesAggregateFields() {
  return new VulnerabilitiesAggregateFieldsModelSelector()
}

export const vulnerabilitiesAggregateFieldsModelPrimitives = selectFromVulnerabilitiesAggregateFields().count
