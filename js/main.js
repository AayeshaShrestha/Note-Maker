//document.getElementById('myForm').addEventListener('submit',storeNotes);



function storeNotes(){
  var note_title = document.getElementById('noteTitle').value;
	var note_des = document.getElementById('description').value;
  var note_date = document.getElementById('noteDate').value;

  if(!note_title || !note_des || !note_date){
		alert('Please submit all the info!!');
		return false;
	}

  var notee = {
    title : note_title,
    description : note_des,
    recorded : note_date
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
  noteResult.innerHTML = "";

  for(var i = 0; i < notes.length; i++){
    var title = notes[i].title;
    var desc = notes[i].description;
    var rec = notes[i].recorded;

    noteResult.innerHTML += '<div class="well">'+
  									'<h5><strong>'+title+ '</strong></h5>'+
  									'<p>'+desc+'</p>'+
                    '<a onclick="editNote(\''+i+'\')" class="btn btn-primary" href="#"><i class="fa fa-pencil"></i> Edit</a>'+
                    ' &nbsp'+
                    '<a onclick="deleteNote(\''+i+'\')" class="btn btn-danger" href="#"><i class="fa fa-trash"></i> Delete</a>'
                    '</div>';
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

  var title = notes[i].title;
  var desc = notes[i].description;
  var rec = notes[i].recorded;



  // notes.splice(p,1);
  // localStorage.setItem('notes', JSON.stringify(notes));
  //
	// fetchNotes();

}
