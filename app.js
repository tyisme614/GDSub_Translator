var lbl = require('linebyline');
var fs = require('fs');
//google cloud translate api
var google_translate = require('@google-cloud/translate');
//google cloud speech api
var google_speech = require('@google-cloud/speech');


var projectID = 'GLocalizationProjects';

var translator = new google_translate({
	projectId: projectID,
	keyFilename: '/home/yuan/auth/GLocalizationProjects-4f795dcb895a.json'
});


var target_lang = 'zh';

var speech = new google_speech.SpeechClient();
var src_audio = 'pcm16_test.wav';
//loading audio file
console.log('loading audio file');
var audio_base64 = fs.readFileSync(src_audio).toString('base64');
const audio = {
	content: audio_base64
}

const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
  enableAutomaticPunctuation: true
};
const request = {
  audio: audio,
  config: config,
};
 
// Detects speech in the audio file
console.log('start recognizing speech');
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
// var file = 'test.srt';
// var target = 'output.txt';

// const EventEmitter = require('events');
// class customEventEmitter extends EventEmitter{};
// const stateEmitter = new customEventEmitter();
// var index =0;
// stateEmitter.on('next', function(){
// 	index++;
// 	if(index < buffer.length){
// 		console.log('next word: ' + buffer[index]);
// 		txt_arr += buffer[index] + ' ';
// 		translateSubtitle(txt_arr);
// 	}else{
// 		console.log('translation done.');
// 	}
// });

//var process = lbl(__dirname + '/sentences.txt');
// var process = lbl(__dirname + '/src.txt');
//var process = lbl(src);
// var buffer = [];
// var txt_arr = '';
// var count = 0;

//creating output file
// console.log('creating output file...');
// fs.closeSync(fs.openSync(target, 'w'));
// fs.access(target, function(err){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		//initialize new object
// 		var subtitles = [];
// 		process.on('line', function(data, lineCount, byteCount){
			
// 			if(count == 2){
// 			//	console.log('translation line');
// 				buffer += (data + ' '); 
// 				if(data.endsWith('.')){
// 					console.log('translating...');
// 					var lineNum = lineCount;
// 					console.log('line number outside function:' + lineNum);
// 					translateSubtitle(buffer);
// 					 // console.log('write buffer into output file, buffer:' + buffer);
// 					// fs.appendFileSync(target, buffer + '\n');
// 			//		console.log('end line, reset buffer');
// 					buffer = '';
// 				}
// 			}
// 			if(data == ''){
// 			//	console.log('this line has nothing');
// 				count = 0;
// 			}else{
// 				count++;	
// 			}
			
// 		});
// 	}
// });


// console.log('reading source file');
// process.on('line', function(data, lineCount, byteCount){
// 	console.log(data);
// 	//word by word
// 	 buffer = data.split(' ');
// 	//sentence by sentence
// 	//buffer.push(data);


// })
// .on('error', (err) => {
// 	console.log(err);
// })
// .on('close', (err) => {
// 	if(err)
// 		console.log(err);
// 	console.log('starting translating...');
// 	// traverseBuffer(buffer);
// 	index = 0;
// 	//word by word
// 	 txt_arr += buffer[index] + ' ';
// 	//sentence by sentence
// 	//txt_arr = buffer[index];
// 	translateSubtitle(txt_arr);
// });

function traverseBuffer(b){
	for(var i=0; i<b.length; i++){
		console.log(b[i]);
	}
}

function translateSubtitle(buffer){
	translator.translate(buffer, target_lang)
		.then(function(results, lineNum){
			var translation = results[0];
			console.log('source:' + buffer[index]);
			console.log('translation:' + translation);
			stateEmitter.emit('next');
			//console.log('verbose:' + results);
		});

}
