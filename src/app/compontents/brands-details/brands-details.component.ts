import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/brand';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.css'],
})
export class BrandsDetailsComponent implements OnInit {
  constructor(
    private _EcomdataService: EcomdataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  brandsId: any = '';
  brandsData: Brand = {} as Brand;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandsId = params.get('id');
      },
    });

    this._EcomdataService.getBrandsDetails(this.brandsId).subscribe({
      next: (response) => {
        console.log(response);
        this.brandsData = response.data;
      },
    });
  }
}
