var add=document.getElementById('add');
var task=document.getElementById('item');
var completed=document.getElementById('completed');
var todo=document.getElementById('todo');
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};
function draw_list() {
  if (!data.todo.length && !data.completed.length) return;
  for (let i=0; i < data.todo.length; i++) {
    var value=data.todo[i];
    create_item(value);
  }
  for (let i=0; i < data.completed.length; i++) {
    var value = data.completed[i];
    create_item(value, true);
  }
}
draw_list();
add.addEventListener('click', ()=>{
  if(item.value) {
    addItem(item.value);
  }
});
function addItem (value) {
  create_item(value);
  task.value = '';
  data.todo.push(value);
  update_local_storage();
}
function update_local_storage() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function create_item(text, completedt) {
  var list = (completedt)? completed:todo;  
  
  var complete=document.createElement('img');
  if(completedt){
    complete.classList.add('done');
    let att = document.createAttribute("src");
    att.value="done.png";                           
    complete.setAttributeNode(att);                     
  }
  else{
    complete.classList.add('undone');
    let att = document.createAttribute("src");
    att.value="undone.png";                           
    complete.setAttributeNode(att);   
  }
  
  var item = document.createElement('li');
  item.innerText=text;

  var remove=document.createElement('img');
  remove.classList.add('delete');
  var att = document.createAttribute("src");
  att.value="delete.jpg";                           
  remove.setAttributeNode(att);                

  remove.addEventListener('click', delete_task);
  complete.addEventListener('click', on_mark_unmark);
  
  item.prepend(complete);
  item.append(remove);

  list.insertBefore(item, list.childNodes[0]);
}
function delete_task() {
  var item = this.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } 
  else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  update_local_storage();

  parent.removeChild(item);
}
function on_mark_unmark(){
  var item = this.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
    this.src="done.png";
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
    this.src="undone.png";
  }
  update_local_storage();
  var target = (id === 'todo') ? completed:todo;
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}
