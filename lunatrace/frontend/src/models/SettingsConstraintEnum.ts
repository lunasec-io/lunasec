/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum SettingsConstraint {
  settings_pkey="settings_pkey"
}

/**
* SettingsConstraint
 *
 * unique or primary key constraints on table "settings"
*/
export const SettingsConstraintEnumType = types.enumeration("SettingsConstraint", [
        "settings_pkey", // unique or primary key constraint
      ])
