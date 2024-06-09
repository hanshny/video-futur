import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartInput: string = '';
  totalPrice: number = 0;
  readonly regularMoviePrice: number = 20;
  readonly sagaMoviePrice: number = 15;
  readonly sagaMovies: string[] = ['Back to the Future 1', 'Back to the Future 2', 'Back to the Future 3'];

  calculateTotalPrice(): void {
    const movies = this.cartInput.split('\n').filter(movie => movie.trim().length > 0);
    let regularMoviesCount = 0;
    let sagaMoviesCount = 0;
    let sagaMoviesInBasket: string[] = [];

    for (const movie of movies) {
      if (this.sagaMovies.includes(movie.trim())) {
        sagaMoviesInBasket.push(movie.trim());
        sagaMoviesCount++;
      } else {
        regularMoviesCount++;
      }
    }

    let sagaDiscount = 0;
    const uniqueSagaMoviesCount = new Set(sagaMoviesInBasket).size;

    if (uniqueSagaMoviesCount === 2) {
      sagaDiscount = 0.10;
    } else if (uniqueSagaMoviesCount >= 3) {
      sagaDiscount = 0.20;
    }

    const regularMoviesTotalPrice = regularMoviesCount * this.regularMoviePrice;
    const sagaMoviesTotalPrice = sagaMoviesCount * this.sagaMoviePrice;
    const discountedSagaMoviesTotalPrice = sagaMoviesTotalPrice * (1 - sagaDiscount);

    this.totalPrice = regularMoviesTotalPrice + discountedSagaMoviesTotalPrice;
  }
}
