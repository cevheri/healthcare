import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { BloodtypeDetailComponent } from 'app/entities/bloodtype/bloodtype-detail.component';
import { Bloodtype } from 'app/shared/model/bloodtype.model';

describe('Component Tests', () => {
  describe('Bloodtype Management Detail Component', () => {
    let comp: BloodtypeDetailComponent;
    let fixture: ComponentFixture<BloodtypeDetailComponent>;
    const route = ({ data: of({ bloodtype: new Bloodtype(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [BloodtypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BloodtypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BloodtypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bloodtype on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bloodtype).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
