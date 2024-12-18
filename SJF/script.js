let content = document.getElementById('content');
// To avoid problems and similarity of variables
let resslt = document.getElementById('result');

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

if(isPremative == 0) {
    let isSameTime = prompt('is same time ? (1,0) OR (T/F)');
    isSameTime = +isSameTime === 1 || isSameTime.toLowerCase() === 't';
    if(isSameTime) {
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
    
    resslt.innerHTML = `
    <h2>Average waiting time = ${parseFloat(calculatAverageWaitingTimeSJS(...nums)).toFixed(2)}ns</h2>
        <h2>Average turnaround time = ${parseFloat(calculatAverageTurnaroundTimeSJS(...nums)).toFixed(2)}ns</h2>
        `
    }
    else {
        let numsOfProcesses = parseInt(prompt('number of prcessess '), 10);
        let processes = [];
    
        for(let i = 0; i < numsOfProcesses; i++){
            let processBurstTime = prompt(`process burst time of p${i+1} : `);
            let processArrivalTime = prompt('process arrival time: ');
            let process = {
                burstTime: processBurstTime,
                arrivalTime: processArrivalTime,
            }
            processes.push(process);
        }
        /*
                   0
        0 + 12 =  12
        12 + 4 =  16
        16 + 6 =  22
        22 + 8 =  30
        30 + 10 = 40
    
        p2 p4 p5 p3 p1
        [0,12,16,22,30,40]
    
        // 0 -  0 = 0
        12 - 5 = 7
        16 - 12 = 4
        22 - 3 = 19
        30 - 10 = 20
    
        20 + 19 + 4 + 7 + 0 = 50 / 5 => 10 
    
        0:{burstTime: '12', arrivalTime: '0'}
        1:{burstTime: '4', arrivalTime: '5'}
        2:{burstTime: '6', arrivalTime: '12'}
        3:{burstTime: '8', arrivalTime: '3'}
        4:{burstTime: '10', arrivalTime: '10'}
        */
        let processTo = processes.slice(1);
        let processFrom = processes.slice(0,1);
        processTo.sort((a, b) => a.burstTime - b.burstTime); 
        let result = processFrom.concat(processTo);
        console.log(result)
    
        let sums = [], calc = 0;
        for(let i = 0; i < result.length; i++) {
            calc += parseFloat(result[i].burstTime)
            sums[i] = calc;
        }
        calc = 0
        let startTime = sums.slice(0, sums.length - 1);
        let arrivalTime = result.slice(1);
        for(let i = 0; i < sums.length - 1; i++) {
            calc += startTime[i] - +arrivalTime[i].arrivalTime
        }
        resslt.innerHTML = `
        <h1>Let, all the processes arrived at the same time (at the time 0)</h1>
        <h2>Average waiting time = ${calc / processes.length}ns</h2>
        `
    }
    
}
else {
    /*
    p1 12 0    = 9
    p2 8  3    = 6 => rem 2 => (true)
    p3 3  5    (true)
    p4 7  12    (true)

    wait = 0

    p1 p2 p2 p3 p2 p2 p4 p1
    0  3  5  8  12 14 21  30
    */ 
   // تعريف هيكل البيانات للعمليات
class Process {
    constructor(name, burstTime) {
        this.name = name; // اسم العملية
        this.burstTime = burstTime; // الوقت الذي تستغرقه العملية
        this.waitTime = 0; // الوقت الذي تنتظر فيه العملية
        this.turnAroundTime = 0; // الوقت الإجمالي الذي تستغرقه العملية (الانتظار + التنفيذ)
    }
}

// خوارزمية SJF غير مسبقة
function sjf(processes) {
    // ترتيب العمليات حسب الوقت الذي تستغرقه (burst time) بترتيب تصاعدي
    processes.sort((a, b) => a.burstTime - b.burstTime);

    let totalWaitTime = 0;
    let totalTurnAroundTime = 0;

    // حساب أوقات الانتظار ووقت الانتهاء
    for (let i = 0; i < processes.length; i++) {
        if (i === 0) {
            processes[i].waitTime = 0; // العملية الأولى لا تنتظر
        } else {
            processes[i].waitTime = processes[i - 1].waitTime + processes[i - 1].burstTime;
        }

        processes[i].turnAroundTime = processes[i].waitTime + processes[i].burstTime;

        totalWaitTime += processes[i].waitTime;
        totalTurnAroundTime += processes[i].turnAroundTime;
    }

    // حساب متوسط وقت الانتظار ووقت الانتهاء
    let avgWaitTime = totalWaitTime / processes.length;
    let avgTurnAroundTime = totalTurnAroundTime / processes.length;

    // طباعة النتائج
    console.log("Process\tBurst Time\tWait Time\tTurnaround Time");
    processes.forEach(process => {
        console.log(`${process.name}\t\t${process.burstTime}\t\t${process.waitTime}\t\t${process.turnAroundTime}`);
    });

    console.log(`\nAverage Waiting Time: ${avgWaitTime}`);
    console.log(`Average Turnaround Time: ${avgTurnAroundTime}`);
}

let p1 = prompt('enter p1')
let p2 = prompt('enter p2')
let p3 = prompt('enter p3')
let p4 = prompt('enter p4')

let processes = [
    new Process("P1", p1),
    new Process("P2", p2),
    new Process("P3", p3),
    new Process("P4", p4)
];

sjf(processes);

}