import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Keynote } from '../models/keynote.model';
import { HttpClient } from '@angular/common/http';

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
  imports: [NgbCarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
ticket: any;

  constructor(private httpClient: HttpClient) {}

  keynotes: Keynote[] = [];

ngOnInit(): void {
  this.loadsKeynotes();
}

private loadsKeynotes() {
  const url = 'http://localhost:8080/keynotes';
  this.httpClient.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
}

}
