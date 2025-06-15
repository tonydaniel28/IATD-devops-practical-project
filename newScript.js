import readlineSync from "readline-sync";

console.log("hello");
const x=5;
const y=6;
let z=x+y;
console.log(z);
//let myName = 'Anupama Kittur';
let num1 = 10;
let num2 = 20;
let sum = num1+num2;

//console.log('My name is : ' + myName);
console.log('Sum of 2 numbers is: ', + sum);

//read input
let myName = readlineSync.question("What is ur name?");
console.log(myName);

//If-else statement
if(myName.length>10)
{
    console.log('Wow, such a long response!')
}
else
{
    console.log('Nice and concise!')
}

let feel = readlineSync.question("How r u feeling today?");
console.log(feel);

//Array
const meals = ["Brterakfast", 'Lunch', 'Dinner'];
console.log("My 1st meal of the day: " + meals[0]);
console.log("My 2nd meal of the day: " + meals[1]);
console.log("My 3rd meal of the day: " + meals[2]);

meals[3] = "dessert";
console.log("My special meal of the day: " + meals[3]);

//for loop
const newArray = [];
let i;
for(i=0;i<3;i++)
{
    newArray[i] = readlineSync.question('Please input some value: ');
}
console.log(newArray);

//while loop
const newArray2 = [];
let j=0;
while(j<3)
{
    //let newArray2Value = readlineSync.question('Please enter some valule:');
    //newArray2.push(newArray2Value);
    newArray2[j]=readlineSync.question('Please enter some valule:');
    j++;
}
console.log(newArray2);