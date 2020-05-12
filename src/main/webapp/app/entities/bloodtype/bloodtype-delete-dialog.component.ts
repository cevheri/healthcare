import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBloodtype } from 'app/shared/model/bloodtype.model';
import { BloodtypeService } from './bloodtype.service';

@Component({
  templateUrl: './bloodtype-delete-dialog.component.html'
})
export class BloodtypeDeleteDialogComponent {
  bloodtype?: IBloodtype;

  constructor(protected bloodtypeService: BloodtypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bloodtypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bloodtypeListModification');
      this.activeModal.close();
    });
  }
}
