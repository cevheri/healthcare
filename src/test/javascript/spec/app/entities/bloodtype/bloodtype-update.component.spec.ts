import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { BloodtypeUpdateComponent } from 'app/entities/bloodtype/bloodtype-update.component';
import { BloodtypeService } from 'app/entities/bloodtype/bloodtype.service';
import { Bloodtype } from 'app/shared/model/bloodtype.model';

describe('Component Tests', () => {
  describe('Bloodtype Management Update Component', () => {
    let comp: BloodtypeUpdateComponent;
    let fixture: ComponentFixture<BloodtypeUpdateComponent>;
    let service: BloodtypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [BloodtypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BloodtypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BloodtypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BloodtypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bloodtype(123);
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
        const entity = new Bloodtype();
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
