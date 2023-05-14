<script setup lang="ts">
  import { ref } from 'vue';
  import Navbar from '../components/NavbarComponent.vue';
  import { saveMenu } from '../services/menuService';

  interface EventTargetValue extends EventTarget {
    value: string;
  }

  let currentKey = ref('');
  let digitValue = ref('');
  let nameInputValue = ref('');
  let isHiddenInputName = ref(true);
  let isHiddenInputCurrency = ref(true);
  let prettyCurrency = ref('');
  let nameInput = ref();
  let priceInput = ref();

  const handlerNameInput = (event: Event) => {
    const targetValue = event.target as EventTargetValue;
    nameInputValue.value = targetValue.value;
    nameInput.value = targetValue;
  }

  const restrictNonNumericKeys = (event: any) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const isNumericKey = (event.key >= '0' && event.key <= '9');
    const isAllowedKey = allowedKeys.includes(event.key);

    if (!isNumericKey && !isAllowedKey) {
      event.preventDefault();
    }

    currentKey.value = event.key;
  }

  const handlerPriceInput = (event: Event) => {
    const targetValue = event.target as EventTargetValue;
    digitValue.value = targetValue.value.replace(/[^0-9]/g, '');
    const realDigitValue = parseFloat(digitValue.value) / 100;
    priceInput.value = targetValue;

    prettyCurrency.value = realDigitValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    if (currentKey.value !== 'Backspace') {
      targetValue.value = prettyCurrency.value;
    }
  }

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
      await saveMenu({
        name: nameInputValue.value,
        prettyPrice: prettyCurrency.value,
        price: parseFloat(digitValue.value) / 100
      });

      alert('Cardápio salvo com sucesso!');

      nameInput.value.value = '';
      priceInput.value.value = '';
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
      <h1>Novo cardápio</h1>

      <form action="" class="mt-4">
        <div class="mb-3">
          <label for="menuNameInput" class="form-label">Nome</label>
          <input type="email" class="form-control" id="menuNameInput" placeholder="Torta de frango" @input="handlerNameInput">
          <span :hidden="isHiddenInputName" class="alert-message">Insira um valor válido</span>
        </div>
        <div class="mb-3">
          <label for="menuPriceInput" class="form-label">Preço</label>
          <input type="text" class="form-control" id="menuPriceInput" placeholder="R$ 0,00" @keydown="restrictNonNumericKeys" @input="handlerPriceInput">
          <span :hidden="isHiddenInputCurrency" class="alert-message">Insira um valor válido</span>
        </div>

        <button type="button" class="btn btn-warning shadow p-2 mb-1 mt-3 bg-body-tertiary rounded" @click="handlerAddButton">Adicionar</button>
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

  main label, input, button {
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
