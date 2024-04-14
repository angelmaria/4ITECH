import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Keynote } from '../models/keynote.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

export class NgbdCarouselConfig {

	constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 20000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, RouterLink, NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
ticket: any;
isLoggedIn = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);}

  keynotes: Keynote[] = [];

ngOnInit(): void {
  this.loadsKeynotes();
}

private loadsKeynotes() {
  const url = 'http://localhost:8080/keynotes';
  this.httpClient.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
}

}

export class NgbdNavBasic {
	active = 1;
}
