/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { FindingsModel, FindingsModelType } from "./FindingsModel"
import { findingsModelPrimitives, FindingsModelSelector } from "./FindingsModel.base"
import { FindingsAggregateModel, FindingsAggregateModelType } from "./FindingsAggregateModel"
import { findingsAggregateModelPrimitives, FindingsAggregateModelSelector } from "./FindingsAggregateModel.base"
import { FindingsAggregateFieldsModel, FindingsAggregateFieldsModelType } from "./FindingsAggregateFieldsModel"
import { findingsAggregateFieldsModelPrimitives, FindingsAggregateFieldsModelSelector } from "./FindingsAggregateFieldsModel.base"
import { FindingsMaxFieldsModel, FindingsMaxFieldsModelType } from "./FindingsMaxFieldsModel"
import { findingsMaxFieldsModelPrimitives, FindingsMaxFieldsModelSelector } from "./FindingsMaxFieldsModel.base"
import { FindingsMinFieldsModel, FindingsMinFieldsModelType } from "./FindingsMinFieldsModel"
import { findingsMinFieldsModelPrimitives, FindingsMinFieldsModelSelector } from "./FindingsMinFieldsModel.base"
import { FindingsMutationResponseModel, FindingsMutationResponseModelType } from "./FindingsMutationResponseModel"
import { findingsMutationResponseModelPrimitives, FindingsMutationResponseModelSelector } from "./FindingsMutationResponseModel.base"
import { MutationRootModel, MutationRootModelType } from "./MutationRootModel"
import { mutationRootModelPrimitives, MutationRootModelSelector } from "./MutationRootModel.base"
import { OrganizationUserModel, OrganizationUserModelType } from "./OrganizationUserModel"
import { organizationUserModelPrimitives, OrganizationUserModelSelector } from "./OrganizationUserModel.base"
import { OrganizationUserAggregateModel, OrganizationUserAggregateModelType } from "./OrganizationUserAggregateModel"
import { organizationUserAggregateModelPrimitives, OrganizationUserAggregateModelSelector } from "./OrganizationUserAggregateModel.base"
import { OrganizationUserAggregateFieldsModel, OrganizationUserAggregateFieldsModelType } from "./OrganizationUserAggregateFieldsModel"
import { organizationUserAggregateFieldsModelPrimitives, OrganizationUserAggregateFieldsModelSelector } from "./OrganizationUserAggregateFieldsModel.base"
import { OrganizationUserMaxFieldsModel, OrganizationUserMaxFieldsModelType } from "./OrganizationUserMaxFieldsModel"
import { organizationUserMaxFieldsModelPrimitives, OrganizationUserMaxFieldsModelSelector } from "./OrganizationUserMaxFieldsModel.base"
import { OrganizationUserMinFieldsModel, OrganizationUserMinFieldsModelType } from "./OrganizationUserMinFieldsModel"
import { organizationUserMinFieldsModelPrimitives, OrganizationUserMinFieldsModelSelector } from "./OrganizationUserMinFieldsModel.base"
import { OrganizationUserMutationResponseModel, OrganizationUserMutationResponseModelType } from "./OrganizationUserMutationResponseModel"
import { organizationUserMutationResponseModelPrimitives, OrganizationUserMutationResponseModelSelector } from "./OrganizationUserMutationResponseModel.base"
import { OrganizationsModel, OrganizationsModelType } from "./OrganizationsModel"
import { organizationsModelPrimitives, OrganizationsModelSelector } from "./OrganizationsModel.base"
import { OrganizationsAggregateModel, OrganizationsAggregateModelType } from "./OrganizationsAggregateModel"
import { organizationsAggregateModelPrimitives, OrganizationsAggregateModelSelector } from "./OrganizationsAggregateModel.base"
import { OrganizationsAggregateFieldsModel, OrganizationsAggregateFieldsModelType } from "./OrganizationsAggregateFieldsModel"
import { organizationsAggregateFieldsModelPrimitives, OrganizationsAggregateFieldsModelSelector } from "./OrganizationsAggregateFieldsModel.base"
import { OrganizationsMaxFieldsModel, OrganizationsMaxFieldsModelType } from "./OrganizationsMaxFieldsModel"
import { organizationsMaxFieldsModelPrimitives, OrganizationsMaxFieldsModelSelector } from "./OrganizationsMaxFieldsModel.base"
import { OrganizationsMinFieldsModel, OrganizationsMinFieldsModelType } from "./OrganizationsMinFieldsModel"
import { organizationsMinFieldsModelPrimitives, OrganizationsMinFieldsModelSelector } from "./OrganizationsMinFieldsModel.base"
import { OrganizationsMutationResponseModel, OrganizationsMutationResponseModelType } from "./OrganizationsMutationResponseModel"
import { organizationsMutationResponseModelPrimitives, OrganizationsMutationResponseModelSelector } from "./OrganizationsMutationResponseModel.base"
import { PackageVersionsModel, PackageVersionsModelType } from "./PackageVersionsModel"
import { packageVersionsModelPrimitives, PackageVersionsModelSelector } from "./PackageVersionsModel.base"
import { PackageVersionsAggregateModel, PackageVersionsAggregateModelType } from "./PackageVersionsAggregateModel"
import { packageVersionsAggregateModelPrimitives, PackageVersionsAggregateModelSelector } from "./PackageVersionsAggregateModel.base"
import { PackageVersionsAggregateFieldsModel, PackageVersionsAggregateFieldsModelType } from "./PackageVersionsAggregateFieldsModel"
import { packageVersionsAggregateFieldsModelPrimitives, PackageVersionsAggregateFieldsModelSelector } from "./PackageVersionsAggregateFieldsModel.base"
import { PackageVersionsMaxFieldsModel, PackageVersionsMaxFieldsModelType } from "./PackageVersionsMaxFieldsModel"
import { packageVersionsMaxFieldsModelPrimitives, PackageVersionsMaxFieldsModelSelector } from "./PackageVersionsMaxFieldsModel.base"
import { PackageVersionsMinFieldsModel, PackageVersionsMinFieldsModelType } from "./PackageVersionsMinFieldsModel"
import { packageVersionsMinFieldsModelPrimitives, PackageVersionsMinFieldsModelSelector } from "./PackageVersionsMinFieldsModel.base"
import { PackageVersionsMutationResponseModel, PackageVersionsMutationResponseModelType } from "./PackageVersionsMutationResponseModel"
import { packageVersionsMutationResponseModelPrimitives, PackageVersionsMutationResponseModelSelector } from "./PackageVersionsMutationResponseModel.base"
import { ProjectsModel, ProjectsModelType } from "./ProjectsModel"
import { projectsModelPrimitives, ProjectsModelSelector } from "./ProjectsModel.base"
import { ProjectsAggregateModel, ProjectsAggregateModelType } from "./ProjectsAggregateModel"
import { projectsAggregateModelPrimitives, ProjectsAggregateModelSelector } from "./ProjectsAggregateModel.base"
import { ProjectsAggregateFieldsModel, ProjectsAggregateFieldsModelType } from "./ProjectsAggregateFieldsModel"
import { projectsAggregateFieldsModelPrimitives, ProjectsAggregateFieldsModelSelector } from "./ProjectsAggregateFieldsModel.base"
import { ProjectsMaxFieldsModel, ProjectsMaxFieldsModelType } from "./ProjectsMaxFieldsModel"
import { projectsMaxFieldsModelPrimitives, ProjectsMaxFieldsModelSelector } from "./ProjectsMaxFieldsModel.base"
import { ProjectsMinFieldsModel, ProjectsMinFieldsModelType } from "./ProjectsMinFieldsModel"
import { projectsMinFieldsModelPrimitives, ProjectsMinFieldsModelSelector } from "./ProjectsMinFieldsModel.base"
import { ProjectsMutationResponseModel, ProjectsMutationResponseModelType } from "./ProjectsMutationResponseModel"
import { projectsMutationResponseModelPrimitives, ProjectsMutationResponseModelSelector } from "./ProjectsMutationResponseModel.base"
import { QueryRootModel, QueryRootModelType } from "./QueryRootModel"
import { queryRootModelPrimitives, QueryRootModelSelector } from "./QueryRootModel.base"
import { RelatedVulnerabilitiesModel, RelatedVulnerabilitiesModelType } from "./RelatedVulnerabilitiesModel"
import { relatedVulnerabilitiesModelPrimitives, RelatedVulnerabilitiesModelSelector } from "./RelatedVulnerabilitiesModel.base"
import { RelatedVulnerabilitiesAggregateModel, RelatedVulnerabilitiesAggregateModelType } from "./RelatedVulnerabilitiesAggregateModel"
import { relatedVulnerabilitiesAggregateModelPrimitives, RelatedVulnerabilitiesAggregateModelSelector } from "./RelatedVulnerabilitiesAggregateModel.base"
import { RelatedVulnerabilitiesAggregateFieldsModel, RelatedVulnerabilitiesAggregateFieldsModelType } from "./RelatedVulnerabilitiesAggregateFieldsModel"
import { relatedVulnerabilitiesAggregateFieldsModelPrimitives, RelatedVulnerabilitiesAggregateFieldsModelSelector } from "./RelatedVulnerabilitiesAggregateFieldsModel.base"
import { RelatedVulnerabilitiesMaxFieldsModel, RelatedVulnerabilitiesMaxFieldsModelType } from "./RelatedVulnerabilitiesMaxFieldsModel"
import { relatedVulnerabilitiesMaxFieldsModelPrimitives, RelatedVulnerabilitiesMaxFieldsModelSelector } from "./RelatedVulnerabilitiesMaxFieldsModel.base"
import { RelatedVulnerabilitiesMinFieldsModel, RelatedVulnerabilitiesMinFieldsModelType } from "./RelatedVulnerabilitiesMinFieldsModel"
import { relatedVulnerabilitiesMinFieldsModelPrimitives, RelatedVulnerabilitiesMinFieldsModelSelector } from "./RelatedVulnerabilitiesMinFieldsModel.base"
import { RelatedVulnerabilitiesMutationResponseModel, RelatedVulnerabilitiesMutationResponseModelType } from "./RelatedVulnerabilitiesMutationResponseModel"
import { relatedVulnerabilitiesMutationResponseModelPrimitives, RelatedVulnerabilitiesMutationResponseModelSelector } from "./RelatedVulnerabilitiesMutationResponseModel.base"
import { ReportsModel, ReportsModelType } from "./ReportsModel"
import { reportsModelPrimitives, ReportsModelSelector } from "./ReportsModel.base"
import { ReportsAggregateModel, ReportsAggregateModelType } from "./ReportsAggregateModel"
import { reportsAggregateModelPrimitives, ReportsAggregateModelSelector } from "./ReportsAggregateModel.base"
import { ReportsAggregateFieldsModel, ReportsAggregateFieldsModelType } from "./ReportsAggregateFieldsModel"
import { reportsAggregateFieldsModelPrimitives, ReportsAggregateFieldsModelSelector } from "./ReportsAggregateFieldsModel.base"
import { ReportsMaxFieldsModel, ReportsMaxFieldsModelType } from "./ReportsMaxFieldsModel"
import { reportsMaxFieldsModelPrimitives, ReportsMaxFieldsModelSelector } from "./ReportsMaxFieldsModel.base"
import { ReportsMinFieldsModel, ReportsMinFieldsModelType } from "./ReportsMinFieldsModel"
import { reportsMinFieldsModelPrimitives, ReportsMinFieldsModelSelector } from "./ReportsMinFieldsModel.base"
import { ReportsMutationResponseModel, ReportsMutationResponseModelType } from "./ReportsMutationResponseModel"
import { reportsMutationResponseModelPrimitives, ReportsMutationResponseModelSelector } from "./ReportsMutationResponseModel.base"
import { SbomsModel, SbomsModelType } from "./SbomsModel"
import { sbomsModelPrimitives, SbomsModelSelector } from "./SbomsModel.base"
import { SbomsAggregateModel, SbomsAggregateModelType } from "./SbomsAggregateModel"
import { sbomsAggregateModelPrimitives, SbomsAggregateModelSelector } from "./SbomsAggregateModel.base"
import { SbomsAggregateFieldsModel, SbomsAggregateFieldsModelType } from "./SbomsAggregateFieldsModel"
import { sbomsAggregateFieldsModelPrimitives, SbomsAggregateFieldsModelSelector } from "./SbomsAggregateFieldsModel.base"
import { SbomsMaxFieldsModel, SbomsMaxFieldsModelType } from "./SbomsMaxFieldsModel"
import { sbomsMaxFieldsModelPrimitives, SbomsMaxFieldsModelSelector } from "./SbomsMaxFieldsModel.base"
import { SbomsMinFieldsModel, SbomsMinFieldsModelType } from "./SbomsMinFieldsModel"
import { sbomsMinFieldsModelPrimitives, SbomsMinFieldsModelSelector } from "./SbomsMinFieldsModel.base"
import { SbomsMutationResponseModel, SbomsMutationResponseModelType } from "./SbomsMutationResponseModel"
import { sbomsMutationResponseModelPrimitives, SbomsMutationResponseModelSelector } from "./SbomsMutationResponseModel.base"
import { ScansModel, ScansModelType } from "./ScansModel"
import { scansModelPrimitives, ScansModelSelector } from "./ScansModel.base"
import { ScansAggregateModel, ScansAggregateModelType } from "./ScansAggregateModel"
import { scansAggregateModelPrimitives, ScansAggregateModelSelector } from "./ScansAggregateModel.base"
import { ScansAggregateFieldsModel, ScansAggregateFieldsModelType } from "./ScansAggregateFieldsModel"
import { scansAggregateFieldsModelPrimitives, ScansAggregateFieldsModelSelector } from "./ScansAggregateFieldsModel.base"
import { ScansMaxFieldsModel, ScansMaxFieldsModelType } from "./ScansMaxFieldsModel"
import { scansMaxFieldsModelPrimitives, ScansMaxFieldsModelSelector } from "./ScansMaxFieldsModel.base"
import { ScansMinFieldsModel, ScansMinFieldsModelType } from "./ScansMinFieldsModel"
import { scansMinFieldsModelPrimitives, ScansMinFieldsModelSelector } from "./ScansMinFieldsModel.base"
import { ScansMutationResponseModel, ScansMutationResponseModelType } from "./ScansMutationResponseModel"
import { scansMutationResponseModelPrimitives, ScansMutationResponseModelSelector } from "./ScansMutationResponseModel.base"
import { SettingsModel, SettingsModelType } from "./SettingsModel"
import { settingsModelPrimitives, SettingsModelSelector } from "./SettingsModel.base"
import { SettingsAggregateModel, SettingsAggregateModelType } from "./SettingsAggregateModel"
import { settingsAggregateModelPrimitives, SettingsAggregateModelSelector } from "./SettingsAggregateModel.base"
import { SettingsAggregateFieldsModel, SettingsAggregateFieldsModelType } from "./SettingsAggregateFieldsModel"
import { settingsAggregateFieldsModelPrimitives, SettingsAggregateFieldsModelSelector } from "./SettingsAggregateFieldsModel.base"
import { SettingsMaxFieldsModel, SettingsMaxFieldsModelType } from "./SettingsMaxFieldsModel"
import { settingsMaxFieldsModelPrimitives, SettingsMaxFieldsModelSelector } from "./SettingsMaxFieldsModel.base"
import { SettingsMinFieldsModel, SettingsMinFieldsModelType } from "./SettingsMinFieldsModel"
import { settingsMinFieldsModelPrimitives, SettingsMinFieldsModelSelector } from "./SettingsMinFieldsModel.base"
import { SettingsMutationResponseModel, SettingsMutationResponseModelType } from "./SettingsMutationResponseModel"
import { settingsMutationResponseModelPrimitives, SettingsMutationResponseModelSelector } from "./SettingsMutationResponseModel.base"
import { SubscriptionRootModel, SubscriptionRootModelType } from "./SubscriptionRootModel"
import { subscriptionRootModelPrimitives, SubscriptionRootModelSelector } from "./SubscriptionRootModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { usersModelPrimitives, UsersModelSelector } from "./UsersModel.base"
import { UsersAggregateModel, UsersAggregateModelType } from "./UsersAggregateModel"
import { usersAggregateModelPrimitives, UsersAggregateModelSelector } from "./UsersAggregateModel.base"
import { UsersAggregateFieldsModel, UsersAggregateFieldsModelType } from "./UsersAggregateFieldsModel"
import { usersAggregateFieldsModelPrimitives, UsersAggregateFieldsModelSelector } from "./UsersAggregateFieldsModel.base"
import { UsersMaxFieldsModel, UsersMaxFieldsModelType } from "./UsersMaxFieldsModel"
import { usersMaxFieldsModelPrimitives, UsersMaxFieldsModelSelector } from "./UsersMaxFieldsModel.base"
import { UsersMinFieldsModel, UsersMinFieldsModelType } from "./UsersMinFieldsModel"
import { usersMinFieldsModelPrimitives, UsersMinFieldsModelSelector } from "./UsersMinFieldsModel.base"
import { UsersMutationResponseModel, UsersMutationResponseModelType } from "./UsersMutationResponseModel"
import { usersMutationResponseModelPrimitives, UsersMutationResponseModelSelector } from "./UsersMutationResponseModel.base"
import { VulnerabilitiesModel, VulnerabilitiesModelType } from "./VulnerabilitiesModel"
import { vulnerabilitiesModelPrimitives, VulnerabilitiesModelSelector } from "./VulnerabilitiesModel.base"
import { VulnerabilitiesAggregateModel, VulnerabilitiesAggregateModelType } from "./VulnerabilitiesAggregateModel"
import { vulnerabilitiesAggregateModelPrimitives, VulnerabilitiesAggregateModelSelector } from "./VulnerabilitiesAggregateModel.base"
import { VulnerabilitiesAggregateFieldsModel, VulnerabilitiesAggregateFieldsModelType } from "./VulnerabilitiesAggregateFieldsModel"
import { vulnerabilitiesAggregateFieldsModelPrimitives, VulnerabilitiesAggregateFieldsModelSelector } from "./VulnerabilitiesAggregateFieldsModel.base"
import { VulnerabilitiesAvgFieldsModel, VulnerabilitiesAvgFieldsModelType } from "./VulnerabilitiesAvgFieldsModel"
import { vulnerabilitiesAvgFieldsModelPrimitives, VulnerabilitiesAvgFieldsModelSelector } from "./VulnerabilitiesAvgFieldsModel.base"
import { VulnerabilitiesMaxFieldsModel, VulnerabilitiesMaxFieldsModelType } from "./VulnerabilitiesMaxFieldsModel"
import { vulnerabilitiesMaxFieldsModelPrimitives, VulnerabilitiesMaxFieldsModelSelector } from "./VulnerabilitiesMaxFieldsModel.base"
import { VulnerabilitiesMinFieldsModel, VulnerabilitiesMinFieldsModelType } from "./VulnerabilitiesMinFieldsModel"
import { vulnerabilitiesMinFieldsModelPrimitives, VulnerabilitiesMinFieldsModelSelector } from "./VulnerabilitiesMinFieldsModel.base"
import { VulnerabilitiesMutationResponseModel, VulnerabilitiesMutationResponseModelType } from "./VulnerabilitiesMutationResponseModel"
import { vulnerabilitiesMutationResponseModelPrimitives, VulnerabilitiesMutationResponseModelSelector } from "./VulnerabilitiesMutationResponseModel.base"
import { VulnerabilitiesStddevFieldsModel, VulnerabilitiesStddevFieldsModelType } from "./VulnerabilitiesStddevFieldsModel"
import { vulnerabilitiesStddevFieldsModelPrimitives, VulnerabilitiesStddevFieldsModelSelector } from "./VulnerabilitiesStddevFieldsModel.base"
import { VulnerabilitiesStddevPopFieldsModel, VulnerabilitiesStddevPopFieldsModelType } from "./VulnerabilitiesStddevPopFieldsModel"
import { vulnerabilitiesStddevPopFieldsModelPrimitives, VulnerabilitiesStddevPopFieldsModelSelector } from "./VulnerabilitiesStddevPopFieldsModel.base"
import { VulnerabilitiesStddevSampFieldsModel, VulnerabilitiesStddevSampFieldsModelType } from "./VulnerabilitiesStddevSampFieldsModel"
import { vulnerabilitiesStddevSampFieldsModelPrimitives, VulnerabilitiesStddevSampFieldsModelSelector } from "./VulnerabilitiesStddevSampFieldsModel.base"
import { VulnerabilitiesSumFieldsModel, VulnerabilitiesSumFieldsModelType } from "./VulnerabilitiesSumFieldsModel"
import { vulnerabilitiesSumFieldsModelPrimitives, VulnerabilitiesSumFieldsModelSelector } from "./VulnerabilitiesSumFieldsModel.base"
import { VulnerabilitiesVarPopFieldsModel, VulnerabilitiesVarPopFieldsModelType } from "./VulnerabilitiesVarPopFieldsModel"
import { vulnerabilitiesVarPopFieldsModelPrimitives, VulnerabilitiesVarPopFieldsModelSelector } from "./VulnerabilitiesVarPopFieldsModel.base"
import { VulnerabilitiesVarSampFieldsModel, VulnerabilitiesVarSampFieldsModelType } from "./VulnerabilitiesVarSampFieldsModel"
import { vulnerabilitiesVarSampFieldsModelPrimitives, VulnerabilitiesVarSampFieldsModelSelector } from "./VulnerabilitiesVarSampFieldsModel.base"
import { VulnerabilitiesVarianceFieldsModel, VulnerabilitiesVarianceFieldsModelType } from "./VulnerabilitiesVarianceFieldsModel"
import { vulnerabilitiesVarianceFieldsModelPrimitives, VulnerabilitiesVarianceFieldsModelSelector } from "./VulnerabilitiesVarianceFieldsModel.base"
import { VulnerabilityPackagesModel, VulnerabilityPackagesModelType } from "./VulnerabilityPackagesModel"
import { vulnerabilityPackagesModelPrimitives, VulnerabilityPackagesModelSelector } from "./VulnerabilityPackagesModel.base"
import { VulnerabilityPackagesAggregateModel, VulnerabilityPackagesAggregateModelType } from "./VulnerabilityPackagesAggregateModel"
import { vulnerabilityPackagesAggregateModelPrimitives, VulnerabilityPackagesAggregateModelSelector } from "./VulnerabilityPackagesAggregateModel.base"
import { VulnerabilityPackagesAggregateFieldsModel, VulnerabilityPackagesAggregateFieldsModelType } from "./VulnerabilityPackagesAggregateFieldsModel"
import { vulnerabilityPackagesAggregateFieldsModelPrimitives, VulnerabilityPackagesAggregateFieldsModelSelector } from "./VulnerabilityPackagesAggregateFieldsModel.base"
import { VulnerabilityPackagesMaxFieldsModel, VulnerabilityPackagesMaxFieldsModelType } from "./VulnerabilityPackagesMaxFieldsModel"
import { vulnerabilityPackagesMaxFieldsModelPrimitives, VulnerabilityPackagesMaxFieldsModelSelector } from "./VulnerabilityPackagesMaxFieldsModel.base"
import { VulnerabilityPackagesMinFieldsModel, VulnerabilityPackagesMinFieldsModelType } from "./VulnerabilityPackagesMinFieldsModel"
import { vulnerabilityPackagesMinFieldsModelPrimitives, VulnerabilityPackagesMinFieldsModelSelector } from "./VulnerabilityPackagesMinFieldsModel.base"
import { VulnerabilityPackagesMutationResponseModel, VulnerabilityPackagesMutationResponseModelType } from "./VulnerabilityPackagesMutationResponseModel"
import { vulnerabilityPackagesMutationResponseModelPrimitives, VulnerabilityPackagesMutationResponseModelSelector } from "./VulnerabilityPackagesMutationResponseModel.base"


import { FindingsConstraint } from "./FindingsConstraintEnum"
import { FindingsSelectColumn } from "./FindingsSelectColumnEnum"
import { FindingsUpdateColumn } from "./FindingsUpdateColumnEnum"
import { OrderBy } from "./OrderByEnum"
import { OrganizationUserConstraint } from "./OrganizationUserConstraintEnum"
import { OrganizationUserSelectColumn } from "./OrganizationUserSelectColumnEnum"
import { OrganizationUserUpdateColumn } from "./OrganizationUserUpdateColumnEnum"
import { OrganizationsConstraint } from "./OrganizationsConstraintEnum"
import { OrganizationsSelectColumn } from "./OrganizationsSelectColumnEnum"
import { OrganizationsUpdateColumn } from "./OrganizationsUpdateColumnEnum"
import { PackageVersionsConstraint } from "./PackageVersionsConstraintEnum"
import { PackageVersionsSelectColumn } from "./PackageVersionsSelectColumnEnum"
import { PackageVersionsUpdateColumn } from "./PackageVersionsUpdateColumnEnum"
import { ProjectsConstraint } from "./ProjectsConstraintEnum"
import { ProjectsSelectColumn } from "./ProjectsSelectColumnEnum"
import { ProjectsUpdateColumn } from "./ProjectsUpdateColumnEnum"
import { RelatedVulnerabilitiesConstraint } from "./RelatedVulnerabilitiesConstraintEnum"
import { RelatedVulnerabilitiesSelectColumn } from "./RelatedVulnerabilitiesSelectColumnEnum"
import { RelatedVulnerabilitiesUpdateColumn } from "./RelatedVulnerabilitiesUpdateColumnEnum"
import { ReportsConstraint } from "./ReportsConstraintEnum"
import { ReportsSelectColumn } from "./ReportsSelectColumnEnum"
import { ReportsUpdateColumn } from "./ReportsUpdateColumnEnum"
import { SbomsConstraint } from "./SbomsConstraintEnum"
import { SbomsSelectColumn } from "./SbomsSelectColumnEnum"
import { SbomsUpdateColumn } from "./SbomsUpdateColumnEnum"
import { ScansConstraint } from "./ScansConstraintEnum"
import { ScansSelectColumn } from "./ScansSelectColumnEnum"
import { ScansUpdateColumn } from "./ScansUpdateColumnEnum"
import { SettingsConstraint } from "./SettingsConstraintEnum"
import { SettingsSelectColumn } from "./SettingsSelectColumnEnum"
import { SettingsUpdateColumn } from "./SettingsUpdateColumnEnum"
import { UsersConstraint } from "./UsersConstraintEnum"
import { UsersSelectColumn } from "./UsersSelectColumnEnum"
import { UsersUpdateColumn } from "./UsersUpdateColumnEnum"
import { VulnerabilitiesConstraint } from "./VulnerabilitiesConstraintEnum"
import { VulnerabilitiesSelectColumn } from "./VulnerabilitiesSelectColumnEnum"
import { VulnerabilitiesUpdateColumn } from "./VulnerabilitiesUpdateColumnEnum"
import { VulnerabilityPackagesConstraint } from "./VulnerabilityPackagesConstraintEnum"
import { VulnerabilityPackagesSelectColumn } from "./VulnerabilityPackagesSelectColumnEnum"
import { VulnerabilityPackagesUpdateColumn } from "./VulnerabilityPackagesUpdateColumnEnum"

export type BooleanComparisonExp = {
  _eq?: boolean
  _gt?: boolean
  _gte?: boolean
  _in?: boolean[]
  _is_null?: boolean
  _lt?: boolean
  _lte?: boolean
  _neq?: boolean
  _nin?: boolean[]
}
export type StringComparisonExp = {
  _eq?: string
  _gt?: string
  _gte?: string
  _ilike?: string
  _in?: string[]
  _iregex?: string
  _is_null?: boolean
  _like?: string
  _lt?: string
  _lte?: string
  _neq?: string
  _nilike?: string
  _nin?: string[]
  _niregex?: string
  _nlike?: string
  _nregex?: string
  _nsimilar?: string
  _regex?: string
  _similar?: string
}
export type TextComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type DateComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type FindingsAggregateOrderBy = {
  count?: OrderBy
  max?: FindingsMaxOrderBy
  min?: FindingsMinOrderBy
}
export type FindingsArrRelInsertInput = {
  data: FindingsInsertInput[]
  on_conflict?: FindingsOnConflict
}
export type FindingsBoolExp = {
  _and?: FindingsBoolExp[]
  _not?: FindingsBoolExp
  _or?: FindingsBoolExp[]
  id?: UuidComparisonExp
  language?: StringComparisonExp
  locations?: TextComparisonExp
  matcher?: StringComparisonExp
  package_name?: StringComparisonExp
  package_version?: PackageVersionsBoolExp
  package_version_id?: UuidComparisonExp
  purl?: StringComparisonExp
  report?: ReportsBoolExp
  report_id?: UuidComparisonExp
  type?: StringComparisonExp
  version?: StringComparisonExp
  version_matcher?: StringComparisonExp
  virtual_path?: StringComparisonExp
  vulnerability?: VulnerabilitiesBoolExp
  vulnerability_id?: UuidComparisonExp
  vulnerability_package?: VulnerabilityPackagesBoolExp
  vulnerability_package_id?: UuidComparisonExp
}
export type FindingsInsertInput = {
  id?: any
  language?: string
  locations?: any
  matcher?: string
  package_name?: string
  package_version?: PackageVersionsObjRelInsertInput
  package_version_id?: any
  purl?: string
  report?: ReportsObjRelInsertInput
  report_id?: any
  type?: string
  version?: string
  version_matcher?: string
  virtual_path?: string
  vulnerability?: VulnerabilitiesObjRelInsertInput
  vulnerability_id?: any
  vulnerability_package?: VulnerabilityPackagesObjRelInsertInput
  vulnerability_package_id?: any
}
export type FindingsMaxOrderBy = {
  id?: OrderBy
  language?: OrderBy
  matcher?: OrderBy
  package_name?: OrderBy
  package_version_id?: OrderBy
  purl?: OrderBy
  report_id?: OrderBy
  type?: OrderBy
  version?: OrderBy
  version_matcher?: OrderBy
  virtual_path?: OrderBy
  vulnerability_id?: OrderBy
  vulnerability_package_id?: OrderBy
}
export type FindingsMinOrderBy = {
  id?: OrderBy
  language?: OrderBy
  matcher?: OrderBy
  package_name?: OrderBy
  package_version_id?: OrderBy
  purl?: OrderBy
  report_id?: OrderBy
  type?: OrderBy
  version?: OrderBy
  version_matcher?: OrderBy
  virtual_path?: OrderBy
  vulnerability_id?: OrderBy
  vulnerability_package_id?: OrderBy
}
export type FindingsOnConflict = {
  constraint: FindingsConstraint
  update_columns: FindingsUpdateColumn[]
  where?: FindingsBoolExp
}
export type FindingsOrderBy = {
  id?: OrderBy
  language?: OrderBy
  locations?: OrderBy
  matcher?: OrderBy
  package_name?: OrderBy
  package_version?: PackageVersionsOrderBy
  package_version_id?: OrderBy
  purl?: OrderBy
  report?: ReportsOrderBy
  report_id?: OrderBy
  type?: OrderBy
  version?: OrderBy
  version_matcher?: OrderBy
  virtual_path?: OrderBy
  vulnerability?: VulnerabilitiesOrderBy
  vulnerability_id?: OrderBy
  vulnerability_package?: VulnerabilityPackagesOrderBy
  vulnerability_package_id?: OrderBy
}
export type FindingsPkColumnsInput = {
  id: any
}
export type FindingsSetInput = {
  id?: any
  language?: string
  locations?: any
  matcher?: string
  package_name?: string
  package_version_id?: any
  purl?: string
  report_id?: any
  type?: string
  version?: string
  version_matcher?: string
  virtual_path?: string
  vulnerability_id?: any
  vulnerability_package_id?: any
}
export type NumericComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type OrganizationUserAggregateOrderBy = {
  count?: OrderBy
  max?: OrganizationUserMaxOrderBy
  min?: OrganizationUserMinOrderBy
}
export type OrganizationUserArrRelInsertInput = {
  data: OrganizationUserInsertInput[]
  on_conflict?: OrganizationUserOnConflict
}
export type OrganizationUserBoolExp = {
  _and?: OrganizationUserBoolExp[]
  _not?: OrganizationUserBoolExp
  _or?: OrganizationUserBoolExp[]
  created_at?: TimestamptzComparisonExp
  id?: UuidComparisonExp
  organization?: OrganizationsBoolExp
  organization_id?: UuidComparisonExp
  updated_at?: TimestamptzComparisonExp
  user?: UsersBoolExp
  user_id?: UuidComparisonExp
}
export type OrganizationUserInsertInput = {
  created_at?: any
  id?: any
  organization?: OrganizationsObjRelInsertInput
  organization_id?: any
  updated_at?: any
  user?: UsersObjRelInsertInput
  user_id?: any
}
export type OrganizationUserMaxOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  organization_id?: OrderBy
  updated_at?: OrderBy
  user_id?: OrderBy
}
export type OrganizationUserMinOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  organization_id?: OrderBy
  updated_at?: OrderBy
  user_id?: OrderBy
}
export type OrganizationUserOnConflict = {
  constraint: OrganizationUserConstraint
  update_columns: OrganizationUserUpdateColumn[]
  where?: OrganizationUserBoolExp
}
export type OrganizationUserOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  organization?: OrganizationsOrderBy
  organization_id?: OrderBy
  updated_at?: OrderBy
  user?: UsersOrderBy
  user_id?: OrderBy
}
export type OrganizationUserPkColumnsInput = {
  id: any
}
export type OrganizationUserSetInput = {
  created_at?: any
  id?: any
  organization_id?: any
  updated_at?: any
  user_id?: any
}
export type OrganizationsBoolExp = {
  _and?: OrganizationsBoolExp[]
  _not?: OrganizationsBoolExp
  _or?: OrganizationsBoolExp[]
  createdAt?: TimestampComparisonExp
  id?: UuidComparisonExp
  name?: StringComparisonExp
  organization_users?: OrganizationUserBoolExp
  projects?: ProjectsBoolExp
  settings_id?: UuidComparisonExp
}
export type OrganizationsInsertInput = {
  createdAt?: any
  id?: any
  name?: string
  organization_users?: OrganizationUserArrRelInsertInput
  projects?: ProjectsArrRelInsertInput
  settings_id?: any
}
export type OrganizationsObjRelInsertInput = {
  data: OrganizationsInsertInput
  on_conflict?: OrganizationsOnConflict
}
export type OrganizationsOnConflict = {
  constraint: OrganizationsConstraint
  update_columns: OrganizationsUpdateColumn[]
  where?: OrganizationsBoolExp
}
export type OrganizationsOrderBy = {
  createdAt?: OrderBy
  id?: OrderBy
  name?: OrderBy
  organization_users_aggregate?: OrganizationUserAggregateOrderBy
  projects_aggregate?: ProjectsAggregateOrderBy
  settings_id?: OrderBy
}
export type OrganizationsPkColumnsInput = {
  id: any
}
export type OrganizationsSetInput = {
  createdAt?: any
  id?: any
  name?: string
  settings_id?: any
}
export type PackageVersionsBoolExp = {
  _and?: PackageVersionsBoolExp[]
  _not?: PackageVersionsBoolExp
  _or?: PackageVersionsBoolExp[]
  cpes?: TextComparisonExp
  findings?: FindingsBoolExp
  fix_state?: StringComparisonExp
  fixed_in_versions?: TextComparisonExp
  id?: UuidComparisonExp
  pkg_slug?: StringComparisonExp
  slug?: StringComparisonExp
  version_constraint?: StringComparisonExp
  version_format?: StringComparisonExp
}
export type PackageVersionsInsertInput = {
  cpes?: any
  findings?: FindingsArrRelInsertInput
  fix_state?: string
  fixed_in_versions?: any
  id?: any
  pkg_slug?: string
  slug?: string
  version_constraint?: string
  version_format?: string
}
export type PackageVersionsObjRelInsertInput = {
  data: PackageVersionsInsertInput
  on_conflict?: PackageVersionsOnConflict
}
export type PackageVersionsOnConflict = {
  constraint: PackageVersionsConstraint
  update_columns: PackageVersionsUpdateColumn[]
  where?: PackageVersionsBoolExp
}
export type PackageVersionsOrderBy = {
  cpes?: OrderBy
  findings_aggregate?: FindingsAggregateOrderBy
  fix_state?: OrderBy
  fixed_in_versions?: OrderBy
  id?: OrderBy
  pkg_slug?: OrderBy
  slug?: OrderBy
  version_constraint?: OrderBy
  version_format?: OrderBy
}
export type PackageVersionsPkColumnsInput = {
  id: any
}
export type PackageVersionsSetInput = {
  cpes?: any
  fix_state?: string
  fixed_in_versions?: any
  id?: any
  pkg_slug?: string
  slug?: string
  version_constraint?: string
  version_format?: string
}
export type ProjectsAggregateOrderBy = {
  count?: OrderBy
  max?: ProjectsMaxOrderBy
  min?: ProjectsMinOrderBy
}
export type ProjectsArrRelInsertInput = {
  data: ProjectsInsertInput[]
  on_conflict?: ProjectsOnConflict
}
export type ProjectsBoolExp = {
  _and?: ProjectsBoolExp[]
  _not?: ProjectsBoolExp
  _or?: ProjectsBoolExp[]
  created_at?: TimestampComparisonExp
  id?: UuidComparisonExp
  name?: StringComparisonExp
  organization?: OrganizationsBoolExp
  organization_id?: UuidComparisonExp
  repo?: StringComparisonExp
  reports?: ReportsBoolExp
  scans?: ScansBoolExp
  settings_id?: UuidComparisonExp
}
export type ProjectsInsertInput = {
  created_at?: any
  id?: any
  name?: string
  organization?: OrganizationsObjRelInsertInput
  organization_id?: any
  repo?: string
  reports?: ReportsArrRelInsertInput
  scans?: ScansArrRelInsertInput
  settings_id?: any
}
export type ProjectsMaxOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  name?: OrderBy
  organization_id?: OrderBy
  repo?: OrderBy
  settings_id?: OrderBy
}
export type ProjectsMinOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  name?: OrderBy
  organization_id?: OrderBy
  repo?: OrderBy
  settings_id?: OrderBy
}
export type ProjectsObjRelInsertInput = {
  data: ProjectsInsertInput
  on_conflict?: ProjectsOnConflict
}
export type ProjectsOnConflict = {
  constraint: ProjectsConstraint
  update_columns: ProjectsUpdateColumn[]
  where?: ProjectsBoolExp
}
export type ProjectsOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  name?: OrderBy
  organization?: OrganizationsOrderBy
  organization_id?: OrderBy
  repo?: OrderBy
  reports_aggregate?: ReportsAggregateOrderBy
  scans_aggregate?: ScansAggregateOrderBy
  settings_id?: OrderBy
}
export type ProjectsPkColumnsInput = {
  id: any
}
export type ProjectsSetInput = {
  created_at?: any
  id?: any
  name?: string
  organization_id?: any
  repo?: string
  settings_id?: any
}
export type RelatedVulnerabilitiesAggregateOrderBy = {
  count?: OrderBy
  max?: RelatedVulnerabilitiesMaxOrderBy
  min?: RelatedVulnerabilitiesMinOrderBy
}
export type RelatedVulnerabilitiesArrRelInsertInput = {
  data: RelatedVulnerabilitiesInsertInput[]
  on_conflict?: RelatedVulnerabilitiesOnConflict
}
export type RelatedVulnerabilitiesBoolExp = {
  _and?: RelatedVulnerabilitiesBoolExp[]
  _not?: RelatedVulnerabilitiesBoolExp
  _or?: RelatedVulnerabilitiesBoolExp[]
  id?: UuidComparisonExp
  related_vulnerability_slug?: StringComparisonExp
  vulnerability?: VulnerabilitiesBoolExp
  vulnerabilityByVulnerabilitySlug?: VulnerabilitiesBoolExp
  vulnerability_slug?: StringComparisonExp
}
export type RelatedVulnerabilitiesInsertInput = {
  id?: any
  related_vulnerability_slug?: string
  vulnerability?: VulnerabilitiesObjRelInsertInput
  vulnerabilityByVulnerabilitySlug?: VulnerabilitiesObjRelInsertInput
  vulnerability_slug?: string
}
export type RelatedVulnerabilitiesMaxOrderBy = {
  id?: OrderBy
  related_vulnerability_slug?: OrderBy
  vulnerability_slug?: OrderBy
}
export type RelatedVulnerabilitiesMinOrderBy = {
  id?: OrderBy
  related_vulnerability_slug?: OrderBy
  vulnerability_slug?: OrderBy
}
export type RelatedVulnerabilitiesOnConflict = {
  constraint: RelatedVulnerabilitiesConstraint
  update_columns: RelatedVulnerabilitiesUpdateColumn[]
  where?: RelatedVulnerabilitiesBoolExp
}
export type RelatedVulnerabilitiesOrderBy = {
  id?: OrderBy
  related_vulnerability_slug?: OrderBy
  vulnerability?: VulnerabilitiesOrderBy
  vulnerabilityByVulnerabilitySlug?: VulnerabilitiesOrderBy
  vulnerability_slug?: OrderBy
}
export type RelatedVulnerabilitiesPkColumnsInput = {
  id: any
}
export type RelatedVulnerabilitiesSetInput = {
  id?: any
  related_vulnerability_slug?: string
  vulnerability_slug?: string
}
export type ReportsAggregateOrderBy = {
  count?: OrderBy
  max?: ReportsMaxOrderBy
  min?: ReportsMinOrderBy
}
export type ReportsArrRelInsertInput = {
  data: ReportsInsertInput[]
  on_conflict?: ReportsOnConflict
}
export type ReportsBoolExp = {
  _and?: ReportsBoolExp[]
  _not?: ReportsBoolExp
  _or?: ReportsBoolExp[]
  db_date?: DateComparisonExp
  distro_name?: StringComparisonExp
  distro_version?: StringComparisonExp
  findings?: FindingsBoolExp
  grype_version?: StringComparisonExp
  id?: UuidComparisonExp
  project?: ProjectsBoolExp
  project_id?: UuidComparisonExp
  source_type?: StringComparisonExp
  target?: StringComparisonExp
}
export type ReportsInsertInput = {
  db_date?: any
  distro_name?: string
  distro_version?: string
  findings?: FindingsArrRelInsertInput
  grype_version?: string
  id?: any
  project?: ProjectsObjRelInsertInput
  project_id?: any
  source_type?: string
  target?: string
}
export type ReportsMaxOrderBy = {
  db_date?: OrderBy
  distro_name?: OrderBy
  distro_version?: OrderBy
  grype_version?: OrderBy
  id?: OrderBy
  project_id?: OrderBy
  source_type?: OrderBy
  target?: OrderBy
}
export type ReportsMinOrderBy = {
  db_date?: OrderBy
  distro_name?: OrderBy
  distro_version?: OrderBy
  grype_version?: OrderBy
  id?: OrderBy
  project_id?: OrderBy
  source_type?: OrderBy
  target?: OrderBy
}
export type ReportsObjRelInsertInput = {
  data: ReportsInsertInput
  on_conflict?: ReportsOnConflict
}
export type ReportsOnConflict = {
  constraint: ReportsConstraint
  update_columns: ReportsUpdateColumn[]
  where?: ReportsBoolExp
}
export type ReportsOrderBy = {
  db_date?: OrderBy
  distro_name?: OrderBy
  distro_version?: OrderBy
  findings_aggregate?: FindingsAggregateOrderBy
  grype_version?: OrderBy
  id?: OrderBy
  project?: ProjectsOrderBy
  project_id?: OrderBy
  source_type?: OrderBy
  target?: OrderBy
}
export type ReportsPkColumnsInput = {
  id: any
}
export type ReportsSetInput = {
  db_date?: any
  distro_name?: string
  distro_version?: string
  grype_version?: string
  id?: any
  project_id?: any
  source_type?: string
  target?: string
}
export type SbomsBoolExp = {
  _and?: SbomsBoolExp[]
  _not?: SbomsBoolExp
  _or?: SbomsBoolExp[]
  created_at?: TimestampComparisonExp
  id?: UuidComparisonExp
  s3_url?: StringComparisonExp
  scans?: ScansBoolExp
}
export type SbomsInsertInput = {
  created_at?: any
  id?: any
  s3_url?: string
  scans?: ScansArrRelInsertInput
}
export type SbomsObjRelInsertInput = {
  data: SbomsInsertInput
  on_conflict?: SbomsOnConflict
}
export type SbomsOnConflict = {
  constraint: SbomsConstraint
  update_columns: SbomsUpdateColumn[]
  where?: SbomsBoolExp
}
export type SbomsOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  s3_url?: OrderBy
  scans_aggregate?: ScansAggregateOrderBy
}
export type SbomsPkColumnsInput = {
  id: any
}
export type SbomsSetInput = {
  created_at?: any
  id?: any
  s3_url?: string
}
export type ScansAggregateOrderBy = {
  count?: OrderBy
  max?: ScansMaxOrderBy
  min?: ScansMinOrderBy
}
export type ScansArrRelInsertInput = {
  data: ScansInsertInput[]
  on_conflict?: ScansOnConflict
}
export type ScansBoolExp = {
  _and?: ScansBoolExp[]
  _not?: ScansBoolExp
  _or?: ScansBoolExp[]
  created_at?: TimestampComparisonExp
  db_date?: TimestampComparisonExp
  distro_name?: StringComparisonExp
  distro_version?: StringComparisonExp
  grype_version?: StringComparisonExp
  id?: UuidComparisonExp
  project?: ProjectsBoolExp
  project_id?: UuidComparisonExp
  sbom?: SbomsBoolExp
  sbom_id?: UuidComparisonExp
  source_type?: StringComparisonExp
  target?: StringComparisonExp
}
export type ScansInsertInput = {
  created_at?: any
  db_date?: any
  distro_name?: string
  distro_version?: string
  grype_version?: string
  id?: any
  project?: ProjectsObjRelInsertInput
  project_id?: any
  sbom?: SbomsObjRelInsertInput
  sbom_id?: any
  source_type?: string
  target?: string
}
export type ScansMaxOrderBy = {
  created_at?: OrderBy
  db_date?: OrderBy
  distro_name?: OrderBy
  distro_version?: OrderBy
  grype_version?: OrderBy
  id?: OrderBy
  project_id?: OrderBy
  sbom_id?: OrderBy
  source_type?: OrderBy
  target?: OrderBy
}
export type ScansMinOrderBy = {
  created_at?: OrderBy
  db_date?: OrderBy
  distro_name?: OrderBy
  distro_version?: OrderBy
  grype_version?: OrderBy
  id?: OrderBy
  project_id?: OrderBy
  sbom_id?: OrderBy
  source_type?: OrderBy
  target?: OrderBy
}
export type ScansOnConflict = {
  constraint: ScansConstraint
  update_columns: ScansUpdateColumn[]
  where?: ScansBoolExp
}
export type ScansOrderBy = {
  created_at?: OrderBy
  db_date?: OrderBy
  distro_name?: OrderBy
  distro_version?: OrderBy
  grype_version?: OrderBy
  id?: OrderBy
  project?: ProjectsOrderBy
  project_id?: OrderBy
  sbom?: SbomsOrderBy
  sbom_id?: OrderBy
  source_type?: OrderBy
  target?: OrderBy
}
export type ScansPkColumnsInput = {
  id: any
}
export type ScansSetInput = {
  created_at?: any
  db_date?: any
  distro_name?: string
  distro_version?: string
  grype_version?: string
  id?: any
  project_id?: any
  sbom_id?: any
  source_type?: string
  target?: string
}
export type SettingsBoolExp = {
  _and?: SettingsBoolExp[]
  _not?: SettingsBoolExp
  _or?: SettingsBoolExp[]
  created_at?: TimestampComparisonExp
  id?: UuidComparisonExp
  is_org_settings?: BooleanComparisonExp
}
export type SettingsInsertInput = {
  created_at?: any
  id?: any
  is_org_settings?: boolean
}
export type SettingsOnConflict = {
  constraint: SettingsConstraint
  update_columns: SettingsUpdateColumn[]
  where?: SettingsBoolExp
}
export type SettingsOrderBy = {
  created_at?: OrderBy
  id?: OrderBy
  is_org_settings?: OrderBy
}
export type SettingsPkColumnsInput = {
  id: any
}
export type SettingsSetInput = {
  created_at?: any
  id?: any
  is_org_settings?: boolean
}
export type TimestampComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type TimestamptzComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type UsersBoolExp = {
  _and?: UsersBoolExp[]
  _not?: UsersBoolExp
  _or?: UsersBoolExp[]
  created_at?: TimestampComparisonExp
  email?: StringComparisonExp
  id?: UuidComparisonExp
  name?: StringComparisonExp
  organization_users?: OrganizationUserBoolExp
}
export type UsersInsertInput = {
  created_at?: any
  email?: string
  id?: any
  name?: string
  organization_users?: OrganizationUserArrRelInsertInput
}
export type UsersObjRelInsertInput = {
  data: UsersInsertInput
  on_conflict?: UsersOnConflict
}
export type UsersOnConflict = {
  constraint: UsersConstraint
  update_columns: UsersUpdateColumn[]
  where?: UsersBoolExp
}
export type UsersOrderBy = {
  created_at?: OrderBy
  email?: OrderBy
  id?: OrderBy
  name?: OrderBy
  organization_users_aggregate?: OrganizationUserAggregateOrderBy
}
export type UsersPkColumnsInput = {
  id: any
}
export type UsersSetInput = {
  created_at?: any
  email?: string
  id?: any
  name?: string
}
export type UuidComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type VulnerabilitiesBoolExp = {
  _and?: VulnerabilitiesBoolExp[]
  _not?: VulnerabilitiesBoolExp
  _or?: VulnerabilitiesBoolExp[]
  created_at?: TimestampComparisonExp
  cvss_exploitability_score?: NumericComparisonExp
  cvss_impact_score?: NumericComparisonExp
  cvss_inferred?: BooleanComparisonExp
  cvss_score?: NumericComparisonExp
  cvss_version?: StringComparisonExp
  data_source?: StringComparisonExp
  description?: StringComparisonExp
  findings?: FindingsBoolExp
  id?: UuidComparisonExp
  name?: StringComparisonExp
  namespace?: StringComparisonExp
  record_source?: StringComparisonExp
  relatedVulnerabilitiesByVulnerabilitySlug?: RelatedVulnerabilitiesBoolExp
  related_vulnerabilities?: RelatedVulnerabilitiesBoolExp
  severity?: StringComparisonExp
  slug?: StringComparisonExp
  topic_id?: UuidComparisonExp
  urls?: TextComparisonExp
  vulnerability_packages?: VulnerabilityPackagesBoolExp
}
export type VulnerabilitiesIncInput = {
  cvss_exploitability_score?: any
  cvss_impact_score?: any
  cvss_score?: any
}
export type VulnerabilitiesInsertInput = {
  created_at?: any
  cvss_exploitability_score?: any
  cvss_impact_score?: any
  cvss_inferred?: boolean
  cvss_score?: any
  cvss_version?: string
  data_source?: string
  description?: string
  findings?: FindingsArrRelInsertInput
  id?: any
  name?: string
  namespace?: string
  record_source?: string
  relatedVulnerabilitiesByVulnerabilitySlug?: RelatedVulnerabilitiesArrRelInsertInput
  related_vulnerabilities?: RelatedVulnerabilitiesArrRelInsertInput
  severity?: string
  slug?: string
  topic_id?: any
  urls?: any
  vulnerability_packages?: VulnerabilityPackagesArrRelInsertInput
}
export type VulnerabilitiesObjRelInsertInput = {
  data: VulnerabilitiesInsertInput
  on_conflict?: VulnerabilitiesOnConflict
}
export type VulnerabilitiesOnConflict = {
  constraint: VulnerabilitiesConstraint
  update_columns: VulnerabilitiesUpdateColumn[]
  where?: VulnerabilitiesBoolExp
}
export type VulnerabilitiesOrderBy = {
  created_at?: OrderBy
  cvss_exploitability_score?: OrderBy
  cvss_impact_score?: OrderBy
  cvss_inferred?: OrderBy
  cvss_score?: OrderBy
  cvss_version?: OrderBy
  data_source?: OrderBy
  description?: OrderBy
  findings_aggregate?: FindingsAggregateOrderBy
  id?: OrderBy
  name?: OrderBy
  namespace?: OrderBy
  record_source?: OrderBy
  relatedVulnerabilitiesByVulnerabilitySlug_aggregate?: RelatedVulnerabilitiesAggregateOrderBy
  related_vulnerabilities_aggregate?: RelatedVulnerabilitiesAggregateOrderBy
  severity?: OrderBy
  slug?: OrderBy
  topic_id?: OrderBy
  urls?: OrderBy
  vulnerability_packages_aggregate?: VulnerabilityPackagesAggregateOrderBy
}
export type VulnerabilitiesPkColumnsInput = {
  id: any
}
export type VulnerabilitiesSetInput = {
  created_at?: any
  cvss_exploitability_score?: any
  cvss_impact_score?: any
  cvss_inferred?: boolean
  cvss_score?: any
  cvss_version?: string
  data_source?: string
  description?: string
  id?: any
  name?: string
  namespace?: string
  record_source?: string
  severity?: string
  slug?: string
  topic_id?: any
  urls?: any
}
export type VulnerabilityPackagesAggregateOrderBy = {
  count?: OrderBy
  max?: VulnerabilityPackagesMaxOrderBy
  min?: VulnerabilityPackagesMinOrderBy
}
export type VulnerabilityPackagesArrRelInsertInput = {
  data: VulnerabilityPackagesInsertInput[]
  on_conflict?: VulnerabilityPackagesOnConflict
}
export type VulnerabilityPackagesBoolExp = {
  _and?: VulnerabilityPackagesBoolExp[]
  _not?: VulnerabilityPackagesBoolExp
  _or?: VulnerabilityPackagesBoolExp[]
  advisories?: StringComparisonExp
  findings?: FindingsBoolExp
  id?: UuidComparisonExp
  name?: StringComparisonExp
  slug?: StringComparisonExp
  vuln_slug?: StringComparisonExp
  vulnerability?: VulnerabilitiesBoolExp
}
export type VulnerabilityPackagesInsertInput = {
  advisories?: string
  findings?: FindingsArrRelInsertInput
  id?: any
  name?: string
  slug?: string
  vuln_slug?: string
  vulnerability?: VulnerabilitiesObjRelInsertInput
}
export type VulnerabilityPackagesMaxOrderBy = {
  advisories?: OrderBy
  id?: OrderBy
  name?: OrderBy
  slug?: OrderBy
  vuln_slug?: OrderBy
}
export type VulnerabilityPackagesMinOrderBy = {
  advisories?: OrderBy
  id?: OrderBy
  name?: OrderBy
  slug?: OrderBy
  vuln_slug?: OrderBy
}
export type VulnerabilityPackagesObjRelInsertInput = {
  data: VulnerabilityPackagesInsertInput
  on_conflict?: VulnerabilityPackagesOnConflict
}
export type VulnerabilityPackagesOnConflict = {
  constraint: VulnerabilityPackagesConstraint
  update_columns: VulnerabilityPackagesUpdateColumn[]
  where?: VulnerabilityPackagesBoolExp
}
export type VulnerabilityPackagesOrderBy = {
  advisories?: OrderBy
  findings_aggregate?: FindingsAggregateOrderBy
  id?: OrderBy
  name?: OrderBy
  slug?: OrderBy
  vuln_slug?: OrderBy
  vulnerability?: VulnerabilitiesOrderBy
}
export type VulnerabilityPackagesPkColumnsInput = {
  id: any
}
export type VulnerabilityPackagesSetInput = {
  advisories?: string
  id?: any
  name?: string
  slug?: string
  vuln_slug?: string
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {

}


/**
* Enums for the names of base graphql actions
*/



/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['findings', () => FindingsModel], ['findings_aggregate', () => FindingsAggregateModel], ['findings_aggregate_fields', () => FindingsAggregateFieldsModel], ['findings_max_fields', () => FindingsMaxFieldsModel], ['findings_min_fields', () => FindingsMinFieldsModel], ['findings_mutation_response', () => FindingsMutationResponseModel], ['mutation_root', () => MutationRootModel], ['organization_user', () => OrganizationUserModel], ['organization_user_aggregate', () => OrganizationUserAggregateModel], ['organization_user_aggregate_fields', () => OrganizationUserAggregateFieldsModel], ['organization_user_max_fields', () => OrganizationUserMaxFieldsModel], ['organization_user_min_fields', () => OrganizationUserMinFieldsModel], ['organization_user_mutation_response', () => OrganizationUserMutationResponseModel], ['organizations', () => OrganizationsModel], ['organizations_aggregate', () => OrganizationsAggregateModel], ['organizations_aggregate_fields', () => OrganizationsAggregateFieldsModel], ['organizations_max_fields', () => OrganizationsMaxFieldsModel], ['organizations_min_fields', () => OrganizationsMinFieldsModel], ['organizations_mutation_response', () => OrganizationsMutationResponseModel], ['package_versions', () => PackageVersionsModel], ['package_versions_aggregate', () => PackageVersionsAggregateModel], ['package_versions_aggregate_fields', () => PackageVersionsAggregateFieldsModel], ['package_versions_max_fields', () => PackageVersionsMaxFieldsModel], ['package_versions_min_fields', () => PackageVersionsMinFieldsModel], ['package_versions_mutation_response', () => PackageVersionsMutationResponseModel], ['projects', () => ProjectsModel], ['projects_aggregate', () => ProjectsAggregateModel], ['projects_aggregate_fields', () => ProjectsAggregateFieldsModel], ['projects_max_fields', () => ProjectsMaxFieldsModel], ['projects_min_fields', () => ProjectsMinFieldsModel], ['projects_mutation_response', () => ProjectsMutationResponseModel], ['query_root', () => QueryRootModel], ['related_vulnerabilities', () => RelatedVulnerabilitiesModel], ['related_vulnerabilities_aggregate', () => RelatedVulnerabilitiesAggregateModel], ['related_vulnerabilities_aggregate_fields', () => RelatedVulnerabilitiesAggregateFieldsModel], ['related_vulnerabilities_max_fields', () => RelatedVulnerabilitiesMaxFieldsModel], ['related_vulnerabilities_min_fields', () => RelatedVulnerabilitiesMinFieldsModel], ['related_vulnerabilities_mutation_response', () => RelatedVulnerabilitiesMutationResponseModel], ['reports', () => ReportsModel], ['reports_aggregate', () => ReportsAggregateModel], ['reports_aggregate_fields', () => ReportsAggregateFieldsModel], ['reports_max_fields', () => ReportsMaxFieldsModel], ['reports_min_fields', () => ReportsMinFieldsModel], ['reports_mutation_response', () => ReportsMutationResponseModel], ['sboms', () => SbomsModel], ['sboms_aggregate', () => SbomsAggregateModel], ['sboms_aggregate_fields', () => SbomsAggregateFieldsModel], ['sboms_max_fields', () => SbomsMaxFieldsModel], ['sboms_min_fields', () => SbomsMinFieldsModel], ['sboms_mutation_response', () => SbomsMutationResponseModel], ['scans', () => ScansModel], ['scans_aggregate', () => ScansAggregateModel], ['scans_aggregate_fields', () => ScansAggregateFieldsModel], ['scans_max_fields', () => ScansMaxFieldsModel], ['scans_min_fields', () => ScansMinFieldsModel], ['scans_mutation_response', () => ScansMutationResponseModel], ['settings', () => SettingsModel], ['settings_aggregate', () => SettingsAggregateModel], ['settings_aggregate_fields', () => SettingsAggregateFieldsModel], ['settings_max_fields', () => SettingsMaxFieldsModel], ['settings_min_fields', () => SettingsMinFieldsModel], ['settings_mutation_response', () => SettingsMutationResponseModel], ['subscription_root', () => SubscriptionRootModel], ['users', () => UsersModel], ['users_aggregate', () => UsersAggregateModel], ['users_aggregate_fields', () => UsersAggregateFieldsModel], ['users_max_fields', () => UsersMaxFieldsModel], ['users_min_fields', () => UsersMinFieldsModel], ['users_mutation_response', () => UsersMutationResponseModel], ['vulnerabilities', () => VulnerabilitiesModel], ['vulnerabilities_aggregate', () => VulnerabilitiesAggregateModel], ['vulnerabilities_aggregate_fields', () => VulnerabilitiesAggregateFieldsModel], ['vulnerabilities_avg_fields', () => VulnerabilitiesAvgFieldsModel], ['vulnerabilities_max_fields', () => VulnerabilitiesMaxFieldsModel], ['vulnerabilities_min_fields', () => VulnerabilitiesMinFieldsModel], ['vulnerabilities_mutation_response', () => VulnerabilitiesMutationResponseModel], ['vulnerabilities_stddev_fields', () => VulnerabilitiesStddevFieldsModel], ['vulnerabilities_stddev_pop_fields', () => VulnerabilitiesStddevPopFieldsModel], ['vulnerabilities_stddev_samp_fields', () => VulnerabilitiesStddevSampFieldsModel], ['vulnerabilities_sum_fields', () => VulnerabilitiesSumFieldsModel], ['vulnerabilities_var_pop_fields', () => VulnerabilitiesVarPopFieldsModel], ['vulnerabilities_var_samp_fields', () => VulnerabilitiesVarSampFieldsModel], ['vulnerabilities_variance_fields', () => VulnerabilitiesVarianceFieldsModel], ['vulnerability_packages', () => VulnerabilityPackagesModel], ['vulnerability_packages_aggregate', () => VulnerabilityPackagesAggregateModel], ['vulnerability_packages_aggregate_fields', () => VulnerabilityPackagesAggregateFieldsModel], ['vulnerability_packages_max_fields', () => VulnerabilityPackagesMaxFieldsModel], ['vulnerability_packages_min_fields', () => VulnerabilityPackagesMinFieldsModel], ['vulnerability_packages_mutation_response', () => VulnerabilityPackagesMutationResponseModel]], [], "js"))
  .props({

  })
  .actions(self => ({
    // An array relationship
    queryFindings(variables: { distinctOn?: FindingsSelectColumn[], limit?: number, offset?: number, orderBy?: FindingsOrderBy[], where?: FindingsBoolExp }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ findings: FindingsModelType[]}>(`query findings($distinctOn: [findings_select_column!], $limit: Int, $offset: Int, $orderBy: [findings_order_by!], $where: findings_bool_exp) { findings(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An aggregate relationship
    queryFindings_aggregate(variables: { distinctOn?: FindingsSelectColumn[], limit?: number, offset?: number, orderBy?: FindingsOrderBy[], where?: FindingsBoolExp }, resultSelector: string | ((qb: FindingsAggregateModelSelector) => FindingsAggregateModelSelector) = findingsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ findings_aggregate: FindingsAggregateModelType}>(`query findings_aggregate($distinctOn: [findings_select_column!], $limit: Int, $offset: Int, $orderBy: [findings_order_by!], $where: findings_bool_exp) { findings_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "findings" using primary key columns
    queryFindings_by_pk(variables: { id: any }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ findings_by_pk: FindingsModelType}>(`query findings_by_pk($id: uuid!) { findings_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "organization_user"
    queryOrganization_user(variables: { distinctOn?: OrganizationUserSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationUserOrderBy[], where?: OrganizationUserBoolExp }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ organization_user: OrganizationUserModelType[]}>(`query organization_user($distinctOn: [organization_user_select_column!], $limit: Int, $offset: Int, $orderBy: [organization_user_order_by!], $where: organization_user_bool_exp) { organization_user(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "organization_user"
    queryOrganization_user_aggregate(variables: { distinctOn?: OrganizationUserSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationUserOrderBy[], where?: OrganizationUserBoolExp }, resultSelector: string | ((qb: OrganizationUserAggregateModelSelector) => OrganizationUserAggregateModelSelector) = organizationUserAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ organization_user_aggregate: OrganizationUserAggregateModelType}>(`query organization_user_aggregate($distinctOn: [organization_user_select_column!], $limit: Int, $offset: Int, $orderBy: [organization_user_order_by!], $where: organization_user_bool_exp) { organization_user_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "organization_user" using primary key columns
    queryOrganization_user_by_pk(variables: { id: any }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ organization_user_by_pk: OrganizationUserModelType}>(`query organization_user_by_pk($id: uuid!) { organization_user_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "organizations"
    queryOrganizations(variables: { distinctOn?: OrganizationsSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationsOrderBy[], where?: OrganizationsBoolExp }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ organizations: OrganizationsModelType[]}>(`query organizations($distinctOn: [organizations_select_column!], $limit: Int, $offset: Int, $orderBy: [organizations_order_by!], $where: organizations_bool_exp) { organizations(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "organizations"
    queryOrganizations_aggregate(variables: { distinctOn?: OrganizationsSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationsOrderBy[], where?: OrganizationsBoolExp }, resultSelector: string | ((qb: OrganizationsAggregateModelSelector) => OrganizationsAggregateModelSelector) = organizationsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ organizations_aggregate: OrganizationsAggregateModelType}>(`query organizations_aggregate($distinctOn: [organizations_select_column!], $limit: Int, $offset: Int, $orderBy: [organizations_order_by!], $where: organizations_bool_exp) { organizations_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "organizations" using primary key columns
    queryOrganizations_by_pk(variables: { id: any }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ organizations_by_pk: OrganizationsModelType}>(`query organizations_by_pk($id: uuid!) { organizations_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "package_versions"
    queryPackage_versions(variables: { distinctOn?: PackageVersionsSelectColumn[], limit?: number, offset?: number, orderBy?: PackageVersionsOrderBy[], where?: PackageVersionsBoolExp }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ package_versions: PackageVersionsModelType[]}>(`query package_versions($distinctOn: [package_versions_select_column!], $limit: Int, $offset: Int, $orderBy: [package_versions_order_by!], $where: package_versions_bool_exp) { package_versions(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "package_versions"
    queryPackage_versions_aggregate(variables: { distinctOn?: PackageVersionsSelectColumn[], limit?: number, offset?: number, orderBy?: PackageVersionsOrderBy[], where?: PackageVersionsBoolExp }, resultSelector: string | ((qb: PackageVersionsAggregateModelSelector) => PackageVersionsAggregateModelSelector) = packageVersionsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ package_versions_aggregate: PackageVersionsAggregateModelType}>(`query package_versions_aggregate($distinctOn: [package_versions_select_column!], $limit: Int, $offset: Int, $orderBy: [package_versions_order_by!], $where: package_versions_bool_exp) { package_versions_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "package_versions" using primary key columns
    queryPackage_versions_by_pk(variables: { id: any }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ package_versions_by_pk: PackageVersionsModelType}>(`query package_versions_by_pk($id: uuid!) { package_versions_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An array relationship
    queryProjects(variables: { distinctOn?: ProjectsSelectColumn[], limit?: number, offset?: number, orderBy?: ProjectsOrderBy[], where?: ProjectsBoolExp }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ projects: ProjectsModelType[]}>(`query projects($distinctOn: [projects_select_column!], $limit: Int, $offset: Int, $orderBy: [projects_order_by!], $where: projects_bool_exp) { projects(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An aggregate relationship
    queryProjects_aggregate(variables: { distinctOn?: ProjectsSelectColumn[], limit?: number, offset?: number, orderBy?: ProjectsOrderBy[], where?: ProjectsBoolExp }, resultSelector: string | ((qb: ProjectsAggregateModelSelector) => ProjectsAggregateModelSelector) = projectsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ projects_aggregate: ProjectsAggregateModelType}>(`query projects_aggregate($distinctOn: [projects_select_column!], $limit: Int, $offset: Int, $orderBy: [projects_order_by!], $where: projects_bool_exp) { projects_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "projects" using primary key columns
    queryProjects_by_pk(variables: { id: any }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ projects_by_pk: ProjectsModelType}>(`query projects_by_pk($id: uuid!) { projects_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An array relationship
    queryRelated_vulnerabilities(variables: { distinctOn?: RelatedVulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: RelatedVulnerabilitiesOrderBy[], where?: RelatedVulnerabilitiesBoolExp }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ related_vulnerabilities: RelatedVulnerabilitiesModelType[]}>(`query related_vulnerabilities($distinctOn: [related_vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [related_vulnerabilities_order_by!], $where: related_vulnerabilities_bool_exp) { related_vulnerabilities(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An aggregate relationship
    queryRelated_vulnerabilities_aggregate(variables: { distinctOn?: RelatedVulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: RelatedVulnerabilitiesOrderBy[], where?: RelatedVulnerabilitiesBoolExp }, resultSelector: string | ((qb: RelatedVulnerabilitiesAggregateModelSelector) => RelatedVulnerabilitiesAggregateModelSelector) = relatedVulnerabilitiesAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ related_vulnerabilities_aggregate: RelatedVulnerabilitiesAggregateModelType}>(`query related_vulnerabilities_aggregate($distinctOn: [related_vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [related_vulnerabilities_order_by!], $where: related_vulnerabilities_bool_exp) { related_vulnerabilities_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "related_vulnerabilities" using primary key columns
    queryRelated_vulnerabilities_by_pk(variables: { id: any }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ related_vulnerabilities_by_pk: RelatedVulnerabilitiesModelType}>(`query related_vulnerabilities_by_pk($id: uuid!) { related_vulnerabilities_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "reports"
    queryReports(variables: { distinctOn?: ReportsSelectColumn[], limit?: number, offset?: number, orderBy?: ReportsOrderBy[], where?: ReportsBoolExp }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ reports: ReportsModelType[]}>(`query reports($distinctOn: [reports_select_column!], $limit: Int, $offset: Int, $orderBy: [reports_order_by!], $where: reports_bool_exp) { reports(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An aggregate relationship
    queryReports_aggregate(variables: { distinctOn?: ReportsSelectColumn[], limit?: number, offset?: number, orderBy?: ReportsOrderBy[], where?: ReportsBoolExp }, resultSelector: string | ((qb: ReportsAggregateModelSelector) => ReportsAggregateModelSelector) = reportsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ reports_aggregate: ReportsAggregateModelType}>(`query reports_aggregate($distinctOn: [reports_select_column!], $limit: Int, $offset: Int, $orderBy: [reports_order_by!], $where: reports_bool_exp) { reports_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "reports" using primary key columns
    queryReports_by_pk(variables: { id: any }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ reports_by_pk: ReportsModelType}>(`query reports_by_pk($id: uuid!) { reports_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sboms"
    querySboms(variables: { distinctOn?: SbomsSelectColumn[], limit?: number, offset?: number, orderBy?: SbomsOrderBy[], where?: SbomsBoolExp }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ sboms: SbomsModelType[]}>(`query sboms($distinctOn: [sboms_select_column!], $limit: Int, $offset: Int, $orderBy: [sboms_order_by!], $where: sboms_bool_exp) { sboms(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sboms"
    querySboms_aggregate(variables: { distinctOn?: SbomsSelectColumn[], limit?: number, offset?: number, orderBy?: SbomsOrderBy[], where?: SbomsBoolExp }, resultSelector: string | ((qb: SbomsAggregateModelSelector) => SbomsAggregateModelSelector) = sbomsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ sboms_aggregate: SbomsAggregateModelType}>(`query sboms_aggregate($distinctOn: [sboms_select_column!], $limit: Int, $offset: Int, $orderBy: [sboms_order_by!], $where: sboms_bool_exp) { sboms_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sboms" using primary key columns
    querySboms_by_pk(variables: { id: any }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ sboms_by_pk: SbomsModelType}>(`query sboms_by_pk($id: uuid!) { sboms_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An array relationship
    queryScans(variables: { distinctOn?: ScansSelectColumn[], limit?: number, offset?: number, orderBy?: ScansOrderBy[], where?: ScansBoolExp }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ scans: ScansModelType[]}>(`query scans($distinctOn: [scans_select_column!], $limit: Int, $offset: Int, $orderBy: [scans_order_by!], $where: scans_bool_exp) { scans(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An aggregate relationship
    queryScans_aggregate(variables: { distinctOn?: ScansSelectColumn[], limit?: number, offset?: number, orderBy?: ScansOrderBy[], where?: ScansBoolExp }, resultSelector: string | ((qb: ScansAggregateModelSelector) => ScansAggregateModelSelector) = scansAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ scans_aggregate: ScansAggregateModelType}>(`query scans_aggregate($distinctOn: [scans_select_column!], $limit: Int, $offset: Int, $orderBy: [scans_order_by!], $where: scans_bool_exp) { scans_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "scans" using primary key columns
    queryScans_by_pk(variables: { id: any }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ scans_by_pk: ScansModelType}>(`query scans_by_pk($id: uuid!) { scans_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "settings"
    querySettings(variables: { distinctOn?: SettingsSelectColumn[], limit?: number, offset?: number, orderBy?: SettingsOrderBy[], where?: SettingsBoolExp }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ settings: SettingsModelType[]}>(`query settings($distinctOn: [settings_select_column!], $limit: Int, $offset: Int, $orderBy: [settings_order_by!], $where: settings_bool_exp) { settings(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "settings"
    querySettings_aggregate(variables: { distinctOn?: SettingsSelectColumn[], limit?: number, offset?: number, orderBy?: SettingsOrderBy[], where?: SettingsBoolExp }, resultSelector: string | ((qb: SettingsAggregateModelSelector) => SettingsAggregateModelSelector) = settingsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ settings_aggregate: SettingsAggregateModelType}>(`query settings_aggregate($distinctOn: [settings_select_column!], $limit: Int, $offset: Int, $orderBy: [settings_order_by!], $where: settings_bool_exp) { settings_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "settings" using primary key columns
    querySettings_by_pk(variables: { id: any }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ settings_by_pk: SettingsModelType}>(`query settings_by_pk($id: uuid!) { settings_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "users"
    queryUsers(variables: { distinctOn?: UsersSelectColumn[], limit?: number, offset?: number, orderBy?: UsersOrderBy[], where?: UsersBoolExp }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ users: UsersModelType[]}>(`query users($distinctOn: [users_select_column!], $limit: Int, $offset: Int, $orderBy: [users_order_by!], $where: users_bool_exp) { users(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "users"
    queryUsers_aggregate(variables: { distinctOn?: UsersSelectColumn[], limit?: number, offset?: number, orderBy?: UsersOrderBy[], where?: UsersBoolExp }, resultSelector: string | ((qb: UsersAggregateModelSelector) => UsersAggregateModelSelector) = usersAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ users_aggregate: UsersAggregateModelType}>(`query users_aggregate($distinctOn: [users_select_column!], $limit: Int, $offset: Int, $orderBy: [users_order_by!], $where: users_bool_exp) { users_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "users" using primary key columns
    queryUsers_by_pk(variables: { id: any }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ users_by_pk: UsersModelType}>(`query users_by_pk($id: uuid!) { users_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "vulnerabilities"
    queryVulnerabilities(variables: { distinctOn?: VulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilitiesOrderBy[], where?: VulnerabilitiesBoolExp }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ vulnerabilities: VulnerabilitiesModelType[]}>(`query vulnerabilities($distinctOn: [vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerabilities_order_by!], $where: vulnerabilities_bool_exp) { vulnerabilities(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "vulnerabilities"
    queryVulnerabilities_aggregate(variables: { distinctOn?: VulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilitiesOrderBy[], where?: VulnerabilitiesBoolExp }, resultSelector: string | ((qb: VulnerabilitiesAggregateModelSelector) => VulnerabilitiesAggregateModelSelector) = vulnerabilitiesAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ vulnerabilities_aggregate: VulnerabilitiesAggregateModelType}>(`query vulnerabilities_aggregate($distinctOn: [vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerabilities_order_by!], $where: vulnerabilities_bool_exp) { vulnerabilities_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "vulnerabilities" using primary key columns
    queryVulnerabilities_by_pk(variables: { id: any }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ vulnerabilities_by_pk: VulnerabilitiesModelType}>(`query vulnerabilities_by_pk($id: uuid!) { vulnerabilities_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An array relationship
    queryVulnerability_packages(variables: { distinctOn?: VulnerabilityPackagesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilityPackagesOrderBy[], where?: VulnerabilityPackagesBoolExp }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ vulnerability_packages: VulnerabilityPackagesModelType[]}>(`query vulnerability_packages($distinctOn: [vulnerability_packages_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerability_packages_order_by!], $where: vulnerability_packages_bool_exp) { vulnerability_packages(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // An aggregate relationship
    queryVulnerability_packages_aggregate(variables: { distinctOn?: VulnerabilityPackagesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilityPackagesOrderBy[], where?: VulnerabilityPackagesBoolExp }, resultSelector: string | ((qb: VulnerabilityPackagesAggregateModelSelector) => VulnerabilityPackagesAggregateModelSelector) = vulnerabilityPackagesAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ vulnerability_packages_aggregate: VulnerabilityPackagesAggregateModelType}>(`query vulnerability_packages_aggregate($distinctOn: [vulnerability_packages_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerability_packages_order_by!], $where: vulnerability_packages_bool_exp) { vulnerability_packages_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "vulnerability_packages" using primary key columns
    queryVulnerability_packages_by_pk(variables: { id: any }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ vulnerability_packages_by_pk: VulnerabilityPackagesModelType}>(`query vulnerability_packages_by_pk($id: uuid!) { vulnerability_packages_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // delete data from the table: "findings"
    mutateDelete_findings(variables: { where: FindingsBoolExp }, resultSelector: string | ((qb: FindingsMutationResponseModelSelector) => FindingsMutationResponseModelSelector) = findingsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_findings: FindingsMutationResponseModelType}>(`mutation delete_findings($where: findings_bool_exp!) { delete_findings(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "findings"
    mutateDelete_findings_by_pk(variables: { id: any }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_findings_by_pk: FindingsModelType}>(`mutation delete_findings_by_pk($id: uuid!) { delete_findings_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "organization_user"
    mutateDelete_organization_user(variables: { where: OrganizationUserBoolExp }, resultSelector: string | ((qb: OrganizationUserMutationResponseModelSelector) => OrganizationUserMutationResponseModelSelector) = organizationUserMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_organization_user: OrganizationUserMutationResponseModelType}>(`mutation delete_organization_user($where: organization_user_bool_exp!) { delete_organization_user(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "organization_user"
    mutateDelete_organization_user_by_pk(variables: { id: any }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_organization_user_by_pk: OrganizationUserModelType}>(`mutation delete_organization_user_by_pk($id: uuid!) { delete_organization_user_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "organizations"
    mutateDelete_organizations(variables: { where: OrganizationsBoolExp }, resultSelector: string | ((qb: OrganizationsMutationResponseModelSelector) => OrganizationsMutationResponseModelSelector) = organizationsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_organizations: OrganizationsMutationResponseModelType}>(`mutation delete_organizations($where: organizations_bool_exp!) { delete_organizations(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "organizations"
    mutateDelete_organizations_by_pk(variables: { id: any }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_organizations_by_pk: OrganizationsModelType}>(`mutation delete_organizations_by_pk($id: uuid!) { delete_organizations_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "package_versions"
    mutateDelete_package_versions(variables: { where: PackageVersionsBoolExp }, resultSelector: string | ((qb: PackageVersionsMutationResponseModelSelector) => PackageVersionsMutationResponseModelSelector) = packageVersionsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_package_versions: PackageVersionsMutationResponseModelType}>(`mutation delete_package_versions($where: package_versions_bool_exp!) { delete_package_versions(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "package_versions"
    mutateDelete_package_versions_by_pk(variables: { id: any }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_package_versions_by_pk: PackageVersionsModelType}>(`mutation delete_package_versions_by_pk($id: uuid!) { delete_package_versions_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "projects"
    mutateDelete_projects(variables: { where: ProjectsBoolExp }, resultSelector: string | ((qb: ProjectsMutationResponseModelSelector) => ProjectsMutationResponseModelSelector) = projectsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_projects: ProjectsMutationResponseModelType}>(`mutation delete_projects($where: projects_bool_exp!) { delete_projects(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "projects"
    mutateDelete_projects_by_pk(variables: { id: any }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_projects_by_pk: ProjectsModelType}>(`mutation delete_projects_by_pk($id: uuid!) { delete_projects_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "related_vulnerabilities"
    mutateDelete_related_vulnerabilities(variables: { where: RelatedVulnerabilitiesBoolExp }, resultSelector: string | ((qb: RelatedVulnerabilitiesMutationResponseModelSelector) => RelatedVulnerabilitiesMutationResponseModelSelector) = relatedVulnerabilitiesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_related_vulnerabilities: RelatedVulnerabilitiesMutationResponseModelType}>(`mutation delete_related_vulnerabilities($where: related_vulnerabilities_bool_exp!) { delete_related_vulnerabilities(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "related_vulnerabilities"
    mutateDelete_related_vulnerabilities_by_pk(variables: { id: any }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_related_vulnerabilities_by_pk: RelatedVulnerabilitiesModelType}>(`mutation delete_related_vulnerabilities_by_pk($id: uuid!) { delete_related_vulnerabilities_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "reports"
    mutateDelete_reports(variables: { where: ReportsBoolExp }, resultSelector: string | ((qb: ReportsMutationResponseModelSelector) => ReportsMutationResponseModelSelector) = reportsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_reports: ReportsMutationResponseModelType}>(`mutation delete_reports($where: reports_bool_exp!) { delete_reports(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "reports"
    mutateDelete_reports_by_pk(variables: { id: any }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_reports_by_pk: ReportsModelType}>(`mutation delete_reports_by_pk($id: uuid!) { delete_reports_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sboms"
    mutateDelete_sboms(variables: { where: SbomsBoolExp }, resultSelector: string | ((qb: SbomsMutationResponseModelSelector) => SbomsMutationResponseModelSelector) = sbomsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_sboms: SbomsMutationResponseModelType}>(`mutation delete_sboms($where: sboms_bool_exp!) { delete_sboms(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sboms"
    mutateDelete_sboms_by_pk(variables: { id: any }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_sboms_by_pk: SbomsModelType}>(`mutation delete_sboms_by_pk($id: uuid!) { delete_sboms_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "scans"
    mutateDelete_scans(variables: { where: ScansBoolExp }, resultSelector: string | ((qb: ScansMutationResponseModelSelector) => ScansMutationResponseModelSelector) = scansMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_scans: ScansMutationResponseModelType}>(`mutation delete_scans($where: scans_bool_exp!) { delete_scans(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "scans"
    mutateDelete_scans_by_pk(variables: { id: any }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_scans_by_pk: ScansModelType}>(`mutation delete_scans_by_pk($id: uuid!) { delete_scans_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "settings"
    mutateDelete_settings(variables: { where: SettingsBoolExp }, resultSelector: string | ((qb: SettingsMutationResponseModelSelector) => SettingsMutationResponseModelSelector) = settingsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_settings: SettingsMutationResponseModelType}>(`mutation delete_settings($where: settings_bool_exp!) { delete_settings(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "settings"
    mutateDelete_settings_by_pk(variables: { id: any }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_settings_by_pk: SettingsModelType}>(`mutation delete_settings_by_pk($id: uuid!) { delete_settings_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "users"
    mutateDelete_users(variables: { where: UsersBoolExp }, resultSelector: string | ((qb: UsersMutationResponseModelSelector) => UsersMutationResponseModelSelector) = usersMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_users: UsersMutationResponseModelType}>(`mutation delete_users($where: users_bool_exp!) { delete_users(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "users"
    mutateDelete_users_by_pk(variables: { id: any }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_users_by_pk: UsersModelType}>(`mutation delete_users_by_pk($id: uuid!) { delete_users_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "vulnerabilities"
    mutateDelete_vulnerabilities(variables: { where: VulnerabilitiesBoolExp }, resultSelector: string | ((qb: VulnerabilitiesMutationResponseModelSelector) => VulnerabilitiesMutationResponseModelSelector) = vulnerabilitiesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_vulnerabilities: VulnerabilitiesMutationResponseModelType}>(`mutation delete_vulnerabilities($where: vulnerabilities_bool_exp!) { delete_vulnerabilities(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "vulnerabilities"
    mutateDelete_vulnerabilities_by_pk(variables: { id: any }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_vulnerabilities_by_pk: VulnerabilitiesModelType}>(`mutation delete_vulnerabilities_by_pk($id: uuid!) { delete_vulnerabilities_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "vulnerability_packages"
    mutateDelete_vulnerability_packages(variables: { where: VulnerabilityPackagesBoolExp }, resultSelector: string | ((qb: VulnerabilityPackagesMutationResponseModelSelector) => VulnerabilityPackagesMutationResponseModelSelector) = vulnerabilityPackagesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_vulnerability_packages: VulnerabilityPackagesMutationResponseModelType}>(`mutation delete_vulnerability_packages($where: vulnerability_packages_bool_exp!) { delete_vulnerability_packages(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "vulnerability_packages"
    mutateDelete_vulnerability_packages_by_pk(variables: { id: any }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_vulnerability_packages_by_pk: VulnerabilityPackagesModelType}>(`mutation delete_vulnerability_packages_by_pk($id: uuid!) { delete_vulnerability_packages_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "findings"
    mutateInsert_findings(variables: { objects: FindingsInsertInput[], onConflict?: FindingsOnConflict }, resultSelector: string | ((qb: FindingsMutationResponseModelSelector) => FindingsMutationResponseModelSelector) = findingsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_findings: FindingsMutationResponseModelType}>(`mutation insert_findings($objects: [findings_insert_input!]!, $onConflict: findings_on_conflict) { insert_findings(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "findings"
    mutateInsert_findings_one(variables: { object: FindingsInsertInput, onConflict?: FindingsOnConflict }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_findings_one: FindingsModelType}>(`mutation insert_findings_one($object: findings_insert_input!, $onConflict: findings_on_conflict) { insert_findings_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "organization_user"
    mutateInsert_organization_user(variables: { objects: OrganizationUserInsertInput[], onConflict?: OrganizationUserOnConflict }, resultSelector: string | ((qb: OrganizationUserMutationResponseModelSelector) => OrganizationUserMutationResponseModelSelector) = organizationUserMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_organization_user: OrganizationUserMutationResponseModelType}>(`mutation insert_organization_user($objects: [organization_user_insert_input!]!, $onConflict: organization_user_on_conflict) { insert_organization_user(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "organization_user"
    mutateInsert_organization_user_one(variables: { object: OrganizationUserInsertInput, onConflict?: OrganizationUserOnConflict }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_organization_user_one: OrganizationUserModelType}>(`mutation insert_organization_user_one($object: organization_user_insert_input!, $onConflict: organization_user_on_conflict) { insert_organization_user_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "organizations"
    mutateInsert_organizations(variables: { objects: OrganizationsInsertInput[], onConflict?: OrganizationsOnConflict }, resultSelector: string | ((qb: OrganizationsMutationResponseModelSelector) => OrganizationsMutationResponseModelSelector) = organizationsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_organizations: OrganizationsMutationResponseModelType}>(`mutation insert_organizations($objects: [organizations_insert_input!]!, $onConflict: organizations_on_conflict) { insert_organizations(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "organizations"
    mutateInsert_organizations_one(variables: { object: OrganizationsInsertInput, onConflict?: OrganizationsOnConflict }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_organizations_one: OrganizationsModelType}>(`mutation insert_organizations_one($object: organizations_insert_input!, $onConflict: organizations_on_conflict) { insert_organizations_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "package_versions"
    mutateInsert_package_versions(variables: { objects: PackageVersionsInsertInput[], onConflict?: PackageVersionsOnConflict }, resultSelector: string | ((qb: PackageVersionsMutationResponseModelSelector) => PackageVersionsMutationResponseModelSelector) = packageVersionsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_package_versions: PackageVersionsMutationResponseModelType}>(`mutation insert_package_versions($objects: [package_versions_insert_input!]!, $onConflict: package_versions_on_conflict) { insert_package_versions(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "package_versions"
    mutateInsert_package_versions_one(variables: { object: PackageVersionsInsertInput, onConflict?: PackageVersionsOnConflict }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_package_versions_one: PackageVersionsModelType}>(`mutation insert_package_versions_one($object: package_versions_insert_input!, $onConflict: package_versions_on_conflict) { insert_package_versions_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "projects"
    mutateInsert_projects(variables: { objects: ProjectsInsertInput[], onConflict?: ProjectsOnConflict }, resultSelector: string | ((qb: ProjectsMutationResponseModelSelector) => ProjectsMutationResponseModelSelector) = projectsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_projects: ProjectsMutationResponseModelType}>(`mutation insert_projects($objects: [projects_insert_input!]!, $onConflict: projects_on_conflict) { insert_projects(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "projects"
    mutateInsert_projects_one(variables: { object: ProjectsInsertInput, onConflict?: ProjectsOnConflict }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_projects_one: ProjectsModelType}>(`mutation insert_projects_one($object: projects_insert_input!, $onConflict: projects_on_conflict) { insert_projects_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "related_vulnerabilities"
    mutateInsert_related_vulnerabilities(variables: { objects: RelatedVulnerabilitiesInsertInput[], onConflict?: RelatedVulnerabilitiesOnConflict }, resultSelector: string | ((qb: RelatedVulnerabilitiesMutationResponseModelSelector) => RelatedVulnerabilitiesMutationResponseModelSelector) = relatedVulnerabilitiesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_related_vulnerabilities: RelatedVulnerabilitiesMutationResponseModelType}>(`mutation insert_related_vulnerabilities($objects: [related_vulnerabilities_insert_input!]!, $onConflict: related_vulnerabilities_on_conflict) { insert_related_vulnerabilities(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "related_vulnerabilities"
    mutateInsert_related_vulnerabilities_one(variables: { object: RelatedVulnerabilitiesInsertInput, onConflict?: RelatedVulnerabilitiesOnConflict }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_related_vulnerabilities_one: RelatedVulnerabilitiesModelType}>(`mutation insert_related_vulnerabilities_one($object: related_vulnerabilities_insert_input!, $onConflict: related_vulnerabilities_on_conflict) { insert_related_vulnerabilities_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "reports"
    mutateInsert_reports(variables: { objects: ReportsInsertInput[], onConflict?: ReportsOnConflict }, resultSelector: string | ((qb: ReportsMutationResponseModelSelector) => ReportsMutationResponseModelSelector) = reportsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_reports: ReportsMutationResponseModelType}>(`mutation insert_reports($objects: [reports_insert_input!]!, $onConflict: reports_on_conflict) { insert_reports(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "reports"
    mutateInsert_reports_one(variables: { object: ReportsInsertInput, onConflict?: ReportsOnConflict }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_reports_one: ReportsModelType}>(`mutation insert_reports_one($object: reports_insert_input!, $onConflict: reports_on_conflict) { insert_reports_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sboms"
    mutateInsert_sboms(variables: { objects: SbomsInsertInput[], onConflict?: SbomsOnConflict }, resultSelector: string | ((qb: SbomsMutationResponseModelSelector) => SbomsMutationResponseModelSelector) = sbomsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_sboms: SbomsMutationResponseModelType}>(`mutation insert_sboms($objects: [sboms_insert_input!]!, $onConflict: sboms_on_conflict) { insert_sboms(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sboms"
    mutateInsert_sboms_one(variables: { object: SbomsInsertInput, onConflict?: SbomsOnConflict }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_sboms_one: SbomsModelType}>(`mutation insert_sboms_one($object: sboms_insert_input!, $onConflict: sboms_on_conflict) { insert_sboms_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "scans"
    mutateInsert_scans(variables: { objects: ScansInsertInput[], onConflict?: ScansOnConflict }, resultSelector: string | ((qb: ScansMutationResponseModelSelector) => ScansMutationResponseModelSelector) = scansMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_scans: ScansMutationResponseModelType}>(`mutation insert_scans($objects: [scans_insert_input!]!, $onConflict: scans_on_conflict) { insert_scans(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "scans"
    mutateInsert_scans_one(variables: { object: ScansInsertInput, onConflict?: ScansOnConflict }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_scans_one: ScansModelType}>(`mutation insert_scans_one($object: scans_insert_input!, $onConflict: scans_on_conflict) { insert_scans_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "settings"
    mutateInsert_settings(variables: { objects: SettingsInsertInput[], onConflict?: SettingsOnConflict }, resultSelector: string | ((qb: SettingsMutationResponseModelSelector) => SettingsMutationResponseModelSelector) = settingsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_settings: SettingsMutationResponseModelType}>(`mutation insert_settings($objects: [settings_insert_input!]!, $onConflict: settings_on_conflict) { insert_settings(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "settings"
    mutateInsert_settings_one(variables: { object: SettingsInsertInput, onConflict?: SettingsOnConflict }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_settings_one: SettingsModelType}>(`mutation insert_settings_one($object: settings_insert_input!, $onConflict: settings_on_conflict) { insert_settings_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "users"
    mutateInsert_users(variables: { objects: UsersInsertInput[], onConflict?: UsersOnConflict }, resultSelector: string | ((qb: UsersMutationResponseModelSelector) => UsersMutationResponseModelSelector) = usersMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_users: UsersMutationResponseModelType}>(`mutation insert_users($objects: [users_insert_input!]!, $onConflict: users_on_conflict) { insert_users(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "users"
    mutateInsert_users_one(variables: { object: UsersInsertInput, onConflict?: UsersOnConflict }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_users_one: UsersModelType}>(`mutation insert_users_one($object: users_insert_input!, $onConflict: users_on_conflict) { insert_users_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "vulnerabilities"
    mutateInsert_vulnerabilities(variables: { objects: VulnerabilitiesInsertInput[], onConflict?: VulnerabilitiesOnConflict }, resultSelector: string | ((qb: VulnerabilitiesMutationResponseModelSelector) => VulnerabilitiesMutationResponseModelSelector) = vulnerabilitiesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_vulnerabilities: VulnerabilitiesMutationResponseModelType}>(`mutation insert_vulnerabilities($objects: [vulnerabilities_insert_input!]!, $onConflict: vulnerabilities_on_conflict) { insert_vulnerabilities(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "vulnerabilities"
    mutateInsert_vulnerabilities_one(variables: { object: VulnerabilitiesInsertInput, onConflict?: VulnerabilitiesOnConflict }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_vulnerabilities_one: VulnerabilitiesModelType}>(`mutation insert_vulnerabilities_one($object: vulnerabilities_insert_input!, $onConflict: vulnerabilities_on_conflict) { insert_vulnerabilities_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "vulnerability_packages"
    mutateInsert_vulnerability_packages(variables: { objects: VulnerabilityPackagesInsertInput[], onConflict?: VulnerabilityPackagesOnConflict }, resultSelector: string | ((qb: VulnerabilityPackagesMutationResponseModelSelector) => VulnerabilityPackagesMutationResponseModelSelector) = vulnerabilityPackagesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_vulnerability_packages: VulnerabilityPackagesMutationResponseModelType}>(`mutation insert_vulnerability_packages($objects: [vulnerability_packages_insert_input!]!, $onConflict: vulnerability_packages_on_conflict) { insert_vulnerability_packages(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "vulnerability_packages"
    mutateInsert_vulnerability_packages_one(variables: { object: VulnerabilityPackagesInsertInput, onConflict?: VulnerabilityPackagesOnConflict }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_vulnerability_packages_one: VulnerabilityPackagesModelType}>(`mutation insert_vulnerability_packages_one($object: vulnerability_packages_insert_input!, $onConflict: vulnerability_packages_on_conflict) { insert_vulnerability_packages_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "findings"
    mutateUpdate_findings(variables: { set?: FindingsSetInput, where: FindingsBoolExp }, resultSelector: string | ((qb: FindingsMutationResponseModelSelector) => FindingsMutationResponseModelSelector) = findingsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_findings: FindingsMutationResponseModelType}>(`mutation update_findings($set: findings_set_input, $where: findings_bool_exp!) { update_findings(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "findings"
    mutateUpdate_findings_by_pk(variables: { set?: FindingsSetInput, pkColumns: FindingsPkColumnsInput }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_findings_by_pk: FindingsModelType}>(`mutation update_findings_by_pk($set: findings_set_input, $pkColumns: findings_pk_columns_input!) { update_findings_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "organization_user"
    mutateUpdate_organization_user(variables: { set?: OrganizationUserSetInput, where: OrganizationUserBoolExp }, resultSelector: string | ((qb: OrganizationUserMutationResponseModelSelector) => OrganizationUserMutationResponseModelSelector) = organizationUserMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_organization_user: OrganizationUserMutationResponseModelType}>(`mutation update_organization_user($set: organization_user_set_input, $where: organization_user_bool_exp!) { update_organization_user(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "organization_user"
    mutateUpdate_organization_user_by_pk(variables: { set?: OrganizationUserSetInput, pkColumns: OrganizationUserPkColumnsInput }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_organization_user_by_pk: OrganizationUserModelType}>(`mutation update_organization_user_by_pk($set: organization_user_set_input, $pkColumns: organization_user_pk_columns_input!) { update_organization_user_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "organizations"
    mutateUpdate_organizations(variables: { set?: OrganizationsSetInput, where: OrganizationsBoolExp }, resultSelector: string | ((qb: OrganizationsMutationResponseModelSelector) => OrganizationsMutationResponseModelSelector) = organizationsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_organizations: OrganizationsMutationResponseModelType}>(`mutation update_organizations($set: organizations_set_input, $where: organizations_bool_exp!) { update_organizations(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "organizations"
    mutateUpdate_organizations_by_pk(variables: { set?: OrganizationsSetInput, pkColumns: OrganizationsPkColumnsInput }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_organizations_by_pk: OrganizationsModelType}>(`mutation update_organizations_by_pk($set: organizations_set_input, $pkColumns: organizations_pk_columns_input!) { update_organizations_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "package_versions"
    mutateUpdate_package_versions(variables: { set?: PackageVersionsSetInput, where: PackageVersionsBoolExp }, resultSelector: string | ((qb: PackageVersionsMutationResponseModelSelector) => PackageVersionsMutationResponseModelSelector) = packageVersionsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_package_versions: PackageVersionsMutationResponseModelType}>(`mutation update_package_versions($set: package_versions_set_input, $where: package_versions_bool_exp!) { update_package_versions(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "package_versions"
    mutateUpdate_package_versions_by_pk(variables: { set?: PackageVersionsSetInput, pkColumns: PackageVersionsPkColumnsInput }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_package_versions_by_pk: PackageVersionsModelType}>(`mutation update_package_versions_by_pk($set: package_versions_set_input, $pkColumns: package_versions_pk_columns_input!) { update_package_versions_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "projects"
    mutateUpdate_projects(variables: { set?: ProjectsSetInput, where: ProjectsBoolExp }, resultSelector: string | ((qb: ProjectsMutationResponseModelSelector) => ProjectsMutationResponseModelSelector) = projectsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_projects: ProjectsMutationResponseModelType}>(`mutation update_projects($set: projects_set_input, $where: projects_bool_exp!) { update_projects(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "projects"
    mutateUpdate_projects_by_pk(variables: { set?: ProjectsSetInput, pkColumns: ProjectsPkColumnsInput }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_projects_by_pk: ProjectsModelType}>(`mutation update_projects_by_pk($set: projects_set_input, $pkColumns: projects_pk_columns_input!) { update_projects_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "related_vulnerabilities"
    mutateUpdate_related_vulnerabilities(variables: { set?: RelatedVulnerabilitiesSetInput, where: RelatedVulnerabilitiesBoolExp }, resultSelector: string | ((qb: RelatedVulnerabilitiesMutationResponseModelSelector) => RelatedVulnerabilitiesMutationResponseModelSelector) = relatedVulnerabilitiesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_related_vulnerabilities: RelatedVulnerabilitiesMutationResponseModelType}>(`mutation update_related_vulnerabilities($set: related_vulnerabilities_set_input, $where: related_vulnerabilities_bool_exp!) { update_related_vulnerabilities(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "related_vulnerabilities"
    mutateUpdate_related_vulnerabilities_by_pk(variables: { set?: RelatedVulnerabilitiesSetInput, pkColumns: RelatedVulnerabilitiesPkColumnsInput }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_related_vulnerabilities_by_pk: RelatedVulnerabilitiesModelType}>(`mutation update_related_vulnerabilities_by_pk($set: related_vulnerabilities_set_input, $pkColumns: related_vulnerabilities_pk_columns_input!) { update_related_vulnerabilities_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "reports"
    mutateUpdate_reports(variables: { set?: ReportsSetInput, where: ReportsBoolExp }, resultSelector: string | ((qb: ReportsMutationResponseModelSelector) => ReportsMutationResponseModelSelector) = reportsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_reports: ReportsMutationResponseModelType}>(`mutation update_reports($set: reports_set_input, $where: reports_bool_exp!) { update_reports(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "reports"
    mutateUpdate_reports_by_pk(variables: { set?: ReportsSetInput, pkColumns: ReportsPkColumnsInput }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_reports_by_pk: ReportsModelType}>(`mutation update_reports_by_pk($set: reports_set_input, $pkColumns: reports_pk_columns_input!) { update_reports_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sboms"
    mutateUpdate_sboms(variables: { set?: SbomsSetInput, where: SbomsBoolExp }, resultSelector: string | ((qb: SbomsMutationResponseModelSelector) => SbomsMutationResponseModelSelector) = sbomsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_sboms: SbomsMutationResponseModelType}>(`mutation update_sboms($set: sboms_set_input, $where: sboms_bool_exp!) { update_sboms(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sboms"
    mutateUpdate_sboms_by_pk(variables: { set?: SbomsSetInput, pkColumns: SbomsPkColumnsInput }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_sboms_by_pk: SbomsModelType}>(`mutation update_sboms_by_pk($set: sboms_set_input, $pkColumns: sboms_pk_columns_input!) { update_sboms_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "scans"
    mutateUpdate_scans(variables: { set?: ScansSetInput, where: ScansBoolExp }, resultSelector: string | ((qb: ScansMutationResponseModelSelector) => ScansMutationResponseModelSelector) = scansMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_scans: ScansMutationResponseModelType}>(`mutation update_scans($set: scans_set_input, $where: scans_bool_exp!) { update_scans(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "scans"
    mutateUpdate_scans_by_pk(variables: { set?: ScansSetInput, pkColumns: ScansPkColumnsInput }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_scans_by_pk: ScansModelType}>(`mutation update_scans_by_pk($set: scans_set_input, $pkColumns: scans_pk_columns_input!) { update_scans_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "settings"
    mutateUpdate_settings(variables: { set?: SettingsSetInput, where: SettingsBoolExp }, resultSelector: string | ((qb: SettingsMutationResponseModelSelector) => SettingsMutationResponseModelSelector) = settingsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_settings: SettingsMutationResponseModelType}>(`mutation update_settings($set: settings_set_input, $where: settings_bool_exp!) { update_settings(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "settings"
    mutateUpdate_settings_by_pk(variables: { set?: SettingsSetInput, pkColumns: SettingsPkColumnsInput }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_settings_by_pk: SettingsModelType}>(`mutation update_settings_by_pk($set: settings_set_input, $pkColumns: settings_pk_columns_input!) { update_settings_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "users"
    mutateUpdate_users(variables: { set?: UsersSetInput, where: UsersBoolExp }, resultSelector: string | ((qb: UsersMutationResponseModelSelector) => UsersMutationResponseModelSelector) = usersMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_users: UsersMutationResponseModelType}>(`mutation update_users($set: users_set_input, $where: users_bool_exp!) { update_users(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "users"
    mutateUpdate_users_by_pk(variables: { set?: UsersSetInput, pkColumns: UsersPkColumnsInput }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_users_by_pk: UsersModelType}>(`mutation update_users_by_pk($set: users_set_input, $pkColumns: users_pk_columns_input!) { update_users_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "vulnerabilities"
    mutateUpdate_vulnerabilities(variables: { inc?: VulnerabilitiesIncInput, set?: VulnerabilitiesSetInput, where: VulnerabilitiesBoolExp }, resultSelector: string | ((qb: VulnerabilitiesMutationResponseModelSelector) => VulnerabilitiesMutationResponseModelSelector) = vulnerabilitiesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_vulnerabilities: VulnerabilitiesMutationResponseModelType}>(`mutation update_vulnerabilities($inc: vulnerabilities_inc_input, $set: vulnerabilities_set_input, $where: vulnerabilities_bool_exp!) { update_vulnerabilities(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "vulnerabilities"
    mutateUpdate_vulnerabilities_by_pk(variables: { inc?: VulnerabilitiesIncInput, set?: VulnerabilitiesSetInput, pkColumns: VulnerabilitiesPkColumnsInput }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_vulnerabilities_by_pk: VulnerabilitiesModelType}>(`mutation update_vulnerabilities_by_pk($inc: vulnerabilities_inc_input, $set: vulnerabilities_set_input, $pkColumns: vulnerabilities_pk_columns_input!) { update_vulnerabilities_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "vulnerability_packages"
    mutateUpdate_vulnerability_packages(variables: { set?: VulnerabilityPackagesSetInput, where: VulnerabilityPackagesBoolExp }, resultSelector: string | ((qb: VulnerabilityPackagesMutationResponseModelSelector) => VulnerabilityPackagesMutationResponseModelSelector) = vulnerabilityPackagesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_vulnerability_packages: VulnerabilityPackagesMutationResponseModelType}>(`mutation update_vulnerability_packages($set: vulnerability_packages_set_input, $where: vulnerability_packages_bool_exp!) { update_vulnerability_packages(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "vulnerability_packages"
    mutateUpdate_vulnerability_packages_by_pk(variables: { set?: VulnerabilityPackagesSetInput, pkColumns: VulnerabilityPackagesPkColumnsInput }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_vulnerability_packages_by_pk: VulnerabilityPackagesModelType}>(`mutation update_vulnerability_packages_by_pk($set: vulnerability_packages_set_input, $pkColumns: vulnerability_packages_pk_columns_input!) { update_vulnerability_packages_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // An array relationship
    subscribeFindings(variables: { distinctOn?: FindingsSelectColumn[], limit?: number, offset?: number, orderBy?: FindingsOrderBy[], where?: FindingsBoolExp }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ findings: FindingsModelType[]}>(`subscription findings($distinctOn: [findings_select_column!], $limit: Int, $offset: Int, $orderBy: [findings_order_by!], $where: findings_bool_exp) { findings(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An aggregate relationship
    subscribeFindings_aggregate(variables: { distinctOn?: FindingsSelectColumn[], limit?: number, offset?: number, orderBy?: FindingsOrderBy[], where?: FindingsBoolExp }, resultSelector: string | ((qb: FindingsAggregateModelSelector) => FindingsAggregateModelSelector) = findingsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ findings_aggregate: FindingsAggregateModelType}>(`subscription findings_aggregate($distinctOn: [findings_select_column!], $limit: Int, $offset: Int, $orderBy: [findings_order_by!], $where: findings_bool_exp) { findings_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "findings" using primary key columns
    subscribeFindings_by_pk(variables: { id: any }, resultSelector: string | ((qb: FindingsModelSelector) => FindingsModelSelector) = findingsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ findings_by_pk: FindingsModelType}>(`subscription findings_by_pk($id: uuid!) { findings_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new FindingsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "organization_user"
    subscribeOrganization_user(variables: { distinctOn?: OrganizationUserSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationUserOrderBy[], where?: OrganizationUserBoolExp }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ organization_user: OrganizationUserModelType[]}>(`subscription organization_user($distinctOn: [organization_user_select_column!], $limit: Int, $offset: Int, $orderBy: [organization_user_order_by!], $where: organization_user_bool_exp) { organization_user(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "organization_user"
    subscribeOrganization_user_aggregate(variables: { distinctOn?: OrganizationUserSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationUserOrderBy[], where?: OrganizationUserBoolExp }, resultSelector: string | ((qb: OrganizationUserAggregateModelSelector) => OrganizationUserAggregateModelSelector) = organizationUserAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ organization_user_aggregate: OrganizationUserAggregateModelType}>(`subscription organization_user_aggregate($distinctOn: [organization_user_select_column!], $limit: Int, $offset: Int, $orderBy: [organization_user_order_by!], $where: organization_user_bool_exp) { organization_user_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "organization_user" using primary key columns
    subscribeOrganization_user_by_pk(variables: { id: any }, resultSelector: string | ((qb: OrganizationUserModelSelector) => OrganizationUserModelSelector) = organizationUserModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ organization_user_by_pk: OrganizationUserModelType}>(`subscription organization_user_by_pk($id: uuid!) { organization_user_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationUserModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "organizations"
    subscribeOrganizations(variables: { distinctOn?: OrganizationsSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationsOrderBy[], where?: OrganizationsBoolExp }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ organizations: OrganizationsModelType[]}>(`subscription organizations($distinctOn: [organizations_select_column!], $limit: Int, $offset: Int, $orderBy: [organizations_order_by!], $where: organizations_bool_exp) { organizations(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "organizations"
    subscribeOrganizations_aggregate(variables: { distinctOn?: OrganizationsSelectColumn[], limit?: number, offset?: number, orderBy?: OrganizationsOrderBy[], where?: OrganizationsBoolExp }, resultSelector: string | ((qb: OrganizationsAggregateModelSelector) => OrganizationsAggregateModelSelector) = organizationsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ organizations_aggregate: OrganizationsAggregateModelType}>(`subscription organizations_aggregate($distinctOn: [organizations_select_column!], $limit: Int, $offset: Int, $orderBy: [organizations_order_by!], $where: organizations_bool_exp) { organizations_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "organizations" using primary key columns
    subscribeOrganizations_by_pk(variables: { id: any }, resultSelector: string | ((qb: OrganizationsModelSelector) => OrganizationsModelSelector) = organizationsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ organizations_by_pk: OrganizationsModelType}>(`subscription organizations_by_pk($id: uuid!) { organizations_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new OrganizationsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "package_versions"
    subscribePackage_versions(variables: { distinctOn?: PackageVersionsSelectColumn[], limit?: number, offset?: number, orderBy?: PackageVersionsOrderBy[], where?: PackageVersionsBoolExp }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ package_versions: PackageVersionsModelType[]}>(`subscription package_versions($distinctOn: [package_versions_select_column!], $limit: Int, $offset: Int, $orderBy: [package_versions_order_by!], $where: package_versions_bool_exp) { package_versions(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "package_versions"
    subscribePackage_versions_aggregate(variables: { distinctOn?: PackageVersionsSelectColumn[], limit?: number, offset?: number, orderBy?: PackageVersionsOrderBy[], where?: PackageVersionsBoolExp }, resultSelector: string | ((qb: PackageVersionsAggregateModelSelector) => PackageVersionsAggregateModelSelector) = packageVersionsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ package_versions_aggregate: PackageVersionsAggregateModelType}>(`subscription package_versions_aggregate($distinctOn: [package_versions_select_column!], $limit: Int, $offset: Int, $orderBy: [package_versions_order_by!], $where: package_versions_bool_exp) { package_versions_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "package_versions" using primary key columns
    subscribePackage_versions_by_pk(variables: { id: any }, resultSelector: string | ((qb: PackageVersionsModelSelector) => PackageVersionsModelSelector) = packageVersionsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ package_versions_by_pk: PackageVersionsModelType}>(`subscription package_versions_by_pk($id: uuid!) { package_versions_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PackageVersionsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An array relationship
    subscribeProjects(variables: { distinctOn?: ProjectsSelectColumn[], limit?: number, offset?: number, orderBy?: ProjectsOrderBy[], where?: ProjectsBoolExp }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ projects: ProjectsModelType[]}>(`subscription projects($distinctOn: [projects_select_column!], $limit: Int, $offset: Int, $orderBy: [projects_order_by!], $where: projects_bool_exp) { projects(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An aggregate relationship
    subscribeProjects_aggregate(variables: { distinctOn?: ProjectsSelectColumn[], limit?: number, offset?: number, orderBy?: ProjectsOrderBy[], where?: ProjectsBoolExp }, resultSelector: string | ((qb: ProjectsAggregateModelSelector) => ProjectsAggregateModelSelector) = projectsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ projects_aggregate: ProjectsAggregateModelType}>(`subscription projects_aggregate($distinctOn: [projects_select_column!], $limit: Int, $offset: Int, $orderBy: [projects_order_by!], $where: projects_bool_exp) { projects_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "projects" using primary key columns
    subscribeProjects_by_pk(variables: { id: any }, resultSelector: string | ((qb: ProjectsModelSelector) => ProjectsModelSelector) = projectsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ projects_by_pk: ProjectsModelType}>(`subscription projects_by_pk($id: uuid!) { projects_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ProjectsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An array relationship
    subscribeRelated_vulnerabilities(variables: { distinctOn?: RelatedVulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: RelatedVulnerabilitiesOrderBy[], where?: RelatedVulnerabilitiesBoolExp }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ related_vulnerabilities: RelatedVulnerabilitiesModelType[]}>(`subscription related_vulnerabilities($distinctOn: [related_vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [related_vulnerabilities_order_by!], $where: related_vulnerabilities_bool_exp) { related_vulnerabilities(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An aggregate relationship
    subscribeRelated_vulnerabilities_aggregate(variables: { distinctOn?: RelatedVulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: RelatedVulnerabilitiesOrderBy[], where?: RelatedVulnerabilitiesBoolExp }, resultSelector: string | ((qb: RelatedVulnerabilitiesAggregateModelSelector) => RelatedVulnerabilitiesAggregateModelSelector) = relatedVulnerabilitiesAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ related_vulnerabilities_aggregate: RelatedVulnerabilitiesAggregateModelType}>(`subscription related_vulnerabilities_aggregate($distinctOn: [related_vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [related_vulnerabilities_order_by!], $where: related_vulnerabilities_bool_exp) { related_vulnerabilities_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "related_vulnerabilities" using primary key columns
    subscribeRelated_vulnerabilities_by_pk(variables: { id: any }, resultSelector: string | ((qb: RelatedVulnerabilitiesModelSelector) => RelatedVulnerabilitiesModelSelector) = relatedVulnerabilitiesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ related_vulnerabilities_by_pk: RelatedVulnerabilitiesModelType}>(`subscription related_vulnerabilities_by_pk($id: uuid!) { related_vulnerabilities_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new RelatedVulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "reports"
    subscribeReports(variables: { distinctOn?: ReportsSelectColumn[], limit?: number, offset?: number, orderBy?: ReportsOrderBy[], where?: ReportsBoolExp }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ reports: ReportsModelType[]}>(`subscription reports($distinctOn: [reports_select_column!], $limit: Int, $offset: Int, $orderBy: [reports_order_by!], $where: reports_bool_exp) { reports(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An aggregate relationship
    subscribeReports_aggregate(variables: { distinctOn?: ReportsSelectColumn[], limit?: number, offset?: number, orderBy?: ReportsOrderBy[], where?: ReportsBoolExp }, resultSelector: string | ((qb: ReportsAggregateModelSelector) => ReportsAggregateModelSelector) = reportsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ reports_aggregate: ReportsAggregateModelType}>(`subscription reports_aggregate($distinctOn: [reports_select_column!], $limit: Int, $offset: Int, $orderBy: [reports_order_by!], $where: reports_bool_exp) { reports_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "reports" using primary key columns
    subscribeReports_by_pk(variables: { id: any }, resultSelector: string | ((qb: ReportsModelSelector) => ReportsModelSelector) = reportsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ reports_by_pk: ReportsModelType}>(`subscription reports_by_pk($id: uuid!) { reports_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ReportsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "sboms"
    subscribeSboms(variables: { distinctOn?: SbomsSelectColumn[], limit?: number, offset?: number, orderBy?: SbomsOrderBy[], where?: SbomsBoolExp }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ sboms: SbomsModelType[]}>(`subscription sboms($distinctOn: [sboms_select_column!], $limit: Int, $offset: Int, $orderBy: [sboms_order_by!], $where: sboms_bool_exp) { sboms(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "sboms"
    subscribeSboms_aggregate(variables: { distinctOn?: SbomsSelectColumn[], limit?: number, offset?: number, orderBy?: SbomsOrderBy[], where?: SbomsBoolExp }, resultSelector: string | ((qb: SbomsAggregateModelSelector) => SbomsAggregateModelSelector) = sbomsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ sboms_aggregate: SbomsAggregateModelType}>(`subscription sboms_aggregate($distinctOn: [sboms_select_column!], $limit: Int, $offset: Int, $orderBy: [sboms_order_by!], $where: sboms_bool_exp) { sboms_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "sboms" using primary key columns
    subscribeSboms_by_pk(variables: { id: any }, resultSelector: string | ((qb: SbomsModelSelector) => SbomsModelSelector) = sbomsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ sboms_by_pk: SbomsModelType}>(`subscription sboms_by_pk($id: uuid!) { sboms_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SbomsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An array relationship
    subscribeScans(variables: { distinctOn?: ScansSelectColumn[], limit?: number, offset?: number, orderBy?: ScansOrderBy[], where?: ScansBoolExp }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ scans: ScansModelType[]}>(`subscription scans($distinctOn: [scans_select_column!], $limit: Int, $offset: Int, $orderBy: [scans_order_by!], $where: scans_bool_exp) { scans(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An aggregate relationship
    subscribeScans_aggregate(variables: { distinctOn?: ScansSelectColumn[], limit?: number, offset?: number, orderBy?: ScansOrderBy[], where?: ScansBoolExp }, resultSelector: string | ((qb: ScansAggregateModelSelector) => ScansAggregateModelSelector) = scansAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ scans_aggregate: ScansAggregateModelType}>(`subscription scans_aggregate($distinctOn: [scans_select_column!], $limit: Int, $offset: Int, $orderBy: [scans_order_by!], $where: scans_bool_exp) { scans_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "scans" using primary key columns
    subscribeScans_by_pk(variables: { id: any }, resultSelector: string | ((qb: ScansModelSelector) => ScansModelSelector) = scansModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ scans_by_pk: ScansModelType}>(`subscription scans_by_pk($id: uuid!) { scans_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ScansModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "settings"
    subscribeSettings(variables: { distinctOn?: SettingsSelectColumn[], limit?: number, offset?: number, orderBy?: SettingsOrderBy[], where?: SettingsBoolExp }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ settings: SettingsModelType[]}>(`subscription settings($distinctOn: [settings_select_column!], $limit: Int, $offset: Int, $orderBy: [settings_order_by!], $where: settings_bool_exp) { settings(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "settings"
    subscribeSettings_aggregate(variables: { distinctOn?: SettingsSelectColumn[], limit?: number, offset?: number, orderBy?: SettingsOrderBy[], where?: SettingsBoolExp }, resultSelector: string | ((qb: SettingsAggregateModelSelector) => SettingsAggregateModelSelector) = settingsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ settings_aggregate: SettingsAggregateModelType}>(`subscription settings_aggregate($distinctOn: [settings_select_column!], $limit: Int, $offset: Int, $orderBy: [settings_order_by!], $where: settings_bool_exp) { settings_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "settings" using primary key columns
    subscribeSettings_by_pk(variables: { id: any }, resultSelector: string | ((qb: SettingsModelSelector) => SettingsModelSelector) = settingsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ settings_by_pk: SettingsModelType}>(`subscription settings_by_pk($id: uuid!) { settings_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SettingsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "users"
    subscribeUsers(variables: { distinctOn?: UsersSelectColumn[], limit?: number, offset?: number, orderBy?: UsersOrderBy[], where?: UsersBoolExp }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ users: UsersModelType[]}>(`subscription users($distinctOn: [users_select_column!], $limit: Int, $offset: Int, $orderBy: [users_order_by!], $where: users_bool_exp) { users(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "users"
    subscribeUsers_aggregate(variables: { distinctOn?: UsersSelectColumn[], limit?: number, offset?: number, orderBy?: UsersOrderBy[], where?: UsersBoolExp }, resultSelector: string | ((qb: UsersAggregateModelSelector) => UsersAggregateModelSelector) = usersAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ users_aggregate: UsersAggregateModelType}>(`subscription users_aggregate($distinctOn: [users_select_column!], $limit: Int, $offset: Int, $orderBy: [users_order_by!], $where: users_bool_exp) { users_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "users" using primary key columns
    subscribeUsers_by_pk(variables: { id: any }, resultSelector: string | ((qb: UsersModelSelector) => UsersModelSelector) = usersModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ users_by_pk: UsersModelType}>(`subscription users_by_pk($id: uuid!) { users_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "vulnerabilities"
    subscribeVulnerabilities(variables: { distinctOn?: VulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilitiesOrderBy[], where?: VulnerabilitiesBoolExp }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ vulnerabilities: VulnerabilitiesModelType[]}>(`subscription vulnerabilities($distinctOn: [vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerabilities_order_by!], $where: vulnerabilities_bool_exp) { vulnerabilities(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch aggregated fields from the table: "vulnerabilities"
    subscribeVulnerabilities_aggregate(variables: { distinctOn?: VulnerabilitiesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilitiesOrderBy[], where?: VulnerabilitiesBoolExp }, resultSelector: string | ((qb: VulnerabilitiesAggregateModelSelector) => VulnerabilitiesAggregateModelSelector) = vulnerabilitiesAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ vulnerabilities_aggregate: VulnerabilitiesAggregateModelType}>(`subscription vulnerabilities_aggregate($distinctOn: [vulnerabilities_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerabilities_order_by!], $where: vulnerabilities_bool_exp) { vulnerabilities_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "vulnerabilities" using primary key columns
    subscribeVulnerabilities_by_pk(variables: { id: any }, resultSelector: string | ((qb: VulnerabilitiesModelSelector) => VulnerabilitiesModelSelector) = vulnerabilitiesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ vulnerabilities_by_pk: VulnerabilitiesModelType}>(`subscription vulnerabilities_by_pk($id: uuid!) { vulnerabilities_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilitiesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An array relationship
    subscribeVulnerability_packages(variables: { distinctOn?: VulnerabilityPackagesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilityPackagesOrderBy[], where?: VulnerabilityPackagesBoolExp }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ vulnerability_packages: VulnerabilityPackagesModelType[]}>(`subscription vulnerability_packages($distinctOn: [vulnerability_packages_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerability_packages_order_by!], $where: vulnerability_packages_bool_exp) { vulnerability_packages(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // An aggregate relationship
    subscribeVulnerability_packages_aggregate(variables: { distinctOn?: VulnerabilityPackagesSelectColumn[], limit?: number, offset?: number, orderBy?: VulnerabilityPackagesOrderBy[], where?: VulnerabilityPackagesBoolExp }, resultSelector: string | ((qb: VulnerabilityPackagesAggregateModelSelector) => VulnerabilityPackagesAggregateModelSelector) = vulnerabilityPackagesAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ vulnerability_packages_aggregate: VulnerabilityPackagesAggregateModelType}>(`subscription vulnerability_packages_aggregate($distinctOn: [vulnerability_packages_select_column!], $limit: Int, $offset: Int, $orderBy: [vulnerability_packages_order_by!], $where: vulnerability_packages_bool_exp) { vulnerability_packages_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    // fetch data from the table: "vulnerability_packages" using primary key columns
    subscribeVulnerability_packages_by_pk(variables: { id: any }, resultSelector: string | ((qb: VulnerabilityPackagesModelSelector) => VulnerabilityPackagesModelSelector) = vulnerabilityPackagesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ vulnerability_packages_by_pk: VulnerabilityPackagesModelType}>(`subscription vulnerability_packages_by_pk($id: uuid!) { vulnerability_packages_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VulnerabilityPackagesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
  })))
