//This is the canvas on which the use moves the mouse to set the frequency/amplitude

var hoverCanvas = document.getElementById("hoverCanvas");
var finfo = document.getElementById("finfo");
var ainfo = document.getElementById("ainfo");

//"ac" is the audio context of the window "inside which" the sounds will be created, processed and delivered 
//to the destination ( - > sound card - > output)

var ac = new (window.AudioContext || window.webkitAudioContext)();

//Variables which will be used to set frequency and amplitude

var lastMove = 0;
var userInputAmplitude = 0.1;
var amplitude = (Math.exp(userInputAmplitude) -1)/(Math.exp(1) - 1);
var frequency = 440;

function play(event) {

if(Date.now() - lastMove > 300) {

frequency = (600 - event.offsetY)/200;
frequency = Math.pow(2,(frequency))*65.41;

userInputAmplitude = event.offsetX/500;
amplitude = (Math.exp(userInputAmplitude) -1)/(Math.exp(1) - 1);

if(typeof oscillator != "undefined") {
oscillator.stop(ac.currentTime + 0.01);
}
if (typeof osc2 != "undefined") {
osc2.stop(ac.currentTime + 0.01);
}
if (typeof osc1 != "undefined") {
osc1.stop(ac.currentTime + 0.01);
}

oscillator = ac.createOscillator();
osc1 = ac.createOscillator();
osc2 = ac.createOscillator();

oscillator.type = 'triangle';
osc1.type = 'triangle';
osc2.type = 'triangle';

oscillator.frequency.value = frequency;
osc1.frequency.value = frequency +2;
osc2.frequency.value = frequency - 2;

gainNode = ac.createGain();
smallgainNode = ac.createGain()

oscillator.connect(gainNode);
osc1.connect(smallgainNode);
osc2.connect(smallgainNode);

gainNode.gain.value = amplitude;
smallgainNode.gain.value = amplitude/4;

gainNode.connect(ac.destination);
smallgainNode.connect(ac.destination);

oscillator.start(ac.currentTime + 0);
oscillator.stop(ac.currentTime + 0.8);
osc1.start(ac.currentTime + 0);
osc1.stop(ac.currentTime + 0.8);
osc2.start(ac.currentTime + 0);
osc2.stop(ac.currentTime + 0.8);

if(frequency < 160) {
harmonic(12,3);
harmonic(24,5);
harmonic(36,7);
} else {
harmonic(12,5);
harmonic(24,7);
}

lastMove = Date.now();

finfo.innerHTML = "FREQUENCY:" + frequency;
ainfo.innerHTML = "AMPLITUDE:" + amplitude;
} 

}



hoverCanvas.addEventListener('mousemove', play);

//This is the little "Keyboard" we shall use for our theremin, I simply bind a listener to the document, it listens for
//key pressed and depending on the key pressed it activates an oscillator q = 81; w = 87; e = 69; r = 82;

$(document).bind('keydown',function(e){
    if(e.keyCode == 81) {
        alterNote(-9);
    }
    if(e.keyCode == 87) {
        alterNote(-7);
    }
    if(e.keyCode == 69) {
        alterNote(-5);
    }
    if(e.keyCode == 82) {
        alterNote(-3);
    }
    if(e.keyCode == 84) {
        alterNote(0);
    }
    if(e.keyCode == 89) {
        alterNote(3);
    }
    if(e.keyCode == 85) {
        alterNote(5);
    }
    if(e.keyCode == 73) {
        alterNote(7);
    }
    if(e.keyCode == 79) {
        alterNote(9);
    }
});

//Functions that play those "Keyboard notes"

function alterNote(n) {
	var lowerNoteFrequency = frequency*Math.pow(2, (n/12));	
	var lowerOscillator = ac.createOscillator();


	var lowerGainNode = ac.createGain();

	
	
    lowerOscillator.type = 'triangle';


	lowerGainNode.gain.value = amplitude;
	lowerOscillator.frequency.value = lowerNoteFrequency;

    lowerOscillator.connect(gainNode);
    lowerGainNode.connect(ac.destination);

	lowerOscillator.start(ac.currentTime + 0);
	lowerOscillator.stop(ac.currentTime + 0.8);
    if(frequency < 160) {
    harmonic(12,3);
    harmonic(24,5);
    harmonic(36,7);
} else {
harmonic(12,5);
harmonic(24,7);
}

}


function harmonic(n, m) {
    var lowerNoteFrequency = frequency*Math.pow(2, (n/12)); 
    var lowerOscillator = ac.createOscillator();


    var lowerGainNode = ac.createGain();

    
    
    lowerOscillator.type = 'triangle';


    lowerGainNode.gain.value = amplitude/m;
    lowerOscillator.frequency.value = lowerNoteFrequency;

    lowerOscillator.connect(gainNode);
    lowerGainNode.connect(ac.destination);

    lowerOscillator.start(ac.currentTime + 0);
    lowerOscillator.stop(ac.currentTime + 0.8);
}


