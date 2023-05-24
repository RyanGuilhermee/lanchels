<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from '../components/NavbarComponent.vue';
import { getAllMenu, deleteMenu, type Menu } from '../services/menuService';
import Message from '../components/MessageComponent.vue';

let menus = ref<Menu[]>();
let showMessage = ref('');
let menuId = ref('');

onMounted(async () => {
  try {
    menus.value = await getAllMenu();
  } catch (error) {
    console.log(error);
  }
});

const setMenuId = (id: string) => {
  menuId.value = id;
};

const deleteMenuById = async () => {
  try {
    await deleteMenu(menuId.value);
    menus.value = await getAllMenu();
    onShowMessage();
  } catch (error) {
    console.log(error);
  }
};

const onShowMessage = () => {
  showMessage.value = 'show';
};
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container">
      <h1>Lista de cardápios</h1>

      <div class="message-container">
        <Message
          :message="'Menu deletado com sucesso!'"
          :show-message="showMessage"
          color="success"
        />
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalDelete"
        tabindex="-1"
        aria-labelledby="modalDeleteLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalDeleteLabel">Tem certeza?</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteMenuById"
                data-bs-dismiss="modal"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="paid-orders-list mt-4">
        <ul class="list-group list-group-flush">
          <div class="d-flex justify-content-center" v-if="!menus?.length">
            <p style="margin-top: 200px; color: #5f5f5f">Sem cardápios</p>
          </div>
          <li
            class="list-group-item d-flex justify-content-between"
            v-for="(menu, index) in menus"
            :key="index"
          >
            <div class="order-infos d-flex justify-content-center">
              <p style="margin-right: 10px">{{ menu.name }}</p>
            </div>

            <div class="actions d-flex align-items-center">
              <router-link :to="`/menu/${menu.id}`">
                <button type="button" class="btn btn-outline-light">
                  <span class="material-symbols-outlined" style="color: #5f5f5f">edit</span>
                </button>
              </router-link>

              <button
                class="delete-btn ms-3"
                data-bs-toggle="modal"
                data-bs-target="#modalDelete"
                style="border: none"
                @click="() => setMenuId(menu.id as string)"
              >
                <span class="material-symbols-outlined" style="color: #e23737">delete</span>
              </button>
            </div>
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

main label,
input,
button,
h3,
li,
p {
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
