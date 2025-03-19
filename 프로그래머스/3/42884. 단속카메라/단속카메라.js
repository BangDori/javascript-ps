// 23:25 ~ 23:45

// 고속도로를 이동하는 모든 차량이 고속도로를 이동하면서, 단속용 카메라를 "최소 한 번"은 만나도록 카메라 설치

// 고속도로를 이동하는 차량의 경로 routes가 매개변수로 주어질 때, 모든 차량이 한 번은 단속용 카메라를
// 만나도록 하려면 최소 몇 대의 카메라가 필요한지?

// 차량의 대수는 1 <= cars <= 10,000
// routes[i][0]은 고속도로 진입 지점, routes[i][1]은 고속도로에서 나간 지점
// 차량의 진입/진출 지점에 카메라가 설최더 있어도 카메라를 만난 것
// -30,000 <= routes[i][0], routes[i][1] <= 30,000

// 종료 지점을 기준으로 정렬!

// 차량의 진입 지점과 진출 지점은 동일할 수 있다.

function solution(routes) {
    if (routes.length === 1) return 1;
    
    var answer = 1;
    
    routes.sort((a, b) => {
        return a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0];
    })

    let cameraPos = routes[0][1];    
    
    for (let i = 1; i < routes.length; i++) {
        const [start, end]  = routes[i];
        if (cameraPos >= start && cameraPos <= end) {
            continue;
        }
        
        cameraPos = end;
        answer++;
    }
        
    return answer;
}

// 1. 완전 겹치기: [[-3, -1], [-2, 0], [-1, 1], [0, 2]], -1, 2 => 2
// 2. 둘 중 하나 겹치기: [[-3, -1], [-1, 4], [4, 8], [9, 13]] -1, 8, 13 => 3
// 3. 하나도 겹치지 않기: [[-3, -1], [2, 6], [12, 77], [91, 128]] => -1, 6, 77, 128 => 4

// cameraPos >= start && cameraPos <= end
// 카메라값이 시작보다 작고, 엔드보다 작은 경우 -> camera < start, camera <= end;
// [[-4, -1], [1, 4], [6, 7]], 3
// -1 설치
// 카메라값이 시작 이상인데, 엔드보다 큰 경우 -> camera >= start, camera > end;
// [[-4, -1], [-3, -2], [6, 12], [7, 11]], 2
// 카메라값이 시작보다 작고, 엔드보다 큰 경우 -> camera < start, camera > end;
// [[-5, -3], [0, -4]], 1
