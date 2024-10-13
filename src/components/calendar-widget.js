import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class CalendarWidget extends LitElement {
  static properties = {
    header: { type: String },
    tasks: { type: Array },
    _tasks: { state: true },
    currentDate: { type: Object }
  };

  static styles = css`
  :host {
    overflow: hidden;
    display: block;
    width: 250px;
    height: auto;
    border: 5px solid #aaa;
    background-color: #f8f8f8;
    color: #333;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-family: 'DynaPuff';
  }
  
  h3 {
    margin: 0;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background-color: #0052cc;
    border-radius: 10px;
  }
  
  .month-year {
    font-size: 20px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .arrow {
    cursor: pointer;
    font-size: 20px;
    color: #0052cc;
    display: inline-block;
  }
  
  .left-arrow {
    margin-right: auto;
  }
  
  .right-arrow {
    margin-left: auto;
  }
  
  p {
    flex: 1;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    width: 100%;
  }
  
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
  }
  
  .day {
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  
  .today {
    background-color: #0052cc;
    color: #fff;
  }
  
  .weekday {
    font-weight: bold;
    color: #172b4d;
    font-size: 12px;
  }
  .due-date {
    background-color: #ff7f50;
  }

  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

  constructor() {
    super();
    this.header = 'Calendar';
    this.currentDate = new Date();
    this.dueDateEvent = [];
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }
  
  connectedCallback() {
    super.connectedCallback();
  }

  _loadData() {
    const tasksToDo = TaskModel.getTasks('ToDo');
    const tasksDoing = TaskModel.getTasks('Doing');
    this._tasks = [...tasksToDo, ...tasksDoing];
    
    this.dueDateEvent = this._tasks.map(task => new Date(task.due).getDate());
  }
  
  _isDueDateInMonth(day) {
    const dueDatesInMonth = this._tasks.filter(task => {
      const taskDate = new Date(task.due).getDate();
      const taskMonth = new Date(task.due).getMonth();
      return taskDate === day && taskMonth === this.currentDate.getMonth();
    });
    return dueDatesInMonth.length > 0;
  }
  
  render() {
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const totalDaysInMonth = new Date(currentYear, this.currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, this.currentDate.getMonth(), 1).getDay();

    const calendarGrid = [];

    for (let i = 1; i <= 7; i++) {
      calendarGrid.push(html`<div class="day weekday">${daysOfWeek[(i + 6) % 7]}</div>`); 
    }

    for (let i = 0; i < (firstDayOfMonth + 6) % 7; i++) {
      calendarGrid.push(html`<div class="day"></div>`);
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const isToday = i === new Date().getDate() && currentYear === new Date().getFullYear() && this.currentDate.getMonth() === new Date().getMonth();
      const isDueDate = this._isDueDateInMonth(i);
      const tasksummary = this._getTaskSummary(i);

      calendarGrid.push(html`
        <div class="day ${isToday ? 'today' : ''} ${isDueDate ? 'due-date tooltip' : ''}" title="${tasksummary}">${i}
          ${isDueDate ? html`<span class="tooltiptext">${tasksummary}</span>` : ''}
        </div>`);
    }

    return html`
    <h3>${this.header}</h3>
    <div class="month-year">
      <div class="left-arrow arrow" @click="${this.previousMonth}">&#9664;</div>
      ${currentMonth} ${currentYear}
      <div class="right-arrow arrow" @click="${this.nextMonth}">&#9654;</div>
    </div>
    <div class="calendar">${calendarGrid}</div>
    `;
  }  
  
  _getTaskSummary(date) {
    const tasksOnDate = this._tasks.filter(task => new Date(task.due).getDate() === date);
    return tasksOnDate.map(task => task.summary).join(', ');
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.requestUpdate();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.requestUpdate();
  }
}

customElements.define('calendar-widget', CalendarWidget);