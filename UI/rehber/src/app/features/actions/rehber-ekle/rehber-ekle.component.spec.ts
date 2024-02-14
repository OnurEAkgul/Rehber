import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehberEkleComponent } from './rehber-ekle.component';

describe('RehberEkleComponent', () => {
  let component: RehberEkleComponent;
  let fixture: ComponentFixture<RehberEkleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RehberEkleComponent]
    });
    fixture = TestBed.createComponent(RehberEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
