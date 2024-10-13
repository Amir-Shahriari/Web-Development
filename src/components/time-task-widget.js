import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


/**
 * WidgetBlock <widget-block header="Sample Widget">
 * Base example for a widget, used as a placeholder in design for unimplemented
 * widgets
 */
class tasktime extends LitElement {
   // Define static properties for the component//
  static properties = {
    header: {type: String},
    tasks: { type: Array }
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 200px;
        background-color: #338FAD;
        border: 6px solid #10164B;
        border-radius: 20px;
        margin-right:26px;
        margin-bottom: 100px
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.25s ease;
    background-color: #AAD7DA;
    position: relative;
    font-family: "Lucida Console", "Courier New", monospace;
    

   
    h3 {
      margin: 0 0 16px;
      font-size: 20px;
      font-family: "Lucida Console", "Courier New", monospace;
    }

    input[type="number"] {
      width: 100px;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: "Lucida Console", "Courier New", monospace;
      
    }
    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 16px;
      gap: 10px;
    }

    button {
      margin-top: 0px;
      padding: 16px 16px;
      font-size: 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: "Lucida Console", "Courier New", monospace;
    }

    button:hover {
      background-color: #0056b3;
      transform: translateY(-2px); 
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
    }
  `;

  static properties = {
    header: { type: String },
    duration: { type: Number },
    timerRunning: { type: Boolean }
  };

  constructor() {
    /* Initialize component properties*/
    super();
    this.header = 'Task Timer';
    this.duration = 15;
    this.timerRunning = false;
    this.timerInterval = null;
  }

  

  flashScreen() {
    const originalColor = this.style.backgroundColor;
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      if (flashCount % 2 === 0) {
        // Flash the screen to red
        this.style.backgroundColor = 'red';
      } else {
        // Restore the original background color
        this.style.backgroundColor = originalColor;
      }
      flashCount++;
      if (flashCount === 10) { // Number of flashes
        clearInterval(flashInterval);
      }
    }, 500);
  }
/** adding stoper */
  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerRunning = false;
    this.requestUpdate();
  }
/** adding reset */
  resetTimer() {
    this.stopTimer();
    this.requestUpdate();
  }

  handleDurationChange(event) {
    this.duration = parseInt(event.target.value);
  }

  render() {
    return html`
      <h3>${this.header}</h3>
      <input type="number" min="1" max="60" .value=${this.duration} @change=${this.handleDurationChange}> minutes<br><br>
      <div>${this.formatTime(this.duration * 60)}</div>
      <div>${this.formatTime(this.timerRunning ? this.calculateRemainingTime() : this.duration * 60)}</div>
      <div class="button-container">
        ${!this.timerRunning
          ? html`<button @click=${this.startTimer}>Start Timer</button>`
          : html`
              <button @click=${this.stopTimer}>Stop Timer</button>
              <button @click=${this.resetTimer}>Reset Timer</button>
            `}
      </div>
    `;
  }

  calculateRemainingTime() {
    return Math.max(this.duration * 60 - Math.floor((Date.now() - this.timerStartTime) / 1000), 0);
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.timerStartTime = Date.now();
      this.timerInterval = setInterval(() => {
        if (this.calculateRemainingTime() <= 0) {
          clearInterval(this.timerInterval);
          this.timerRunning = false;
          alert("Time's up!"); // Show an alert when the time is up
          this.flashScreen(); // Call the function to flash the screen
          return;
        }
        this.requestUpdate();
      }, 1000);
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
/* defining the custom element*/

customElements.define('time-task-widget', tasktime);
