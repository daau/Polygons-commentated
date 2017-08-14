// The 'touchmove' event is triggered when a user tries to scroll on a mobile device.
// The event listener below prevents the script from constantly redrawing the polygon series
// if a user tries to scroll on a mobile device.
document.addEventListener('touchmove', function (e) {
    e.preventDefault()
})
var c = document.getElementsByTagName('canvas')[0], // Obtain the canvas DOM element
    x = c.getContext('2d'), // Get a 2D drawing context from the canvas element
    pr = window.devicePixelRatio || 1, // Used for high resolution device scaling
    w = window.innerWidth,
    h = window.innerHeight,
    f = 90, // Scaling factor, higher = larger polygons
    q,
    m = Math,
    r = 0, // Seed value for generating and keeping track of the colors of the polygons
    u = m.PI*2,
    v = m.cos,
    z = m.random
c.width = w*pr
c.height = h*pr
x.scale(pr, pr)
x.globalAlpha = 0.6
function i(){
    // Clear any previously drawn polygons
    x.clearRect(0,0,w,h)
    
    // The intiial two starting points of the polygon series.
    // Starts from the left, and somewhere near the bottom- middle
    // of the canvas.
    q=[{
        x: 0,
        y: h*.7+f
    },
    {   
        x: 0,
        y: h*.7-f
    }]

    // Keep drawing polygons until the series reaches the right side of the canvas
    while(q[1].x<w+f) d(q[0], q[1])
}

// Draw polygons
function d(i,j){
    // I and J are first two points of a polygon.
    // Draw a line connecting the first two points.
    x.beginPath()
    x.moveTo(i.x, i.y) 
    x.lineTo(j.x, j.y)

    // Generate a new random coordinate
    var k = j.x + (z()*2-0.25)*f,
        n = y(j.y)

    // Draw a line to new coordinate
    x.lineTo(k, n)

    // Close the resulting 3 sided polygon
    x.closePath()

    r-=u/-50 // Slightly change the previous hue
    // Generate new hue
    x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
    x.fill() // Fill the triangle with the generated hue

    // The two latest points in the series serve as the starting points for the
    // next polygon to be generated.
    q[0] = q[1]
    q[1] = {x:k,y:n}
}

// Generate a new coordinate
function y(p){
    var t = p + (z()*2-1.1)*f
    return (t>h||t<0) ? y(p) : t
}

// Generate a new polygon series when the user clicks or taps the document
document.onclick = i
document.ontouchstart = i
i()