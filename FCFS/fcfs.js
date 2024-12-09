function AverageBusrtme(...num) {
    let storage = 0, adding = 0;
    for (let i = 0; i < num.length - 1; i++) {
        storage += num[i];
        adding += storage;
    }
    return adding / num.length;
}

function AverageTurnaroundTime(...num) {
    let storage = 0, adding = 0;
    for (let i = 0; i < num.length; i++) {
        storage += num[i];
        adding += storage;
    }
    return adding / num.length;
}

let root = document.getElementById("root");

let num = parseInt(window.prompt("عدد العمليات: "), 10);
let nums = [];

for (let i = 0; i < num; i++) {
    let n = parseInt(prompt(`وقت التنفيذ للعملية ${i + 1}:`), 10);
    nums[i] = n;
}

let averageWaitingTime = AverageBusrtme(...nums);
let averageTurnaroundTime = AverageTurnaroundTime(...nums);

root.innerHTML = `
<table border="1">
<thead>
<tr>
<th>Process</th>
        <th>Burst Time</th>
    </tr>
</thead>
<tbody>
    ${nums
    .map((e, i) => 
    `<tr>
        <td>P${i + 1}</td>
        <td>${e}</td>
    </tr>`
    )
.join('')}
</tbody>
</table>
<p>average waiting time ${averageWaitingTime.toFixed(2)}</p>
<p>Average turnaround time${averageTurnaroundTime.toFixed(2)}</p>
`;
