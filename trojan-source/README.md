# Trojan Source

[*Trojan Source: Invisible Vulnerabilities*](https://trojansource.codes/trojan-source.pdf)

## Overview

We present a new type of attack in which source code is maliciously encoded so that it appears different to a compiler and to the human eye. This attack exploits subtleties in text-encoding standards such as Unicode to produce source code whose tokens are logically encoded in a different order from the one in which they are displayed, leading to vulnerabilities that cannot be perceived directly by human code reviewers.

'Trojan Source' attacks, as we call them, pose an immediate threat both to first-party software and supply-chain compromise across the industry. We present working examples of Trojan-Source attacks in C, C++, C#, JavaScript, Java, Rust, Go, and Python. We propose definitive compiler-level defenses, and describe other mitigating controls that can be deployed in editors, repositories, and build pipelines while compilers are upgraded to block this attack.

Additional details can be found in our [related paper](https://trojansource.codes/trojan-source.pdf) (also on [arXiv](https://arxiv.org/abs/2111.00169)) and at [trojansource.codes](https://trojansource.codes).

## Proofs-of-Concept

This repository is divided into per-language subdirectories. Each subdirectory contains a series of proofs-of-concept implementing various Trojan-Source attacks as well as a README describing the compilers/interpreters with which these attacks were verified.

## Attack Detection

Interested in analyzing source code files for the presence of Trojan Source attacks? Check out [this](https://github.com/nickboucher/bidi-viewer) repo, which visualizes bidirectional overrides.

## Citation

If you use anything in this repository, in the [*Trojan Source*](https://trojansource.codes/trojan-source.pdf) paper, or on [trojansource.codes](https://trojansource.codes) in your own work, please cite the following:

```bibtex
@article{boucher_trojansource_2021,
    title = {Trojan {Source}: {Invisible} {Vulnerabilities}},
    author = {Nicholas Boucher and Ross Anderson},
    year = {2021},
    journal = {Preprint},
    eprint = {2111.00169},
    archivePrefix = {arXiv},
    primaryClass = {cs.CR},
    url = {https://arxiv.org/abs/2111.00169}
}
```