import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import'./components/time-task-widget.js';
import './components/mood-widget.js';
import './components/calendar-widget.js';



/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--comp2110-portal-background-color);
      
    }

    main {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: -10px;
    }

    .app-footer {
      font-family: 'roboto';
      font-size: x-large;
      align-items: center;
      background-color: rgb(199 207 250 / 44%);
      text-align: center;
      border-radius: 10px;
      border: 1px solid #3E362E;
      margin: 10px;
    }
    .app-footer a {
      margin-left: 5px;
    }

    header {
      font-family: 'Oswald'; 
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between; 
      background-color: rgb(33 42 49 / 68%);
      padding-right:1dvh;
      border-radius: 10px;
      border: 1px solid #3E362E;
      margin: 10px;
      color: #f9f9f9; 
    }
    h1 {
      width: 500px;
      align-items: centre;
      color: #f9f9f9;
    }
    login-widget{
      display: flex;
      width: 35dvh;
      justify-content: space-between;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Task Manager';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>      
        <task-manager></task-manager>     
        <widget-container header="Widgets">
          <ad-widget></ad-widget>
          <calendar-widget></calendar-widget>
          <time-task-widget></time-task-widget>
          <mood-widget ></mood-widget>
          <task-summary-widget ></task-summary-widget>
        </widget-container>
      </main>
      <footer class="app-footer">
        <p id="copyright">Copyright &copy; COMP2110 Web Designers, 2024.</p>
        <p id="attribution">Task Board Design of Group 102 - 
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MQCOMP2110-2024/web-development-project-group102"
            >Github.</a>
        </p>
      </footer>
    `;
  }
}

customElements.define('comp2110-task-manager', Comp2110TaskManager);
