import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVisitService, VisitService } from 'app/shared/model/visit-service.model';
import { VisitServiceService } from './visit-service.service';

@Component({
  selector: 'jhi-visit-service-update',
  templateUrl: './visit-service-update.component.html'
})
export class VisitServiceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.maxLength(1000)]],
    active: [],
    price: []
  });

  constructor(protected visitServiceService: VisitServiceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitService }) => {
      this.updateForm(visitService);
    });
  }

  updateForm(visitService: IVisitService): void {
    this.editForm.patchValue({
      id: visitService.id,
      name: visitService.name,
      description: visitService.description,
      active: visitService.active,
      price: visitService.price
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visitService = this.createFromForm();
    if (visitService.id !== undefined) {
      this.subscribeToSaveResponse(this.visitServiceService.update(visitService));
    } else {
      this.subscribeToSaveResponse(this.visitServiceService.create(visitService));
    }
  }

  private createFromForm(): IVisitService {
    return {
      ...new VisitService(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      active: this.editForm.get(['active'])!.value,
      price: this.editForm.get(['price'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitService>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
