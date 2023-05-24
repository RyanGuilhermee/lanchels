<script setup lang="ts"></script>

<template>
  <nav class="navbar fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="router">
        <a class="navbar-brand title" href="#">LANCHELS</a>
      </router-link>
      <button
        class="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="material-symbols-outlined">Menu</span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link to="/" class="router">
                <a class="nav-link" aria-current="page" href="#">Home</a>
              </router-link>
              <router-link to="/menus-list" class="router">
                <a class="nav-link" aria-current="page" href="#">Lista de cardápios</a>
              </router-link>
              <router-link to="/paid-orders" class="router">
                <a class="nav-link" aria-current="page" href="#">Lista de pedidos pagos</a>
              </router-link>
              <router-link to="/unpaid-orders" class="router">
                <a class="nav-link" aria-current="page" href="#">Lista de pedidos em débito</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
header .navbar,
.offcanvas-header,
.offcanvas-body {
  background-color: #318598;
}

header a.title {
  font-family: 'Just Another Hand', cursive;
  font-size: 38px;
  color: #e9e9e9;
}

header .offcanvas-title {
  color: #e9e9e9;
  font-size: 28px;
}

header .nav-link {
  color: #e9e9e9;
}

header .nav-link:hover {
  color: #ffc107;
}

header button {
  border-width: 0px;
}

header .router {
  text-decoration: none;
}
</style>
