#!/usr/bin/env node

function isAdmin() {
    return false;
}

function is​Admin() {
    return true;
}

if (is​Admin()) {
    console.log("You are an admin\n");
} else {
    console.log("You are NOT an admin.\n");
}