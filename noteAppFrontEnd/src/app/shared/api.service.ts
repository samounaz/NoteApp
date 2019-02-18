import { FeedbackViewModel } from './../feedback/feedback.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotebookViewModel, NoteViewModel } from '../notes/notes.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:8080/api/';
  private  ALL_NOTEBOOKS_URL =  `${this.BASE_URL}\\notebooks\\all`;
  private  ALL_NOTES_URL =  `${this.BASE_URL}\\notes\\all`;
  private  ALL_NOTES_BY_NOTE_ID_URL =  `${this.BASE_URL}\\notes\\byId\\`;
  private  ALL_NOTES_BY_NOTEBOOK_ID_URL =  `${this.BASE_URL}\\notes\\byNotebook\\`;
  private  SAVE_NOTEBOOK_URL =  `${this.BASE_URL}\\notebooks`;
  private  SAVE_NOTE_URL =  `${this.BASE_URL}\\notes`;
  private  DELETE_NOTEBOOK_URL =  `${this.BASE_URL}\\notebooks\\`;
  private  DELETE_NOTE_URL =  `${this.BASE_URL}\\notes\\`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:no-unused-expression
  getAllNotebooks(): Observable<NotebookViewModel[]> {
    return this.http.get<NotebookViewModel[]>(this.ALL_NOTEBOOKS_URL);
  }

  getAllNotes(): Observable<NoteViewModel[]> {
    return this.http.get<NoteViewModel[]>(this.ALL_NOTES_URL);
  }

  getNotesByNotebook(noteBookId: string): Observable<NoteViewModel[]> {
    return this.http.get<NoteViewModel[]>(this.ALL_NOTES_BY_NOTEBOOK_ID_URL + noteBookId);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback) ;
  }

  postNotebook(notebook: NotebookViewModel): Observable<NotebookViewModel> {
    return this.http.post<NotebookViewModel>(this.SAVE_NOTEBOOK_URL, notebook);
  }

  deleteNotebook(id: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id) ;
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTE_URL + id) ;
  }

  postNote(note: NoteViewModel): Observable<NoteViewModel> {
    return this.http.post<NoteViewModel>(this.SAVE_NOTE_URL, note);
  }

}
