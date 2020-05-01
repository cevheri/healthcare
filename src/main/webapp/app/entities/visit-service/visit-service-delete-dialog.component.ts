import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisitService } from 'app/shared/model/visit-service.model';
import { VisitServiceService } from './visit-service.service';

@Component({
  templateUrl: './visit-service-delete-dialog.component.html'
})
export class VisitServiceDeleteDialogComponent {
  visitService?: IVisitService;

  constructor(
    protected visitServiceService: VisitServiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('visitServiceListModification');
      this.activeModal.close();
    });
  }
}
