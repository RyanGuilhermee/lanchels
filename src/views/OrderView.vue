<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from '../components/NavbarComponent.vue';
  import { getMenu, type Menu } from '@/services/menuService';
  import { saveOrder, updateOrder, findOrder, type Order } from '../services/orderService';
  import Message from '../components/MessageComponent.vue';

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
    totalPaid: 0,
    totalDebt: 0,
    observations: ''
  });
  let pageTitle = ref('Novo pedido');
  let addButtonContent = ref('Adicionar');
  let showMessage = ref('');
  let message = ref('Pedido adicionado com sucesso!')

  onMounted(async () => {
    menuData.value = await getMenu();
    const orderId = route.params.id as string;

    for (let i = 0; i < menuData.value.length; i++) {
      order.snacks[i] = {
        id: i,
        name: '',
        price: 0,
        quantity: 0,
        quantityPaid: 0,
        paymentMethod: 'pix',
        isPaid: false,
      }
    }

    if (orderId) {
      pageTitle.value = 'Editar pedido';
      addButtonContent.value = 'Salvar';
      message.value = 'Pedido salvo com sucesso!';

      const orderData = await findOrder(orderId) as Order;

      order.customerName = orderData.customerName,
      order.snacks = [],
      order.totalValue = orderData.totalValue,
      order.totalPaid = orderData.totalPaid,
      order.totalDebt = orderData.totalDebt,
      order.observations = orderData.observations

      for (const i in orderData.snacks) {
        order.snacks[i] = {
          id: Number(i),
          name: orderData.snacks[i].name,
          price: orderData.snacks[i].price,
          quantity: orderData.snacks[i].quantity,
          quantityPaid: orderData.snacks[i].quantityPaid,
          paymentMethod: orderData.snacks[i].paymentMethod,
          isPaid: orderData.snacks[i].isPaid,
        }
      }
    }
  });

  const addItem = (index: number) => {
    order.snacks[index].isPaid = false;
    order.snacks[index].quantity++;

    order.totalValue += order.snacks[index].price;
    
    order.snacks[index].isPaid && (order.totalPaid += order.snacks[index].price);
    !order.snacks[index].isPaid && (order.totalDebt += order.snacks[index].price);
  }

  const removeItem = (index: number) => {
    if (order.snacks[index].quantity === 0 ||
    order.snacks[index].quantity === order.snacks[index].quantityPaid) {
      return;
    }

    order.snacks[index].quantity--;

    order.totalValue -= order.snacks[index].price;

    order.snacks[index].isPaid && (order.totalPaid -= order.snacks[index].price);
    !order.snacks[index].isPaid && (order.totalDebt -= order.snacks[index].price);
  }

  const handlerPayCheckbox = (event: Event, index: number) => {
    const eventTarget = event.target as EventTargetChecked;

    if (eventTarget.checked) {
      order.totalPaid += ((order.snacks[index].quantity - order.snacks[index].quantityPaid) * order.snacks[index].price);
      order.totalDebt -= ((order.snacks[index].quantity - order.snacks[index].quantityPaid) * order.snacks[index].price);
      order.snacks[index].quantityPaid = order.snacks[index].quantity;

      return;
    }

    order.totalPaid -= (order.snacks[index].quantity * order.snacks[index].price);
    order.totalDebt += (order.snacks[index].quantity * order.snacks[index].price);
    order.snacks[index].quantityPaid -= order.snacks[index].quantity;
  }

  const cleanOrder = () => {
    order.customerName = '',
    order.snacks = [],
    order.totalValue = 0,
    order.totalPaid = 0,
    order.totalDebt = 0,
    order.observations = ''

    for (let i = 0; i < menuData.value!.length; i++) {
      order.snacks[i] = {
        id: i,
        name: '',
        price: 0,
        quantity: 0,
        quantityPaid: 0,
        paymentMethod: 'pix',
        isPaid: false,
      }
    }
  }

  const onShowMessage = () => {
    showMessage.value = 'show';
  }

  const handlerAddButton = async () => {
    try {
      const orderId = route.params.id as string;

      if (orderId) {
        await updateOrder(orderId, order);
        onShowMessage();
      } else {
        await saveOrder(order);
        onShowMessage();
        cleanOrder();
      }

    } catch (error) {
      console.log(error);
    }
  }
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container">
      <h1>{{ pageTitle }}</h1>

      <div class="message-container">
        <Message 
        :message="message"
        :show-message="showMessage"
        color="success"
         />
      </div>

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
                          v-model="order.snacks[index].isPaid" :disabled="!order.snacks[index].quantity">
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
                <ul class="list-group list-group-flush">
                  <template v-for="snack in order.snacks" :key="snack.id">
                    <template v-if="snack.quantity">
                      <li class="list-group-item">
                        {{ snack.quantity }}x {{ snack.name }} <br>
                        <span style="font-size: 13px; font-weight: 500;" v-if="!(snack.quantity === snack.quantityPaid)">
                          {{ snack.quantity - snack.quantityPaid }} restante(s) não pago
                        </span>
                        <span class="d-flex align-items-center" style="font-size: 13px; font-weight: 500;" v-else-if="(snack.quantity === snack.quantityPaid)">
                          <span class="material-symbols-outlined" style="color: #5F5F5F; font-size: 14px;">check</span>pago
                        </span>
                      </li>
                    </template>
                  </template>
                </ul>
              </div>
              <div class="amount-summary">
                <p>Valor total: <span class="amount-value-total">{{ order.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span></p>
                <p>Total pago: <span class="amount-value-payed">{{ order.totalPaid.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span></p>
                <p>Falta pagar: <span class="amount-value-debt">{{ order.totalDebt.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="form-floating mt-3">
          <textarea class="form-control" placeholder="Observações" id="observationArea" style="height: 100px" v-model="order.observations"></textarea>
          <label for="observationArea">Observações</label>
        </div>

        <button type="button" class="btn btn-warning shadow p-2 mb-3 mt-3 bg-body-tertiary rounded" @click="handlerAddButton">{{ addButtonContent }}</button>
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

  main label, input, button, h3, li, p, textarea {
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
  