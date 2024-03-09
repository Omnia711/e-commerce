import { Component } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(private _EcomdataService: EcomdataService) {}

  categories: Category[] = [];

  ngOnInit(): void {
    // get categories
    this._EcomdataService.getcategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
        console.log('Categories:', this.categories);
      },
    });
  }
}
