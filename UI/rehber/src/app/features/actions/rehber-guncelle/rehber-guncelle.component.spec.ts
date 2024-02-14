import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehberGuncelleComponent } from './rehber-guncelle.component';

describe('RehberGuncelleComponent', () => {
  let component: RehberGuncelleComponent;
  let fixture: ComponentFixture<RehberGuncelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RehberGuncelleComponent]
    });
    fixture = TestBed.createComponent(RehberGuncelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
