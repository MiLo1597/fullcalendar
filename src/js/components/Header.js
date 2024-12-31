export class Header {
    constructor(calendar) {
        this.element = document.getElementById('header');
        this.calendar = calendar;
    }

    render() {
        this.element.innerHTML = `
            <div class="header">
                <div class="header-content">
                    <div class="date-nav">
                        <button class="btn" id="prev-btn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <span id="current-date"></span>
                        <button class="btn" id="next-btn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary">Service/Install</button>
                        <button class="btn btn-success">Schedule Note</button>
                        <label class="checkbox-label">
                            <input type="checkbox" id="show-all-users"> Show all User
                        </label>
                        <button class="btn">Map Info</button>
                    </div>
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Search...">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
        this.updateDate();
    }

    attachEventListeners() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.addEventListener('click', () => {
            this.calendar.prev();
            this.updateDate();
        });

        nextBtn.addEventListener('click', () => {
            this.calendar.next();
            this.updateDate();
        });
    }

    updateDate() {
        const dateElement = document.getElementById('current-date');
        const date = this.calendar.getViewStartDate();
        dateElement.textContent = this.formatDate(date);
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).replace(',', '');
    }
}

