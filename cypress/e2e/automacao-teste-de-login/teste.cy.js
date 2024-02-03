/// <reference types="cypress" />

context('Teste funcional de login', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/v1/')
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
      })
    
    })

    it('login sem usuário e senha', () => {
      cy.get('#login-button').click('')
      cy.contains('Epic sadface: Username is required')
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
        })
    })

    it('login com usuário sem senha', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('#login-button').click('')
      cy.contains('Epic sadface: Password is required')
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
        })
    })

    it('login com senha e sem usuário', () => {
      cy.get('#login-button').click('')
      cy.contains('Epic sadface: Username is required')
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
        })
    })
  
    it('Usuário e senha corretos', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('#login-button').click('')
      cy.get('.bm-burger-button > button').click('');
      cy.get('#logout_sidebar_link').click('');
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
        })
    })
    
    it('Usuário bloqueado', () => {
      cy.get('[data-test="username"]').type('locked_out_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('#login-button').click('');
      cy.contains('Epic sadface: Sorry, this user has been locked out.')
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
        })
    })

    it('Usuário com problema', () => {
      cy.get('[data-test="username"]').type('problem_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('#login-button').click('');
      cy.window().then((win) => {
      const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
      cy.log(`Tempo de carregamento: ${loadTime} ms`);
      })
    })

    it('Usuário comperformance ruim', () => {
      cy.get('[data-test="username"]').type('performance_glitch_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('#login-button').click('');
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        cy.log(`Tempo de carregamento: ${loadTime} ms`);
        })
    })
  })
  