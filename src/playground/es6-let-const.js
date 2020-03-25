var nameVar = 'Irving';
var nameVar = 'Dawwg';



console.log("nameVar", nameVar);


const nameConst = 'Frank';
const nameConst = 'st';

const multiplier = {
    numbers: [1, 3, 2, 4],
    multiplyBy: 2,
    multiply() {
        return this.numbers.map((num)=>
        num*this.multiplyBy
        );
    }
};