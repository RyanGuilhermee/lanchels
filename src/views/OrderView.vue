<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from '../components/NavbarComponent.vue';
  import { getMenu, type Menu } from '@/services/menuService';
  import { type Order } from '../services/orderService';

  interface EventTargetChecked extends EventTarget {
    checked: boolean;
  }

  const route = useRoute();
  let isHiddenInputName = ref(true);
  let menuData = ref<Menu[]>();
  let order = reactive<Order>({
    customerName: '',
    snacks: [],
    totalValue: 0,
    totalPayed: 0,
    totalDebt: 0,
    observations: ''
  });

  onMounted(async () => {
    menuData.value = await getMenu();
    
    for (let i = 0; i < menuData.value.length; i++) {
      order.snacks[i] = {
        id: i,
        name: '',
        price: 0,
        quantity: 0,
        quantityPayed: 0,
        paymentMethod: 'pix',
        isPayed: false,
      }
    }
  });

  const addItem = (index: number) => {
    order.snacks[index].isPayed = false;
    order.snacks[index].quantity++;

    order.totalValue += order.snacks[index].price;
    
    order.snacks[index].isPayed && (order.totalPayed += order.snacks[index].price);
    !order.snacks[index].isPayed && (order.totalDebt += order.snacks[index].price);
  }

  const removeItem = (index: number) => {
    if (order.snacks[index].quantity === 0 ||
    order.snacks[index].quantity === order.snacks[index].quantityPayed) {
      return;
    }

    order.snacks[index].quantity--;

    order.totalValue -= order.snacks[index].price;

    order.snacks[index].isPayed && (order.totalPayed -= order.snacks[index].price);
    !order.snacks[index].isPayed && (order.totalDebt -= order.snacks[index].price);
  }

  const handlerPayCheckbox = (event: Event, index: number) => {
    const eventTarget = event.target as EventTargetChecked;

    if (eventTarget.checked) {
      order.totalPayed += ((order.snacks[index].quantity - order.snacks[index].quantityPayed) * order.snacks[index].price);
      order.totalDebt -= ((order.snacks[index].quantity - order.snacks[index].quantityPayed) * order.snacks[index].price);
      order.snacks[index].quantityPayed = order.snacks[index].quantity;

      return;
    }

    order.totalPayed -= (order.snacks[index].quantity * order.snacks[index].price);
    order.totalDebt += (order.snacks[index].quantity * order.snacks[index].price);
    order.snacks[index].quantityPayed -= order.snacks[index].quantity;
  }

  const handlerAddButton = () => {
    console.log(order.snacks);
  }
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container">
      <h1>Novo pedido</h1>

      <form action="" class="mt-4">
        <div class="mb-3">
          <label for="orderNameInput" class="form-label">Nome do cliente</label>
          <input type="email" class="form-control" id="orderNameInput" placeholder="José" v-model="order.customerName">
          <span :hidden="isHiddenInputName" class="alert-message">Insira um valor válido</span>
        </div>

        <div class="card">
          <div class="card-header">
            <p class="card-title text-center">Lanches</p>
          </div>
          <div class="card-body" style="height: 300px; overflow-y: auto;">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item" v-for="(menu, index) in menuData" :key="index">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-${menu.id}`" aria-expanded="false" :aria-controls="`flush-${menu.id}`">
                    {{ menu.name }} - <span style="font-weight: 500;">{{ menu.prettyPrice }}</span>
                    <span hidden>{{ order.snacks[index].price = menu.price }}</span>
                    <span hidden>{{ order.snacks[index].name = menu.name }}</span>
                  </button>
                </h2>
                <div :id="`flush-${menu.id}`" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body d-flex justify-content-between">
                    <div class="quantity">
                      <div class="btn-group d-flex align-items-center" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-sm btn-outline-warning p-1 quantity-btn" @click="() => removeItem(index)" >
                          <span class="material-symbols-outlined btn-symbols">remove</span>
                        </button>
                        <span class="item-count" style="margin: 0px 10px 0px 10px; font-size: 15px;">{{ order.snacks[index].quantity }}</span>
                        <button type="button" class="btn btn-sm btn-outline-warning p-1 quantity-btn" @click="() => addItem(index)">
                          <span class="material-symbols-outlined btn-symbols">add</span>
                        </button>
                      </div>
                    </div>

                    <div class="payments-methods">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" :id="`radioPix-${menu.id}`" value="pix" v-model="order.snacks[index].paymentMethod">
                        <label class="form-check-label" :for="`radioPix-${menu.id}`">
                          Pix
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" :id="`radioMoney-${menu.id}`" value="money" v-model="order.snacks[index].paymentMethod">
                        <label class="form-check-label" :for="`radioMoney-${menu.id}`">
                          Dinheiro
                        </label>
                      </div>
                    </div>

                    <div class="payed-checks">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" 
                          @click="(event) => handlerPayCheckbox(event, index)" 
                          v-model="order.snacks[index].isPayed" :disabled="!order.snacks[index].quantity">
                          <span :style="order.snacks[index].quantity ? 'opacity: 100%;' : 'opacity: 45%;'">Pago</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-body-secondary">
            <div class="orders-summary d-flex justify-content-between">
              <div class="orders-list" style="height: 120px; overflow-y: auto;">
                <ul class="list-group list-group-flush" v-for="snack in order.snacks" :key="snack.id">
                  <template v-if="snack.quantity">
                    <li class="list-group-item">
                      {{ snack.quantity }}x {{ snack.name }} <br>
                      <span style="font-size: 13px; font-weight: 500;" v-if="!(snack.quantity === snack.quantityPayed)">
                        {{ snack.quantity - snack.quantityPayed }} restante(s) não pago
                      </span>
                      <span style="font-size: 13px; font-weight: 500;" v-else-if="(snack.quantity === snack.quantityPayed)">
                        Pago
                      </span>
                    </li>
                  </template>
                </ul>
              </div>
              <!-- ['1x Caldo', '2x Torta de frango', '1x Cachorro-quente', '1x Pirulito'] -->
              <div class="amount-summary">
                <p>Valor total: <span class="amount-value-total">{{ order.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span></p>
                <p>Total pago: <span class="amount-value-payed">{{ order.totalPayed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span></p>
                <p>Falta pagar: <span class="amount-value-debt">{{ order.totalDebt.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="form-floating mt-3">
          <textarea class="form-control" placeholder="Observações" id="observationArea" style="height: 100px"></textarea>
          <label for="observationArea">Observações</label>
        </div>

        <button type="button" class="btn btn-warning shadow p-2 mb-3 mt-3 bg-body-tertiary rounded" @click="handlerAddButton">Adicionar</button>
      </form>
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

  main .btn-symbols {
    color: black;
    font-size: 18px;
    font-weight: 600;
  }

  main .amount-summary p, li {
    color: #5F5F5F;
  }

  main .amount-value-payed {
    font-weight: 700;
    color: #1C7525;
  }

  main .amount-value-debt {
    font-weight: 700;
    color: #f03a0d;
  }

  main .amount-value-total {
    font-weight: 700;
    color: #414141;
  }

  @media (min-width: 768px) {
    main h1 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
  