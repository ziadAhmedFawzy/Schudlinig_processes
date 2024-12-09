let content = document.getElementById('content');
let result = document.getElementById('result');

function calculatAverageWaitingTimeSJS(...num) {
    const arrange = num.sort((a, b) => a - b); 
    let adding = 0, storage = 0;
    for (let i = 0; i < arrange.length - 1; i++) {
        storage += arrange[i];
        adding += storage;
    }
    return adding / num.length;
}
function calculatAverageTurnaroundTimeSJS(...num) {
    const arrange = num.sort((a, b) => a - b); 
    let adding = 0, storage = 0;
    for (let i = 0; i < arrange.length; i++) {
        storage += arrange[i];
        adding += storage;
    }
    return adding / num.length;
}

let isPremative = prompt("is it premative ? (0 / 1)");
isPremative = +isPremative === 1 || isPremative.toLowerCase() === 'true';

let numsOfProcesses = parseInt(prompt('number of prcessess '), 10);
let nums = [];
for (let i = 0; i < numsOfProcesses; i++) {
    let n = parseInt(prompt(`prcess${i + 1}:`), 10);
    nums[i] = n;
}

content.innerHTML = `
    ${nums.map((e,i)=> 
        `<tr>
            <td><i>P</i>${i+1}</td>
            <td>${e}</td>
        </tr>`
    ).join('')}
`

result.innerHTML = `
    <h1>Let, all the processes arrived at the same time (at the time 0)</h1>
    <h2>Average waiting time = ${parseFloat(calculatAverageWaitingTimeSJS(...nums)).toFixed(2)}ns</h2>
    <h2>Average turnaround time = ${parseFloat(calculatAverageTurnaroundTimeSJS(...nums)).toFixed(2)}ns</h2>
`