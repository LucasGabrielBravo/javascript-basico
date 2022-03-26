//Elemetos
var lista = document.querySelector("#app ul");      //Seleciona um elemento ul dentro de um elemento de id="app"
var input = document.querySelector("#app input");
var botao = document.querySelector("#app button");

//Esse primeiro comando fara mais sentido quando chegar ao final do arquivo
//JSON.parse = Converte um JSON em Array/String
//localStorage.getItem("lista") = Seleciona o arquivo "lista" que estava salvo
// || [] => Caso não haja arquivo, carrega um vetor vazio para não dar erro
var itens = JSON.parse(localStorage.getItem("lista")) || [];

//Funcao para criar e atualizar a lista
function criarLista(){
    lista.innerHTML = "";   //Limpa todo o conteudo que esta dentro de lista para atualiza-la
    
    for(item of itens){ //Foreach do javascript
        //indexOf() Procura dentro do array o conteudo que foi passado no parametro e retorna o indece do resultado
        var pos = itens.indexOf(item);
        
        var linha = document.createElement("li");   //Cria um elemento li => <li></li>
        var text = document.createTextNode(item);   //Cria um elemento de texto com o conteudo do vetor de itens <Texto que estava no array>

        var excluir = document.createElement("a");              //Cria o "botao" de excluir <a></a>
        excluir.setAttribute("href", "#");                      //Atribui um link ao excluir; Um elemento <a> precisa de um href definido
        //Adiciona o evento ao elemento => abaixo criaremos a funca removerItem; Note que 'pos' contem o valor do indice desse item na lista
        excluir.setAttribute("onclick", "removerItem("+ pos +")");  
        var excluirText = document.createTextNode("Excluir");   //Texto do botao Excluir
        excluir.appendChild(excluirText);                       //Add o texto ao elemento
        //var excluir = <a href="#" onclick="removerItem(?)">Excluir</a> => ? é igual ao pos que é igual ao indice do atual item do foreach

        linha.appendChild(text);                    //Adiciona o elemento text a linha
        linha.appendChild(excluir);                 //Adiciona o Botao de excluir a linha
        lista.appendChild(linha);                   //Adiciona a linha a lista
        //resultado:
        /*
        <ul>
            <li>Texto que estava no array<a href="#" onclick="removerItem(?)">Excluir</a></li>            
        </ul>
        */
    }
}

//Funcao para add um novo item a lista
function addItem(){
    item = input.value;     //Armazena o conteudo que estava no input
    if(item != ""){ //Verifica se o input estava vazio, caso seja diferente de vazio:
        itens.push(item);   //Adiciona um item ao final do array
        input.value = "";   //Limpa o input
        criarLista();       //Atualiza a lista com o conteudo
    }
    salvar();               //Salva a lista no browser
}

//Remove um item da lista
function removerItem(pos){
    itens.splice(pos, 1);   //.splice() => Remove itens de um array; pos = posicao inicial; 1 = Quantidade de itens q devem ser removidos
    criarLista();           //Atualiza a lista           
    salvar();               //Salva a lista
}

//Salva a lista
function salvar(){
    //localStorage = variavel global para manipular o storage do navegador
    //.setItem = "Cria" um novo arquivo para ser salvo localmente; .setItem("nomeParaRefenciaFutura", "conteudoArmazenado")
    //"lista" = nome que sera usado como refencia
    //JSON.stringify = converte um array em JSON
    localStorage.setItem("lista", JSON.stringify(itens));
}

botao.onclick = addItem;    //Add a funcao addItem no evento onclick do elemento botao

criarLista();   //Executa a funcao para exibir a lista ao carregar a pagina