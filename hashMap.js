class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75){
        this.loadFactor = loadFactor
        this.capacity = initialCapacity  
        this.array = new Array(this.capacity).fill(null)
        this.count = 0
    }

    _hash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
                                            }

        return hashCode % this.capacity;
            }

    checkSize(index){
        if (index < 0 || index >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    set(key, value){
        this._checkCapacity()  

        const index = this._hash(key)
        if (!this.array[index]) {
            this.array[index] = [];
        }
        const bucket = this.array[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; 
                return;
            }
        }
        bucket.push([key, value]);
        this.count++;  
    }

    show(){
        for (let i = 0; i < this.array.length; i++) {
            const bucket = this.array[i];
            if (bucket) {
                for (const [key, value] of bucket) {
                    console.log(`Índice ${i}: ${key} => ${value}`);
                }
            }
        }
    }

    length(){
        console.log(this.array.length)
        return this.count
    }

    _grow(){
        this.capacity *= 2
        const oldArray = this.array
        this.array = new Array(this.capacity).fill(null)

        for (const bucket of oldArray) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value); 
                }
            }
        }
    }

    _checkCapacity(){
        if (this.count  > this.loadFactor * this.capacitys){
            this._grow()
        }

    }

    clear(){
        this.array.fill(null)
    }
    } 

module.exports = { HashMap };