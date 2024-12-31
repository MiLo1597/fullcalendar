export class Sidebar {
    constructor() {
        this.element = document.getElementById('sidebar');
        this.workers = [
            { id: 6, name: 'Jake Sipe', time: '04:01 pm' },
            { id: 3, name: 'Bryan Broberg', time: '05:15 pm' },
            { id: 6, name: 'Gerald Roberts', time: '04:40 pm' },
            { id: 0, name: 'Test Technician-Salesman Test Te', time: '10:55 am' },
            { id: 2, name: 'Cody Scott', time: '03:11 pm' }
        ];
    }

    render() {
        this.element.innerHTML = `
            <div class="sidebar">
                <div class="section-header">
                    <h2>Field Workers</h2>
                </div>
                ${this.workers.map(worker => this.renderWorker(worker)).join('')}
            </div>
        `;
    }

    renderWorker(worker) {
        return `
            <div class="worker-item">
                <div class="worker-header">
                    <span>${worker.name} (${worker.id})</span>
                    <span>${worker.time}</span>
                </div>
                <div class="worker-contact">
                    <i class="fas fa-phone"></i>
                    <i class="fas fa-envelope"></i>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;
    }
}

