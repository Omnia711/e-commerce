import { Product } from './../shared/interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';
// import { Product } from '../shared/interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], term: string): Product[] {
    return products.filter((Product) =>
      Product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
