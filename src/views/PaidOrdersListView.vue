<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Navbar from '../components/NavbarComponent.vue';
  import { deleteAllOrders, findAllOrders, type Order } from '../services/orderService';

  let orders = ref<Order[]>();

   onMounted(async () => {
      try {
        const ordersData = await findAllOrders();

        orders.value = ordersData.filter(order => !order.totalDebt);
      } catch (error) {
        console.log(error);
      }
   });

   const clearList = async () => {
    if (!orders.value?.length) {
      return;
    }

    await deleteAllOrders();

    orders.value = [];

    alert('Lista limpa com sucesso!');
   }
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container">
      <h1>Pedidos pagos</h1>

      <div class="clear-list d-flex justify-content-end">
        <button type="button" class="btn btn-outline-danger" @click="clearList">Limpar lista</button>
      </div>
      
      <div class="paid-orders-list mt-4">
        <ul class="list-group list-group-flush">
          <div class="d-flex justify-content-center" v-if="!orders?.length">
            <p style="margin-top: 200px; color: #5F5F5F;">Sem pedidos</p>
          </div>
          <li class="list-group-item d-flex justify-content-between" v-for="(order, index) in orders" :key="index">
            <div class="order-infos d-flex justify-content-center">
              <p style="margin-right: 10px;">{{ order.customerName }}</p>
            </div>

            <router-link :to="`/order/${order.id}`">
              <button type="button" class="btn btn-outline-light">
                <span class="material-symbols-outlined" style="color: #5F5F5F;">edit</span>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
    main .container {
    margin-top: 100px;
  }

  main h1 {
    font-size: 13px;
    text-align: center;
  }

  main label, input, button, h3, li, p {
    font-size: 14px;
  }

  main ul {
    height: 700px;
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    main h1 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
