const list_item_text = document.querySelector(".list_item_text");
const text_input = document.querySelector("#text_input_id");
const div_for_lists = document.querySelector(".div_for_lists");
let array = [];
let unicid = 0;
display();
add_task();

delete_task();

function display() {
  if (localStorage.getItem("todo")) {
    array = JSON.parse(localStorage.getItem("todo"));
    array.forEach((task) => {
      div_for_lists.innerHTML += `
     
      <div class="each_todo_div"  >
      <div class="list_circle"></div>
      <div class="todo_text_X">
      <p class="list_item_text">${task}</p>
        <svg class="close_svg" " xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div>
        
      </div>
      
   
      `;
    }
    );

console.log(array.length)

    div_for_lists.innerHTML+=`
    <div class="list_last_line each_todo_div" >
        <span>${array.length} items left </span>
        <span> Clear completed </span>
        </div>`

        if(array.length==0){
            div_for_lists.innerHTML="" 
         } 
 
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
      console.log(unicid)
      div_for_lists.innerHTML += `
     
  
       <div class="each_todo_div" id=${unicid} >
       <div class="list_circle"></div>
       <div class="todo_text_X">
       <p class="list_item_text">${text_input.value}</p>
         <svg class="close_svg" " xmlns="http://www.w3.org/2000/svg"  width="14" height="14" viewBox="0 0 26 26" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
         </div>
       </div>
    
       `;
      text_input.value = "";
    }


   
 if(event.key === "Enter"){

location.reload()
 }})


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
          location.reload()
        }
      });
    });
  }
}
