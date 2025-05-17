function solution(genres, plays) {
    var answer = [];
    
    const playlist = new Map(); // 플레이 리스트 저장
    const play_count = new Map(); // 재생 횟수 저장
    
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const play = plays[i];
        
        if (!play_count.has(genre)) play_count.set(genre, 0);
        if (!playlist.has(genre)) playlist.set(genre, []);
        
        play_count.set(genre, play_count.get(genre) + plays[i]);
        playlist.set(genre, [...playlist.get(genre), [i, plays[i]]]);
    }
    
    const play_count_list = [...play_count.keys()].map((key) => [key, play_count.get(key)]).sort((a, b) => b[1]-a[1]);
    
    for (const [genre] of play_count_list) {
        const play_songs = playlist.get(genre);
        
        let count = 0;
        play_songs.sort((a, b) => {
            if (a[1] !== b[1]) {
                return a[1] - b[1];
            }
            
            return b[0] - a[0];
        });
        
        while (play_songs.length > 0 && count < 2) {
            const [pid] = play_songs.pop();
            count++;
            
            answer.push(pid);
        }
    }

    return answer;
}