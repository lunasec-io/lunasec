<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
# Contributing to LunaSec

We appreciate any help the community can provide to make LunaSec better!

You can help in different ways:

* Open an [issue](https://github.com/lunasec-io/lunasec-monorepo/issues) with a
  bug report, build issue, feature request, suggestion, etc.

* Fork this repository and submit a pull request

For any particular improvement you want to make, it can be beneficial to
begin discussion on the GitHub issues page. This is the best place to
discuss your proposed improvement (and its implementation) with the core
development team.

Before we accept any code contributions, LunaSec contributors need to sign the 
[Contributor License Agreement](https://cla-assistant.io/lunasec-io/lunasec-monorepo) (CLA). By signing 
a CLA, we can ensure that the community is free and confident in its ability to use your contributions.

## Getting and building LunaSec 

Please follow our README for 
[instructions on developing from source](https://github.com/lunasec-io/lunasec-monorepo#how-to-launch-the-cluster-and-get-the-app-running).

## Style guide

Before submitting any contributions, please ensure that it follows our code's style. 

We use JetBrains IntelliJ for our development and our editor configurations are used when you directly open this
repo in your editor (they're stored in the `.idea` folder).

For TypeScript, we use ESLint, and it should automatically format your code so that you don't have to think about it
while developing. The GoLang code can be linted with `golangci-lint run`. 

## Code review workflow

* Sign the [Contributor License Agreement](https://cla-assistant.io/lunasec-io/lunasec-monorepo) (CLA) 
  if you're a new contributor.

* Develop on your local branch:

    * Fork the repository and create a local feature branch to do work on,
      ideally on one thing at a time.  Don't mix bug fixes with unrelated
      feature enhancements or stylistic changes.

    * Hack away. Add tests for non-trivial changes.

    * Run the [test suite](#testing) and make sure everything passes.

    * **Sign Your Commits**: To ensure the authenticity and integrity of code contributions, **we require that all
      commits are signed**. Signing commits proves that your commits were truly created by you, as the holder of a
      private key. Configuring git to sign your commits is a straightforward process. To get set up, see
      [GitHub's documentation on signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

    * When committing, be sure to write good commit messages according to [these
      seven rules](https://chris.beams.io/posts/git-commit/#seven-rules). 
      Stylistically, we use commit message titles in the imperative tense, e.g., 
      `Add merge-append query optimization for time aggregate`. In the case of
      non-trivial changes, include a longer description in the commit message
      body explaining and detailing the changes. That is, a commit message
      should have a short title, followed by an empty line, and then
      followed by the longer description.

    * When committing, link which GitHub issue of [this
      repository](https://github.com/lunasec-io/lunasec-monorepo/issues) is fixed or
      closed by the commit with a [linking keyword recognised by
      GitHub](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).
      For example, if the commit fixes bug 123, add a line at the end of the
      commit message with  `Fixes #123`, if the commit implements feature
      request 321, add a line at the end of the commit message `Closes #321`.
      This will be recognized by GitHub. It will close the corresponding issue
      and place a hyperlink under the number.

* Push your changes to an upstream branch:

    * Make sure that each commit in the pull request will represent a
      logical change to the code, will compile, and will pass tests.

    * Make sure that the pull request message contains all important
      information from the commit messages including which issues are
      fixed and closed. If a pull request contains one commit only, then
      repeating the commit message is preferred, which is done automatically
      by GitHub when it creates the pull request.

    * Rebase your local feature branch against master (`git fetch origin`,
      then `git rebase origin/master`) to make sure you're
      submitting your changes on top of the newest version of our code.
      If you've already pushed to a remote, you may need to use a merge commit instead.

    * Push your commit to your upstream feature branch: `git push -u <yourfork> my-feature-branch`

* Create and manage pull request:

    * [Create a pull request using GitHub](https://help.github.com/articles/creating-a-pull-request).
      If you know a core developer well suited to reviewing your pull
      request, either mention them (preferably by GitHub name) in the PR's
      body or [assign them as a reviewer](https://help.github.com/articles/assigning-issues-and-pull-requests-to-other-github-users/).

    * If you get a test failure in CI, check them in the build log linked to from your PR.

    * Address feedback by amending your commit(s). If your change contains
      multiple commits, address each piece of feedback by amending that
      commit to which the particular feedback is aimed.

    * The PR is marked as accepted when the reviewer thinks it's ready to be
      merged.  Most new contributors aren't allowed to merge themselves; in
      that case, we'll do it for you.

## Testing

Every non-trivial change to the code base should be accompanied by a
relevant addition to or modification of the test suite.

Please check that the full test suite (including your test additions
or changes) passes successfully on your local machine **before you
open a pull request**.

Unit tests are still somewhat sparse.  E2E integration tests will be automatically run when you create a pull request. To run the integration tests locally, start all lunasec services and run `yarn test:e2e:local`. 

Running tests for just Golang changes (from within the `go` folder):
```bash
go test
```

As mentioned above, all submitted pull requests are also automatically
run against our test suite via GitHub Actions.

## Other Questions or Feedback

Please email us directly via opensource@lunasec.io 
Or open a new thread under [GitHub Discussions](https://github.com/lunasec-io/lunasec-monorepo/discussions).

We're happy to have your help as a part of our community. Thank you!

## References
This file was forked from TimescaleDB's 
[contributors](https://github.com/timescale/timescaledb/blob/master/CONTRIBUTING.md) document. 
A special thank you to them!
