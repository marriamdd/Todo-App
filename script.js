const list_item_text = document.querySelector(".list_item_text");
const text_input = document.querySelector("#text_input_id");
const div_for_lists = document.querySelector(".div_for_lists");
let array = [];
let unicid = 0;
display();
add_task();
delete_task();

function display() {
  array = JSON.parse(localStorage.getItem("todo")) || [];
  if (array.length > 1) {
    array = JSON.parse(localStorage.getItem("todo"));
    array.forEach((task) => {
      unicid++;
      div_for_lists.innerHTML += `
      <div class="each_todo_div" id=${unicid} >
       <input type="checkbox" class="item_checkbox" id="item_checkbox">
      <p class="list_item_text">${task}</p>
        <svg class="close_svg" xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </div>
      
      `;
    });
  } else if (array > 0) {
    unicid++;
    div_for_lists.innerHTML += `
    <div class="each_todo_div" id=${unicid} >
     <input type="checkbox" class="item_checkbox" id="item_checkbox">
    <p class="list_item_text">${localStorage.getItem("todo")}</p>
      <svg class="close_svg" xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </div>
    
    `;
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
    close.map((btn) => {
      btn.addEventListener("click", (event) => {
        const parent = event.target.closest(".each_todo_div");
        if (parent) {
          const parent_id = parent.id;
          console.log(parent_id);

          if (array.length > 1) {
            array = JSON.parse(localStorage.getItem("todo"))
            console.log(array);
            array.forEach((task, index) => {
              if (index == parent_id) {
                console.log(index);
                console.log(task);
                console.log(array);
                array.splice(index);
                console.log(array);

                localStorage.setItem("todo", array);
                parent.remove();
              }
            });
          } else {
            parent.remove();
            array.splice(0);
            localStorage.removeItem("todo");
            div_for_lists.innerHTML = "";
          }
        }
      });
    });
  }
}
