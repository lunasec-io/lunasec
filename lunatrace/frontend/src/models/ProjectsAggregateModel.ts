import { Instance } from "mobx-state-tree"
import { ProjectsAggregateModelBase } from "./ProjectsAggregateModel.base"

/* The TypeScript type of an instance of ProjectsAggregateModel */
export interface ProjectsAggregateModelType extends Instance<typeof ProjectsAggregateModel.Type> {}

/* A graphql query fragment builders for ProjectsAggregateModel */
export { selectFromProjectsAggregate, projectsAggregateModelPrimitives, ProjectsAggregateModelSelector } from "./ProjectsAggregateModel.base"

/**
 * ProjectsAggregateModel
 *
 * aggregated selection of "projects"
 */
export const ProjectsAggregateModel = ProjectsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
