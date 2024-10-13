import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-card.js';
import './create-task.js'; 

class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: { state: true },
    _message: { state: true },
  };

  static styles = css`
    :host {
     
      background-color: #124E66;
      color: #ffcc33;
      border: 1px solid #3E362E;
      padding: 10px;
      margin: 10px;
      width: 50dvh;
      height: 98%;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
    }
    :host input {
      width: 5em;
    }
    .task-actions {
      display: block;
    }
    .task-actions li {
      display: inline-block;
    }
    h3{
      font-family: 'Oswald';
      background-color:#2E3944;
      border-radius: 5px;
      color: #f9f9f9;
      font-size: 35px;
    }
    button {
      cursor: pointer;
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(this.category);
    this.dispatchEvent(new CustomEvent('tasks', { detail: { tasks: this._tasks } }));
  }

  render() {
    const taskCount = this._tasks.length; // Calculate the number of tasks
    if (this._message) {
      return html`<h3>${this.category} (0 tasks)</h3> <p>${this._message}</p> `;
    } else if (this._tasks) {
  
      return html`
        <div>
          <div class="category">
            <h3>${this.category} (${taskCount} tasks)</h3>
          </div>
          <div class="card-list">
            ${this._tasks.map(task => html`<task-card id=${task.id}></task-card>`)}
          </div>
          ${this.category === 'ToDo' ? html`<create-task></create-task>` : ''}
        </div>
      `;
    }
  }
  
}



customElements.define('task-board', TaskBoard);