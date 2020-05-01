import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { DoctorDetailComponent } from 'app/entities/doctor/doctor-detail.component';
import { Doctor } from 'app/shared/model/doctor.model';

describe('Component Tests', () => {
  describe('Doctor Management Detail Component', () => {
    let comp: DoctorDetailComponent;
    let fixture: ComponentFixture<DoctorDetailComponent>;
    const route = ({ data: of({ doctor: new Doctor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [DoctorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoctorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoctorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load doctor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doctor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
