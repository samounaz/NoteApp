import { ApiService } from './../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notebooks: NotebookViewModel[] = [];
  notes: NoteViewModel[] = [];
  selectedNotebook: NotebookViewModel;
  searchText: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNoteBooks();
    this.getAllNotes();
  }

  getAllNoteBooks() {
   this.apiService.getAllNotebooks().subscribe(
     res => {
       this.notebooks = res;
     },
     err => {
       alert('Error get noteBooks');
     }
   ) ;
  }

  getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert('Error get notes');
      }
    ) ;
   }


  createNotebook() {
    let newNotebook: NotebookViewModel = {
      id: null,
      name: 'New notebook',
      nbNotes: 0
    };

    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert('Error post notebook');
      }
    );
  }

  updateNotebook(updatedNotbook: NotebookViewModel) {
    this.apiService.postNotebook(updatedNotbook).subscribe(
      res => {
        // location.reload();
      },
      err => {
        alert('Error update notebook');
      }
    );
  }

  deleteNotebook(notbook: NotebookViewModel) {
    if (confirm('Are you sure that you want to delete this notebook ?')) {
      this.apiService.deleteNotebook(notbook.id).subscribe(
        res => {
          const indexOfNotbook = this.notebooks.indexOf(notbook);
          this.notebooks.splice(indexOfNotbook, 1);
        },
        err => {
          alert('Error delete notebook');
        }
      );
    }

  }

  createNote(notebookId: string) {
   let newNote: NoteViewModel = {
    id: null,
    title: 'My note',
    text: 'Text bla bla bla',
    notebookId: notebookId,
    lastModification: new Date()
   };
   this.apiService.postNote(newNote).subscribe(
     resp => {
      newNote.id = resp.id;
      newNote.notebookId = this.selectedNotebook.id;
      newNote.lastModification = new Date();
      this.notes.push(newNote);
     },
     err => {
       alert('Error create note');
     }
   );

  }

  deleteNote(note: NoteViewModel) {
    if (confirm('Are you sure you want to delete this note ?')) {
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          const indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert('Error delete notes of notebook');
        }
      ) ;
    }
   }
  selecteNotebook(notebook: NotebookViewModel) {
   this.selectedNotebook = notebook;
   this.apiService.getNotesByNotebook(this.selectedNotebook.id).subscribe(
      resp => {
        this.notes = resp;
      },
      err => {
        alert('An error has occured while downloading the notes');
      }
   );
  }

  updateNote(note: NoteViewModel) {
    this.apiService.postNote(note).subscribe(
      resp => {
      },
      err => {
        alert('Error update note');
      }
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

}

export interface NotebookViewModel {
  id: string;
  name: string;
  nbNotes: number;
}

export interface NoteViewModel {
  id: string;
  title: string;
  text: string;
  notebookId: string;
  lastModification: Date;
}
