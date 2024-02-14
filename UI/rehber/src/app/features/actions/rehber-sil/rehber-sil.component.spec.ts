import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehberSilComponent } from './rehber-sil.component';

describe('RehberSilComponent', () => {
  let component: RehberSilComponent;
  let fixture: ComponentFixture<RehberSilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RehberSilComponent]
    });
    fixture = TestBed.createComponent(RehberSilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
