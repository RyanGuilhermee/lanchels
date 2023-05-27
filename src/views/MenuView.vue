<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/NavbarComponent.vue';
import { saveMenu, getMenuById, updateMenu } from '../services/menuService';
import Message from '../components/MessageComponent.vue';
import { onMounted } from 'vue';

interface EventTargetValue extends EventTarget {
  value: string;
  setSelectionRange: (selectionStart: number, selectionEnd: number) => undefined;
  focus: () => undefined;
}

const route = useRoute();
let digitValue = ref('');
let nameInputValue = ref('');
let isHiddenInputName = ref(true);
let isHiddenInputCurrency = ref(true);
let prettyCurrency = ref('');
let nameInput = ref();
let priceInput = ref();
let showMessage = ref('');
let menuId = ref('');
let pageTitle = ref('Novo cardápio');
let buttonContent = ref('Adicionar');

onMounted(async () => {
  menuId.value = route.params.id as string;

  if (menuId.value) {
    pageTitle.value = 'Editar cardápio';
    buttonContent.value = 'Salvar';

    try {
      const menu = await getMenuById(menuId.value);
      nameInputValue.value = menu.name;
      digitValue.value = String(menu.price);
      prettyCurrency.value = menu.prettyPrice.replace('R$', '');
    } catch (error) {
      console.log(error);
    }
  }
});

const handlerNameInput = (event: Event) => {
  const targetValue = event.target as EventTargetValue;
  nameInputValue.value = targetValue.value;
  nameInput.value = targetValue;
};

const handlerPriceInput = (event: Event) => {
  const targetValue = event.target as EventTargetValue;
  const inputContentLength = targetValue.value.length + 1;

  digitValue.value = targetValue.value.replace(/[^0-9]/g, '');
  const realDigitValue = digitValue.value && parseFloat(digitValue.value) / 100;
  priceInput.value = targetValue;

  prettyCurrency.value = realDigitValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  prettyCurrency.value = prettyCurrency.value.replace('R$', '');

  inputContentLength && targetValue.setSelectionRange(inputContentLength, inputContentLength);
  targetValue.focus();
};

const onShowMessage = () => {
  showMessage.value = 'show';
};

const handlerAddButton = async () => {
  const currencyInputValue = parseFloat(digitValue.value) / 100;

  if (!nameInputValue.value) {
    isHiddenInputName.value = false;

    return;
  }

  isHiddenInputName.value = true;

  if (isNaN(currencyInputValue)) {
    isHiddenInputCurrency.value = false;

    return;
  }

  isHiddenInputCurrency.value = true;

  try {
    if (menuId.value) {
      await updateMenu(menuId.value, {
        name: nameInputValue.value,
        prettyPrice: parseFloat(prettyCurrency.value).toLocaleString('pt-BR', {
          style: 'currency',
          'currency': 'BRL'
        }),
        price: parseFloat(digitValue.value) / 100
      });

      onShowMessage();

      nameInput.value.value = '';
      priceInput.value.value = '';
      digitValue.value = '';

      return;
    }

    await saveMenu({
      name: nameInputValue.value,
      prettyPrice: parseFloat(prettyCurrency.value).toLocaleString('pt-BR', {
          style: 'currency',
          'currency': 'BRL'
      }),
      price: parseFloat(digitValue.value) / 100
    });

    onShowMessage();

    nameInput.value.value = '';
    priceInput.value.value = '';
    nameInputValue.value = '';
    digitValue.value = '';
    prettyCurrency.value = '';
  } catch (error) {
    console.log(error);
  }
};
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
          :message="'Cardápio salvo com sucesso!'"
          :show-message="showMessage"
          color="success"
        />
      </div>

      <form action="" class="mt-4">
        <div class="mb-3">
          <label for="menuNameInput" class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            id="menuNameInput"
            placeholder="Torta de frango"
            v-model="nameInputValue"
            @input="handlerNameInput"
          />
          <span :hidden="isHiddenInputName" class="alert-message">Insira um valor válido</span>
        </div>
        <div class="mb-3">
          <label for="menuPriceInput" class="form-label">Preço</label>
          <input
            type="text"
            class="form-control"
            id="menuPriceInput"
            placeholder="R$ 0,00"
            v-model="prettyCurrency"
            @input="handlerPriceInput"
          />
          <span :hidden="isHiddenInputCurrency" class="alert-message">Insira um valor válido</span>
        </div>

        <button
          type="button"
          class="btn btn-warning shadow p-2 mb-1 mt-3 bg-body-tertiary rounded"
          @click="handlerAddButton"
        >
          {{ buttonContent }}
        </button>
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

main label,
input,
button {
  font-size: 14px;
}

main .alert-message {
  font-size: 13px;
  color: #e90c0c;
}

@media (min-width: 768px) {
  main h1 {
    font-size: 18px;
    text-align: center;
  }
}
</style>
