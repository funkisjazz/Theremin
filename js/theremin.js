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


//the oscillaotr is created inside the audio context, it is one of the Node types (which I belive are objects)
//which the audio context allows us to create, the oscillator shall be refered to by the var "oscillator"

var oscillator = ac.createOscillator();

//set up a node for gain (controling the volume of the oscillator)

var gainNode = ac.createGain();
// Now to connect things together Oscillator - > Gain note - > Destination(output)

oscillator.connect(gainNode);
gainNode.connect(ac.destination);

// Now I asgin the intial values of the frequency and amplitude to the oscill ator and gain

gainNode.gain.value = amplitude;
oscillator.frequency.value = frequency;

//Now to actually play it 

oscillator.start(ac.currentTime + 0);
oscillator.stop(ac.currentTime + 0.06);



function play(event) {

if(Date.now() - lastMove > 100) {

frequency = (590 - event.offsetY)/285 + 1;
if (frequency < 2.0) {
frequency = frequency*65.41;
} else {
	frequency = 123.5*(frequency-1);
}

userInputAmplitude = event.offsetX/500;
amplitude = (Math.exp(userInputAmplitude) -1)/(Math.exp(1) - 1);

oscillator.stop(ac.currentTime + 0.01);

oscillator = ac.createOscillator();


gainNode = ac.createGain();
oscillator.connect(gainNode);
gainNode.connect(ac.destination);



gainNode.gain.value = amplitude;
oscillator.frequency.value = frequency;



oscillator.start(ac.currentTime + 0);
oscillator.stop(ac.currentTime + 0.8);

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

	lowerOscillator.connect(gainNode);
	lowerGainNode.connect(ac.destination);



	lowerGainNode.gain.value = amplitude;
	lowerOscillator.frequency.value = lowerNoteFrequency;



	lowerOscillator.start(ac.currentTime + 0);
	lowerOscillator.stop(ac.currentTime + 0.8);
}



