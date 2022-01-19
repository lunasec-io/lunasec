/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ProjectsConstraint {
  projects_pkey="projects_pkey"
}

/**
* ProjectsConstraint
 *
 * unique or primary key constraints on table "projects"
*/
export const ProjectsConstraintEnumType = types.enumeration("ProjectsConstraint", [
        "projects_pkey", // unique or primary key constraint
      ])
