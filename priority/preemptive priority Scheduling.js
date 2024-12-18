class Process {
    constructor(name, arrivalTime, burstTime, priority) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.remainingTime = burstTime;
        this.waitingTime = 0;
        this.turnaroundTime = 0;
    }
}

function calculateTimes(processes) {
    let completed = 0;
    let currentTime = 0;
    const n = processes.length;

    while (completed !== n) {
        let minPriorityIndex = -1;
        let found = false;

        for (let i = 0; i < n; i++) {
            if (processes[i].remainingTime > 0 && processes[i].arrivalTime <= currentTime) {
                if (!found || processes[i].priority < processes[minPriorityIndex].priority) {
                    found = true;
                    minPriorityIndex = i;
                }
            }
        }

        if (found) {
            processes[minPriorityIndex].remainingTime--;
            currentTime++;

            if (processes[minPriorityIndex].remainingTime === 0) {
                completed++;
                processes[minPriorityIndex].turnaroundTime = currentTime - processes[minPriorityIndex].arrivalTime;
                processes[minPriorityIndex].waitingTime = processes[minPriorityIndex].turnaroundTime - processes[minPriorityIndex].burstTime;
            }
        } else {
            currentTime++;
        }
    }
}

// Function to calculate and display averages
function calculateAverages(processes) {
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    const n = processes.length;

    processes.forEach(process => {
        totalWaitingTime += process.waitingTime;
        totalTurnaroundTime += process.turnaroundTime;
    });

    console.log(`Average Waiting Time: ${(totalWaitingTime / n).toFixed(2)}`);
    console.log(`Average Turnaround Time: ${(totalTurnaroundTime / n).toFixed(2)}`);
}

// Main function
function main() {
    const processes = [];
    const n = parseInt(prompt("Enter the number of processes: "), 10);

    for (let i = 0; i < n; i++) {
        const name = `P${i + 1}`;
        const arrivalTime = parseInt(prompt(`Enter arrival time for ${name}: `), 10);
        const burstTime = parseInt(prompt(`Enter burst time for ${name}: `), 10);
        const priority = parseInt(prompt(`Enter priority for ${name}: `), 10);
        processes.push(new Process(name, arrivalTime, burstTime, priority));
    }

    // Calculate times
    calculateTimes(processes);

    // Display process details
    console.log("\nProcess\tArrival Time\tBurst Time\tPriority\tWaiting Time\tTurnaround Time");
    processes.forEach(process => {
        console.log(`${process.name}\t${process.arrivalTime}\t\t${process.burstTime}\t\t${process.priority}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
    });

    // Calculate and display averages
    calculateAverages(processes);
}

// Run the main function
main();