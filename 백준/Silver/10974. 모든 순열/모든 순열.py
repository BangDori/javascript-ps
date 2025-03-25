from itertools import permutations
import sys
input = sys.stdin.readline

N = int(input())
numbers = [i+1 for i in range(N)]

for perm in permutations(numbers, N):
    for number in perm:
        print(number, end=' ')
    print()