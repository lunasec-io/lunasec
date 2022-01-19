import { Instance } from "mobx-state-tree"
import { ProjectsAggregateFieldsModelBase } from "./ProjectsAggregateFieldsModel.base"

/* The TypeScript type of an instance of ProjectsAggregateFieldsModel */
export interface ProjectsAggregateFieldsModelType extends Instance<typeof ProjectsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for ProjectsAggregateFieldsModel */
export { selectFromProjectsAggregateFields, projectsAggregateFieldsModelPrimitives, ProjectsAggregateFieldsModelSelector } from "./ProjectsAggregateFieldsModel.base"

/**
 * ProjectsAggregateFieldsModel
 *
 * aggregate fields of "projects"
 */
export const ProjectsAggregateFieldsModel = ProjectsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
