// 50 60 70 79 80

// 130
// 139

// 50 50 70 70 79 80

function solution(people, limit) {
    let answer = 0;
    
    people.sort((a, b) => a - b);
    
    let ltr = 0, rtr = people.length - 1;
    
    while (ltr <= rtr) {
        answer++;
        
        if (ltr === rtr) break;
        
        if (people[ltr] + people[rtr] <= limit) {
            ltr++;
            rtr--;
        } else {
            rtr--;
        }
    }
   
    return answer;
}