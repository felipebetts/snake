playArea = document.querySelector('.play')
const altura = playArea.clientHeight - 25
const largura = playArea.clientWidth - 25

xAleatorio = (larguraElemento = 0) => Math.random() * largura - larguraElemento 
yAleatorio = (alturaElemento = 0) => Math.random() * altura  - alturaElemento

getX = elemento => parseInt(elemento.style.left.split('px')[0])
setX = (x, elemento) => elemento.style.left = `${x}px`
getY = elemento => parseInt(elemento.style.top.split('px')[0]) 
setY = (y, elemento) => elemento.style.top = `${y}px`

function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Score() {
    this.score = -1
    this.elemento = novoElemento('div', 'score')
    this.progresso = () => {
        this.score++
        this.elemento.innerHTML = `${this.score}`
    }
}


function Fruta(x, y) {
    this.elemento = novoElemento('img', 'frutinha')
    this.elemento.src = './src/assets/imgs/frutinha.png'
    this.elemento.style.left = `${x}px`
    this.elemento.style.top = `${y}px`
}

function Cobra(tamanho) {
    for (i = 0; i < tamanho; i++) {
        this.elemento = novoElemento('span', 'parteSnake')
        playArea.appendChild(this.elemento)
        this.elemento.style.left = `${largura/2 + (25*i) - 25}px`
        this.elemento.style.top = `${altura/2}px`
    }
    
    const saiuDaTela = (elemento) => {
        if (getX(elemento) < 0) {
            setX(largura, elemento)
        }
        if (getX(elemento) > largura) {
            setX(0, elemento)
        }
        if (getY(elemento) < 0) {
            setY(altura, elemento)
        }
        if (getY(elemento) > altura) {
            setY(0, elemento)
        }
    }
    this.historico = 37
    
    this.movimentar = () => {
        this.quadrados = Array.from(document.querySelectorAll('.parteSnake'))
        let tamanhoCobra = this.quadrados.length
        deslocamento = 25
        let posicaoX = [] 
        let posicaoY = []
        for(let i = 0; i < tamanhoCobra; i++) {
            if(i == 0) {
                let q = this.quadrados[i]
                switch(this.historico) {
            
                    case 37: case 65: // esquerda
                        posicaoX.push(getX(q))
                        posicaoY.push(getY(q))
                        setX(getX(q)-deslocamento, q)
                        saiuDaTela(q)
                        break
                    case 38: case 87: // cima
                        posicaoX.push(getX(q))
                        posicaoY.push(getY(q))
                        setY(getY(q) - deslocamento, q)
                        saiuDaTela(q)
                        break
                    case 39: case 68: // direita
                        posicaoX.push(getX(q))
                        posicaoY.push(getY(q))
                        setX(getX(q) + deslocamento, q)
                        saiuDaTela(q)
                        break
                    case 40: case 83: // baixo
                        posicaoX.push(getX(q))
                        posicaoY.push(getY(q))
                        setY(getY(q) + deslocamento, q)
                        saiuDaTela(q)
                        break
                    }
                }
                if(i > 0 && i < tamanhoCobra){
                    posicaoX.push(getX(this.quadrados[i]))
                    posicaoY.push(getY(this.quadrados[i]))
                    this.quadrados[i].style.left = `${posicaoX[i-1]}px`
                    this.quadrados[i].style.top = `${posicaoY[i-1]}px`  
                }
            }
            posicaoXX = posicaoX
            posicaoYY = posicaoY
        }
        
        this.crescer = () => {
            this.elemento = novoElemento('span', 'parteSnake')
            playArea.appendChild(this.elemento)
            this.elemento.style.left = `${posicaoXX[posicaoXX.length-1]}px`
            this.elemento.style.top = `${posicaoYY[posicaoYY.length-1]}px`
        }
    }
    
    function colisao(A, B) {   // retornar true ou false !!
        const a = A.getBoundingClientRect() // essa funcao retorna o retangulo associado ao elemento A, (formato do elemento)
        const b = B.getBoundingClientRect()
    
        const horizontal = a.left + a.width - 1 > b.left && b.left + b.width > a.left
        const vertical = a.top + a.height - 1 > b.top && b.top + b.height > a.top
        return horizontal && vertical
    }
    
    function game() {
        let fruta = new Fruta(xAleatorio(), yAleatorio())
        const cobra = new Cobra(3)
        const score = new Score()
        
        playArea.appendChild(fruta.elemento)
        playArea.appendChild(score.elemento)
        score.progresso()

        var direcao = 37
        document.querySelector('body').addEventListener('keydown', e => {
            if(e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 65 && e.keyCode != 68 && e.keyCode != 83 && e.keyCode != 87 && e.keyCode != 40 ) {
                direcao = direcao
            }
            else {
                direcao = e.keyCode
            }
            // console.log(diferenca)
            cobra.historico = direcao
            // console.log(direcao)
        })


    const temporizador = setInterval(() => {
        
        cobra.movimentar()
        if (colisao(cobra.quadrados[0], fruta.elemento)) {
            console.log(colisao(cobra.quadrados[0], fruta.elemento))
            playArea.removeChild(fruta.elemento)
            score.progresso()
            fruta = new Fruta(xAleatorio(), yAleatorio())
            playArea.appendChild(fruta.elemento)
            console.log(cobra.quadrados.length)
            cobra.crescer()
        }
        bateuNaCauda = false
        for(j = 2; j < cobra.quadrados.length; j++) {
            if (colisao(cobra.quadrados[0], cobra.quadrados[j])){
                bateuNaCauda = true
                console.log('bateu')
                console.log(j)
            }
        }
        if (bateuNaCauda) {
            clearInterval(temporizador)
            cobra.crescer()
            const fimDeJogo = novoElemento('span', 'fimDoJogo')
            fimDeJogo.innerHTML = 'GAME<br>OVER'
            playArea.appendChild(fimDeJogo)
            // newGame()
        }
    }, 75)
}


function newGame() {
    const iniciar = novoElemento('span', 'novoJogo')
    iniciar.innerHTML = 'Press "enter" to start'
    playArea.appendChild(iniciar)
    document.querySelector('body').addEventListener('keydown', e => {
        // console.log(e.key == 'Enter')
        if (e.key == 'Enter') {
            playArea.removeChild(iniciar)
            console.log(typeof e.keyCode)
            // if(fimDeJogo) {
            //     playArea.removeChild(fimDeJogo)
            // }
            game()
            // return 0
        }
    })
}



newGame()

