import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { IBloodtype } from 'app/shared/model/bloodtype.model';
import { BloodtypeService } from 'app/entities/bloodtype/bloodtype.service';

@Component({
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html'
})
export class PatientUpdateComponent implements OnInit {
  isSaving = false;
  bloodtypes: IBloodtype[] = [];
  birthDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(100)]],
    phone: [null, [Validators.maxLength(20)]],
    birthDate: [],
    citizenNumber: [null, [Validators.required, Validators.maxLength(11)]],
    genderType: [],
    bloodtypeId: []
  });

  constructor(
    protected patientService: PatientService,
    protected bloodtypeService: BloodtypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.updateForm(patient);

      this.bloodtypeService.query().subscribe((res: HttpResponse<IBloodtype[]>) => (this.bloodtypes = res.body || []));
    });
  }

  updateForm(patient: IPatient): void {
    this.editForm.patchValue({
      id: patient.id,
      name: patient.name,
      phone: patient.phone,
      birthDate: patient.birthDate,
      citizenNumber: patient.citizenNumber,
      genderType: patient.genderType,
      bloodtypeId: patient.bloodtypeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patient = this.createFromForm();
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  private createFromForm(): IPatient {
    return {
      ...new Patient(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value,
      citizenNumber: this.editForm.get(['citizenNumber'])!.value,
      genderType: this.editForm.get(['genderType'])!.value,
      bloodtypeId: this.editForm.get(['bloodtypeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>): void {
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

  trackById(index: number, item: IBloodtype): any {
    return item.id;
  }
}
