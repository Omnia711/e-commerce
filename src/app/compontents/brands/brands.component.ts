import { Component } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  constructor(private _EcomdataService: EcomdataService) {}

  brand: any[] = [];

  ngOnInit(): void {
    // get brands
    this._EcomdataService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brand = response.data;
        console.log('Categories:', this.brand);
      },
    });
  }
}
