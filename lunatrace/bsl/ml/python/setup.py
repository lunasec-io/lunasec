# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

try:
    long_description = open("README.rst").read()
except IOError:
    long_description = ""

setup(
    name="lunasec_ml",
    version="0.1.0",
    entry_points={
        'console_scripts': [
            'lunasec-ml=lunasec_ml.main:main'
        ]
    },
    description="lunatrace ml cli",
    license="BSL",
    author="Forrest",
    packages=find_packages(),
    install_requires=[],
    long_description=long_description,
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.10",
    ]
)
