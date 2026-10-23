"use strict";

// IIFE створює окрему область видимості: змінні роботи не стають глобальними.
(() => {
  // Завдання 1. У масиві збережено фактично обчислені значення виразів.
  const expressions = [
    { expression: '"10" + 5', value: "10" + 5 },
    { expression: '"10" - 5', value: "10" - 5 },
    { expression: '"10" * "2"', value: "10" * "2" },
    { expression: "10 + true", value: 10 + true },
    { expression: "10 + false", value: 10 + false },
    { expression: 'Number("125 грн")', value: Number("125 грн") },
    { expression: 'Number("")', value: Number("") },
    { expression: 'Boolean("false")', value: Boolean("false") },
    { expression: 'Boolean("")', value: Boolean("") }
  ];

  console.group("Завдання 1. Перетворення типів");
  for (const result of expressions) {
    console.log(result.expression, "=>", result.value, "| typeof:", typeof result.value);
    addTableRow(document.getElementById("types-results"), [
      result.expression,
      typeof result.value === "string" ? JSON.stringify(result.value) : String(result.value),
      typeof result.value
    ]);
  }
  console.groupEnd();

  // Завдання 2. Ціни одиниці товару задано без ПДВ, у гривнях.
  const orderItems = [
    { name: "Клавіатура", price: 1250, quantity: 2 },
    { name: "Миша", price: 650, quantity: 1 },
    { name: "Кабель USB", price: 180, quantity: 3 }
  ];
  const vatRate = 0.20;
  const vatResults = [];

  // Вартість однієї позиції без ПДВ. Параметри доступні лише в цій функції.
  function ItemCostCalculator(price, quantity) {
    return Math.round(price * quantity * 100) / 100;
  }

  // vatResults передано явно як вихідний масив для результатів ПДВ.
  // Функція повертає лише одне число — загальну вартість із ПДВ.
  function OrderSumCalculator(items, rate, itemVatResults) {
    let orderSum = 0;
    for (const item of items) {
      const itemCost = ItemCostCalculator(item.price, item.quantity);
      const vat = Math.round(itemCost * rate * 100) / 100;
      itemVatResults.push({ name: item.name, vat: vat });
      orderSum += itemCost + vat;
    }
    return Math.round(orderSum * 100) / 100;
  }

  const orderTotal = OrderSumCalculator(orderItems, vatRate, vatResults);

  console.group("Завдання 2. Вартість замовлення та ПДВ");
  console.log("Загальна вартість замовлення з ПДВ:", orderTotal, "грн");
  console.log("Масив ПДВ для кожного товару:", vatResults);
  console.table(vatResults);
  console.groupEnd();

  // Відображення використовує ті самі результати розрахунку, що й консоль.
  orderItems.forEach((item, index) => {
    const itemCost = ItemCostCalculator(item.price, item.quantity);
    const vat = vatResults[index].vat;
    addTableRow(document.getElementById("order-results"), [
      item.name, item.price.toFixed(2), item.quantity,
      itemCost.toFixed(2), vat.toFixed(2), (itemCost + vat).toFixed(2)
    ]);
  });

  document.getElementById("order-total").textContent = orderTotal.toFixed(2) + " грн";
  document.getElementById("vat-results").textContent = JSON.stringify(vatResults, null, 2);

  // Допоміжна функція виводу: textContent вставляє значення як звичайний текст.
  function addTableRow(tableBody, values) {
    const row = document.createElement("tr");
    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = String(value);
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
})();
