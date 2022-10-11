#include <stdio.h>
#include <stdbool.h>

bool isAdmin() {
    return false;
}

bool is​Admin() {
    return true;
}

int main() {
    if (is​Admin()) {
        printf("You are an admin\n");
    } else {
        printf("You are NOT an admin.\n");
    }
}