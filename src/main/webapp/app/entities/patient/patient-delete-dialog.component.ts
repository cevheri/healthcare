import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';

@Component({
  templateUrl: './patient-delete-dialog.component.html'
})
export class PatientDeleteDialogComponent {
  patient?: IPatient;

  constructor(protected patientService: PatientService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patientService.delete(id).subscribe(() => {
      this.eventManager.broadcast('patientListModification');
      this.activeModal.close();
    });
  }
}
