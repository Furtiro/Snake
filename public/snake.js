tool.fixedDistance = 20;

//Taille du bonbon
var tailleBonbon = 8;


//Taille de départ du gentil snake
var taille=5;

//Boolean qui est soit égal à 'aplacer' si un bonbon doit être placé soit 'placé' si un bonbon est placé
var boolBonbon='aplacer';

//Le cercle qui représentera le bonbon
var bonbon;

//Le layer contiendra tous les items / élements du jeux
var layer = new Layer();


//Fonction qui check en temps réel la collision et le placement d'un autre bonbon
function onFrame(event)
{
	//On place un bonbon si il n'y en a plus sur la map
	placerBonbon();
	
	//On check la collision de la tête avec un bonbon
	checkBonbon();
	
	//On check la collision de la tête avec le corp
	checkCollision();	
}
	
	
//Est activé lorsque la souris se déplace
function onMouseMove(event) {

	
	//Le rayon du cercle de chaque parties du serpent est égal au déplacement de la souris x2
	var radius = event.delta.length / 2;

	//On crée un cercle à chaque déplacement de souris
	var path = new Path.Circle({
		center: event.middlePoint,
		radius: radius
	});
	//On règle la couleur du serpent à noir
	path.fillColor = 'black';

	
	//Lorsqu'on se déplace on doit supprimer les anciens cercles petit à petit , pour faire "avancer" le serpent
	if (layer.children.length > taille)
		{
		
		//On doit ignorer le cercle de type bonbon, on supprime donc le cercle bonbon+1 dans la liste si le premier est le bonbon dans cette même liste
		if(layer.firstChild.name=='bonbon')
			{
			layer.children[1].remove();
			}
		else
			{
			layer.firstChild.remove();
			}		
		
		}

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

//Check collision entre la tête et le serpent
function checkCollision()
{
	
	//Check de collision entre la tête et le corp
	for(var i=0;i<layer.children.length;i++)
	{
			
		// On ne veut pas vérifier le bonbon lui même
		if(layer.children[i].name != 'bonbon')
		{
			
			//Tolérance fixe  correspondant à la taille d'un cercle du serpent
			var hitOptions = {
					fill: true, 
					stroke: true, 
					segments: true, 
					tolerance: 8.5
					}; 
			
			//On ne veut pas check la tête avec la tête mais avec le reste du corp
			if(layer.children[i] != layer.lastChild)
				{
					
					//On ignore les collisions entre la tête et l'élement juste avant celle-ci pour plus de mobilité
					if(layer.children[i]!=layer.children[layer.children.length-2])
					{
						//Test de hit entre l'élement et la tête 
						if(layer.children[i].hitTest(layer.lastChild.position,hitOptions))
						{
						
						alert('Perdu !');
						window.location.reload();
						
						}
					}
				}
		}
	}
	
}




function checkBonbon()
{
	//Si un bonbon est placé on check la collision avec celui-ci
	if(boolBonbon=='placé')
	{
		
				for(var i=0;i<layer.children.length;i++)
				{
						
					// On ne veut pas vérifier le bonbon lui même
					if(layer.children[i].name != 'bonbon')
					{
						
						//Option du hitTest 
						var hitOptions = {
								fill: true, 
								stroke: true, 
								segments: true, 
								tolerance: tailleBonbon 
								}; 
						
							//On check la collision de la tête avec un bonbon
						if(layer.children[i].hitTest(bonbon.position,hitOptions))
						{		
							
						//Suppression du bonbon
						bonbon.remove();
						
						//La taille du serpent augmente
						taille++;
						
						//Le bonbon sera à placer au prochain tick de la fonction
						boolBonbon='aplacer';
						}
					}
				}
	
		}
}



			
	
