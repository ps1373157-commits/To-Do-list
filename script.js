let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");

input.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    addTask();
  }
});

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index)=>{
    const li = document.createElement("li");

    if(task.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <span class="delete" onclick="deleteTask(${index})">❌</span>
    `;

    list.appendChild(li);
  });

  saveTasks();
}

function addTask(){
  const text = input.value.trim();

  if(text === ""){
    alert("Write something first!");
    return;
  }

  tasks.push({
    text: text,
    completed:false
  });

  input.value="";
  renderTasks();
}

function deleteTask(index){
  tasks.splice(index,1);
  renderTasks();
}

function toggleTask(index){
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

renderTasks();