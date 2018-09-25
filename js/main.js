

function storeNotes(){
  var note_title = document.getElementById('noteTitle').value;
	var note_des = document.getElementById('description').value;
  var note_date = document.getElementById('noteDate').value;

  if(!note_title || !note_des || !note_date){
		alert('Please submit all the info!!');
		return false;
	}else{
    window.location.href = "myNotes.html";
  }

  var notee = {
    title : note_title,
    description : note_des,
    recorded : note_date,
    fav : 0
  }

  if(localStorage.getItem('notes') === null){
		//if notes is null, init array
		var notes = [];
		notes.push(notee);
		localStorage.setItem('notes', JSON.stringify(notes));
	}else{
		//fetch notes from localstorage
		var notes = JSON.parse(localStorage.getItem('notes'));
		notes.push(notee);
		localStorage.setItem('notes', JSON.stringify(notes));
	}

  //e.preventDefault();
}



function fetchNotes(){
  var notes = JSON.parse(localStorage.getItem('notes'));

  var noteResult = document.getElementById("notesHere");
  //noteResult.innerHTML = "";
  var favResult = document.getElementById("favNotes");

  for(var i = 0; i < notes.length; i++){
    var title = notes[i].title;
    var desc = notes[i].description;
    var rec = notes[i].recorded;
    var isFav = notes[i].fav;

    if(!isFav){
      noteResult.innerHTML += '<div class="well" ondragstart="dragStart(\''+i+'\',event)" draggable="true" id="dragtarget"'+
    									'<h5><strong>'+title+ '</strong></h5>'+
    									'<p>'+desc+'</p>'+
                      '<a onclick="editNote(\''+i+'\')" class="btn btn-primary" href="#"><i class="fa fa-pencil"></i> Edit</a>'+
                      ' &nbsp'+
                      '<a onclick="deleteNote(\''+i+'\')" class="btn btn-danger" href="myNotes.html"><i class="fa fa-trash"></i> Delete</a>'
                      '</div>';
    }
    else{
      favResult.innerHTML += '<div class="well" ondragstart="dragStart(\''+i+'\',event)" draggable="true" id="dragtarget"'+
                      '<h5><strong>'+title+ '</strong></h5>'+
                      '<p>'+desc+'</p>'+
                      '<a onclick="editNote(\''+i+'\')" class="btn btn-primary" href="#"><i class="fa fa-pencil"></i> Edit</a>'+
                      ' &nbsp'+
                      '<a onclick="deleteNote(\''+i+'\')" class="btn btn-danger" href="myNotes.html"><i class="fa fa-trash"></i> Delete</a>'
                      '</div>';
    }


  }

}



function deleteNote(p){
  var notes = JSON.parse(localStorage.getItem('notes'));
  notes.splice(p,1);

  localStorage.setItem('notes', JSON.stringify(notes));
	fetchNotes();

}



function editNote(i){
  var notes = JSON.parse(localStorage.getItem('notes'));

  //get the old values
  var title = notes[i].title;
  var desc = notes[i].description;
  var rec = notes[i].recorded;

  //get ids of the inputs
  var note_title = document.getElementById('changeTitle');
	var note_des = document.getElementById('changeDesc');
  var note_date = document.getElementById('changeDate');

  //display modal with its contents
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

  //put the old values in the input area
  note_title.value=title;
  note_des.value=desc;
  note_date.value=rec;

  //get edited values
  note_title.onchange = function(){
    title = document.getElementById('changeTitle').value;
  }
  note_des.onchange = function(){
    desc = document.getElementById('changeDesc').value;
  }
  note_date.onchange = function(){
    rec = document.getElementById('changeDate').value;
  }

  //save the edited values
  var editedNote = document.getElementById('saveChanges');
  editedNote.onclick = function(){
    if(!title || !desc || !rec){
  		alert('Please submit all the info!!');
  		return false;
  	}
    notes[i].title = title;
    notes[i].description = desc;
    notes[i].recorded = rec;
    localStorage.setItem('notes', JSON.stringify(notes));
    fetchNotes();
  }

  //click span (x) to quit the modal i.e quit editing
  span.onclick = function() {
        modal.style.display = "none";
  }

  //click anywhere on the window to quit
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

function dragStart(id,event) {
    event.dataTransfer.setData("aaa", event.target.id);
    event.dataTransfer.setData("id", id);

}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("aaa");
    var noteId = event.dataTransfer.getData("id");
    event.target.appendChild(document.getElementById(data));

    var notes = JSON.parse(localStorage.getItem('notes'));
    if(notes[noteId].fav == 1){
      notes[noteId].fav = 0;
    }else{
      notes[noteId].fav = 1;
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    var noteResult = document.getElementById("notesHere");
    noteResult.innerHTML = "<br>";
    var favResult = document.getElementById("favNotes");
    favResult.innerHTML = "<br>";
    fetchNotes();


}
