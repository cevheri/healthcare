import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBloodtype } from 'app/shared/model/bloodtype.model';

@Component({
  selector: 'jhi-bloodtype-detail',
  templateUrl: './bloodtype-detail.component.html'
})
export class BloodtypeDetailComponent implements OnInit {
  bloodtype: IBloodtype | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bloodtype }) => (this.bloodtype = bloodtype));
  }

  previousState(): void {
    window.history.back();
  }
}
