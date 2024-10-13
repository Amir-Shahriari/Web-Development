import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class CreateTask extends LitElement {
  static styles = css`
  input[type="submit"]{
    border-radius: 5px;
  }
  #cancel-button:hover{
    background-color: red;
  }
  input[type="submit"]:hover {
    background-color: forestgreen; 
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.4);
  }
  button {
    margin: 10px;
    border-radius: 5px;
    
  }
  button:hover{
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  form {
    display: flex; 
    flex-direction: column; 
    gap: 15px;
   
} 
   dialog {
    background-color: #748d92d3;
    border-radius: 10px;
   }
  `;

_submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
    };
    TaskModel.createTask(newTask)
    this._hideModal(event);
     TaskModel.loadData()
  }

  _showModal() {
    const dialog = this.renderRoot.querySelector('#create-task-dialog');
    dialog.showModal();
  }

  _hideModal() {
    const dialog = this.renderRoot.querySelector('#create-task-dialog');
    dialog.close();
  }

  render() {
    return html`
      <button @click=${this._showModal}>Create Task</button>
      <dialog id="create-task-dialog">
        <form @submit="${this._submit}">
          <label for="summary">Summary</label>
          <input name="summary" required>
          <label for="text">Text</label>
          <textarea name="text" required></textarea>
          <label for="priority">Priority</label>
          <input name="priority" type="number" required>
          <label for="due">Due</label>
          <input name="due" type="datetime-local" required>
          <button id="cancel-button" @click="${this._hideModal}">Cancel</button>
          <input type="submit" value="Create">
        </form>
      </dialog>
    `;
  }
}

customElements.define('create-task', CreateTask);
