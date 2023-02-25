var song1="";
var song2="";
var song1_status="";
var song2_status="";
var scoreLeftWrist="0";
var scoreRightWrist="0";
var leftWristX="";
var leftWristY="";
var rightWristX="";
var rightWristY="";


function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(650,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);

    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Model Is Loaded");
}

function gotPoses(results){
console.log(results);

if (results.length>0){

    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;

    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;

    console.log("Left Wrist X= "+ leftWristX);
    console.log("Left Wrist Y= "+ leftWristY);

    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;

    console.log("Right Wrist X= "+ rightWristX);
    console.log("Right Wrist Y= "+ rightWristY);
}
}

function draw(){
image(video,0,0,650,500);

song1_status=song1.isPlaying();
song2_status=song2.isPlaying();

fill("#FF0000");
stroke("#FF0000")
if(scoreLeftWrist>0.2){
  circle(leftWristX,leftWristY,20);  
  song1.stop();
  if (song1_status==false){
    song1.play();
    document.getElementById("song_name_label").innerHTML= "Playing Peter Pan Theme Song..."
  }
}
if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);  
    song2.stop();
    if (song2_status==false){
        song2.play();
        document.getElementById("song_name_label").innerHTML= "Playing Harry Potter Theme Song..."
    }
  }

}
