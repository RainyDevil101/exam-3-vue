import type { Product } from "../__mocks__/products.mock";
import { products as initialProducts } from "../__mocks__/products.mock";

export class ProductAssembler {
  private products: Product[] = [...initialProducts];

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}