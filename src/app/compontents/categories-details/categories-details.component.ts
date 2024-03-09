import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css'],
})
export class CategoriesDetailsComponent implements OnInit {
  constructor(
    private _EcomdataService: EcomdataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  categoryId: any = '';
  categoryDetails: Category = {} as Category;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      },
    });

    this._EcomdataService.getcategoriesDetails(this.categoryId).subscribe({
      next: (response) => {
        console.log(response);
        this.categoryDetails = response.data;
      },
    });
  }
}
