import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBloodtype, Bloodtype } from 'app/shared/model/bloodtype.model';
import { BloodtypeService } from './bloodtype.service';

@Component({
  selector: 'jhi-bloodtype-update',
  templateUrl: './bloodtype-update.component.html'
})
export class BloodtypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    code: []
  });

  constructor(protected bloodtypeService: BloodtypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bloodtype }) => {
      this.updateForm(bloodtype);
    });
  }

  updateForm(bloodtype: IBloodtype): void {
    this.editForm.patchValue({
      id: bloodtype.id,
      name: bloodtype.name,
      code: bloodtype.code
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bloodtype = this.createFromForm();
    if (bloodtype.id !== undefined) {
      this.subscribeToSaveResponse(this.bloodtypeService.update(bloodtype));
    } else {
      this.subscribeToSaveResponse(this.bloodtypeService.create(bloodtype));
    }
  }

  private createFromForm(): IBloodtype {
    return {
      ...new Bloodtype(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      code: this.editForm.get(['code'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBloodtype>>): void {
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
