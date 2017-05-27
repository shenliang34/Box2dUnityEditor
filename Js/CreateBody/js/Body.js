function Body() {}

var H = 6.4;

Body.prototype.createBody = function(name, cx, cy) {
//	var data = {
//  "gravity": {
//      "x": 0.0,
//      "y": -10.0
//  },
//  "bodies": [
//      {
//          "type": 0,
//          "name": "dragMe (1)",
//          "mass": 0.0,
//          "linearDamping": 0.0,
//          "angleDamping": 0.05000000074505806,
//          "pos": {
//              "x": 6.400000095367432,
//              "y": 0.25
//          },
//          "colliders": [
//              {
//                  "shapeType": 3,
//                  "circleRadius": 0.0,
//                  "rectWidth": 12.800000190734864,
//                  "rectHeight": 0.5,
//                  "friction": 0.4000000059604645,
//                  "bounciness": 0.0,
//                  "pos": {
//                      "x": 0.0,
//                      "y": 0.0
//                  },
//                  "polygonPath": []
//              }
//          ]
//      },
//      {
//          "type": 2,
//          "name": "New Sprite",
//          "mass": 0.0,
//          "linearDamping": 0.0,
//          "angleDamping": 0.05000000074505806,
//          "pos": {
//              "x": 2.25,
//              "y": 3.5399999618530275
//          },
//          "colliders": [
//              {
//                  "shapeType": 2,
//                  "circleRadius": 0.0,
//                  "rectWidth": 0.0,
//                  "rectHeight": 0.0,
//                  "friction": 0.4000000059604645,
//                  "bounciness": 1.0,
//                  "pos": {
//                      "x": 2.25,
//                      "y": 3.5399999618530275
//                  },
//                  "polygonPath": [
//                      {
//                          "x": 0.9510564804077148,
//                          "y": -0.3090171217918396
//                      },
//                      {
//                          "x": 0.5877853631973267,
//                          "y": 0.8090169429779053
//                      },
//                      {
//                          "x": -0.5877851843833923,
//                          "y": 0.8090170621871948
//                      },
//                      {
//                          "x": -0.9510565400123596,
//                          "y": -0.30901697278022768
//                      },
//                      {
//                          "x": 0.0,
//                          "y": -1.0
//                      }
//                  ]
//              }
//          ]
//      },
//      {
//          "type": 2,
//          "name": "New Sprite (1)",
//          "mass": 0.0,
//          "linearDamping": 0.0,
//          "angleDamping": 0.05000000074505806,
//          "pos": {
//              "x": 5.639999866485596,
//              "y": 7.449999809265137
//          },
//          "colliders": [
//              {
//                  "shapeType": 1,
//                  "circleRadius": 0.5,
//                  "rectWidth": 0.0,
//                  "rectHeight": 0.0,
//                  "friction": 0.4000000059604645,
//                  "bounciness": 1.0,
//                  "pos": {
//                      "x": 5.639999866485596,
//                      "y": 7.449999809265137
//                  },
//                  "polygonPath": []
//              }
//          ]
//      }
//  ]
//}











	for (var j = 0; j < data.bodies.length; j++) {
		var body = data.bodies[j];
		var bodyDef = new b2BodyDef();
		bodyDef.position.Set(body.pos.x,H - body.pos.y); // 复用定义刚体
		bodyDef.type = body.type;
		bodyDef.userData = body.tag;
		var wBody = world.CreateBody(bodyDef);
		
		//

		for (var i = 0; i < body.colliders.length; i++) {
			var collider = body.colliders[i];
			var fixtureDef = new b2FixtureDef();
			fixtureDef.friction = collider.friction;
			fixtureDef.restitution = collider.bounciness;
			fixtureDef.density = 1;
			//
			switch (collider.shapeType) {
				case 1: //circle
					var circleShape = new b2CircleShape(collider.circleRadius);
					fixtureDef.shape = circleShape;
					//circleShape.SetLocalPosition(collider.pos.x,collider.pos.y);
					wBody.CreateFixture(fixtureDef);

					break;
				case 2: //polygon
					var polygons = collider.polygonPath;
					//          					for(p=0; p<polygons.length; p++)
					//			                    {
					var polygonShape = new b2PolygonShape();
					polygonShape.SetAsArray(polygons, polygons.length);
					fixtureDef.shape = polygonShape;
					//polygonShape.SetLocalPosition(0,0);
					wBody.CreateFixture(fixtureDef);
					//			                    }

					break;
				case 3: //box
					var polygonShape = new b2PolygonShape();
	                polygonShape.SetAsBox(collider.rectWidth/2 , collider.rectHeight/2);
	                fixtureDef.shape = polygonShape; // 复用夹具
	                wBody.CreateFixture(fixtureDef);
					break;
			}
		}
	}
}