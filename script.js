/**
 * PRIMEIRA ETAPA
 *  ✅ PEGAR O ROOT
 *  CRIAR UM AFAZER
 *      ✅ FORM PARA ADICIONAR NOSSAS INFORMAÇõES DE AFAZER
 *      ✅ CRIAR FUNÇÃO QUE ADICIONA UM TODO
 *  ✅ LISTAR OS AFAZERES
 *      ✅ CRIAR UM ELEMENTO LISTA PARA LISTAR OS MEUS AFAZERES
 *      ✅ CRIAR FUNÇÃO QUE LISTA MEUS TODOS
 *  ATUALIZAR UM AFAZER
 *  REMOVER UM AFAZER
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
	inputJS.placeholder = "Lavar roupa";
	buttonJS.innerText = "Adicionar ToDo";

    /* ADICIONANDO EVENTOS AO FORM */
    formJS.addEventListener("submit", function (e) {
        e.preventDefault()
        criarTodo(inputJS.value);

        adicionarTodoNoUl(inputJS.value)
    })

	/* ADICIONANDO OS ELEMENTOS NO BODY DO HTML */
	formJS.appendChild(inputJS);
	formJS.appendChild(buttonJS);

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
    
    li.innerText = todo;

    ul.appendChild(li)
}   

adicionarForm();
adicionarLista();
