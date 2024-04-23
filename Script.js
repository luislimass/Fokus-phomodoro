const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco ')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startpauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioplay = new Audio ('/sons/play.wav')
const audiopause = new Audio ('/sons/pause.mp3')
const audioend = new Audio ('/sons/beep.mp3')
const iniciaroupausarBt = document.querySelector ('#start-pause span')


let intervaloid = null
let tempodecorridoemsegundos = 5

musica.loop = true
musicaFocoInput.addEventListener('change', () =>{
   if (musica.paused){
    musica.play()
   }
   else {
    musica.pause()
   }
})

focoBt.addEventListener('click', () =>{
    alterarContexto('foco')
   focoBt.classList.add ('active')

})
curtoBt.addEventListener('click', () =>{
   alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})
longoBt.addEventListener('click', () =>{
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    
})
function alterarContexto(contexto){
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade, <br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
            case "descanso-curto":
                titulo.innerHTML= `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa.</strong>`
            break;
            case "descanso-longo":
                titulo.innerHTML = `
                    hora de voltar pra superficie,<br><strong class="app__title-strong">faça uma pausa longa.</strong>
                    `
                    default:
                        break;
    }

} 

const contagemregressiva = () =>{
    if(tempodecorridoemsegundos<=0){
        audioend.play()
        zerar()
        alert ('tempo finalizado')
        return 

    } 
    tempodecorridoemsegundos -=1
    console.log('temporizador: ' + tempodecorridoemsegundos)
}

startpauseBt.addEventListener('click', iniciaroupausar )


function iniciaroupausar() {
    if (intervaloid) {
        clearInterval(intervaloid); 
        intervaloid = null;
        audiopause.play();
        iniciaroupausarBt.textContent = "Iniciar"; // Corrigido o nome da variável.
    
    } else {
        intervaloid = setInterval(contagemregressiva, 1000);
        audioplay.play();
        iniciaroupausarBt.textContent = "Pausar"; // Corrigido o nome da variável.
    }
}

function zerar() {
    clearInterval(intervaloid);
    iniciaroupausarBt.textContent = "Começar"; // Corrigido o nome da variável.
    intervaloid = null;
}
