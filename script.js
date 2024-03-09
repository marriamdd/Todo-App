const list_item_text = document.querySelector(".list_item_text");
const text_input = document.querySelector("#text_input_id");
const div_for_lists = document.querySelector(".div_for_lists");
let array = [];
let unicid = 0;
add_task();
display();
delete_task();

function display() {
  if (localStorage.getItem("todo")) {
    array = JSON.parse(localStorage.getItem("todo"));
    array.forEach((task) => {
      div_for_lists.innerHTML += `
      <div class="each_todo_div" id=${unicid} >
       <input type="checkbox" class="item_checkbox" id="item_checkbox">
      <p class="list_item_text">${task}</p>
        <svg class="close_svg" xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </div>
      
      `;
    });
  }
}

function add_task() {
  text_input.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && text_input.value) {
      const list_item_text = document.querySelector(".list_item_text");
      console.log(text_input.value);
      array.push(text_input.value);

      localStorage.setItem("todo", JSON.stringify(array));

      unicid++;
      div_for_lists.innerHTML += `
       <div class="each_todo_div" id=${unicid} >
        <input type="checkbox" class="item_checkbox" id="item_checkbox">
       <p class="list_item_text">${text_input.value}</p>
         <svg class="close_svg" " xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
       </div>
    
       `;
      text_input.value = "";
    }
  });
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
        }
      });
    });
  }
}
