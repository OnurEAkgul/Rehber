import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehberListeComponent } from './rehber-liste.component';

describe('RehberListeComponent', () => {
  let component: RehberListeComponent;
  let fixture: ComponentFixture<RehberListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RehberListeComponent]
    });
    fixture = TestBed.createComponent(RehberListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
