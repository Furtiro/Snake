//Taille du serpent
var tailleSnake = 5;

//Largeur du serpent
var length = 20;

//Vitesse du serpent
var speed=4;

//Path qui contiendra le snake
var snake;

//Point de départ du snake
var start = view.center / [10, 1];

//Génération d'un point aléatoire avec la taille de la map ( canvas)
var maxPoint = new Point(project.view.size.width, project.view.size._height);
var pointRandom = Point.random();
var randomPoint = maxPoint * pointRandom;
randomPoint.angle=0;
randomPoint.length=20;


//Destination , contiendra le point destination du snake
var destination =  randomPoint;

initSnake();


var vector = destination - snake.firstSegment.point ;


//Boolean qui est soit égal à 'aplacer' si un bonbon doit être placé soit 'placé' si un bonbon est placé
var boolBonbon='aplacer';

//Le cercle qui représentera le bonbon
var bonbon;

//Taille du bonbon
var tailleBonbon=10;




function onMouseUp(event) {

	
	destination = event.point;
	vector = destination - snake.firstSegment.point;

}


function onFrame(event)
{
			
	for (var i = 0; i < tailleSnake - 1; i++) {
		var segment = snake.segments[i];
		var nextSegment = segment.next;
		var vector2 = segment.point - nextSegment.point;
		vector2.length = length;
		nextSegment.point = segment.point - vector2;
		
	}
	var vec = vector.normalize(Math.abs(speed))
	snake.segments[0].point += vec;
	
		snake.smooth();					
	contour();
	
	placerBonbon();
	checkBonbon();
	checkCollision();
}


 function contour() 
 
 {
	var bounds = snake.bounds;
	var size = view.size;
	var position = snake.position;
	if (!bounds.intersects(view.bounds)) {
		if (position.x < -bounds.width)
			position.x = size.width + bounds.width;
		if (position.y < -bounds.height)
			position.y = size.height + bounds.height;
		if (position.x > size.width + bounds.width)
			position.x = -bounds.width;
		if (position.y > size.height + bounds.height)
			position.y = -bounds.height;
		snake.position = position;
	}
	
 }
 
 
 function initSnake()
 {
	  snake = new Path({
	 	strokeColor: 'black',
	 	strokeWidth: 20,
	 	strokeCap: 'round'
	 });
	
	 for (var i = 0; i < tailleSnake; i++)
		 {
		snake.add(start + new Point(i * length, 0));
		 /*
		 var circle = new Path.Circle(start + new Point(i * length, 0),10);
		 circle.fillColor='black';
		 snake.addChild(circle);*/
		 }
	 	
	 
	

 }
 
 function grandir()
 {	
		 	snake.add(snake.lastSegment.point + new Point(length/3, 0));
		 	tailleSnake++;
 }
 
 
//Place un bonbon  aléatoirement sur la map
 function placerBonbon()
 {
 	
 	if(boolBonbon== "aplacer")
 		{
 		
 		//Génération d'un point aléatoire avec la taille de la map ( canvas)
 		var maxPoint = new Point(project.view.size.width, project.view.size._height);
 		var pointRandom = Point.random();
 		var randomPoint = maxPoint * pointRandom;
 		
 		//Création du bonbon à manger
 			bonbon = new Path.Circle(
 		{
 		    center: randomPoint,
 		    radius: tailleBonbon,
 		    fillColor: "red"
 		});
 		//On nomme l'item bonbon pour pouvoir le retrouver après
 		bonbon.name='bonbon';
 		
 		//Le  bonbon est désormais placé, il en faut pas en mettre d'autres
 		boolBonbon="placé";
 		}
 	
 	//Sinon le bonbon est présent et on change sa couleur à chaque fois.
 	else
 		{
 		bonbon.fillColor.hue += 1;
 		}
 	}
 
 
 
 
 function checkBonbon()
 {
 	//Si un bonbon est placé on check la collision avec celui-ci
 	if(boolBonbon=='placé')
 	{
 		
 					
 						//Option du hitTest 
 						var hitOptions = {
 								fill: true, 
 								stroke: true, 
 								segments: true, 
 								tolerance: tailleBonbon 
 								}; 
 						
 							//On check la collision de la tête avec un bonbon
 						if(snake.hitTest(bonbon.position,hitOptions))
 						{		
 							
 						//Suppression du bonbon
 						bonbon.remove();
 						
 						//La taille du serpent augmente
 						grandir();
 						
 						//Le bonbon sera à placer au prochain tick de la fonction
 						boolBonbon='aplacer';
 						
 				}
 	
 		}
 }
 
 
 function checkCollision()
 {
	 if(snake.hitTest(snake))
		{
		 	console.log('nomnom');
		}
	 
 }

