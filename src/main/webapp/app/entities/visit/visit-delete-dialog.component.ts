import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisit } from 'app/shared/model/visit.model';
import { VisitService } from './visit.service';

@Component({
  templateUrl: './visit-delete-dialog.component.html'
})
export class VisitDeleteDialogComponent {
  visit?: IVisit;

  constructor(protected visitService: VisitService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('visitListModification');
      this.activeModal.close();
    });
  }
}
