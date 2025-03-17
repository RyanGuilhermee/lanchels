<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from '../components/NavbarComponent.vue';
import { findAllOrders } from '../services/orderService';
import { generateReport } from '@/services/report-service';

let totalPix = ref(0);
let totalMoney = ref(0);
let totalAll = ref(0);

let totalPixDonation = ref(0);
let totalMoneyDonation = ref(0);
let totalAllDonation = ref(0);

let totalPixAll = ref(0);
let totalMoneyAll = ref(0);
let totalAllAll = ref(0);

onMounted(async () => {
  try {
    const ordersData = await findAllOrders();

    //filter all order paid
    const allOrderPaid = ordersData.filter((order) => order.totalPaid);

    allOrderPaid.forEach((order) => {
      for (const snack of order.snacks) {
        if (snack.quantityPaid) {
          if (snack.paymentMethod === 'pix') {
            totalPix.value += snack.quantityPaid * snack.price;
          } else if (snack.paymentMethod === 'money') {
            totalMoney.value += snack.quantityPaid * snack.price;
          }

          totalAll.value += snack.quantityPaid * snack.price;
        }
      }

      totalPixDonation.value += order.donation.donationMethod === 'pix' ? order.donation.totalDonation : 0;
      totalMoneyDonation.value += order.donation.donationMethod === 'money' ? order.donation.totalDonation : 0;
      totalAllDonation.value += order.donation.totalDonation;
    });

    totalPixAll.value = totalPix.value + totalPixDonation.value;
    totalMoneyAll.value = totalMoney.value + totalMoneyDonation.value;
    totalAllAll.value = totalAll.value + totalAllDonation.value;
  } catch (error) {
    console.log(error);
  }
});

const report = async  (e: Event) => {
  e.preventDefault()
  const ordersData = await findAllOrders()

 const url = await generateReport({
  orders: ordersData,
  calculatedData: {
    totalPixSales: totalPixAll.value,
    totalMoneySales: totalMoneyAll.value,
    totalSales: totalAllAll.value,
    totalPixDonation: totalPixDonation.value,
    totalMoneyDonation: totalMoneyDonation.value,
    totalDonation: totalAllDonation.value,
    totalPix: totalPixAll.value,
    totalMoney: totalMoneyAll.value,
    total: totalAllAll.value
  }
 })

 window.open(url, 'blank') 
}
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container-fluid">
      <h1>Bem-vindo ao painel de administração do <span>Lanchels!</span></h1>

      <div class="cards-container">
        <section id="incommings">
        <h2>Entradas de vendas:</h2>

        <div class="cards d-flex justify-content-center">
          <div class="row">
            <div class="col">
              <div
                class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                style="width: 18rem"
              >
                <div class="card-body">
                  <h5 class="card-title">Pix</h5>
                  <p class="card-text">
                    {{ totalPix.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col">
              <div
                class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                style="width: 18rem"
              >
                <div class="card-body">
                  <h5 class="card-title">Dinheiro</h5>
                  <p class="card-text">
                    {{ totalMoney.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col">
              <div
                class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                style="width: 18rem"
              >
                <div class="card-body">
                  <h5 class="card-title">Total</h5>
                  <p class="card-text">
                    {{ totalAll.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section id="donations-incommings">
          <h2>Entradas de doações:</h2>

          <div class="cards d-flex justify-content-center">
            <div class="row">
              <div class="col">
                <div
                  class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                  style="width: 18rem"
                >
                  <div class="card-body">
                    <h5 class="card-title">Pix</h5>
                    <p class="card-text">
                      {{ totalPixDonation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col">
                <div
                  class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                  style="width: 18rem"
                >
                  <div class="card-body">
                    <h5 class="card-title">Dinheiro</h5>
                    <p class="card-text">
                      {{ totalMoneyDonation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col">
                <div
                  class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                  style="width: 18rem"
                >
                  <div class="card-body">
                    <h5 class="card-title">Total</h5>
                    <p class="card-text">
                      {{ totalAllDonation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="all-incommings">
          <h2>Entradas totais:</h2>

          <div class="cards d-flex justify-content-center">
            <div class="row">
              <div class="col">
                <div
                  class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                  style="width: 18rem"
                >
                  <div class="card-body">
                    <h5 class="card-title">Pix</h5>
                    <p class="card-text">
                      {{ totalPixAll.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col">
                <div
                  class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                  style="width: 18rem"
                >
                  <div class="card-body">
                    <h5 class="card-title">Dinheiro</h5>
                    <p class="card-text">
                      {{ totalMoneyAll.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col">
                <div
                  class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded"
                  style="width: 18rem"
                >
                  <div class="card-body">
                    <h5 class="card-title">Total</h5>
                    <p class="card-text">
                      {{ totalAllAll.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="actions">
        <div class="d-flex justify-content-center mt-5">
          <router-link to="/order">
            <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">
              Novo pedido
            </button>
          </router-link>
          <router-link to="/menu">
            <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">
              Novo cardápio
            </button>
          </router-link>
          <a @click="report">
            <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">
              Relatório de vendas
            </button>
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
main .container-fluid {
  margin-top: 100px;
}

main h1 {
  font-size: 13px;
  text-align: center;
}

main h1 span {
  font-family: 'Just Another Hand', cursive;
  font-size: 30px;
}

main  h2 {
  font-size: 11px;
  text-align: center;
  margin: 40px;
}

main .cards .card {
  border-radius: 8px !important;
}

main .cards h5 {
  font-size: 14px;
  color: #5f5f5f;
}

main .cards p {
  font-size: 32px;
  color: #1c7525;
  font-weight: 500;
}

main #actions button {
  margin: 0px 10px 0px 10px;
  font-size: 14px;
}

@media (max-width: 936px) {
  main .cards .row {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 768px) {
  main h1 {
    font-size: 18px;
    text-align: center;
  }

  main h1 span {
    font-size: 34px;
  }

  main h2 {
    font-size: 16px;
  }
}
</style>
