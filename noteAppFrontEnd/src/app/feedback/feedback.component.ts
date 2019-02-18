import { ApiService } from './../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  model: FeedbackViewModel = {
    name : '',
    email : '',
    feedback : ''
  };

  test: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  sendFeedBack(): void {
    this.apiService.postFeedback(this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert('erreur oss');
      }
    );
  }

}

export interface FeedbackViewModel {
   name: string;
   email: string;
   feedback: string;
}

