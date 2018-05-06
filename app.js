var lbl = require('linebyline');
var fs = require('fs');
//google cloud translate api
var google_translate = require('@google-cloud/translate');
var projectID = 'GLocalizationProjects';
var translator = new google_translate({
	projectId: projectID
});
var target_lang = 'zh';


// var file = 'test.srt';
// var target = 'output.txt';

var src = lbl('src.txt');
var process = lbl(src);
var buffer = '';
var count = 0;
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
console.log('reading source file');
process.on('line', (data, lineCount, byteCount) =>{
	console.log(data);

})
.on('close', (err) => {
	if(err)
		console.log(err);
});


function translateSubtitle(buffer){
	translator.translate(buffer, target_lang)
		.then(function(results, lineNum){
			var translation = results[0];
			console.log('translation:' + translation);
			//console.log('verbose:' + results);
		});

}
