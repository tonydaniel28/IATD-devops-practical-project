import readlineSync from "readline-sync";

const words = new Array(5);

console.log('Please input a series of 5 words where each new word must have more characters than the previous word');

for(let i=0;i<words.length;i++)
{
    words[i] = readlineSync.question('Please input ' + 'value'  + (i+1) + ' :');
    console.log(words[i]);
}

console.log(words);

for(let i=0; i< words.length; i++)
{
    //console.log(words[i].length);
    if(i == words.length-1)
    {
        break;
    }

    if(words[i].length < words[i+1].length)
    {
        console.log(words[i+1] + ' is lengthier than ' + words[i]);
        console.log('Success - You are following the series!');
    }
    else if(words[i].length > words[i+1].length)
    {
        console.log(words[i+1] + ' is shorter than ' + words[i]);
        console.log('Sorry, You failed to follow the series');
        break;
    }
}