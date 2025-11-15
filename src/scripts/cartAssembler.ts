import type { Product } from "../__mocks__/products.mock";
import { ProductAssembler } from "./productAssembler";

export interface CartItem {
  product: Product;
  quantity: number;
}

export class CartAssembler {
  private cartItems: CartItem[] = [];
  private productAssembler: ProductAssembler;

  constructor(productAssembler: ProductAssembler) {
    this.productAssembler = productAssembler;
  }

  addToCart(productId: number, quantity: number): void {
    if (quantity <= 0) {
      alert("Cantidad debe ser mayor que cero");
      return;
    }

    const product = this.productAssembler.getProductById(productId);
    if (!product) {
      alert(`Producto con ID ${productId} no encontrado`);
      return;
    }

    const existingCartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;
      if (newQuantity > product.stock) {
        alert('Stock insuficiente');
        return;
      }
      existingCartItem.quantity = newQuantity;
    } else {
      if (quantity > product.stock) {
        alert('Stock insuficiente');
        return;
      }
      this.cartItems.push({ product, quantity });
    }
  }

  removeFromCart(productId: number): boolean {
    const initialLength = this.cartItems.length;
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    return this.cartItems.length < initialLength;
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      alert("Cantidad debe ser mayor que cero");
      return;
    }

    const cartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );
    if (!cartItem) {
      alert(`Producto con ID ${productId} no encontrado en el carrito`);
      return;
    }

    const product = this.productAssembler.getProductById(productId);
    if (!product) {
      alert(`Producto con ID ${productId} no encontrado`);
      return;
    }

    if (quantity > product.stock) {
      alert('Stock insuficiente');
      return;
    }

    cartItem.quantity = quantity;
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

