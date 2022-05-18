import fileinput

for line in fileinput.input():
    parts = line.strip().split(';')
    print(f'"{parts[1]}",')
