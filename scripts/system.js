const grammarObject = {
    "cons": ["s","l","g","z","x"],
    "vow": ["a", "e", "i", "o", "u"],
    "ending": ["r#vow#x","#cons##vow#ggle", "#cons##vow#ddle","thr#vow#n"],
    "encyclopedia" : "<div class=\"entry\" style=\"color:hsl(#hue#,100%,50%);border-color:hsl(#hue#,100%,50%);\"><h2>#planet#</h2>#[hue:#hue#][planet:#planet#]entry#</div>",
    "entry" : ["<div>#[planet:#planet#]body#</div>"],
    "body" : ["#knownAs##belongsTo# #usedFor# #climate#", "#knownAs#this world is currently uninhabited. #climate#"],
    "knownAs": [
        "Also called by the name #alternateName.capitalize#, ",
        "Also known as #alternateName.capitalize#, ",
        "Also called #alternateName.capitalize#, ",
        "Referred to as #alternateName.capitalize# by its inhabitants, ",
        "Fondly nicknamed #alternateName.capitalize#, ",
    ],
    "alternateName": ["#cons##vow##ending#", "#vow##cons##vow##ending#", "#cons##vow##cons##vow##ending#", "#cons##vow##cons##vow#", "#vow##cons##vow##cons#"],
    "belongsTo": [
        "this world is inhabited by #member.s# of the #organization#.",
        "this world falls under the sway of the #organization#.",
        "this world is currently controlled by #member.s# of the #organization#.",
        "this world is claimed by the #organization#.",
    ],
    "member": ["citizen","member","agent","representative","employee","drone"],
    "organization":[
        "#orgAdj# #orgType# of #alternateName.capitalize#",
        "#alternateName.capitalize# #orgType#"
    ],
    "orgAdj": ["Confederated", "Incorporated", "United", "Integrated", "Assimilated"],
    "orgType": ["Corporation", "Federation", "Empire", "Union", "Collective", "Syndicate", "Company", "Organization"],
    "climate": [
        "The climate is characterized by #weatherPhrase# and #weatherPhrase#.",
        "This planet experiences #weatherPhrase# most of the year, but undergoes brief periods of #weatherPhrase#.",
        "Though weather at the equator tends toward #weatherPhrase#, the regions near the poles experience #weatherPhrase#.",
        "This #temp# world experiences a wide variety of weather phenomena, from #weatherPhrase#, to #weatherPhrase#, to #weatherPhrase#.",
        "This #temp# planet frequently features #weatherPhrase#.",
        "Known for its #weatherPhrase#, this #temp# planet none-the-less does experience some #weatherPhrase#.",
        "If you dislike #weatherPhrase#, stay away from this planet.",
        "If you enjoy #weatherPhrase#, this is the planet for you."
    ],
    "weatherPhrase": [
        "#nasty# #weather#",
        "#degree# #nasty# #weather#",
        "#nice# #weather#",
        "#degree# #nice# #weather#",
        "#temp# #weather#"
    ],
    "weather": ["rain","sleet","snow","hail","wind","eruptions","quakes"],
    "nasty":["violent","caustic","treacherous","deadly","toxic","radioactive"],
    "nice":["benign","harmless","pleasant","inoffensive","gentle"],
    "degree":["largely","mostly","occasionally","slightly","mildly"],
    "temp": ["freezing","boiling","warm","temperate","cold","frigid","sweltering"],
    "usedFor": [
        "They use it primarily as a colony world.",
        "It serves the function of a prison.",
        "Its use is mainly industrial.",
        "It is mined for its rich deposits of #mineral#.",
        "It is their primary base of operations.",
        "It is the headquarters of #organization#.",
        "It is the corporate headquarters of #chainBusiness# chain."
    ],
    "mineral":["#vow##cons##vow##cons#ite","#cons##vow##cons#ium","#vow##cons#ium"],
    "chainBusiness":[
        "#alternateName.capitalize#'s #businessType.capitalize#",
        "the #alternateName.capitalize# #businessType.capitalize#"
    ],
    "businessType":["shop", "diner", "grille", "bank", "salon", "restaurant", "consultancy", "firm", "cafe", "#businessType.capitalize# and #businessType.capitalize#"]
};
let grammar = tracery.createGrammar(grammarObject);
grammar.addModifiers(baseEngModifiers);


let queryString = new URLSearchParams(location.search);
let systemName = queryString.get("system").replace("_", " ");

let thisRNG = new Math.seedrandom(systemName);
let planets = [];
let sunSize = thisRNG() * 50 + 60;

tracery.setRng(thisRNG);

for (let i = Math.floor(thisRNG() * 9) + 1; i > 0; i--) {
    let newPlanet = {
        orbitRadius: 30 * i + thisRNG() * 10 + sunSize * .5,
        angle: thisRNG() * 360,
        size: thisRNG() * 20 + 10,
        speed: (1 / (i * 5)),
        hue:  Math.floor(thisRNG() * 360)
    }

    planets.push(newPlanet);

    document.getElementById("divPlanetInfo").innerHTML =
        grammar.flatten("#[hue:" + newPlanet.hue + "][planet:" + systemName + " " + i + "]encyclopedia#")
        + document.getElementById("divPlanetInfo").innerHTML;
}

document.getElementById("h1SystemName").innerText = "The " + systemName + " System";

function setup() {
    let cnv = createCanvas(640, 640);
    cnv.parent("divSystemMap");

    colorMode(HSB,360,100,100);
}

function draw() {
    translate(320, 320);
    background("black");

    noStroke();
    fill("white");
    circle(0,0,sunSize);

    for (let planet of planets) {
        stroke(planet.hue, 100, 100);
        strokeWeight(2);
        noFill();
        circle(0,0,planet.orbitRadius * 2);

        noStroke();
        fill(planet.hue, 100, 100);
        circle(
            sin(radians(planet.angle)) * planet.orbitRadius,
            cos(radians(planet.angle)) * planet.orbitRadius,
            planet.size
        );
        planet.angle = (planet.angle + planet.speed) % 360;
    }
}