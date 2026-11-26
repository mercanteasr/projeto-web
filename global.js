// página admin: cadastro de usuários salvos no local storage
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-admin");

    // se não estiver na página admin, não faz nada
    if (!form) {
        return;
    }

    const campoNome = document.getElementById("nome-admin");
    const campoEmail = document.getElementById("email-admin");
    const btnLimpar = document.getElementById("btn-limpar");
    const btnExcluirTodos = document.getElementById("btn-excluir-todos");
    const campoPesquisa = document.getElementById("pesquisa");
    const lista = document.getElementById("lista-usuarios");

    // todos os usuários ficam numa única chave, como um array de objetos em JSON
    const CHAVE = "usuarios_corrilet";

    function lerUsuarios() {
        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    }

    function salvarUsuarios(usuarios) {
        localStorage.setItem(CHAVE, JSON.stringify(usuarios));
    }

    // monta a lista <ul> com o que está salvo, aplicando a pesquisa
    function mostrarLista() {
        const termo = campoPesquisa.value.trim().toLowerCase();
        const usuarios = lerUsuarios();

        lista.innerHTML = "";

        const filtrados = usuarios.filter(function (usuario) {
            return usuario.nome.toLowerCase().includes(termo) ||
                usuario.email.toLowerCase().includes(termo);
        });

        if (filtrados.length === 0) {
            const vazio = document.createElement("li");
            vazio.className = "vazio";
            vazio.textContent = usuarios.length === 0 ? "Nenhum usuário cadastrado." : "Nenhum usuário encontrado.";
            lista.appendChild(vazio);
            return;
        }

        filtrados.forEach(function (usuario) {
            const li = document.createElement("li");
            const texto = document.createElement("span");
            const btnExcluir = document.createElement("button");

            texto.textContent = usuario.data + " - " + usuario.nome + " - " + usuario.email;

            btnExcluir.type = "button";
            btnExcluir.className = "btn-excluir";
            btnExcluir.textContent = "Excluir";
            btnExcluir.dataset.id = usuario.id;

            li.appendChild(texto);
            li.appendChild(btnExcluir);
            lista.appendChild(li);
        });
    }

    // cadastrar: adiciona na lista e no local storage
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const usuarios = lerUsuarios();
        usuarios.push({
            id: Date.now(),
            data: new Date().toLocaleString("pt-BR"),
            nome: campoNome.value.trim(),
            email: campoEmail.value.trim()
        });

        salvarUsuarios(usuarios);
        form.reset();
        mostrarLista();
    });

    // limpar só os campos do formulário
    btnLimpar.addEventListener("click", function () {
        form.reset();
        campoNome.focus();
    });

    // excluir um item: o botão é criado pelo js, então o clique é tratado na lista
    lista.addEventListener("click", function (evento) {
        if (evento.target.tagName !== "BUTTON") {
            return;
        }

        if (confirm("Deseja excluir este usuário?")) {
            const id = Number(evento.target.dataset.id);
            const restantes = lerUsuarios().filter(function (usuario) {
                return usuario.id !== id;
            });
            salvarUsuarios(restantes);
            mostrarLista();
        }
    });

    // excluir todos: limpa a lista e remove a chave do local storage
    btnExcluirTodos.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir todos os usuários?")) {
            localStorage.removeItem(CHAVE);
            mostrarLista();
        }
    });

    // pesquisa em tempo real, a cada letra digitada
    campoPesquisa.addEventListener("input", mostrarLista);

    mostrarLista();
});

// página principal: carrinho fictício salvo no local storage
document.addEventListener("DOMContentLoaded", function () {
    const modalCarrinho = document.getElementById("modal-carrinho");

    // se não estiver na página principal, não faz nada
    if (!modalCarrinho) {
        return;
    }

    const lista = document.getElementById("lista-carrinho");
    const qtd = document.getElementById("qtd-carrinho");
    const total = document.getElementById("total-carrinho");
    const CHAVE = "carrinho_corrilet";

    function lerCarrinho() {
        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    }

    function salvarCarrinho(itens) {
        localStorage.setItem(CHAVE, JSON.stringify(itens));
    }

    function formatarPreco(valor) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    // atualiza a quantidade no ícone e a lista dentro do pop-up
    function mostrarCarrinho() {
        const itens = lerCarrinho();
        let soma = 0;

        qtd.textContent = itens.length;
        lista.innerHTML = "";

        if (itens.length === 0) {
            const vazio = document.createElement("li");
            vazio.className = "vazio";
            vazio.textContent = "Seu carrinho está vazio.";
            lista.appendChild(vazio);
        }

        itens.forEach(function (item) {
            const li = document.createElement("li");
            const texto = document.createElement("span");
            const btnRemover = document.createElement("button");

            texto.textContent = item.nome + " (" + item.opcao + ") - " + formatarPreco(item.preco);

            btnRemover.type = "button";
            btnRemover.className = "btn-excluir";
            btnRemover.textContent = "Remover";
            btnRemover.dataset.id = item.id;

            li.appendChild(texto);
            li.appendChild(btnRemover);
            lista.appendChild(li);
            soma += item.preco;
        });

        total.textContent = formatarPreco(soma);
    }

    // cada botão pega o nome, o preço e o tamanho/cor do próprio produto
    const botoes = document.querySelectorAll(".btn-carrinho");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const produto = botao.closest(".produto");
            const nome = produto.querySelector(".info-modal h2").textContent.trim();
            const precoTexto = produto.querySelector(".preço").textContent;
            const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));
            const select = produto.querySelector("select");

            const itens = lerCarrinho();
            itens.push({
                id: Date.now(),
                nome: nome,
                preco: preco,
                opcao: select ? select.value : "tamanho único"
            });
            salvarCarrinho(itens);
            mostrarCarrinho();

            botao.textContent = "Adicionado!";
            setTimeout(function () {
                botao.textContent = "Adicionar ao carrinho";
            }, 1200);
        });
    });

    document.getElementById("btn-abrir-carrinho").addEventListener("click", function () {
        mostrarCarrinho();
        modalCarrinho.showModal();
    });

    // remover um item: o botão é criado pelo js, então o clique é tratado na lista
    lista.addEventListener("click", function (evento) {
        if (evento.target.tagName !== "BUTTON") {
            return;
        }

        const id = Number(evento.target.dataset.id);
        const restantes = lerCarrinho().filter(function (item) {
            return item.id !== id;
        });
        salvarCarrinho(restantes);
        mostrarCarrinho();
    });

    document.getElementById("btn-esvaziar").addEventListener("click", function () {
        localStorage.removeItem(CHAVE);
        mostrarCarrinho();
    });

    mostrarCarrinho();
});
