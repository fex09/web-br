const x = {
    a: 1,
    b: 2,
};

const y = {
    ...x,
    c: 3
};

const z = {
    ...y,
    a: 4
};

class Car {
    constructor(name) {
        this.name = name;
    }

    getCarName() {
        return this.name;
    }
}

const newCard = new Car('Kit');

console.log(newCard);

console.log(newCard.getCarName());
