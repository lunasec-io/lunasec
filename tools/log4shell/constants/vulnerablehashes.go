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

var KnownVulnerableClassFileHashes = map[string]string{
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
	"0ebc263ba66a7452d3dfc15760c560f930d835164914a1340d741838e3165dbb": "log4j 2.4-2.5",       //MessagePatternConverter.class
	"52b5574bad677030c56c1a386362840064d347523e61e59ca1c55faf7e998986": "log4j 2.12",          //MessagePatternConverter.class
	"5c328eedefcb28512ff5d9a7556741dd159f0b13e1c0c52edc958d9821b8d2c5": "log4j 2.6",           //MessagePatternConverter.class
	"791a12347e62d9884c4d6f8e285098fedaf3bcdf591af3e4449923191588d43c": "log4j 2.8-2.9",       //MessagePatternConverter.class
	"8d5e886175b66ec2de5b61113fdaf06c50e1070cad1fb9150258e01d84d13c4b": "log4j 2.13",          //MessagePatternConverter.class
	"95b385ebc65843315aeae33551e7bbdad886e9e9465ea8d3179cd74344b37984": "log4j 2.10-2.11",     //MessagePatternConverter.class
	"a36c2e78cef7c2ddcc4ebbb11c085e85989eb93f9d19bd6254913b13dfe7c58e": "log4j 2.0-2.3",       //MessagePatternConverter.class
	"a3a65f2c5bc0dd62df115a0d9ac7140793c61b65bbbac313a526a3b50724a8c7": "log4j 2.8.2",         //MessagePatternConverter.class
	"ee41ae7ae80f5c533548a89c6d6e112df609c838b901daea99ac88ccda2a5da1": "log4j 2.7",           //MessagePatternConverter.class
	"f0a869f7da9b17d0a23d0cb0e13c65afa5e42e9567b47603a8fc0debc7ef193c": "log4j 2.14",          //MessagePatternConverter.class
	"f8baca973f1874b76cfaed0f4c17048b1ac0dee364abfdfeeec62de3427def50": "log4j 2.0-rc1",       //MessagePatternConverter.class

	"ce69c1ea49c60f3be90cb9c86d7220af86e5d2fbc08fd7232da7278926e4f881": "log4j 2.0-alpha1/alpha2/beta1", //MessagePatternConverter.class
	"963ee03ebe020703fea27f657496d35edeac264beebeb14bfcd9d3350343c0bf": "log4j 2.0-beta2/beta3",         //MessagePatternConverter.class
	"be8f32ed92f161df72248dcbaaf761c812ddbb59434abfd5c87482e9e0bd983c": "log4j 2.0-beta4",               //MessagePatternConverter.class
	"9a54a585ed491573e80e0b32e964e5eb4d6c4068d2abffff628e3c69ef9102cf": "log4j 2.0-beta5",               //MessagePatternConverter.class
	"357120b06f61475033d152505c3d43a57c9a9bdc05b835d0939f1662b48fc6c3": "log4j 2.0-beta6/beta7/beta8",   //MessagePatternConverter.class

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
