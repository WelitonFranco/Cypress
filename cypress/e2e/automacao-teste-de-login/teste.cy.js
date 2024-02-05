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
    it('login com usuário sem senha', () => {
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

    // Teste de Sessão Ativa
    it('Sessão permanece ativa após login e navegação', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html'); // Verifica se redirecionou para a página pós-login

        // Navegação para diferentes áreas
        cy.get('.bm-burger-button > button').click();
        cy.get('#inventory_sidebar_link').click();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html'); // Verifica se redirecionou para a página de detalhes do item

        // Adicione mais verificações conforme necessário

        // Logout no final
        cy.logout();
    });

    // Testes de Compatibilidade de Navegadores (exemplo fictício)
    it('Funciona corretamente em diferentes navegadores', () => {
        const browsers = ['chrome', 'firefox', 'edge']; // Adicione mais navegadores conforme necessário
        browsers.forEach((browser) => {
            cy.log(`Testando no navegador: ${browser}`);
            cy.visit('https://www.saucedemo.com/v1/', { browser: browser });
            // Adicione verificações específicas do navegador, se necessário
        });
    });

     // Teste de Layout Responsivo (exemplo fictício)
     it('Layout se adapta a diferentes tamanhos de tela', () => {
        // Adicione passos para testar se o layout se adapta corretamente
        cy.viewport(320, 568); // Smartphone iPhone 5/SE
        cy.get('#login-button').should('be.visible'); // Verifica se o botão de login ainda é visível
    });

    // Testes de Layout Responsivo para Smartphones
    const smartphones = [
        { name: 'iPhone SE', width: 568, height: 320},
        { name: 'iPhone 8', width: 667, height: 667 },
        { name: 'Samsung Galaxy S5', width: 640, height: 360 },
        { name: 'Google Pixel', width: 731, height: 411 },
        { name: 'Samsung Galaxy S9', width: 740, height: 360 },
    ];

    smartphones.forEach((device) => {
        it(`Layout se adapta a tamanhos de tela de ${device.name}`, () => {
            cy.viewport(device.width, device.height);
            cy.get('#login-button').should('be.visible');
            cy.screenshot(`layout_${device.name.toLowerCase().replace(/\s/g, '_')}`);
        });
    });

    // Testes de Layout Responsivo para Netbooks
    const netbooks = [
        { name: 'HP Mini 210', width: 1024, height: 600 },
        { name: 'Dell Inspiron Mini', width: 1024, height: 576 },
        { name: 'Acer Aspire One', width: 1024, height: 600 },
        { name: 'ASUS Eee PC', width: 1024, height: 600 },
        { name: 'Lenovo IdeaPad S10', width: 1024, height: 576 },
    ];

    netbooks.forEach((device) => {
        it(`Layout se adapta a tamanhos de tela de ${device.name}`, () => {
            cy.viewport(device.width, device.height);
            cy.get('#login-button').should('be.visible');
            cy.screenshot(`layout_${device.name.toLowerCase().replace(/\s/g, '_')}`);
        });
    });

    // Testes de Layout Responsivo para Notebooks
    const notebooks = [
        { name: 'Dell XPS 13', width: 1920, height: 1080 },
        { name: 'MacBook Air 13-inch', width: 1440, height: 900 },
        { name: 'HP Spectre x360', width: 1920, height: 1080 },
        { name: 'Lenovo ThinkPad X1 Carbon', width: 2560, height: 1440 },
        { name: 'Acer Predator Helios 300 (15.6")', width: 1920, height: 1080 },
    ];

    notebooks.forEach((device) => {
        it(`Layout se adapta a tamanhos de tela de ${device.name}`, () => {
            cy.viewport(device.width, device.height);
            cy.get('#login-button').should('be.visible');
            cy.screenshot(`layout_${device.name.toLowerCase().replace(/\s/g, '_')}`);
        });
    });

    // Testes de Layout Responsivo para Monitores
    const monitors = [
        { name: 'Full HD (1920 x 1080 pixels)', width: 1920, height: 1080 },
        { name: 'Quad HD (2560 x 1440 pixels)', width: 2560, height: 1440 },
        { name: '4K Ultra HD (3840 x 2160 pixels)', width: 3840, height: 2160 },
        { name: 'Ultrawide (3440 x 1440 pixels)', width: 3440, height: 1440 },
        { name: '5K (5120 x 2880 pixels)', width: 5120, height: 2880 },
    ];

    monitors.forEach((device) => {
        it(`Layout se adapta a tamanhos de tela de ${device.name}`, () => {
            cy.viewport(device.width, device.height);
            cy.get('#login-button').should('be.visible');
            cy.screenshot(`layout_${device.name.toLowerCase().replace(/\s/g, '_')}`);
        });
    });

    //=================================================    Funções reutilizavéis    =================================================//

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
