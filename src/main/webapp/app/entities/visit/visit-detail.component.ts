import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisit } from 'app/shared/model/visit.model';

@Component({
  selector: 'jhi-visit-detail',
  templateUrl: './visit-detail.component.html'
})
export class VisitDetailComponent implements OnInit {
  visit: IVisit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visit }) => (this.visit = visit));
  }

  previousState(): void {
    window.history.back();
  }
}
