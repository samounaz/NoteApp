import { NoteViewModel } from './../notes/notes.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteTextFilter'
})
export class NoteTextFilterPipe implements PipeTransform {

  transform(notes: NoteViewModel[], text: string): NoteViewModel[] {
    if (text == null || text === '') {
      return notes;
    }
    return notes.filter( n => n.title.includes(text) || n.text.includes(text));
  }

}
