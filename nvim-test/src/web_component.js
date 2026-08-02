// Interactive web component
class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tasks = [];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    setupEventListeners() {
        this.shadowRoot.querySelector('.add-btn')?.addEventListener('click', () => {
            this.addTask();
        });

        this.shadowRoot.querySelector('.task-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    addTask() {
        const input = this.shadowRoot.querySelector('.task-input');
        const text = input?.value.trim();
        if (text) {
            this.tasks.push({ id: Date.now(), text, completed: false });
            input.value = '';
            this.render();
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Tasks';
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; font-family: system-ui, sans-serif; }
                .container { padding: 16px; background: #f5f5f5; border-radius: 8px; }
                h2 { margin: 0 0 16px; color: #333; }
                .task-list { list-style: none; padding: 0; margin: 0; }
                .task-item { display: flex; align-items: center; padding: 8px; margin: 4px 0; background: white; border-radius: 4px; }
                .task-item.completed { text-decoration: line-through; opacity: 0.6; }
                .delete-btn { margin-left: auto; color: #e74c3c; cursor: pointer; }
            </style>
            <div class="container">
                <h2>${title}</h2>
                <input type="text" class="task-input" placeholder="New task...">
                <button class="add-btn">Add</button>
                <ul class="task-list">
                    ${this.tasks.map(task => `
                        <li class="task-item ${task.completed ? 'completed' : ''}">
                            <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                            <span>${task.text}</span>
                            <span class="delete-btn" data-id="${task.id}">×</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

customElements.define('task-list', TaskList);
