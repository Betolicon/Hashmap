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
        return this.count
    }

    get(key){
        const index = this._hash(key)
        const bucket = this.array[index];
        if (bucket) {
            for (let [k, v] of bucket) {
                if (k === key) {
                    return v;
                }
            }
        }
        return null;
    }

    has(key){
        return this.get(key) !== null ? true : false
    }

    remove(key){
        const index = this._hash(key)
        const bucket = this.array[index];
        if (bucket) {
            for (let i = 0; i<bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i,1)
                    this.count --
                    return true
                }
            }
        }
        return false;
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
        if (this.count  > this.loadFactor * this.capacity){
            this._grow()
        }

    }

    clear(){
        this.array.fill(null)
    }

    keys(){
    const keysArray = []
    for (const bucket of this.array) {
        if (bucket) {
            for (const [key] of bucket) {
                keysArray.push(key)
            }
        }
        }
    return keysArray
    }

    values(){
        const valuesArray = []
        for (const bucket of this.array) {
            if (bucket) {
                for (const [, value] of bucket) {
                    valuesArray.push(value)
                }
            }
        }
        return valuesArray
    }

    entries(){
        const entriesArray = []
        for (const bucket of this.array) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    entriesArray.push([key, value])
                }
            }
        }
        return entriesArray
    }
    
} 

module.exports = { HashMap };