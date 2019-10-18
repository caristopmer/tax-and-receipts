import { TestBed, async } from '@angular/core/testing';
import { TaxCalculatorHelper } from './tax-calculator.helper';

describe('TaxCalculatorHelper', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaxCalculatorHelper
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tax-and-receipts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('tax-and-receipts');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('tax-and-receipts app is running!');
  });
});
