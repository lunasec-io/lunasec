import {Command, flags} from '@oclif/command'

export default class SecureResolver extends Command {
  static description = 'Deploy Lunasec secure resolvers'

  static examples = []

  static flags = {
    help: flags.help({char: 'h'}),
    containerURI: flags.string({char: 'c', description: 'container uri', required: true}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(SecureResolver)

    if (flags.containerURI === undefined) {
      throw new Error("Unable to deploy secure resolver: container URI is not defined.")
    }

    /*
    const secureResolver = new SecureResolver({
      stage: DeploymentStage.PROD,
    });

    try {
      await secureResolver.deploy(flags.containerURI);
    } catch (e) {
      console.error("unable to deploy secure resolver: " + e);
      return;
    }
    console.log("successfully deployed secure resolver");
     */
  }
}
