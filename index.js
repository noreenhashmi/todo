var incompleteTasks = document.getElementById('notCompleted')
var completedTasks = document.getElementById('completed')
var inputField = document.getElementById('inputField')
var addTaskBtn = document.getElementById('addTaskBtn')
addTaskBtn.addEventListener('click', addTask)
inputField.addEventListener('keyup', function(e){
    if (e.key === 'Enter'){
        addTask()
    }
})

window.onload = renderView

function renderView(){
    incompleteTasks.innerHTML = ''
    completedTasks.innerHTML = `<div id='completedHeading'>
    <h3>Completed Task</h3>
    <i id='deleteAll' onclick = "deleteAll()" class="far fa-trash-alt remove-icon">All</i>
</div>`
    var data = localStorage.getItem('taskList')
    if (data == null){
        taskList = []
    }else{
        taskList = JSON.parse(data)
    }
    for (var i=0;i<taskList.length;i++){
        createTaskCard(taskList[i])
    }
    checkIncompleteTask()
    checkCompletedTask()
}

function deleteAll(e){
    var data = localStorage.getItem('taskList')
    var taskList = JSON.parse(data)
    for (var i=0;i<taskList.length;i++){
        if(taskList[i].isCompleted){
            taskList.splice(i,1)
            localStorage.setItem('taskList', JSON.stringify(taskList))
            i--;
        }
    }
    renderView()
    checkCompletedTask()
}

function addTask(){
    var currTask = {
        'id': Date.now(),
        'msg': inputField.value,
        'isCompleted': false
    }
    inputField.value = ''
    var data = localStorage.getItem('taskList')
    var taskList;
    if (data == null){
        taskList = []
    }else{
        taskList = JSON.parse(data)
    }
    taskList.push(currTask)
    localStorage.setItem('taskList', JSON.stringify(taskList))
    createTaskCard(currTask)
    checkIncompleteTask()
    checkCompletedTask()
}

function createTaskCard(currTask){
    if (currTask.isCompleted){
        createCompleteTaskCard(currTask)
    }else{
        createIncompleteTaskCard(currTask)
    }
}

function createIncompleteTaskCard(currTask){
    var task = document.createElement('div')
    task.className = 'task'
    task.id = currTask.id

    var taskContainer = document.createElement('div')
    taskContainer.className = 'taskContainer'

    var checkBox = document.createElement('i')
    checkBox.className = 'fas fa-check check'
    checkBox.addEventListener('click', markAsCompleted)

    var todomsg = document.createElement('p')
    todomsg.innerHTML = currTask.msg

    var editIcon = document.createElement('i')
    editIcon.className = 'fas fa-edit edit-icon'
    editIcon.addEventListener('click', editTask)

    var removeIcon = document.createElement('i')
    removeIcon.className = 'fas fa-trash remove-icon'
    removeIcon.addEventListener('click', deleteTask)

    taskContainer.appendChild(checkBox)
    taskContainer.appendChild(todomsg)
    taskContainer.appendChild(editIcon)
    taskContainer.appendChild(removeIcon)

    var editContainer = document.createElement('div')
    editContainer.className = 'editContainer'

    var editInput = document.createElement('input')
    editInput.className = 'editInput'
    editInput.type = 'text'
    editInput.addEventListener('keyup', function(e){
        if (e.key === 'Enter'){
            updateTask(e)
        }
    })

    var updateBtn = document.createElement('button')
    updateBtn.innerHTML = 'update'
    updateBtn.className = 'updateBtn'
    updateBtn.addEventListener('click', updateTask)

    editContainer.appendChild(editInput)
    editContainer.appendChild(updateBtn)

    task.appendChild(taskContainer)
    task.appendChild(editContainer)

    incompleteTasks.appendChild(task)
}

function createCompleteTaskCard(currTask){
    var task = document.createElement('div')
    task.className = 'task'
    task.id = currTask.id

    var taskContainer = document.createElement('div')
    taskContainer.className = 'taskContainer'

    var checkBox = document.createElement('i')
    checkBox.className = 'fas fa-check check'
    checkBox.addEventListener('click', markAsCompleted)
    checkBox.style.color = "#3fe599"

    var todomsg = document.createElement('p')
    todomsg.innerHTML = currTask.msg
    todomsg.style.textDecoration = 'line-through'

    var editIcon = document.createElement('i')
    editIcon.className = 'fas fa-edit edit-icon'
    editIcon.addEventListener('click', editTask)
    editIcon.style.display = 'none'

    var removeIcon = document.createElement('i')
    removeIcon.className = 'fas fa-trash remove-icon'
    removeIcon.addEventListener('click', deleteTask)

    taskContainer.appendChild(checkBox)
    taskContainer.appendChild(todomsg)
    taskContainer.appendChild(editIcon)
    taskContainer.appendChild(removeIcon)

    var editContainer = document.createElement('div')
    editContainer.className = 'editContainer'

    var editInput = document.createElement('input')
    editInput.className = 'editInput'
    editInput.type = 'text'
    editInput.addEventListener('keyup', function(e){
        if (e.key === 'Enter'){
            updateTask(e)
        }
    })

    var updateBtn = document.createElement('button')
    updateBtn.innerHTML = 'update'
    updateBtn.className = 'updateBtn'
    updateBtn.addEventListener('click', updateTask)

    editContainer.appendChild(editInput)
    editContainer.appendChild(updateBtn)

    task.appendChild(taskContainer)
    task.appendChild(editContainer)

    completedTasks.appendChild(task)
}

function checkCompletedTask(){
    var completedHeading = document.getElementById('completedHeading')
    if (completedTasks.childElementCount < 2){
        completedHeading.style.display = 'none'
    }else{
        completedHeading.style.display = 'block'
    }
}

function checkIncompleteTask(){
    var infoMsg = document.getElementById('info')
    if (incompleteTasks.childElementCount > 0){
        infoMsg.style.display = 'none'
    }else{
        infoMsg.style.display = 'block'
    }
}

function deleteTask(e){
    var taskToDelete = e.target.parentElement.parentElement
    var id = taskToDelete.id
    var data = localStorage.getItem('taskList')
    allTask = JSON.parse(data)
    for (var i=0;i<allTask.length;i++){
        if (allTask[i].id == id){
            allTask.splice(i, 1)
        }
    }
    localStorage.setItem('taskList', JSON.stringify(allTask))
    taskToDelete.remove()
    checkIncompleteTask()
    checkCompletedTask()
}

function editTask(e){
    var taskToEdit = e.target.parentElement.parentElement
    taskToEdit.firstChild.style.display = 'none'
    taskToEdit.lastChild.style.display = 'flex'
    msg = taskToEdit.firstChild.children[1].innerHTML
    editInput = taskToEdit.lastChild.firstChild
    editInput.value = msg
    editInput.focus()
}

function updateTask(e){
    var taskToUpdate = e.target.parentElement.parentElement
    taskToUpdate.firstChild.style.display = 'flex'
    taskToUpdate.lastChild.style.display = 'none'
    editInput = taskToUpdate.lastChild.firstChild
    
    var id = taskToUpdate.id
    var data = localStorage.getItem('taskList')
    allTask = JSON.parse(data)
    for (var i=0;i<allTask.length;i++){
        if (allTask[i].id == id){
            allTask[i].msg = editInput.value
        }
    }
    localStorage.setItem('taskList', JSON.stringify(allTask))
    taskToUpdate.firstChild.children[1].innerHTML = editInput.value
}

function markAsCompleted(e){
    var task = e.target.parentElement.parentElement
    var id = task.id
    var data = localStorage.getItem('taskList')
    allTask = JSON.parse(data)
    for (var i=0;i<allTask.length;i++){
        if (allTask[i].id == id){
            if( allTask[i].isCompleted == true){
                allTask[i].isCompleted = false
            }else{
                allTask[i].isCompleted = true
            }
        }
    }
    localStorage.setItem('taskList', JSON.stringify(allTask))
    renderView()
}