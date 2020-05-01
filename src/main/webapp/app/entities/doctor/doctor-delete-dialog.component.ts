import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoctor } from 'app/shared/model/doctor.model';
import { DoctorService } from './doctor.service';

@Component({
  templateUrl: './doctor-delete-dialog.component.html'
})
export class DoctorDeleteDialogComponent {
  doctor?: IDoctor;

  constructor(protected doctorService: DoctorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doctorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doctorListModification');
      this.activeModal.close();
    });
  }
}
