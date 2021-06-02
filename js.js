var offset = 0
const key_public = "a89f63fea16b733bcac2e2125765d51f";
const time = "1622293710018"    
const md5 = "0c9966f88c8d4ef45d6a45a02c7db1d4"
var limite = 100

//Acima é usado o CONST. O Const serve quando o desenvolvedor quer armazenar uma informação
//que nao irá mudar, ou seja, ela é imutável.

//Acima armazenei em const a minha chave publica, o time ("sequencia de numeros") e o md5.

async function marvel(){

    const container = document.querySelector('#marvel-row')
    let contentHTML = '';

    //O container recebe o valor do id marvel-row (esse id pertence ao html, é uma padronização de div).

    var filtrar_nome = document.getElementById('buscar').value;
    var filtrar_replace = filtrar_nome.replace(' ','%20')

    if(filtrar_replace === "" || filtrar_replace == null && filtrar_replace.length == 0){
    const api = `https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=${limite}&ts=${time}&apikey=${key_public}&hash=${md5}`
    const marvel_api = await fetch(api);
    const marvel_json = await marvel_api.json();

    // O if usado acima significa que irei prosseguir com a api determinada [Sem Filtro] apenas SE o filtro não tenha sido acionado pelo usuário.

    //O const API é a api que vai ser consumida, nela faço a concatenação dos consts (time,key_public e md5)

    // Aqui irei fazer uma solicitação na api e irei esperar a resposta antes de prosseguir.
    // Quando me responderem irei armazenar na const (marvel_api) e depois irei transformar em um json
    // passando o valor em json para marvel_json

    Object.values(marvel_json.data.results).forEach(heroi =>{

        let Heroi_url = heroi.urls[0].url

        contentHTML += `
            <div class="col-md-4">
                <a href="${Heroi_url}" target="_blank">
                    <img src="${heroi.thumbnail.path}.${heroi.thumbnail.extension}" alt="${heroi.name}" class="imagem">
                </a>
                <h4 class="titulo">${heroi.name}</h4>
                <a href="${Heroi_url}" target="_blank"><button class="botao" onclick="">Características</button></a>
            </div>`
    });

    // Acima é usado as "pastas" dentro do json
    // É acessado a primeiro pasta DATA e depois RESULTS (<- essa fica dentro da DATA)
    // Criei um let chamado Heroi_url e irei armazenar o valor entrando nas pastas URLS -> [0] -> valor(URL) [<- Aqui pego o que é necessário ]
    // O uso do contentHTML tem como função armazenar uma padronização (nesse caso em HTML).

    // Cada vez que eu receber uma resposta da api o contentHTML irá adicionar mais uma padronização em seu armazenamento.
    // a cada repetição ele armazena JUNTO com os outros, ou seja, ele não perde o armazenamento anterior.
    // contentHTML = contentHTML + (padronização HTML);

    container.innerHTML = contentHTML
    // Container (que é uma padronização dentro do HTML com o id = marvel-row) cria a cada repetição
    // uma nova padronização no HTML que contém divs que possuem imagem,nome e botão.
    // A cada resposta que recebemos o sistema repete as padronizações do HTML

    if(offset > 0){
        container.innerHTML = contentHTML+= `
           <div class="col-md-4">
            <img class="voltar_page" src="https://www.materialui.co/materialIcons/navigation/arrow_back_grey_192x192.png" onclick="voltar()" id="btnvoltar" alt="voltar"/>
            </a>
            <h4 class="descricao">Voltar pagina ...</h4>
           </div>`
    }

    //Nesse caso o if é ultilizado porque se caso a variável OFFSET for maior que 0 significa que o usuário não está na primeira pagina de personagens
    //Possibilitando que ele possa voltar a pagina anterior (com o botão que é mostrado por contentHTML).
    //Lembrando que, se caso o offset seja 0 o botão de voltar pagina não irá ficar disponível ao usuário.

    if(offset < 1400){
     container.innerHTML = contentHTML+= `
        <div class="col-md-4">
         <img class="carregar_page" src="https://www.materialui.co/materialIcons/navigation/arrow_forward_grey_192x192.png" onclick="carregar()" id="btncarregar" alt="carregar"/>
         </a>
         <h4 class="descricao">Carregar mais ...</h4>
        </div>`
    }

    // Aqui é outra condição. se caso o offset seja menor que 1400 quer dizer que o usuario não chegou na ultima pagina disponível dos personagens,
    // possibilitando avançar de pagina com o botão de prosseguir.
    // Caso o valor de offset seja igual ou superior a 1400 significa que o usuário está na ultima pagina de personagens, então o botão de
    // prosseguir para proxima pagina é bloqueado. 

}else{

    // Else é usado quando a primeira condição falhou, ou seja, o usuário está solicitando um filtro personalizado.

    const api = `https://gateway.marvel.com/v1/public/characters?offset=0&nameStartsWith=${filtrar_replace}&limit=${limite}&ts=${time}&apikey=${key_public}&hash=${md5}`
    const marvel_api = await fetch(api);
    const marvel_json = await marvel_api.json();

    Object.values(marvel_json.data.results).forEach(heroi =>{

      let Heroi_url = heroi.urls[0].url

      contentHTML += `
        <div class="col-md-4">
            <a href="${Heroi_url}" target="_blank">
                <img src="${heroi.thumbnail.path}.${heroi.thumbnail.extension}" alt="${heroi.name}" class="imagem">
            </a>
            <h4 class="titulo">${heroi.name}</h4>
            <a href="${Heroi_url}" target="_blank"><button class="botao">Características</button></a>
        </div>`
    });

  container.innerHTML = contentHTML
  
}
}

function carregar(){
    offset += limite
    marvel();
    window.location.href='#home';
}
// Função carregar tem objetivo de recarregar a página com os novos dados.

function voltar(){
    offset -= limite
    marvel();
    window.location.href='#home';
}
// Função voltar tem objetivo de voltar a pagina anterior e recarregar os dados anteriores.

function audio(){
var audio = new Audio('Music/music_avengers.mp3');
audio.play();
}
// Função audio tem como função iniciar o audio mp3

audio();
    // Execução da função AUDIO
marvel();
    // Execução da função MARVEL
