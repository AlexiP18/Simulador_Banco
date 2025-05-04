import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInstitucionalComponent } from './info-institucional.component';

describe('InfoInstitucionalComponent', () => {
  let component: InfoInstitucionalComponent;
  let fixture: ComponentFixture<InfoInstitucionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoInstitucionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
