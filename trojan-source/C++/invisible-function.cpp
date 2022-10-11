#include <iostream>

bool isAdmin() {
    return false;
}

bool is​Admin() {
    return true;
}

int main() {
    if (is​Admin()) {
        std::cout << "You are an admin\n";
    } else {
        std::cout << "You are NOT an admin.\n";
    }
}