import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  parcelList: any = [];
  countries: any = [];
  addFilterParcelForm: filterParcelForm = new filterParcelForm();
  @ViewChild('filterParcelForm')
  filterParcelForm!: NgForm;

  searchTerm: string = '';
  selectedFilter: string = '';
  filters = ['country', 'description'];

  onSelectedFilterChange() {
    this.httpProvider
      .getFilteredParcels(this.addFilterParcelForm)
      .subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.parcelList = resultData;
          }
        }
      });
  }
  constructor(
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.getParcels();
  }
  async getParcels() {
    this.httpProvider.getParcels().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.parcelList = resultData;
            this.countries = [
              ...new Set(this.parcelList.map((item: any) => item.country)),
            ];
          }
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.parcelList = [];
            }
          }
        }
      }
    );
  }

  AddParcel() {
    this.router.navigate(['AddParcel']);
  }
}

export class filterParcelForm {
  selectedFilter: string = '';
  searchTerm?: string = '';
}
