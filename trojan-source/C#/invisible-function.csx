#!/usr/bin/env dotnet-script

bool isAdmin() {
    return false;
}

bool is‌Admin() {
    return true;
}

int main() {
    if (is‌Admin()) {
        Console.WriteLine("You are an admin");
    } else {
        Console.WriteLine("You are NOT an admin.\n");
    }
}