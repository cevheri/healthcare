import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoctor } from 'app/shared/model/doctor.model';

@Component({
  selector: 'jhi-doctor-detail',
  templateUrl: './doctor-detail.component.html'
})
export class DoctorDetailComponent implements OnInit {
  doctor: IDoctor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doctor }) => (this.doctor = doctor));
  }

  previousState(): void {
    window.history.back();
  }
}
