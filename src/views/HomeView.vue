<script setup lang="ts">
  import Navbar from '../components/NavbarComponent.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container-fluid">
      <h1>
        Bem-vindo ao painel de administração do <span>Lanchels!</span>
      </h1>

      <section id="incommings">
        <h2>
          Entradas do dia:
        </h2>

        <div class="cards d-flex justify-content-center">
          <div class="row">
            <div class="col">
              <div class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Pix</h5>
                  <p class="card-text">R$ 250,00</p>
                </div>
              </div>
            </div>
  
            <div class="col">
              <div class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Dinheiro</h5>
                  <p class="card-text">R$ 250,00</p>
                </div>
              </div>
            </div>
  
            <div class="col">
              <div class="card text-center mb-3 shadow p-3 mb-1 bg-body-tertiary rounded" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Total</h5>
                  <p class="card-text">R$ 500,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="actions">
        <div class="d-flex justify-content-center mt-5">
          <router-link to="/order">
            <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">Novo pedido</button>
          </router-link>
          <router-link to="/menu">
            <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">Novo cardápio</button>
          </router-link>
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

  main #incommings h2 {
    font-size: 11px;
    text-align: center;
    margin: 40px;
  }

  main .cards .card {
    border-radius: 8px !important;
  }

  main .cards h5 {
    font-size: 14px;
    color: #5F5F5F;
  }

  main .cards p {
    font-size: 32px;
    color: #1C7525;
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
        align-content: center;
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

    main #incommings h2 {
      font-size: 16px;
    }
  }
</style>


