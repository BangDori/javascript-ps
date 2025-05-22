function solution(s) {
    const s_list = s.split(" ");
    
    for (let i = 0; i < s_list.length; i++) {
        if (s_list[i] === "") continue;
        
        s_list[i] = s_list[i][0].toUpperCase() + (s_list[i].substring(1) || "").toLowerCase();
    }
    
    const answer = s_list.join(" ");

    return answer;
}