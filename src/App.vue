<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ProductAssembler } from './scripts/productAssembler';
import { CartAssembler, type CartItem } from './scripts/cartAssembler';
import type { Product } from './__mocks__/products.mock';

const productAssembler = new ProductAssembler();
const cartAssembler = new CartAssembler(productAssembler);

const products = ref<Product[]>([]);
const cartItems = ref<CartItem[]>([]);

const availableProducts = computed(() => {
  return products.value.filter(product => product.stock > 0);
});

const totalPrice = computed(() => {
  return cartAssembler.getTotalPrice();
});

const totalItems = computed(() => {
  return cartAssembler.getTotalItems();
});

const addToCart = (productId: number) => {
  cartAssembler.addToCart(productId, 1);
  updateCart();
};

const removeFromCart = (productId: number) => {
  cartAssembler.removeFromCart(productId);
  updateCart();
};

const updateQuantity = (productId: number, quantity: number) => {
  cartAssembler.updateQuantity(productId, quantity);
  updateCart();
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
};

const updateCart = () => {
  cartItems.value = cartAssembler.getCartItems();
};

onMounted(() => {
  products.value = productAssembler.getAllProducts();
  updateCart();
});
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <h1 class="text-center mb-4">Tienda de Productos</h1>
    </div>
    <div class="row g-4">
      <!-- Products Column -->
      <div class="col-md-7">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Productos Disponibles</h3>
          </div>
          <div class="card-body">
            <div v-if="availableProducts.length === 0" class="text-center text-muted py-5">
              <p>No hay productos disponibles</p>
            </div>
            <div v-else class="row g-3">
              <div
                v-for="product in availableProducts"
                :key="product.id"
                class="col-md-6 col-lg-4"
              >
                <div class="card h-100">
                  <img
                    :src="product.image"
                    class="card-img-top"
                    :alt="product.name"
                    style="height: 200px; object-fit: cover;"
                  />
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text text-primary fw-bold mb-2">
                      {{ formatPrice(product.price) }}
                    </p>
                    <p class="card-text text-muted small mb-auto">
                      Stock: {{ product.stock }}
                    </p>
                    <button
                      @click="addToCart(product.id)"
                      class="btn btn-primary mt-2"
                      :disabled="product.stock === 0"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Column -->
      <div class="col-md-5">
        <div class="card sticky-top" style="top: 20px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Productos en el carrito</h3>
            <span v-if="totalItems > 0" class="badge bg-primary">{{ totalItems }}</span>
          </div>
          <div class="card-body">
            <div v-if="cartItems.length === 0" class="text-center text-muted py-5">
              <p>Tu carrito está vacío</p>
            </div>
            <div v-else>
              <div v-for="item in cartItems" :key="item.product.id" class="mb-3 pb-3 border-bottom">
                <div class="d-flex align-items-start">
                  <img
                    :src="item.product.image"
                    class="me-3"
                    :alt="item.product.name"
                    style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-1">{{ item.product.name }}</h6>
                    <p class="text-primary fw-bold mb-2">
                      {{ formatPrice(item.product.price) }}
                    </p>
                    <div class="d-flex align-items-center gap-2">
                      <button
                        @click="item.quantity === 1 ? removeFromCart(item.product.id) : updateQuantity(item.product.id, item.quantity - 1)"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        -
                      </button>
                      <span class="mx-2">{{ item.quantity }}</span>
                      <button
                        @click="updateQuantity(item.product.id, item.quantity + 1)"
                        class="btn btn-sm btn-outline-secondary"
                        :disabled="item.quantity >= item.product.stock"
                      >
                        +
                      </button>
                      <button
                        @click="removeFromCart(item.product.id)"
                        class="btn btn-sm btn-danger ms-auto"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 pt-3 border-top">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="mb-0">Total a pagar:</h5>
                  <h4 class="mb-0 text-primary">{{ formatPrice(totalPrice) }}</h4>
                </div>
                <button
                  @click="cartAssembler.clearCart(); updateCart();"
                  class="btn btn-outline-danger w-100"
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>