const list_item_text = document.querySelector(".list_item_text");
const text_input = document.querySelector("#text_input_id");
const div_for_lists = document.querySelector(".div_for_lists");
let array = [];
let num = 0;
let classs = "";
// let completed = localStorage.getItem("completed_id") || [];
let tame = JSON.parse(localStorage.getItem("mode")) || [];
const moon_icon = document.querySelector(".moon_icon");
completed_task();
active_task();
display();
complited();
dark_mode();
add_task();
clear_completed();
delete_task();
all_task();

if (tame.mode == "dark") {
  change_mode();
}

function display() {
  complited();

  if (localStorage.getItem("all_todo")) {
    array = JSON.parse(localStorage.getItem("all_todo"));

    array.forEach((task, indx) => {
      if (task.completed) {
        classs = "complited_todo";
      } else {
        classs = "";
      }

      div_for_lists.innerHTML += `
     
      <div  class="each_todo_div" id=${indx}  >
   
      <div class="todo_text_X ${classs}">
      <p class="list_item_text checked">${task.task}</p>
        <svg class="close_svg"  xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div>
        
      </div>
      
   
      `;
    });

    div_for_lists.innerHTML += `
    <div class="list_last_line each_todo_div" >
        <span>${array.length} items left </span>
        <span  class="clr_completely"> Clear completed </span>
        </div>`;

    const mode = JSON.parse(localStorage.getItem("mode"));

    if (array.length == 0) {
      div_for_lists.innerHTML = "";
    }
  }
}
// click();
// function click() {
//   text_input.addEventListener("keyup", (event) => {
//     if (event.key === "Enter" && text_input.value) {
//       num++;
//       add_task(num);
//       console.log("kj")
//      display()
//     }
//   });
// }

function add_task(num) {
  text_input.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && text_input.value) {
      array.push({ task: text_input.value, completed: false });

      localStorage.setItem("all_todo", JSON.stringify(array));

      text_input.value = "";
    }

    if (event.key === "Enter") {
      location.reload();
    }
  });
}

// while(add_task){
//     num++
// }

function delete_task() {
  const close = Array.from(document.querySelectorAll(".close_svg"));
  if (close) {
    close.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const parent = event.target.closest(".each_todo_div");
        if (parent) {
          const parent_id = parent.id;
          parent.remove();
          array = JSON.parse(localStorage.getItem("all_todo"));

          array.splice(parent_id, 1);
          localStorage.setItem("all_todo", JSON.stringify(array));
          location.reload();
        }
      });
    });
  }
}
function clear_completed() {
  const clr_completely = document.querySelector(".clr_completely");
  if (clr_completely) {
    clr_completely.addEventListener("click", () => {
      localStorage.clear("all_todo");
      location.reload();
    });
  }
}

function complited() {
  const task = Array.from(document.querySelectorAll(".each_todo_div"));

  task.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (event.target.classList.contains("todo_text_X")) {
        event.target.classList.toggle("complited_todo");
        let completed_task = event.target;

        let parent_id = completed_task.closest(".each_todo_div").id;
        completed_into_localstorage(parent_id);
      }
    });
  });
}

function completed_into_localstorage(parent_id) {
  completed_id_array = JSON.parse(localStorage.getItem("completed_id")) || [];
  array = JSON.parse(localStorage.getItem("all_todo"));

  if (array[parent_id].completed == false) {
    array[parent_id].completed = true;
  } else {
    array[parent_id].completed = false;
  }

  localStorage.setItem("all_todo", JSON.stringify(array));
}

function dark_mode() {
  moon_icon.addEventListener("click", change_mode);
}

function change_mode() {
  moon_icon.classList.toggle("sun_icon");
  mode();

  const body_dark_mode = document
    .querySelector("body")
    .classList.toggle("body_dark_mode");
  const each_todo_div_dark = Array.from(
    document.querySelectorAll(".each_todo_div"),
    (e) => {
      e.classList.toggle("dark_container");
    }
  );
  const input_dark = document
    .getElementById("text_input_id")
    .classList.toggle("dark_container");
  document.querySelector(".nav_bar").classList.toggle("dark_container");
  document.querySelector(".circle").classList.toggle("dark_circle");
  Array.from(document.querySelectorAll(".list_circle"), (e) => {
    e.classList.toggle("dark_circle");
  });
  document.querySelector(".drag_drop_div").classList.toggle("drag_drop_dark");
  document.querySelector(".header_div").classList.toggle("header_div_dark");
}

function mode() {
  const mode = document.getElementById("mode");
  if (mode.classList.contains("sun_icon")) {
    localStorage.setItem("mode", JSON.stringify({ mode: "dark" }));
  } else {
    localStorage.setItem("mode", JSON.stringify({ mode: "light" }));
  }
}

function all_task() {
  document.getElementById("all_task").addEventListener("click", display_all);
}

function active_task() {
  document
    .getElementById("active_task")
    .addEventListener("click", display_active);
}
function completed_task() {
  document
    .getElementById("compl_task")
    .addEventListener("click", display_complated);
}
let func_run=false



let ar = [];
function display_active() {
  array = JSON.parse(localStorage.getItem("all_todo"));
  const filtered = array.filter((e) => e.completed === false);

  const active_LS = localStorage.setItem(
    "active_task",
    JSON.stringify(filtered)
  );
  let completeds = Array.from(document.querySelectorAll(".complited_todo"));
  completeds.forEach((todo) => {
    todo.closest(".each_todo_div").style.display = "none";
    
    
  });
let todos=Array.from(document.querySelectorAll(".todo_text_X"))
todos.forEach((task)=>{
 if(!task.classList.contains("complited_todo")){
  task.closest(".each_todo_div").style.display="block"
 }
})

}

function display_complated() {
  array = JSON.parse(localStorage.getItem("all_todo"));
  const filtered = array.filter((e) => e.completed === true);
  const completed_LS = localStorage.setItem(
    "completed_task",
    JSON.stringify(filtered)
  );
  let each_todo = Array.from(document.querySelectorAll(".todo_text_X"));
  each_todo.forEach((todo) => {
    if (!todo.classList.contains("complited_todo")) {
      todo.closest(".each_todo_div").style.display = "none";
    }
    if (todo.classList.contains("complited_todo")) {
      todo.closest(".each_todo_div").style.display = "block";
    }
  });
}

function display_all() {
  let each_todo = Array.from(document.querySelectorAll(".each_todo_div"));
  array = JSON.parse(localStorage.getItem("all_todo")) || [];
  array.forEach((todo, index) => {
    let div = each_todo[index]
   
    if (div.style.display=="none") {
      div.style.display = "block";
    }
  });
}
