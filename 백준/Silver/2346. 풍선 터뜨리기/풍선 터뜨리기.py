from collections import deque

def solution(n, numbers):
    deque_balloons = deque(enumerate(numbers, start=1))
    answer = []

    while deque_balloons:
        index, move = deque_balloons.popleft()
        answer.append(index)

        if not deque_balloons:
            break

        if move > 0:
            deque_balloons.rotate(-(move - 1))
        else:
            deque_balloons.rotate(-move)

    return " ".join(map(str, answer))

n = int(input())
numbers = list(map(int, input().split()))

# 출력
print(solution(n, numbers))
