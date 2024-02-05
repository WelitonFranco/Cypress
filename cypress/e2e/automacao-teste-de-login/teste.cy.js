/// <reference types="cypress" />

context('Teste funcional de login', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/');
        cy.window().then((win) => {
            // Verifica se a interface PerformanceNavigationTiming está disponível
            if (win.performance && win.performance.timing) {
                const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
                cy.log(`Tempo de carregamento: ${loadTime} ms`);
            }
        });
    });

    // Teste login sem usuário e senha
    it('login sem usuário e senha', () => {
        cy.get('#login-button').click();
        cy.contains('Epic sadface: Username is required').should('be.visible');
        cy.measureLoadTime();
    });

    // Teste login com usuário sem senha
    it+('login com usuário sem senha', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('#login-button').click();
        cy.contains('Epic sadface: Password is required').should('be.visible');
        cy.measureLoadTime();
    });

    // Teste login com senha e sem usuário
    it('login com senha e sem usuário', () => {
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('#login-button').click();
        cy.contains('Epic sadface: Username is required').should('be.visible');
        cy.measureLoadTime();
    });

    // Teste Usuário e senha corretos
    it('Usuário e senha corretos', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.logout();
        cy.measureLoadTime();
    });

    // Teste Usuário bloqueado
    it('Usuário bloqueado', () => {
        cy.login('locked_out_user', 'secret_sauce');
        cy.contains('Epic sadface: Sorry, this user has been locked out').should('be.visible');
        cy.measureLoadTime();
    });

    // Teste Usuário com problema
    it('Usuário com problema', () => {
        cy.login('problem_user', 'secret_sauce');
        cy.measureLoadTime();
    });

    // Teste Usuário com performance ruim
    it('Usuário com performance ruim', () => {
        cy.login('performance_glitch_user', 'secret_sauce');
        cy.measureLoadTime();
    });

    // Função de login reutilizável
    Cypress.Commands.add('login', (username, password) => {
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('#login-button').click();
    });

    // Função de logout reutilizável
    Cypress.Commands.add('logout', () => {
        cy.get('.bm-burger-button > button').click();
        cy.get('#logout_sidebar_link').click();
    });

    // Função para medir o tempo de carregamento
    Cypress.Commands.add('measureLoadTime', () => {
        cy.window().then((win) => {
            if (win.performance && win.performance.timing) {
                const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
                cy.log(`Tempo de carregamento: ${loadTime} ms`);
            }
        });
    });
});





