/**
 * PRIMEIRA ETAPA
 *  ✅ PEGAR O ROOT
 *  CRIAR UM AFAZER
 *      ✅ FORM PARA ADICIONAR NOSSAS INFORMAÇõES DE AFAZER
 *      ✅ CRIAR FUNÇÃO QUE ADICIONA UM TODO
 *  ✅ LISTAR OS AFAZERES
 *      ✅ CRIAR UM ELEMENTO LISTA PARA LISTAR OS MEUS AFAZERES
 *      ✅ CRIAR FUNÇÃO QUE LISTA MEUS TODOS
 *  ✅ATUALIZAR UM AFAZER
 *  ✅ REMOVER UM AFAZER
 */

/**
 * 🦾 = CALLBACK 
 * 🦾 Filter
 * 🦾 Reduce
 * 🦾 Map
 * 🦾 Find
 * 🦾 Sort
 * Pop, Push
 * Shift, Unshift
 */

const root = document.getElementById("root");
let todoList = [];

function adicionarForm() {
	const formJS = document.createElement("form");
	const inputJS = document.createElement("input");
	const buttonJS = document.createElement("button");

	/* CUSTOMIZANDO ELEMENTOS */
    formJS.id = "adicionar"
	inputJS.placeholder = "Lavar roupa";
	buttonJS.innerText = "Adicionar ToDo";

    /* ADICIONANDO EVENTOS AO FORM */
    formJS.addEventListener("submit", function (e) {
        e.preventDefault()
        
        if (inputJS.value == null || inputJS.value == "") {
            return window.alert("Insira algum to-do!")
        }

        let novoTodo = {
            id: uuidv4(),
            text : inputJS.value
        };

        criarTodo(novoTodo);
        adicionarTodoNoUl(novoTodo)

        inputJS.value = "";
    })

	/* ADICIONANDO OS ELEMENTOS NO BODY DO HTML */
	formJS.appendChild(inputJS);
	formJS.appendChild(buttonJS);

	root.appendChild(formJS);
}

function adicionarFormAtualizacao(todo) {
	const formJS = document.createElement("form");
	const inputJS = document.createElement("input");
	const buttonJS = document.createElement("button");
    const formAdicionar = document.getElementById("adicionar");

	/* CUSTOMIZANDO ELEMENTOS */
    formJS.id = 'atualizar'
	inputJS.placeholder = todo.text;
    inputJS.value = todo.text;
	buttonJS.innerText = "Atualizar ToDo";
    buttonJS.id = todo.id

    /* ADICIONANDO EVENTOS AO FORM */
    formJS.addEventListener("submit", function (e) {
        e.preventDefault()
        
        if (inputJS.value == null || inputJS.value == "") {
            return window.alert("Insira algum texto para atualizar o seu to-do!")
        }

        const findTodoIndex = todoList.findIndex((item) => item.id == todo.id)

        todoList[findTodoIndex].text = inputJS.value;

        inputJS.value = "";

        atualizarLista(todoList, 'update')
    })

	/* ADICIONANDO OS ELEMENTOS NO BODY DO HTML */
	formJS.appendChild(inputJS);
	formJS.appendChild(buttonJS);

    formAdicionar.style.display = 'none';

	root.appendChild(formJS);
}

function adicionarLista () {
    const unorderedListJS = document.createElement("ul")
    unorderedListJS.id = "lista"
    /** 
     * A gente precisa criar um elemento <li> para cada posição do array
     * ele pega uma lista, e retorna uma outra lista de acordo com o que a gente passar
     */

    root.appendChild(unorderedListJS)
}

function criarTodo (todo) {
    todoList.push(todo)
}

function adicionarTodoNoUl (todo) {
    const ul = document.getElementById("lista");
    const li = document.createElement("li")
    const buttonEditar = criarBotaoEditar(todo);
    const buttonDeletar = criarBotaoDelete(todo);

    li.innerText = todo.text;

    li.appendChild(buttonEditar)
    li.appendChild(buttonDeletar)
    ul.appendChild(li)
}   

function criarBotaoDelete (item) {
    const button = document.createElement('button');
    
    button.innerText = "Deletar";
    button.id = item.id;
    button.addEventListener("click", function (e){    
        const newTodoList = todoList.filter((i) => i.id !== item.id)

        todoList = newTodoList;

        atualizarLista(newTodoList, 'delete')
    })

    return button   
}

function criarBotaoEditar (item) {
    const button = document.createElement('button'); 

    button.innerText = "Editar";
    button.id = item.id;
    button.addEventListener("click", function (e) {
        let findTodo = todoList.find((i) => i.id === item.id);
        
        adicionarFormAtualizacao(findTodo);
    })

    return button;
}


function atualizarLista (todoList, type) {
    const ul = document.getElementById("lista");
    ul.innerHTML = "";
  
    const newTodoListLi = todoList.map((item) => {
        const li = document.createElement("li");
        const buttonEditar = criarBotaoEditar(item);
        const buttonDeletar = criarBotaoDelete(item);      

        li.innerText = item.text;
        li.appendChild(buttonEditar)
        li.appendChild(buttonDeletar)

        return li;
    })

    newTodoListLi.forEach(element => {
        ul.appendChild(element)
    });

    switch(type){
        case 'delete':
            return;
        case 'update':
            return removeFormAtualizacao();
    }
}

function removeFormAtualizacao () {
    const formAdicionar = document.getElementById("adicionar");
    const formAtualizar = document.getElementById("atualizar");
    formAdicionar.style.display = 'flex';

    if (formAtualizar.parentNode) {
        formAtualizar.parentNode.removeChild(formAtualizar)
    }

    return 
}

adicionarForm();
adicionarLista();

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }