<script setup lang="ts"></script>

<template>
  <header>
    <nav class="navbar fixed-top" style="background-color: #318598;">
      <div class="container-fluid">
        <a class="navbar-brand title" href="#">LANCHELS</a>
        <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="material-symbols-outlined">Menu</span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header" style="background-color: #318598;">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body" style="background-color: #318598;">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
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
          <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">Novo pedido</button>
          <button type="button" class="btn btn-warning shadow p-3 mb-4 bg-body-tertiary rounded">Novo cardápio</button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
  header a.title {
    font-family: 'Just Another Hand', cursive;
    font-size: 38px;
    color: #E9E9E9;
  }

  header .offcanvas-title {
    color: #E9E9E9;
    font-size: 28px;
  }

  header .nav-link {
    color: #E9E9E9;
  }

  header button {
    border-width: 0px;
  }

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


