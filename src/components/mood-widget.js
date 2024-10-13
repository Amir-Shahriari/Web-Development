import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class Moodwidget extends LitElement {
  static properties = {
    header: { type: String },
    tasks: { type: Array, state: true },
  };

  static styles = css`
  :host {
    display: block;
    width: 250px;
    height: 250px;
    margin-top: 10px;
    border: 5px solid black;
    border-radius: 20px;
    overflow: hidden;
    background-color: transparent;
    position: relative;
    font-family: 'DynaPuff'; 
   }
  
  .inner-container {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
  }
  
  .content {
    position: absolute;
    top: ;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  h3 {
    width: 60%;
    margin: 0;
    padding: 10px;
    border-radius: 10px;
    color: white;
    text-align: center;
    font-size: 55px;
  }
  
  p {
    flex: 1;
    width: 70%;
    margin: 10px;
    padding: 10px;
    border-radius: 50px;
    background-color: rgba(23, 24, 54, 0.1);
    color: white;
    display: flex;
    text-align: center;
    font-size:27px;
  }
  `;

  constructor() {
    super();
    this.header = 'Mood';
    this.tasks = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTasks();
    window.addEventListener('tasks', () => this.fetchTasks());
  }
  
  fetchTasks() {
    const tasksToDo = TaskModel.getTasks('ToDo');
    const tasksDoing = TaskModel.getTasks('Doing');
    this.tasks = [...tasksToDo, ...tasksDoing];  // tasks todo and doing
  }

  render() {
    const backgroundColor = this.MoodColours();
    const boxShadow = this.Glow();
    const noTodoTasks = this.tasks.length === 0;  //check if there are any tasks 

    return html`
      <div class="inner-container" style="background: ${backgroundColor};">
        <div class="content">
          <h3>${this.header}</h3>
          ${noTodoTasks ? html`<p>All tasks completed, Time to relax!</p>` : html`<p>Tasks Pending Completion</p>`}
        </div>
      </div>
      <style>
        :host { box-shadow: ${boxShadow}; }
      </style>
    `;
  }
  MoodColours() {
    // background colours for mood and time of day
    const hour = new Date().getHours();
    return hour < 0 ? 'linear-gradient(to bottom right, #001322, #001322, #001322, #00182b, #011d34)' : // before 6 am 
           hour < 2 ? 'linear-gradient(to bottom right, #07506e, #1386a6, #61d0cf, #a3dec6, #e8ed92)' : // before 12 pm
           hour < 18 ? 'linear-gradient(to bottom right, #ffe467, #ffe467, #ffd364, #f9a856, #f4896b)' : // before 6 pm
           'linear-gradient(to bottom right, #713684, #45217c, #372074, #233072, #012459)'; // after 6pm 
  }
  
  Glow() {
    //glow effect
    const today = new Date().getDay();
    const noTodoTasks = this.tasks.length === 0;
    if (noTodoTasks) {
      return '0 0 200px 50px rgba(255, 255, 0, 0.9), inset 0 0 30px 15px rgba(255, 255, 0, 0.9)';
    }
    return '';
  }  
}

customElements.define('mood-widget', Moodwidget);
