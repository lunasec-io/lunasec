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
# Metrics Backend Server
This is the backend application server to receive analytics metrics from a LunaSec deployment.

The only purpose of this server is to receive metrics and store them in the database. Metrics are used by the LunaSec
development team to track adoption, feature usage, and to generally understand the community of users better.

## Why does LunaSec need metrics?
We chose to make LunaSec an open-source project because we believe that open-source is a requirement for production
software. As a consequence of this, we are unable to collect metrics on usage as easily as a proprietary application
would be able to (like a hosting SaaS product).

Our compromise for this was to create metrics that are published from a LunaSec deployment by default. We have made an
effort to make these metrics as low impact as possible in order to minimize the security impact of us collecting them.
The metrics we collect are listed below. We have made this backend server publicly available for you to audit and review
specifically because we wish to remain as transparent as possible about our collection of data and to earn your trust.

## Disabling Metrics
As the developers of LunaSec, we ask that you please leave metrics enabled unless you have a specific reason to do so. 
We have created LunaSec and made it freely available for anybody to use, modify, and otherwise derive value from because
we believe in open-source software. Leaving metrics sharing enabled is one of the easiest ways for you to give back and
contribute to LunaSec.

If you must disable metrics because of security reasons, or otherwise, and you would still like to give back to LunaSec,
then please consider [contacting us](https://www.lunasec.io/contact) about subscribing to our paid support plan. Paid 
support includes early access to security patches _before_ we publish them to our open-source repo, as well as giving us
the monetary means to continue building and supporting LunaSec.

Should you wish to disable metrics collection, it may be disabled by setting `metrics.disable_usage_statistic=true` in
your YAML before LunaSec is deployed. Setting this flag will disable deploying the Lambda that collects metrics every
24 hours.

Regardless, thank you for using LunaSec and helping to improve the security of software across the world. We really
appreciate it!

## Metrics Collection Process Overview
Metrics are published from the Tokenizer to AWS CloudWatch by default. 

Once per day (every 24 hours) a Lambda is triggered that reads the metrics data from CloudWatch and generates a summary 
of the metrics data. This data is an _aggregate sum_ of the data from CloudWatch. We don't collect information about the
specific events or when they occurred. We intentionally read the metrics data, add it all together, and then publish
only the aggregate data.

*Metrics Collected:*
- Deployed Version
- Number of Tokens Created
- Number of Tokens Detokenized
- Number of Grants Issued
- Random Nonce (unique per deployment for us to track usage over time and to help us filter fraudulent data)

## Acknowledgements
This app was built using [Go Cloud Development Kit](https://github.com/google/go-cloud) and is a fork of the 
[Guestbook](https://gocloud.dev/tutorials/guestbook) sample app.

The Go gopher was designed by Renee French and used under the
[Creative Commons 3.0 Attributions](https://creativecommons.org/licenses/by/3.0/)
license.
