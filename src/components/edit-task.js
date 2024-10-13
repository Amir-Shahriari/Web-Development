import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class EditTask extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
        form {
          font-family: "Cabin", sans-serif;
          display: flex; 
          flex-direction: column; 
          gap: 15px;
        
        
        }
        form div {
            display: grid;
            grid-template-columns: 1fr 3fr;
        }
        input {
            width: 100%;
        }
        button {
          margin: 10px;
          border-radius: 5px;
        }
        button:hover{
          box-shadow: 0 5px 4px rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }

        input[type="submit"]{
          border-radius: 5px;
        }
        #cancel-button:hover{
          background-color: red;
        }
        input[type="submit"]:hover {
          background-color: forestgreen; 
          box-shadow: 0 5px 4px rgba(0, 0, 0, 0.4);
          cursor: pointer;
     }
     
     dialog {
      background-color: #748d92d3;
      border-radius: 10px;
     }
      `;

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
      category: formData.get('category'),
    };
    TaskModel.updateTask(this.id, newTask);
    this._hideModal(event);
  }


  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.showModal();
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.close();
  }

  render() {
    // convert due date from milliseconds time to an ISO string
    // suitable for the datetime-local form input
    const isoString = new Date(this._task.due).toISOString();
    const due = isoString.substring(0, isoString.indexOf('T') + 6);
    return html`
        <button @click=${this._showModal}>Edit</button>
        <dialog id="edit-task-dialog">
            <form @submit="${this._submit}">
                <div>
                    <label for="summary">Summary</label>
                    <input name="summary" value=${this._task.summary}>
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text">${this._task.text}</textarea> 
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input name="priority" 
                           type="number" 
                           value=${this._task.priority}> 
                </div>
                <div>
                    <label for="due">Due</label>
                    <input name="due" type="datetime-local" value=${due}>
                </div>
                <div>
                  <label for="category">Category</label>
                  <select name="category">
                    <option value="ToDo" ?selected=${this._task.category === 'ToDo'}>ToDo</option>
                    <option value="Doing" ?selected=${this._task.category === 'Doing'}>Doing</option>
                    <option value="Done" ?selected=${this._task.category === 'Done'}>Done</option>
                  </select>
                </div>
                <div>
                    <button id="cancel-button" @click="${this._hideModal}">Cancel</button>
                    <input value='Update' type=submit>
                </div>
            </form>
        </dialog>`;
  }
}

customElements.define('edit-task', EditTask);
