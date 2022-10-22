const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

const topic = JSON.parse(localStorage.getItem('topic'));

if(notes) {
   notes.forEach((note, index) => {
      addNewNote(note, topic[index]);
   });
}

addBtn.addEventListener('click',() => {
   addNewNote();  
});

function addNewNote(text = '', topic='') {
   const note = document.createElement('div')
   note.classList.add('note');

   if (!topic){
      topic = 'Untitled'
   }
   
   note.innerHTML = `
    <div class="notes">
    
    <div class="tools">
    
    <div class="topic">
    <input type="text" title='Click to edit' class='note-topic' value="${topic}">
    </div>

            <button class="edit">
            <span class = "edit-icon ${text ? "" : 'hidden'}"> <i class="fas fa-edit"></i></span>
            <span class = "save-icon ${text ? 'hidden' : ""}"> <i class="bi bi-check-circle"></i></span>
            </button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : 'hidden'}"></div>
        
        <textarea class="${text ? 'hidden' : ""}">
        </textarea>
    </div> 
   `;
   // const notesEl = note.querySelector(".notes");
   
   const editBtn = note.querySelector(".edit");
   
   const deleteBtn = note.querySelector(".delete");
   
   const main = note.querySelector(".main");
   const textArea = note.querySelector("textarea");

   textArea.value = text;
   main.innerHTML = marked(text);

   editBtn.addEventListener("click", () => {
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
      editBtn.querySelector(".save-icon").classList.toggle("hidden");
      editBtn.querySelector(".edit-icon").classList.toggle("hidden");
   });
   
   deleteBtn.addEventListener('click',() => {
      note.remove();
      updateLS();
      updateTopic();
   });
   
   textArea.addEventListener("input", (e) => {
     const { value } = e.target;
     main.innerHTML = marked(value);
     updateLS();
   });

   note.querySelector('.note-topic').addEventListener("input", (e) => {
      const { value } = e.target;
      // main.innerHTML = marked(value);
      updateTopic();
   })

   document.body.appendChild(note);
}

function updateLS() {
const notesText = document.querySelectorAll('textArea');
const notes = [];
notesText.forEach(note => {
   notes.push(note.value);
});
localStorage.setItem('notes',JSON.stringify(notes));
updateTopic();
}

function updateTopic() {
const topicText = document.querySelectorAll('.note-topic');
const topics = [];
 topicText.forEach(topic => {
    topics.push(topic.value);
 });
localStorage.setItem('topic',JSON.stringify(topics));
} 