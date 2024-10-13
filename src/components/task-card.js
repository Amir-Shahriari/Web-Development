import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './edit-task.js';



class TaskCard extends LitElement {
  static properties = {
    id: { type: Number },
    _task: { state: true },
    showPopup: { type: Boolean },
  };

  static styles = css`
 
    :host {
      font-family: 'Comfortaa';
      display: block;
      width: 50dvh;
      background-color: #748D92;
      color: #003000;
      border-radius: 5px;
      position: relative; 
    
    }

    h2 {
      background-color: #2E3944;
      font-size: large;
      font-variant: small-caps;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      padding: 10px;
      color: #f9f9f9;
    }
    .header-popup {
      background-color: #000000b4;
      font-size: large;
      font-variant: small-caps;
      border-radius: 30px;
      padding: 10px;
      color: #f9f9f9;
    }

    .task-content {
      max-height: 150px;
      max-width: 50dvh;
      overflow: hidden;
      color: #f9f9f9;
      word-wrap: break-word; 
      overflow-wrap: break-word;
      text-align: left;
      display: flex; 
      flex-direction: row;
    }
    .task-due {
      color: #f9f9f9;
      text-align: left;
    }
    .task-priority {
      color: #f9f9f9;
      text-align: left;
    }
    .task-timestamp {
      color: #f9f9f9;
      text-align: left;
    }

    .task-content:before {
      content: "Contents";
      display: inline-block;
      color: black;
      font-weight: bold;
      margin-right: 24px;
      margin-left: 5px; 
    }
    .task-due:before {
      content: "Due Date";
      display: inline-block;
      color: #ff0000;
      font-weight: bold;
      margin-right: 20px;
      margin-left: 5px; 
    }
    .task-priority:before {
      content: "Priority";
      display: inline-block;
      color: yellow;
      font-weight: bold;
      margin-right: 41px;
      margin-left: 5px; 
    }
    .task-timestamp:before {
      content: "Start Date";
      display: inline-block;
      color: blue;
      font-weight: bold;
      margin-right: 10px; 
      margin-left: 5px; 
    }

    .pop-content,
    .pop-due,
    .pop-priority,
    .pop-timestamp {
      text-align: left;
      word-wrap: break-word; 
      overflow-wrap: break-word;
    }
    .pop-content:before {
      content: "Contents";
      display: inline-block;
      color: black;
      font-weight: bold;
      margin-right: 24px; 
    }
    .pop-due:before {
      content: "Due Date";
      display: inline-block;
      color: #ff0000;
      font-weight: bold;
      margin-right: 20px; 
    }
    .pop-priority:before {
      content: "Priority";
      display: inline-block;
      color: yellow;
      font-weight: bold;
      margin-right: 41px; 
    }
    .pop-timestamp:before {
      content: "Start Date";
      display: inline-block;
      color: blue;
      font-weight: bold;
      margin-right: 10px; 
    }

    .popup {
      position: absolute; 
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgb(199 207 250 / 88%);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: none;
      width: 370px;
    }
    .popup-button {
      cursor: pointer;
      border-radius: 40px;
    }
    .popup.active {
      display: block;
    }

    button {
      margin: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover{
      box-shadow: 0 5px 4px rgba(0, 0, 0, 0.4);
    }
    .task-text {
      max-width: 100%;
      word-wrap: break-word; 
      overflow-wrap: break-word; 
    }
  `;

  constructor() {
    super();
    this.showPopup = false; 
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    
    window.addEventListener('tasks', () => {
      this._loadData();
  
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }


  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  
  async deleteTask() {
    try {
      await TaskModel.deleteTask(this.id);
      TaskModel.loadData();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
}


  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
        <div id="task-contents">
          <h2>${this._task.summary}</h2>
          <p class='task-timestamp'>${ts.toDateString()}</p>
          <p class='task-due'>${due.toDateString()}</p>
          <p class='task-content'>${this._task.text}</p>
          <p class='task-priority'>${this._task.priority}</p>
          <edit-task id=${this.id}></edit-task>
          <button @click="${this.deleteTask}">Delete</button>
          <button class='popup-button' @mouseenter="${() => this.togglePopup()}" @mouseleave="${() => this.togglePopup()}">Pop Up</button>
          <div class="popup ${this.showPopup ? 'active' : ''}" @mouseenter="${() => this.togglePopup()}" @mouseleave="${() => this.togglePopup()}">
          <h2 class='header-popup'>${this._task.summary}</h2>
          <p class='pop-timestamp'> ${ts.toDateString()}</p>
          <p class='pop-due'> ${due.toDateString()}</p>  
          <p class="pop-content"> ${this._task.text}</p>
          <p class='pop-priority'> ${this._task.priority}</p>
          </div>
          
        </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}

customElements.define('task-card', TaskCard);
