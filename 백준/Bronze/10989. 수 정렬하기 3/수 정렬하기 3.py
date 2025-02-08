import sys
input = sys.stdin.readline

def solution():
    n = int(input())
    count_map = init_map()

    for _ in range(n):
        count_map[int(input())] += 1

    for i in range(1, 10001):
        if (count_map[i] == 0): continue
        for _ in range(count_map[i]):
            print(i)

    return

def init_map():
    return {i: 0 for i in range(1, 10001)}

solution()