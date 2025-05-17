class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    
    getParentIdx(child) {
        return Math.floor((child - 1) / 2);
    }
    
    getLeftChildIdx(parent) {
        return parent * 2 + 1;
    }
    
    getRightChildIdx(parent) {
        return parent * 2 + 2;
    }
    
    push(start, required) {
        this.heap.push({ start, required });
        this.bubbleUp();
    }
    
    bubbleUp() {
        let child = this.size() - 1;
        let parent = this.getParentIdx(child);
        
        while (this.heap[parent] && this.heap[child].required < this.heap[parent].required) {
            this.swap(parent, child);
            
            child = parent;
            parent = this.getParentIdx(child);
        }
    }
    
    pop() {
        const heapSize = this.size();
        
        if (heapSize === 0) return null;
        if (heapSize === 1) return this.heap.pop();
        
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        
        return root;
    }
    
    bubbleDown() {
        let parent = 0;
        let lChild = this.getLeftChildIdx(parent);
        let rChild = this.getRightChildIdx(parent);
        
        const heapSize = this.size();
        
        while ((lChild < heapSize && this.heap[lChild].required < this.heap[parent].required) || (rChild < heapSize && this.heap[rChild].required < this.heap[parent].required)) {
            if (rChild < heapSize && this.heap[rChild].required < this.heap[lChild].required) {
                this.swap(parent, rChild);
                parent = rChild;
            } else {
                this.swap(parent, lChild);
                parent = lChild;
            }
            
            lChild = this.getLeftChildIdx(parent);
            rChild = this.getRightChildIdx(parent);
        }
    }
}

function solution(jobs) {
    let answer = 0;
    const taskSize = jobs.length;
    
    jobs.sort((a, b) => b[0] - a[0]);
    const pq = new PriorityQueue();
    
    let i = 0;
    let time = 0;
    
    while (jobs.length > 0 || pq.size() > 0) {
        while (jobs.length) {
            if (jobs[jobs.length - 1][0] <= time) {
                const [start, required] = jobs.pop();
                pq.push(start, required);
            } else {
                break;
            }
        }
        
        if (pq.size() > 0) {
            const { start, required } = pq.pop();
            
            answer += (required + time) - start;
            time += required;
        } else {
            time++;
        }
    }
    
    return Math.floor(answer / taskSize);
}