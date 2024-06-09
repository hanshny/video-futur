import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default total price of 0', () => {
    expect(component.totalPrice).toBe(0);
  });

  it('should calculate total price correctly for one regular movie', () => {
    component.cartInput = 'Karate Kid';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(20);
  });

  it('should calculate total price correctly for multiple regular movies', () => {
    component.cartInput = 'Karate Kid\nThe Last Dragon\nThe Wolf of Wall Street';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(60);
  });

  it('should calculate total price correctly for one saga movie', () => {
    component.cartInput = 'Back to the Future 1';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(15);
  });

  it('should apply 10% discount for two different saga movies', () => {
    component.cartInput = 'Back to the Future 1\nBack to the Future 2';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(27); // 30 - 10% = 27
  });

  it('should apply 20% discount for three different saga movies', () => {
    component.cartInput = 'Back to the Future 1\nBack to the Future 2\nBack to the Future 3';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(36);
  });

  it('should apply no discount for duplicate saga movies', () => {
    component.cartInput = 'Back to the Future 1\nBack to the Future 1';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(30);
  });

  it('should ignore empty lines', () => {
    component.cartInput = 'Karate Kid\n\nThe Last Dragon\n\n';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(40);
  });

  it('should trim movie names and calculate total price correctly', () => {
    component.cartInput = ' Karate Kid \n The Last Dragon ';
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(40);
  });
});
