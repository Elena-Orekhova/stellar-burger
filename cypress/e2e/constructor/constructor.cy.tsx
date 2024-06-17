/// <reference types="cypress" />

const testUrl = 'http://localhost:4000';
const ingredientDetails = 'Детали ингредиента';
const ingredientFirst = 'Ингредиент 1';
const ingredientThird = 'Ингредиент 3';
const ingredientTwelfth = 'Ингредиент 12';

describe('Тесты для конструктора бургера', () => {
  // Перехват запроса к API ингредиентов и возвращение моковых данных
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  // Добавление булки и ингредиентов в конструктор
  it('добавление булки в конструктор', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains(ingredientFirst)
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains(ingredientFirst)
      .should('exist');
  });

  it('добавление ингредиентов в конструктор', () => {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sause-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 3')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 12')
      .should('exist');
  });

  afterEach(() => {
    // Очистка перехватов запросов
    cy.intercept('GET', 'api/ingredients', {});
  });
});

describe('Тесты для модального окна', () => {
  // Перехват запроса к API ингредиентов и возвращение моковых данных
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  // Открытие и закрытие модальных окон по клику на Х и оверлей
  it('открытие модальных окон', () => {
    cy.contains(ingredientDetails).should('not.exist');
    cy.contains(ingredientFirst).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('#modals').contains(ingredientFirst).should('exist');
  });

  it('закрытие модальных окон на Х', () => {
    cy.contains(ingredientFirst).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains(ingredientDetails).should('not.exist');
  });

  it('закрытие модальных окон на оверлей', () => {
    cy.contains(ingredientFirst).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('[data-cy=modal-overlay]').click('right', { force: true });
    cy.contains(ingredientDetails).should('not.exist');
  });

  afterEach(() => {
    // Очистка перехватов запросов
    cy.intercept('GET', 'api/ingredients', {});
  });
});

describe('Тесты для оформления заказа', () => {
  // Перехват запроса к API и возвращение моковых данных
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/auth/login', { fixture: 'login.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('создание заказа', () => {
    // Собирается бургер
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sause-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-result] button').click();

    // Проверка, что отправлены нужные ингредиенты
    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '3', '12', '1'] });

    // проверка, что номер заказа в модальном окне верный
    cy.get('[data-cy=order-number]').contains('12345').should('exist');

    //проверка, что модальное окно закрылось
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    // проверка, что конструктор пуст
    cy.get('[data-cy=constructor]')
      .contains(ingredientFirst)
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 3')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 12')
      .should('not.exist');
  });

  afterEach(() => {
    // Очистка локального хранилища и перехватов запросов
    cy.clearLocalStorage();
    cy.intercept('GET', 'api/ingredients', {});
    cy.intercept('GET', 'api/auth/user', {});
    cy.intercept('POST', 'api/orders', {});
  });
});
