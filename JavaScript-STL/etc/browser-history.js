class BrowserHistory {
  constructor() {
    this.backStack = [];
    this.forwardStack = [];
    this.current = null;
  }

  visit(url) {
    if (this.current) this.backStack.push(this.current);
    this.current = url;
    this.forwardStack = []; // 앞으로 가기 스택 초기화
    console.log(`방문: ${url}`);
  }

  back() {
    if (this.backStack.length === 0) return;
    this.forwardStack.push(this.current);
    this.current = this.backStack.pop();
    console.log(`뒤로가기 → ${this.current}`);
  }

  forward() {
    if (this.forwardStack.length === 0) return;
    this.backStack.push(this.current);
    this.current = this.forwardStack.pop();
    console.log(`앞으로가기 → ${this.current}`);
  }

  print() {
    console.log("현재 페이지:", this.current);
    console.log("뒤로가기 스택:", this.backStack);
    console.log("앞으로가기 스택:", this.forwardStack);
  }
}

const browser = new BrowserHistory();

browser.visit("google.com");
browser.visit("github.com");
browser.visit("wikipedia.org");

browser.back(); // github.com
browser.back(); // google.com
browser.forward(); // github.com
browser.visit("stackoverflow.com"); // forward stack 초기화됨
browser.print();
