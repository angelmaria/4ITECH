import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule, NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Keynote } from '../models/keynote.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { CommentModel } from '../models/commentmodel.model';
import { DatePipe } from '@angular/common';
import { ShortTextPipe } from '../short-text.pipe';
import { FormControl, FormGroup } from '@angular/forms';

export class NgbdCarouselConfig {

	constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 30000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, RouterLink, NgbNavModule, NgbRatingModule, DatePipe, ShortTextPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {

ticket: any;
isLoggedIn = false;
comments: CommentModel[] = [];
keynote: Keynote | undefined;


  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);}

  keynotes: Keynote[] = [];

ngOnInit(): void {

  this.loadComments();

  this.loadsKeynotes();
}

private loadsKeynotes() {
  const url = 'http://localhost:8080/keynotes';
  this.httpClient.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
}

private loadComments() {
  const backendUrl = 'http://localhost:8080/comments';
  this.httpClient.get<CommentModel[]>(backendUrl).subscribe(commentBackend => {
    this.comments = commentBackend;
    console.log(this.comments);
    
  });
}

}

export class NgbdNavBasic {
	active = 1;
}
