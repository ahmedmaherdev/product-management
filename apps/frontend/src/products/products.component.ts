import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  isLoading: boolean = false;

  constructor(private productsService: ProductsService) {}

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get hasNoData(): boolean {
    return this.products.length === 0;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productsService
      .getProducts(this.currentPage, this.pageSize)
      .pipe(
        tap((response) => {
          this.products = response.data || [];
          this.totalItems = response.count || 0;
        }),
        catchError((error) => {
          console.error('Error fetching products:', error);
          return [];
        })
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
}
