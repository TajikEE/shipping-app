import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { NgForm } from '@angular/forms';
import * as _ from 'underscore';
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
    if (this.addFilterParcelForm.selectedFilter === 'description') {
      if (
        this.addFilterParcelForm.searchTerm &&
        this.addFilterParcelForm.searchTerm.length < 3
      ) {
        return;
      }
    }

    this.httpProvider
      .getFilteredParcels(this.addFilterParcelForm)
      .subscribe((data: any) => {
        if (data != null && data.body != null) {
          const resultData = data.body;
          if (resultData) {
            this.parcelList = resultData;
          }
        }
      });
  }
  constructor(
    private router: Router,
    private httpProvider: HttpProviderService
  ) {
    this.onSelectedFilterChange = _.debounce(this.onSelectedFilterChange, 500);
  }

  ngOnInit(): void {
    this.getParcels();
  }
  async getParcels() {
    this.httpProvider.getParcels().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          const resultData = data.body;
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
