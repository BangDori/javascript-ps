function solution(phone_book) {
    const sortedPhoneBook = phone_book.sort((a, b) => a.length - b.length);
    const map = new Map();

    map.set(sortedPhoneBook[0], sortedPhoneBook[0].length);

    for (let i = 1; i < sortedPhoneBook.length; i++) {
        const currentMaxLength = map.get(sortedPhoneBook[i-1]);
        let phone = "";
        
        for (let j = 0; j < currentMaxLength; j++) {
            phone += sortedPhoneBook[i][j];
            if(map.has(phone)) return false;
        }
        
        map.set(sortedPhoneBook[i], sortedPhoneBook[i].length);
    }
    
    return true;
}