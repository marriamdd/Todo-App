const list_item_text = document.querySelector(".list_item_text");
const text_input = document.querySelector("#text_input_id");
const div_for_lists = document.querySelector(".div_for_lists");
let array = [];
let unicid = 0;
// complited();
display();
dark_mode();

add_task();
clear_completed();
delete_task();

function display() {
  if (localStorage.getItem("todo")) {
    array = JSON.parse(localStorage.getItem("todo"));

    array.forEach((task) => {
      div_for_lists.innerHTML += `
     
      <div class="each_todo_div"  >
   
      <div class="todo_text_X">
      <p class="list_item_text checked">${task}</p>
        <svg class="close_svg" " xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div>
        
      </div>
      
   
      `;
    });

    // console.log(array.length)

    div_for_lists.innerHTML += `
    <div class="list_last_line each_todo_div" >
        <span>${array.length} items left </span>
        <span  class="clr_completely"> Clear completed </span>
        </div>`;

    if (array.length == 0) {
      div_for_lists.innerHTML = "";
    }
  }
}

function add_task() {
  text_input.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && text_input.value) {
      array.push(text_input.value);

      localStorage.setItem("todo", JSON.stringify(array));

      unicid++;
      div_for_lists.innerHTML += `
     
  
       <div class="each_todo_div" id=${unicid} >
     
       <div class="todo_text_X">
       <p class="list_item_text">${text_input.value}</p>
         <svg class="close_svg" " xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
         </div>
       </div>
    
       `;
      text_input.value = "";
    }

    if (event.key === "Enter") {
      location.reload();
    }
  });
//   complited();
}

function delete_task() {
  const close = Array.from(document.querySelectorAll(".close_svg"));
  if (close) {
    close.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const parent = event.target.closest(".each_todo_div");
        if (parent) {
          const parent_id = parent.id;
          console.log(parent_id);

          parent.remove();

          array = JSON.parse(localStorage.getItem("todo"));
          array.splice(parent_id, 1);
          localStorage.setItem("todo", JSON.stringify(array));

          console.log(array);
          location.reload();
        }
      });
    });
  }
}

function clear_completed() {
  const clr_completely = document.querySelector(".clr_completely");
  clr_completely.addEventListener("click", () => {
    localStorage.clear("todo");
    location.reload();
  });
}

// function complited() {
//   const list_circles = Array.from(document.querySelectorAll(".each_todo_div"));

//   list_circles.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
     
//       if (event.target.classList.contains("todo_text_X")) {
//         event.target.classList.toggle("complited_todo");
//         console.log("lllj");
//       }
//     });
//   });
// }

function dark_mode() {
  const moon_icon = document.querySelector(".moon_icon");
  moon_icon.addEventListener("click", () => {
    moon_icon.classList.toggle("sun_icon");
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
    const navbar_dark = document
      .querySelector(".nav_bar")
      .classList.toggle("dark_container");
    const dark_circle = document
      .querySelector(".circle")
      .classList.toggle("dark_circle");
    const list_circle = Array.from(
      document.querySelectorAll(".list_circle"),
      (e) => {
        e.classList.toggle("dark_circle");
      }
    );
    const drag_drop_div = document
      .querySelector(".drag_drop_div")
      .classList.toggle("drag_drop_dark");

    const header_div = document
      .querySelector(".header_div")
      .classList.toggle("header_div_dark");
  });
}
