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
## LunaSec Internal Infrastructure
Packages in this directory *are not designed for public usage*. They are used by LunaSec to power our internal 
infrastructure for our business goals. This tooling is generally not going to be useful for anybody besides us.

For example, we use the Metrics Server Backend to collect anonymous metricsConfig about public usage of LunaSec deployments. 
This data is useful for us to track adoption of LunaSec and to help us measure our success over time, but it's unlikely
to be very useful to you as an individual. :)

### What should I do with this code?
Please feel free to poke around and look at everything in here (it's all open source). We've made them open source 
because we believe it's the right way to build software. We also want to share the lessons we've learned as we've built 
up our stack, and we invite you to help us ensure that our infrastructure is free of bugs 
(and thus reasonably-secure-by-default).

Please don't use this code for your production deployments and then write to us when you experience problems. 
And there _will_ be problems because writing software is fundamentally difficult.

### Warning: This code was not built for you!
With LunaSec, we spend a great deal of effort to design, create, test, and iterate on the LunaSec stack so that we find 
bugs before you do. This tooling here is not where we spend any effort to test it for others. We only have spent enough 
effort to ensure it's working for our needs. That means there won't be any docs or onboarding help. It probably will 
have more bugs and just generally be difficult to use/modify. It's not going to be our best work or anything that you 
should directly use without investing serious time and energy.

We're a small team and our time is limited -- please be respectful and mindful of that if you ask us for help related
to this code. We're unlikely to give you a satisfactory response if you need any helps that takes us more than 30 
seconds for us to answer. You have been warned!

Beyond that, please enjoy and feel free to throw us a "thank you" if us keeping this code open source was valuable for 
you. We love to hear it! :)
