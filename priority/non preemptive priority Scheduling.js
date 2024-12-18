// Class to represent a process
class Process {
    constructor(name, burstTime, priority) {
        this.name = name;
        this.burstTime = burstTime;
        this.priority = priority;
        this.waitingTime = 0;
        this.turnaroundTime = 0;
    }
}

// Function to calculate waiting time and turnaround time
function calculateTimes(processes) {
    processes[0].waitingTime = 0; // First process has no waiting time
    processes[0].turnaroundTime = processes[0].burstTime;

    for (let i = 1; i < processes.length; i++) {
        processes[i].waitingTime = processes[i - 1].waitingTime + processes[i - 1].burstTime;
        processes[i].turnaroundTime = processes[i].waitingTime + processes[i].burstTime;
    }
}

// Function to calculate and display averages
function calculateAverages(processes) {
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    processes.forEach((process) => {
        totalWaitingTime += process.waitingTime;
        totalTurnaroundTime += process.turnaroundTime;
    });

    console.log(`\nAverage Waiting Time: ${(totalWaitingTime / processes.length).toFixed(2)} ms`);
    console.log(`Average Turnaround Time: ${(totalTurnaroundTime / processes.length).toFixed(2)} ms`);
}

// Main function
function main() {
    const processes = [];
    const n = parseInt(prompt("Enter the number of processes: "), 10);

    for (let i = 0; i < n; i++) {
        const name = `P${i + 1}`;
        const burstTime = parseInt(prompt(`Enter burst time for ${name}: `), 10);
        const priority = parseInt(prompt(`Enter priority for ${name}: `), 10);
        processes.push(new Process(name, burstTime, priority));
    }

    // Sort processes by priority
    processes.sort((a, b) => a.priority - b.priority);

    // Calculate waiting time and turnaround time
    calculateTimes(processes);

    // Display process details
    console.log("\nProcess\tBurst Time\tPriority\tWaiting Time\tTurnaround Time");
    processes.forEach((process) => {
        console.log(`${process.name}\t${process.burstTime}\t\t${process.priority}\t\t${process.waitingTime}\t\t${process.turnaroundTime}`);
    });

    // Calculate and display averages
    calculateAverages(processes);
}

// Run the main function
main();
