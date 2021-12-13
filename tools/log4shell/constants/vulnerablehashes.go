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

import "github.com/lunasec-io/lunasec/tools/log4shell/types"

// from: https://github.com/hillu/local-log4j-vuln-scanner/blob/master/log4j-vuln-finder.go#L16
var KnownVulnerableClassFileHashes = types.VulnerableHashLookup{
	"39a495034d37c7934b64a9aa686ea06b61df21aa222044cc50a47d6903ba1ca8": "log4j 2.0-rc1",       // JndiLookup.class
	"a03e538ed25eff6c4fe48aabc5514e5ee687542f29f2206256840e74ed59bcd2": "log4j 2.0-rc2",       // JndiLookup.class
	"964fa0bf8c045097247fa0c973e0c167df08720409fd9e44546e0ceda3925f3e": "log4j 2.0.1",         // JndiLookup.class
	"9626798cce6abd0f2ffef89f1a3d0092a60d34a837a02bbe571dbe00236a2c8c": "log4j 2.0.2",         // JndiLookup.class
	"fd6c63c11f7a6b52eff04be1de3477c9ddbbc925022f7216320e6db93f1b7d29": "log4j 2.0",           // JndiLookup.class
	"03c77cca9aeff412f46eaf1c7425669e37008536dd52f1d6f088e80199e4aae7": "log4j 2.4-2.11.2",    // JndiManager$1.class
	"1584b839cfceb33a372bb9e6f704dcea9701fa810a9ba1ad3961615a5b998c32": "log4j 2.7-2.8.1",     // JndiManager.class
	"1fa92c00fa0b305b6bbe6e2ee4b012b588a906a20a05e135cbe64c9d77d676de": "log4j 2.12.0-2.12.1", // JndiManager.class
	"293d7e83d4197f0496855f40a7745cfcdd10026dc057dfc1816de57295be88a6": "log4j 2.9.0-2.11.2",  // JndiManager.class
	"3bff6b3011112c0b5139a5c3aa5e698ab1531a2f130e86f9e4262dd6018916d7": "log4j 2.4-2.5",       // JndiManager.class
	"547883afa0aa245321e6b1aaced24bc10d73d5af4974d951e2bd53b017e2d4ab": "log4j 2.14.0-2.14.1", // JndiManager$JndiManagerFactory.class
	"620a713d908ece7fb09b7d34c2b0461e1c366704da89ea20eb78b73116c77f23": "log4j 2.1-2.3",       // JndiManager$1.class
	"632a69aef3bc5012f61093c3d9b92d6170fdc795711e9fed7f5388c36e3de03d": "log4j 2.8.2",         // JndiManager$JndiManagerFactory.class
	"635ccd3aaa429f3fea31d84569a892b96a02c024c050460d360cc869bcf45840": "log4j 2.9.1-2.10.0",  // JndiManager$JndiManagerFactory.class
	"6540d5695ddac8b0a343c2e91d58316cfdbfdc5b99c6f3f91bc381bc6f748246": "log4j 2.6-2.6.2",     // JndiManager.class
	"764b06686dbe06e3d5f6d15891250ab04073a0d1c357d114b7365c70fa8a7407": "log4j 2.8.2",         // JndiManager.class
	"77323460255818f4cbfe180141d6001bfb575b429e00a07cbceabd59adf334d6": "log4j 2.14.0-2.14.1", // JndiManager.class
	"8abaebc4d09926cd12b5269c781b64a7f5a57793c54dc1225976f02ba58343bf": "log4j 2.13.0-2.13.3", // JndiManager$JndiManagerFactory.class
	"91e58af100aface711700562b5002c5d397fb35d2a95d5704db41461ac1ad8fd": "log4j 2.1-2.3",       // JndiManager$JndiManagerFactory.class
	"ae950f9435c0ef3373d4030e7eff175ee11044e584b7f205b7a9804bbe795f9c": "log4j 2.1-2.3",       // JndiManager.class
	"aec7ea2daee4d6468db2df25597594957a06b945bcb778bbcd5acc46f17de665": "log4j 2.4-2.6.2",     // JndiManager$JndiManagerFactory.class
	"b8af4230b9fb6c79c5bf2e66a5de834bc0ebec4c462d6797258f5d87e356d64b": "log4j 2.7-2.8.1",     // JndiManager$JndiManagerFactory.class
	"c3e95da6542945c1a096b308bf65bbd7fcb96e3d201e5a2257d85d4dedc6a078": "log4j 2.13.0-2.13.3", // JndiManager.class
	"e4906e06c4e7688b468524990d9bb6460d6ef31fe938e01561f3f93ab5ca25a6": "log4j 2.8.2-2.12.0",  // JndiManager$1.class
	"fe15a68ef8a75a3f9d3f5843f4b4a6db62d1145ef72937ed7d6d1bbcf8ec218f": "log4j 2.12.0-2.12.1", // JndiManager$JndiManagerFactory.class
	"0ebc263ba66a7452d3dfc15760c560f930d835164914a1340d741838e3165dbb": "log4j 2.4-2.5",       // MessagePatternConverter.class
	"52b5574bad677030c56c1a386362840064d347523e61e59ca1c55faf7e998986": "log4j 2.12",          // MessagePatternConverter.class
	"5c328eedefcb28512ff5d9a7556741dd159f0b13e1c0c52edc958d9821b8d2c5": "log4j 2.6",           // MessagePatternConverter.class
	"791a12347e62d9884c4d6f8e285098fedaf3bcdf591af3e4449923191588d43c": "log4j 2.8-2.9",       // MessagePatternConverter.class
	"8d5e886175b66ec2de5b61113fdaf06c50e1070cad1fb9150258e01d84d13c4b": "log4j 2.13",          // MessagePatternConverter.class
	"95b385ebc65843315aeae33551e7bbdad886e9e9465ea8d3179cd74344b37984": "log4j 2.10-2.11",     // MessagePatternConverter.class
	"a36c2e78cef7c2ddcc4ebbb11c085e85989eb93f9d19bd6254913b13dfe7c58e": "log4j 2.0-2.3",       // MessagePatternConverter.class
	"a3a65f2c5bc0dd62df115a0d9ac7140793c61b65bbbac313a526a3b50724a8c7": "log4j 2.8.2",         // MessagePatternConverter.class
	"ee41ae7ae80f5c533548a89c6d6e112df609c838b901daea99ac88ccda2a5da1": "log4j 2.7",           // MessagePatternConverter.class
	"f0a869f7da9b17d0a23d0cb0e13c65afa5e42e9567b47603a8fc0debc7ef193c": "log4j 2.14",          // MessagePatternConverter.class
	"f8baca973f1874b76cfaed0f4c17048b1ac0dee364abfdfeeec62de3427def50": "log4j 2.0-rc1",       // MessagePatternConverter.class

	"ce69c1ea49c60f3be90cb9c86d7220af86e5d2fbc08fd7232da7278926e4f881": "log4j 2.0-alpha1/alpha2/beta1", // MessagePatternConverter.class
	"963ee03ebe020703fea27f657496d35edeac264beebeb14bfcd9d3350343c0bf": "log4j 2.0-beta2/beta3",         // MessagePatternConverter.class
	"be8f32ed92f161df72248dcbaaf761c812ddbb59434abfd5c87482e9e0bd983c": "log4j 2.0-beta4",               // MessagePatternConverter.class
	"9a54a585ed491573e80e0b32e964e5eb4d6c4068d2abffff628e3c69ef9102cf": "log4j 2.0-beta5",               // MessagePatternConverter.class
	"357120b06f61475033d152505c3d43a57c9a9bdc05b835d0939f1662b48fc6c3": "log4j 2.0-beta6/beta7/beta8",   // MessagePatternConverter.class

	"6adb3617902180bdf9cbcfc08b5a11f3fac2b44ef1828131296ac41397435e3d": "log4j 1.2.4",         // SocketNode.class
	"3ef93e9cb937295175b75182e42ba9a0aa94f9f8e295236c9eef914348efeef0": "log4j 1.2.6-1.2.9",   // SocketNode.class
	"bee4a5a70843a981e47207b476f1e705c21fc90cb70e95c3b40d04a2191f33e9": "log4j 1.2.8",         // SocketNode.class
	"7b996623c05f1a25a57fb5b43c519c2ec02ec2e647c2b97b3407965af928c9a4": "log4j 1.2.15",        // SocketNode.class
	"688a3dadfb1c0a08fb2a2885a356200eb74e7f0f26a197d358d74f2faf6e8f46": "log4j 1.2.16",        // SocketNode.class
	"8ef0ebdfbf28ec14b2267e6004a8eea947b4411d3c30d228a7b48fae36431d74": "log4j 1.2.17",        // SocketNode.class
	"d778227b779f8f3a2850987e3cfe6020ca26c299037fdfa7e0ac8f81385963e6": "log4j 1.2.11",        // SocketNode.class
	"ed5d53deb29f737808521dd6284c2d7a873a59140e702295a80bd0f26988f53a": "log4j 1.2.5",         // SocketNode.class
	"f3b815a2b3c74851ff1b94e414c36f576fbcdf52b82b805b2e18322b3f5fc27c": "log4j 1.2.12",        // SocketNode.class
	"fbda3cfc5853ab4744b853398f2b3580505f5a7d67bfb200716ef6ae5be3c8b7": "log4j 1.2.13-1.2.14", // SocketNode.class
}

// from: https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes/blob/main/sha256sums.txt
var KnownVulnerableArchiveFileHashes = types.VulnerableHashLookup{
	"bf4f41403280c1b115650d470f9b260a5c9042c04d9bcc2a6ca504a66379b2d6": "./apache-log4j-2.0-alpha2-bin/log4j-core-2.0-alpha2.jar",
	"58e9f72081efff9bdaabd82e3b3efe5b1b9f1666cefe28f429ad7176a6d770ae": "./apache-log4j-2.0-beta1-bin/log4j-core-2.0-beta1.jar",
	"ed285ad5ac6a8cf13461d6c2874fdcd3bf67002844831f66e21c2d0adda43fa4": "./apache-log4j-2.0-beta2-bin/log4j-core-2.0-beta2.jar",
	"dbf88c623cc2ad99d82fa4c575fb105e2083465a47b84d64e2e1a63e183c274e": "./apache-log4j-2.0-beta3-bin/log4j-core-2.0-beta3.jar",
	"a38ddff1e797adb39a08876932bc2538d771ff7db23885fb883fec526aff4fc8": "./apache-log4j-2.0-beta4-bin/log4j-core-2.0-beta4.jar",
	"7d86841489afd1097576a649094ae1efb79b3147cd162ba019861dfad4e9573b": "./apache-log4j-2.0-beta5-bin/log4j-core-2.0-beta5.jar",
	"4bfb0d5022dc499908da4597f3e19f9f64d3cc98ce756a2249c72179d3d75c47": "./apache-log4j-2.0-beta6-bin/log4j-core-2.0-beta6.jar",
	"473f15c04122dad810c919b2f3484d46560fd2dd4573f6695d387195816b02a6": "./apache-log4j-2.0-beta7-bin/log4j-core-2.0-beta7.jar",
	"b3fae4f84d4303cdbad4696554b4e8d2381ad3faf6e0c3c8d2ce60a4388caa02": "./apache-log4j-2.0-beta8-bin/log4j-core-2.0-beta8.jar",
	"dcde6033b205433d6e9855c93740f798951fa3a3f252035a768d9f356fde806d": "./apache-log4j-2.0-beta9-bin/log4j-core-2.0-beta9.jar",
	"85338f694c844c8b66d8a1b981bcf38627f95579209b2662182a009d849e1a4c": "./apache-log4j-2.0-bin/log4j-core-2.0.jar",
	"db3906edad6009d1886ec1e2a198249b6d99820a3575f8ec80c6ce57f08d521a": "./apache-log4j-2.0-rc1-bin/log4j-core-2.0-rc1.jar",
	"ec411a34fee49692f196e4dc0a905b25d0667825904862fdba153df5e53183e0": "./apache-log4j-2.0-rc2-bin/log4j-core-2.0-rc2.jar",
	"a00a54e3fb8cb83fab38f8714f240ecc13ab9c492584aa571aec5fc71b48732d": "./apache-log4j-2.0.1-bin/log4j-core-2.0.1.jar",
	"c584d1000591efa391386264e0d43ec35f4dbb146cad9390f73358d9c84ee78d": "./apache-log4j-2.0.2-bin/log4j-core-2.0.2.jar",
	"8bdb662843c1f4b120fb4c25a5636008085900cdf9947b1dadb9b672ea6134dc": "./apache-log4j-2.1-bin/log4j-core-2.1.jar",
	"c830cde8f929c35dad42cbdb6b28447df69ceffe99937bf420d32424df4d076a": "./apache-log4j-2.2-bin/log4j-core-2.2.jar",
	"6ae3b0cb657e051f97835a6432c2b0f50a651b36b6d4af395bbe9060bb4ef4b2": "./apache-log4j-2.3-bin/log4j-core-2.3.jar",
	"535e19bf14d8c76ec00a7e8490287ca2e2597cae2de5b8f1f65eb81ef1c2a4c6": "./apache-log4j-2.4-bin/log4j-core-2.4.jar",
	"42de36e61d454afff5e50e6930961c85b55d681e23931efd248fd9b9b9297239": "./apache-log4j-2.4.1-bin/log4j-core-2.4.1.jar",
	"4f53e4d52efcccdc446017426c15001bb0fe444c7a6cdc9966f8741cf210d997": "./apache-log4j-2.5-bin/log4j-core-2.5.jar",
	"df00277045338ceaa6f70a7b8eee178710b3ba51eac28c1142ec802157492de6": "./apache-log4j-2.6-bin/log4j-core-2.6.jar",
	"28433734bd9e3121e0a0b78238d5131837b9dbe26f1a930bc872bad44e68e44e": "./apache-log4j-2.6.1-bin/log4j-core-2.6.1.jar",
	"cf65f0d33640f2cd0a0b06dd86a5c6353938ccb25f4ffd14116b4884181e0392": "./apache-log4j-2.6.2-bin/log4j-core-2.6.2.jar",
	"5bb84e110d5f18cee47021a024d358227612dd6dac7b97fa781f85c6ad3ccee4": "./apache-log4j-2.7-bin/log4j-core-2.7.jar",
	"ccf02bb919e1a44b13b366ea1b203f98772650475f2a06e9fac4b3c957a7c3fa": "./apache-log4j-2.8-bin/log4j-core-2.8.jar",
	"815a73e20e90a413662eefe8594414684df3d5723edcd76070e1a5aee864616e": "./apache-log4j-2.8.1-bin/log4j-core-2.8.1.jar",
	"10ef331115cbbd18b5be3f3761e046523f9c95c103484082b18e67a7c36e570c": "./apache-log4j-2.8.2-bin/log4j-core-2.8.2.jar",
	"dc815be299f81c180aa8d2924f1b015f2c46686e866bc410e72de75f7cd41aae": "./apache-log4j-2.9.0-bin/log4j-core-2.9.0.jar",
	"9275f5d57709e2204900d3dae2727f5932f85d3813ad31c9d351def03dd3d03d": "./apache-log4j-2.9.1-bin/log4j-core-2.9.1.jar",
	"f35ccc9978797a895e5bee58fa8c3b7ad6d5ee55386e9e532f141ee8ed2e937d": "./apache-log4j-2.10.0-bin/log4j-core-2.10.0.jar",
	"5256517e6237b888c65c8691f29219b6658d800c23e81d5167c4a8bbd2a0daa3": "./apache-log4j-2.11.0-bin/log4j-core-2.11.0.jar",
	"d4485176aea67cc85f5ccc45bb66166f8bfc715ae4a695f0d870a1f8d848cc3d": "./apache-log4j-2.11.1-bin/log4j-core-2.11.1.jar",
	"3fcc4c1f2f806acfc395144c98b8ba2a80fe1bf5e3ad3397588bbd2610a37100": "./apache-log4j-2.11.2-bin/log4j-core-2.11.2.jar",
	"057a48fe378586b6913d29b4b10162b4b5045277f1be66b7a01fb7e30bd05ef3": "./apache-log4j-2.12.0-bin/log4j-core-2.12.0.jar",
	"5dbd6bb2381bf54563ea15bc9fbb6d7094eaf7184e6975c50f8996f77bfc3f2c": "./apache-log4j-2.12.1-bin/log4j-core-2.12.1.jar",
	"c39b0ea14e7766440c59e5ae5f48adee038d9b1c7a1375b376e966ca12c22cd3": "./apache-log4j-2.13.0-bin/log4j-core-2.13.0.jar",
	"6f38a25482d82cd118c4255f25b9d78d96821d22bab498cdce9cda7a563ca992": "./apache-log4j-2.13.1-bin/log4j-core-2.13.1.jar",
	"54962835992e303928aa909730ce3a50e311068c0960c708e82ab76701db5e6b": "./apache-log4j-2.13.2-bin/log4j-core-2.13.2.jar",
	"e5e9b0f8d72f4e7b9022b7a83c673334d7967981191d2d98f9c57dc97b4caae1": "./apache-log4j-2.13.3-bin/log4j-core-2.13.3.jar",
	"68d793940c28ddff6670be703690dfdf9e77315970c42c4af40ca7261a8570fa": "./apache-log4j-2.14.0-bin/log4j-core-2.14.0.jar",
	"9da0f5ca7c8eab693d090ae759275b9db4ca5acdbcfe4a63d3871e0b17367463": "./apache-log4j-2.14.1-bin/log4j-core-2.14.1.jar",
	"006fc6623fbb961084243cfc327c885f3c57f2eba8ee05fbc4e93e5358778c85": "./log4j-2.0-alpha1/log4j-core-2.0-alpha1.jar",
}
