video="";
objects=[];

function preload(){
video=createVideo("video.mp4");
video.hide();
}

function setup(){
   canvas=createCanvas(480,380);
   canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
    }

    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status: Objects Detected";
        document.getElementById("no_of_objects").innerHTML="Number Of Objects Detected Are: "+objects.length;

        percent=floor(objects[i].confidence*100);
        fill("#FF0000");
        text(objects[i].label+ " " + percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model is loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}