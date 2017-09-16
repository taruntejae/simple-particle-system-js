//Initialise required variables
let canvas = document.getElementById('my_canvas')
let context = canvas.getContext('2d')
let height = canvas.getAttribute('height')
let width = canvas.getAttribute('width')
let nOfParticles = 700
let particles = []

//Function to generate a random colour
let getColour = ()=>{
    let h, s, l, a
    h = Math.ceil(Math.random() * 256)
    s = Math.ceil(Math.random() * 100) + '%'
    l = Math.ceil(Math.random() * 100) + '%'
    a = Math.random() * 1
    return 'hsla(' + h + ',' + s + ',' + l + ',' + a + ')'
}

//Actual particle object
function Particle() {
    this.x = Math.ceil(Math.random() * (width))
    this.y = Math.ceil(Math.random() * (height))
    this.vx = 5* Math.random() - 2
    this.vy = 5* Math.random() - 2
    this.radius = 4
    this.colour = getColour()

    //Draw a cirlce with random positions
    this.draw = function () {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        context.fillStyle = this.colour
        context.fill()
    }
    //Update the circle positions
    this.update = function () {
        this.x += this.vx
        this.y += this.vy

        //Particles to bounce when they hit the walls
        if (this.x - (this.radius) < 0 || this.x + (this.radius) > canvas.width) {
            this.vx = -this.vx
        }

        if (this.y - (this.radius) < 0 || this.y + (this.radius) > canvas.height) {
            this.vy = -this.vy
        }
    }
}


//Loop function
let process = ()=>{
    context.clearRect(0, 0, width, height)
    
        for (var i = 0; i < nOfParticles; i++) {
            particles[i].update()
            particles[i].draw()
        }
        requestAnimationFrame(process)
}

for (var i = 0; i < nOfParticles; i++) {
    particles.push(new Particle())
}

//Start the particle system
process()