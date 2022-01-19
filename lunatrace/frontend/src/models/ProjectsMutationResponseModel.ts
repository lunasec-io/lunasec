import { Instance } from "mobx-state-tree"
import { ProjectsMutationResponseModelBase } from "./ProjectsMutationResponseModel.base"

/* The TypeScript type of an instance of ProjectsMutationResponseModel */
export interface ProjectsMutationResponseModelType extends Instance<typeof ProjectsMutationResponseModel.Type> {}

/* A graphql query fragment builders for ProjectsMutationResponseModel */
export { selectFromProjectsMutationResponse, projectsMutationResponseModelPrimitives, ProjectsMutationResponseModelSelector } from "./ProjectsMutationResponseModel.base"

/**
 * ProjectsMutationResponseModel
 *
 * response of any mutation on the table "projects"
 */
export const ProjectsMutationResponseModel = ProjectsMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
