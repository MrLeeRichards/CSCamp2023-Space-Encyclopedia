const nameGrammarObject = {
    "name" : ["#first##cons##vow##end#","#additional# #first##cons##vow##end#", "#first##cons##vow##end# #additional#"],
    "first": ["D#vow#", "Epi", "Th#vow#", "Peri", "M#vow#"],
    "cons": ["s","r","d","g","l"],
    "vow": ["a","e","i","o","u"],
    "end": ["x#vow#n", "lon", "lipse", "thr#vow#x"],
    "additional":["Proxima", "Ultima", "Rex", "Regis", "Crux", "Alpha", "Beta", "Gamma", "Delta", "Omega"]
};

let nameGrammar = tracery.createGrammar(nameGrammarObject);
nameGrammar.addModifiers(baseEngModifiers);

let currentStarName = "";
let sectionX = 0;
let sectionY = 0;

function setup() {
    let cnv = createCanvas(640, 640)
    cnv.parent("divStarMap");
    noiseSeed(5);
    noStroke();

    textSize(15);
    textFont("Helvetica");
}

function draw() {
    background(0);

    const starAtCoords = (x,y) => noise(x,y,2) > .5;

    for (let x = 0; x < width / 20; x++) {
        for (let y = 0; y < height / 20; y++) {
            if (starAtCoords(x,y)) {
                fill(
                    noise(x,y,0) * 155 + 100,
                    min(noise(x,y,0),noise(x,y,1)) * 155 + 100,
                    noise(x,y,1) * 155 + 100
                );
    
                circle(
                    x * 20 + noise(x,y,3) * 20,
                    y * 20 + noise(x,y,4) * 20,
                    noise(x,y,40) * 15
                );
            }
        }
    }

    if (
        sectionX != Math.floor(mouseX / 20) ||
        sectionY != Math.floor(mouseY / 20)
    ) {
        sectionX = Math.floor(mouseX / 20);
        sectionY = Math.floor(mouseY / 20);
        if (starAtCoords(sectionX,sectionY)) {
            currentStarName = getName(sectionX,sectionY);
        } else {
            currentStarName = "";
        }
    }

    if (starAtCoords(sectionX,sectionY)) {
        noFill();
        stroke("cyan");
        strokeWeight(2);
        circle(
            sectionX * 20 + noise(sectionX,sectionY,3) * 20,
            sectionY * 20 + noise(sectionX,sectionY,4) * 20,
            15
        );

        stroke("black");
        fill("cyan");
        text(
            currentStarName,
            sectionX * 20 + noise(sectionX,sectionY,3) * 20 + 10,
            sectionY * 20 + noise(sectionX,sectionY,4) * 20 - 5
        );
    }
}

function mousePressed() {
    if (currentStarName) {
        window.location.href = "/system.html?system=" + currentStarName.replace(" ", "_");
    }
}

function getName(x, y) {
    tracery.setRng(new Math.seedrandom("x:"+ x + " y:" + y));

    return nameGrammar.flatten("#name#");
}