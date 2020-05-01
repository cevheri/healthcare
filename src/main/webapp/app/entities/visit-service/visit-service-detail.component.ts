import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisitService } from 'app/shared/model/visit-service.model';

@Component({
  selector: 'jhi-visit-service-detail',
  templateUrl: './visit-service-detail.component.html'
})
export class VisitServiceDetailComponent implements OnInit {
  visitService: IVisitService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitService }) => (this.visitService = visitService));
  }

  previousState(): void {
    window.history.back();
  }
}
