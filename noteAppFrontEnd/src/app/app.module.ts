import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotesComponent } from './notes/notes.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Route, Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './notes/note/note.component';
import { NoteTextFilterPipe } from './shared/note-text-filter.pipe';

const appRoutes: Routes = [
{
 path: 'notes',
 component: NotesComponent
},
{
 path: 'feedback',
 component: FeedbackComponent
},
{
 path: '',
 component: NotesComponent,
 pathMatch: 'full'
},
{
  path: '**',
  component: NotfoundComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    FeedbackComponent,
    NotfoundComponent,
    NoteComponent,
    NoteTextFilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
