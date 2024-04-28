class TodoList {
  constructor() {
    this.taskList = []
    this.handleActionTask = this.handleActionTask.bind(this)
  }

  addTask(newTask) {
    this.taskList.push({
      name: newTask,
      isCompleted: false
    })
    this.render()
  }

  removeTask(indexTask) {
    this.taskList.splice(indexTask, 1)
    this.render()
  }

  toggleTaskComplete(indexTask) {
    this.taskList[indexTask].isCompleted = !this.taskList[indexTask].isCompleted
    this.render()
  }

  render() {
    const $taskList = document.getElementById('taskList')
    $taskList.innerHTML = this.taskList.map((task, index) => {
      return `
        <li style="text-decoration: ${task.isCompleted ? 'line-through' : 'none'};">
          ${task.name}
          <div>
            <button class="btn-toggle" data-index=${index}>✅</button>
            <button class="btn-remove" data-index=${index}>❌</button>
          </div>
        </li>
      `
    }).join('')

    $taskList.removeEventListener('click', this.handleActionTask)

    $taskList.addEventListener('click', this.handleActionTask)
  }

  handleActionTask(event) {
    const target = event.target
    if (target.classList.contains('btn-remove')) {
      console.log('Click en el boton de remover tarea')
      const taskIndex = target.dataset.index
      this.removeTask(taskIndex)
    } else if (target.classList.contains('btn-toggle')) {
      console.log('Click en el boton de toggle tarea')
      const taskIndex = target.dataset.index
      this.toggleTaskComplete(taskIndex)
    }
  }
}

const todoList = new TodoList()

document.getElementById('todoForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const $taskInput = document.getElementById('taskInput')
  const taskName = $taskInput.value.trim()
  if (taskName !== '') {
    todoList.addTask(taskName)
    $taskInput.value = ''
  }
})