// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
package constants

import (
	"github.com/blang/semver/v4"
	"github.com/lunasec-io/lunasec/tools/log4shell/types"
)


const (
	Log4ShellCve = "CVE-2021-44228"
	CtxCve       = "CVE-2021-45046"
	Log4j1RceCve = "CVE-2019-17571"
)

var (
	CveSeverityLookup = map[string]string {
		Log4ShellCve: "10.0",
		CtxCve:       "9.0",
		Log4j1RceCve: "9.8",
	}

	FileVersionChecks = []types.LibraryFileVersionCheck{
		{
			Cve: Log4ShellCve,
			SemverRange: semver.MustParseRange(">=2.0.0-beta9 <2.1.0"),
			LibraryFile: "JndiLookup.class",
		},
		{
			Cve: Log4ShellCve,
			SemverRange: semver.MustParseRange(">=2.1.0 <=2.14.1"),
			LibraryFile: "JndiManager.class",
		},
		{
			Cve: CtxCve,
			SemverRange: semver.MustParseRange("=2.15.0"),
			LibraryFile: "JndiManager.class",
		},
		{
			Cve: Log4j1RceCve,
			SemverRange: semver.MustParseRange(">=1.2.0 <=1.2.17"),
			LibraryFile: "SocketNode.class",
		},
	}
)

const (
	Log4j1x = "1"
	Log4j2x = "2"
)

// from: https://github.com/hillu/local-log4j-vuln-scanner/blob/master/log4j-vuln-finder.go#L16
// We have previously used these hashes to detect vulnerable libraries, however we now generate library hashes
// to prevent false positives.
// var KnownVulnerableClassFileHashes = types.VulnerableHashLookup{
// 	...
// }

// from: https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes/blob/main/sha256sums.txt
var KnownVulnerableArchiveFileHashes = types.VulnerableHashLookup{
	"bf4f41403280c1b115650d470f9b260a5c9042c04d9bcc2a6ca504a66379b2d6": { Name:"./apache-log4j-2.0-alpha2-bin/log4j-core-2.0-alpha2.jar", CVE: Log4ShellCve},
	"58e9f72081efff9bdaabd82e3b3efe5b1b9f1666cefe28f429ad7176a6d770ae": { Name:"./apache-log4j-2.0-beta1-bin/log4j-core-2.0-beta1.jar", CVE: Log4ShellCve},
	"ed285ad5ac6a8cf13461d6c2874fdcd3bf67002844831f66e21c2d0adda43fa4": { Name:"./apache-log4j-2.0-beta2-bin/log4j-core-2.0-beta2.jar", CVE: Log4ShellCve},
	"dbf88c623cc2ad99d82fa4c575fb105e2083465a47b84d64e2e1a63e183c274e": { Name:"./apache-log4j-2.0-beta3-bin/log4j-core-2.0-beta3.jar", CVE: Log4ShellCve},
	"a38ddff1e797adb39a08876932bc2538d771ff7db23885fb883fec526aff4fc8": { Name:"./apache-log4j-2.0-beta4-bin/log4j-core-2.0-beta4.jar", CVE: Log4ShellCve},
	"7d86841489afd1097576a649094ae1efb79b3147cd162ba019861dfad4e9573b": { Name:"./apache-log4j-2.0-beta5-bin/log4j-core-2.0-beta5.jar", CVE: Log4ShellCve},
	"4bfb0d5022dc499908da4597f3e19f9f64d3cc98ce756a2249c72179d3d75c47": { Name:"./apache-log4j-2.0-beta6-bin/log4j-core-2.0-beta6.jar", CVE: Log4ShellCve},
	"473f15c04122dad810c919b2f3484d46560fd2dd4573f6695d387195816b02a6": { Name:"./apache-log4j-2.0-beta7-bin/log4j-core-2.0-beta7.jar", CVE: Log4ShellCve},
	"b3fae4f84d4303cdbad4696554b4e8d2381ad3faf6e0c3c8d2ce60a4388caa02": { Name:"./apache-log4j-2.0-beta8-bin/log4j-core-2.0-beta8.jar", CVE: Log4ShellCve},
	"dcde6033b205433d6e9855c93740f798951fa3a3f252035a768d9f356fde806d": { Name:"./apache-log4j-2.0-beta9-bin/log4j-core-2.0-beta9.jar", CVE: Log4ShellCve},
	"85338f694c844c8b66d8a1b981bcf38627f95579209b2662182a009d849e1a4c": { Name:"./apache-log4j-2.0-bin/log4j-core-2.0.jar", CVE: Log4ShellCve},
	"db3906edad6009d1886ec1e2a198249b6d99820a3575f8ec80c6ce57f08d521a": { Name:"./apache-log4j-2.0-rc1-bin/log4j-core-2.0-rc1.jar", CVE: Log4ShellCve},
	"ec411a34fee49692f196e4dc0a905b25d0667825904862fdba153df5e53183e0": { Name:"./apache-log4j-2.0-rc2-bin/log4j-core-2.0-rc2.jar", CVE: Log4ShellCve},
	"a00a54e3fb8cb83fab38f8714f240ecc13ab9c492584aa571aec5fc71b48732d": { Name:"./apache-log4j-2.0.1-bin/log4j-core-2.0.1.jar", CVE: Log4ShellCve},
	"c584d1000591efa391386264e0d43ec35f4dbb146cad9390f73358d9c84ee78d": { Name:"./apache-log4j-2.0.2-bin/log4j-core-2.0.2.jar", CVE: Log4ShellCve},
	"8bdb662843c1f4b120fb4c25a5636008085900cdf9947b1dadb9b672ea6134dc": { Name:"./apache-log4j-2.1-bin/log4j-core-2.1.jar", CVE: Log4ShellCve},
	"c830cde8f929c35dad42cbdb6b28447df69ceffe99937bf420d32424df4d076a": { Name:"./apache-log4j-2.2-bin/log4j-core-2.2.jar", CVE: Log4ShellCve},
	"6ae3b0cb657e051f97835a6432c2b0f50a651b36b6d4af395bbe9060bb4ef4b2": { Name:"./apache-log4j-2.3-bin/log4j-core-2.3.jar", CVE: Log4ShellCve},
	"535e19bf14d8c76ec00a7e8490287ca2e2597cae2de5b8f1f65eb81ef1c2a4c6": { Name:"./apache-log4j-2.4-bin/log4j-core-2.4.jar", CVE: Log4ShellCve},
	"42de36e61d454afff5e50e6930961c85b55d681e23931efd248fd9b9b9297239": { Name:"./apache-log4j-2.4.1-bin/log4j-core-2.4.1.jar", CVE: Log4ShellCve},
	"4f53e4d52efcccdc446017426c15001bb0fe444c7a6cdc9966f8741cf210d997": { Name:"./apache-log4j-2.5-bin/log4j-core-2.5.jar", CVE: Log4ShellCve},
	"df00277045338ceaa6f70a7b8eee178710b3ba51eac28c1142ec802157492de6": { Name:"./apache-log4j-2.6-bin/log4j-core-2.6.jar", CVE: Log4ShellCve},
	"28433734bd9e3121e0a0b78238d5131837b9dbe26f1a930bc872bad44e68e44e": { Name:"./apache-log4j-2.6.1-bin/log4j-core-2.6.1.jar", CVE: Log4ShellCve},
	"cf65f0d33640f2cd0a0b06dd86a5c6353938ccb25f4ffd14116b4884181e0392": { Name:"./apache-log4j-2.6.2-bin/log4j-core-2.6.2.jar", CVE: Log4ShellCve},
	"5bb84e110d5f18cee47021a024d358227612dd6dac7b97fa781f85c6ad3ccee4": { Name:"./apache-log4j-2.7-bin/log4j-core-2.7.jar", CVE: Log4ShellCve},
	"ccf02bb919e1a44b13b366ea1b203f98772650475f2a06e9fac4b3c957a7c3fa": { Name:"./apache-log4j-2.8-bin/log4j-core-2.8.jar", CVE: Log4ShellCve},
	"815a73e20e90a413662eefe8594414684df3d5723edcd76070e1a5aee864616e": { Name:"./apache-log4j-2.8.1-bin/log4j-core-2.8.1.jar", CVE: Log4ShellCve},
	"10ef331115cbbd18b5be3f3761e046523f9c95c103484082b18e67a7c36e570c": { Name:"./apache-log4j-2.8.2-bin/log4j-core-2.8.2.jar", CVE: Log4ShellCve},
	"dc815be299f81c180aa8d2924f1b015f2c46686e866bc410e72de75f7cd41aae": { Name:"./apache-log4j-2.9.0-bin/log4j-core-2.9.0.jar", CVE: Log4ShellCve},
	"9275f5d57709e2204900d3dae2727f5932f85d3813ad31c9d351def03dd3d03d": { Name:"./apache-log4j-2.9.1-bin/log4j-core-2.9.1.jar", CVE: Log4ShellCve},
	"f35ccc9978797a895e5bee58fa8c3b7ad6d5ee55386e9e532f141ee8ed2e937d": { Name:"./apache-log4j-2.10.0-bin/log4j-core-2.10.0.jar", CVE: Log4ShellCve},
	"5256517e6237b888c65c8691f29219b6658d800c23e81d5167c4a8bbd2a0daa3": { Name:"./apache-log4j-2.11.0-bin/log4j-core-2.11.0.jar", CVE: Log4ShellCve},
	"d4485176aea67cc85f5ccc45bb66166f8bfc715ae4a695f0d870a1f8d848cc3d": { Name:"./apache-log4j-2.11.1-bin/log4j-core-2.11.1.jar", CVE: Log4ShellCve},
	"3fcc4c1f2f806acfc395144c98b8ba2a80fe1bf5e3ad3397588bbd2610a37100": { Name:"./apache-log4j-2.11.2-bin/log4j-core-2.11.2.jar", CVE: Log4ShellCve},
	"057a48fe378586b6913d29b4b10162b4b5045277f1be66b7a01fb7e30bd05ef3": { Name:"./apache-log4j-2.12.0-bin/log4j-core-2.12.0.jar", CVE: Log4ShellCve},
	"5dbd6bb2381bf54563ea15bc9fbb6d7094eaf7184e6975c50f8996f77bfc3f2c": { Name:"./apache-log4j-2.12.1-bin/log4j-core-2.12.1.jar", CVE: Log4ShellCve},
	"c39b0ea14e7766440c59e5ae5f48adee038d9b1c7a1375b376e966ca12c22cd3": { Name:"./apache-log4j-2.13.0-bin/log4j-core-2.13.0.jar", CVE: Log4ShellCve},
	"6f38a25482d82cd118c4255f25b9d78d96821d22bab498cdce9cda7a563ca992": { Name:"./apache-log4j-2.13.1-bin/log4j-core-2.13.1.jar", CVE: Log4ShellCve},
	"54962835992e303928aa909730ce3a50e311068c0960c708e82ab76701db5e6b": { Name:"./apache-log4j-2.13.2-bin/log4j-core-2.13.2.jar", CVE: Log4ShellCve},
	"e5e9b0f8d72f4e7b9022b7a83c673334d7967981191d2d98f9c57dc97b4caae1": { Name:"./apache-log4j-2.13.3-bin/log4j-core-2.13.3.jar", CVE: Log4ShellCve},
	"68d793940c28ddff6670be703690dfdf9e77315970c42c4af40ca7261a8570fa": { Name:"./apache-log4j-2.14.0-bin/log4j-core-2.14.0.jar", CVE: Log4ShellCve},
	"9da0f5ca7c8eab693d090ae759275b9db4ca5acdbcfe4a63d3871e0b17367463": { Name:"./apache-log4j-2.14.1-bin/log4j-core-2.14.1.jar", CVE: Log4ShellCve},
	"006fc6623fbb961084243cfc327c885f3c57f2eba8ee05fbc4e93e5358778c85": { Name:"./log4j-2.0-alpha1/log4j-core-2.0-alpha1.jar", CVE: Log4ShellCve},

	// The following shas for version 2.15 detect a valid but lower level of severity vulnerability, CVE  CVE-2021-45046
	"e7048ad52e3b6f1267b7ceb2c07200a5ce61271bcf59f98fd238bf60e4137932": { Name:"apache-log4j-2.15.0-bin/log4j-core.2.15.0.jar" , CVE: CtxCve },

	"61dd97afffe2a162e1469b4b001469479e3b9896b9d44d93a7e5bd81511adb2d": { Name:"./elastic-apm-agent-1.17.0.jar", CVE: Log4ShellCve },
	"75de6b484b1bc9000589d5d6c616401fed2633ff0a92e74899183023e681155a": { Name:"./elastic-apm-agent-1.18.0.jar", CVE: Log4ShellCve },
	"89350af2a3fb3e27708a733eec6977b93b41ab5ed6151434efccbe7f7cd83519": { Name:"./elastic-apm-agent-1.18.0.RC1.jar", CVE: Log4ShellCve },
	"9dc8b6ca5c91dc07ceccd07762e16bc952b210e371f9a45c36bac7b76545add2": { Name:"./elastic-apm-agent-1.18.1.jar.jar", CVE: Log4ShellCve },
	"06dcd8e2bbe94598b06ca5dba1ba96e6f1186bb33fcc6fb5644fcbdf40a28da6": { Name:"./elastic-apm-agent-1.19.0.jar", CVE: Log4ShellCve },
	"43f7e13f4871ec2499194bbbeefb434285fa4c0e66839f75b2b00275d1c31a3b": { Name:"./elastic-apm-agent-1.20.0.jar", CVE: Log4ShellCve },
	"74ccc15ae88174f9bce6f21d25a56ec060faaa4e27ddfe9562d7ad5905c9ec02": { Name:"./elastic-apm-agent-1.21.0.jar", CVE: Log4ShellCve },
	"17384e49174a6b6c8907df3529577ecae4b48508b7923292938c619aed97cdda": { Name:"./elastic-apm-agent-1.22.0.jar", CVE: Log4ShellCve },
	"c7be5e9c35c4e80ec1fbcf8f559f0f5724d56c4b89cd72d7c7497198d764e119": { Name:"./elastic-apm-agent-1.23.0.jar", CVE: Log4ShellCve },
	"e9ef0a51cab764d776fe55c40e549098e5068cd3c150e35e58a58c5d3ea20741": { Name:"./elastic-apm-agent-1.24.0.jar", CVE: Log4ShellCve },
	"de137c124c9bb5ebae418c2407615619254b4666649e67ee9092fc73dfd1bfdd": { Name:"./elastic-apm-agent-1.25.0.jar", CVE: Log4ShellCve },
	"ede259f672f6dd4e6ec95b5ae6031df4dcde1b5e269509faca532e48ad168d14": { Name:"./elastic-apm-agent-1.26.0.jar", CVE: Log4ShellCve },
	"d9db632f4c86cd79b26c79d1ca651b2f4fc767cbf79d323916b08e0bea6fae71": { Name:"./elastic-apm-agent-1.27.0.jar", CVE: Log4ShellCve },
	"7108d373b74565efaa226b445d3022feef6f6b2f025455f46d593df0afb68027": { Name:"./elastic-apm-agent-1.27.1.jar", CVE: Log4ShellCve },
	"e00ced4dbf5e8a1ea3a2c43186a5c6f693b2285832dab16da0a0cbd17f0f1b91": { Name:"./elastic-apm-agent-1.28.0.jar", CVE: Log4ShellCve },
}
