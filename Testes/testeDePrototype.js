function Posicao() {
    // this.getX = () => parseInt(this.style.left.split('px')[0])
    // this.setX = (x) => this.style.left = `${x}px`
    // this.getY = () => parseInt(this.style.top.split('px')[0]) 
    // this.setY = (y) => this.style.top = `${y}px`
    this.a = 13

}

function Fruta() {
    // this.elemento = novoElemento('img', 'frutinha')
    // this.elemento.src = './src/assets/imgs/frutinha.png'
    
    this.__proto__ = new Posicao()

    // this.elemento.style.left = `${x}px`
    // this.elemento.style.top = `${y}px`
}

const fruta = new Fruta()
console.log(fruta.a)