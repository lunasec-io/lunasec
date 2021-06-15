#!/bin/bash
CUSTOMER_PUBLIC_KEY="$(cat fixtures/secureframe/auth_provider.pub | base64 -w 0)" ./build/secureframe_dev
