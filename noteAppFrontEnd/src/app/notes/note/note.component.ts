import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteViewModel } from '../notes.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input()  note: NoteViewModel;
  @Output() updatedNote: EventEmitter<NoteViewModel> = new EventEmitter();
  @Output() deletedNote: EventEmitter<NoteViewModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateNote() {
   this.updatedNote.emit(this.note);
  }

  deleteNote() {
   this.deletedNote.emit(this.note);
  }
}
