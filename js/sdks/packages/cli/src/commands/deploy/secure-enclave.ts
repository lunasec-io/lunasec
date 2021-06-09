import { Command, flags } from '@oclif/command';
import {LunaSecDeployment, LunaSecDeploymentTemplates, getLunasecDeploymentTemplate} from "@lunasec/node-sdk";

export default class SecureEnclave extends Command {
  static description = 'Deploy Lunasec secure enclave components'

  static examples = [];

  static flags = {
    help: flags.help({ char: 'h' }),
    projectName: flags.string({ char: 'n', description: 'project name', required: true }),
    projectTemplate: flags.string({ char: 't', description: 'project template', required: true }),
    projectId: flags.string({ char: 'i', description: 'project id', required: false }),
  };

  static args = [];

  async run() {
    const {flags} = this.parse(SecureEnclave)

    const projectTemplate: LunaSecDeploymentTemplates = getLunasecDeploymentTemplate(flags.projectTemplate);

    const lunasecDeployment = new LunaSecDeployment({
      projectName: flags.projectName,
      projectTemplate: projectTemplate,
      projectId: flags.projectId
    });

    let deploymentId = '';
    try {
      deploymentId = await lunasecDeployment.deployProd();
    } catch (e) {
      console.error('unable to deploy secure enclave: ' + e);
      return;
    }

    const deployment = await lunasecDeployment.getDeployment({deploymentId});

    const resourcesDeployed = deployment.deployment_json.workflow_states.length;
    const deploymentTag = deployment.tag;
    const secrets = deployment.deployment_json.secrets;
    console.log({
      resourcesDeployed,
      deploymentId,
      deploymentTag,
      secrets
    });
  }
}
