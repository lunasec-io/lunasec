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
# Developing the Metrics Server Backend
This service was built using the Go CDK tool and is a fork of the Go CDK Guestbook example app.

In order to run this app, you will need to perform the following:
```shell
# This will build the wire_gen.go file
go generate ./...

# Run the database locally
# Note: You may need to add sudo for Docker to succeed.
go run localdb/main.go

# In another terminal, run the following from the root `go` folder:
make metricsserverbackend tag=dev

# Then you can run the built binary in the build folder:
./build/metricsserverbackend_dev -env=local -listen=0.0.0.0:9006 -bucket=pkg/metricsserverbackend/blobs -motd_var=blobs/motd.txt

# You can open up your browser now to http://localhost:9006 and hopefully you see the app running!
```
