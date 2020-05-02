import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { CompanyUpdateComponent } from 'app/entities/company/company-update.component';
import { CompanyService } from 'app/entities/company/company.service';
import { Company } from 'app/shared/model/company.model';

describe('Component Tests', () => {
  describe('Company Management Update Component', () => {
    let comp: CompanyUpdateComponent;
    let fixture: ComponentFixture<CompanyUpdateComponent>;
    let service: CompanyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [CompanyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CompanyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompanyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompanyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Company(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Company();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
