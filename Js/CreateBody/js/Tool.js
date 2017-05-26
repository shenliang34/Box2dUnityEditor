function Body()
            {
            	var s = this;
            	
            	s.init();
            }
            
            Body.prototype.init = function()
            {
            	console.log("Body");
            	s = this;
            	
            	var  dict = {};
            	
            	dict["head"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(3/ptm_ratio, 198/ptm_ratio)  ,  new b2Vec2(-1/ptm_ratio, 168/ptm_ratio)  ,  new b2Vec2(10/ptm_ratio, 142/ptm_ratio)  ,  new b2Vec2(24/ptm_ratio, 128/ptm_ratio)  ,  new b2Vec2(55/ptm_ratio, 111/ptm_ratio)  ,  new b2Vec2(200/ptm_ratio, 84/ptm_ratio)  ,  new b2Vec2(198/ptm_ratio, 203/ptm_ratio)  ] ,
                                                [   new b2Vec2(151/ptm_ratio, 1/ptm_ratio)  ,  new b2Vec2(158/ptm_ratio, 30/ptm_ratio)  ,  new b2Vec2(47/ptm_ratio, 104/ptm_ratio)  ,  new b2Vec2(15/ptm_ratio, 88/ptm_ratio)  ,  new b2Vec2(2/ptm_ratio, 70/ptm_ratio)  ,  new b2Vec2(0/ptm_ratio, 2/ptm_ratio)  ] ,
                                                [   new b2Vec2(55/ptm_ratio, 111/ptm_ratio)  ,  new b2Vec2(24/ptm_ratio, 128/ptm_ratio)  ,  new b2Vec2(32/ptm_ratio, 116/ptm_ratio)  ] ,
                                                [   new b2Vec2(15/ptm_ratio, 88/ptm_ratio)  ,  new b2Vec2(47/ptm_ratio, 104/ptm_ratio)  ,  new b2Vec2(30/ptm_ratio, 102/ptm_ratio)  ] ,
                                                [   new b2Vec2(167/ptm_ratio, 64/ptm_ratio)  ,  new b2Vec2(47/ptm_ratio, 104/ptm_ratio)  ,  new b2Vec2(158/ptm_ratio, 30/ptm_ratio)  ] ,
                                                [   new b2Vec2(200/ptm_ratio, 84/ptm_ratio)  ,  new b2Vec2(55/ptm_ratio, 111/ptm_ratio)  ,  new b2Vec2(47/ptm_ratio, 104/ptm_ratio)  ,  new b2Vec2(167/ptm_ratio, 64/ptm_ratio)  ]
											]

										]

									];

				dict["people"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(111/ptm_ratio, 185/ptm_ratio)  ,  new b2Vec2(139/ptm_ratio, 214/ptm_ratio)  ,  new b2Vec2(109/ptm_ratio, 213/ptm_ratio)  ,  new b2Vec2(101/ptm_ratio, 200/ptm_ratio)  ] ,
                                                [   new b2Vec2(188/ptm_ratio, 212/ptm_ratio)  ,  new b2Vec2(158/ptm_ratio, 218/ptm_ratio)  ,  new b2Vec2(198/ptm_ratio, 180/ptm_ratio)  ,  new b2Vec2(202/ptm_ratio, 195/ptm_ratio)  ] ,
                                                [   new b2Vec2(158/ptm_ratio, 218/ptm_ratio)  ,  new b2Vec2(111/ptm_ratio, 150/ptm_ratio)  ,  new b2Vec2(115/ptm_ratio, 16/ptm_ratio)  ,  new b2Vec2(142/ptm_ratio, 7/ptm_ratio)  ,  new b2Vec2(171/ptm_ratio, 8/ptm_ratio)  ,  new b2Vec2(202/ptm_ratio, 19/ptm_ratio)  ,  new b2Vec2(198/ptm_ratio, 180/ptm_ratio)  ] ,
                                                [   new b2Vec2(65/ptm_ratio, 90/ptm_ratio)  ,  new b2Vec2(70/ptm_ratio, 61/ptm_ratio)  ,  new b2Vec2(86/ptm_ratio, 37/ptm_ratio)  ,  new b2Vec2(115/ptm_ratio, 16/ptm_ratio)  ,  new b2Vec2(111/ptm_ratio, 150/ptm_ratio)  ,  new b2Vec2(84/ptm_ratio, 137/ptm_ratio)  ,  new b2Vec2(66/ptm_ratio, 114/ptm_ratio)  ] ,
                                                [   new b2Vec2(199/ptm_ratio, 145/ptm_ratio)  ,  new b2Vec2(202/ptm_ratio, 19/ptm_ratio)  ,  new b2Vec2(229/ptm_ratio, 40/ptm_ratio)  ,  new b2Vec2(243/ptm_ratio, 67/ptm_ratio)  ,  new b2Vec2(243/ptm_ratio, 103/ptm_ratio)  ,  new b2Vec2(230/ptm_ratio, 128/ptm_ratio)  ] ,
                                                [   new b2Vec2(111/ptm_ratio, 150/ptm_ratio)  ,  new b2Vec2(158/ptm_ratio, 218/ptm_ratio)  ,  new b2Vec2(139/ptm_ratio, 214/ptm_ratio)  ,  new b2Vec2(111/ptm_ratio, 185/ptm_ratio)  ,  new b2Vec2(107/ptm_ratio, 168/ptm_ratio)  ]
											]

										]

									];
									
				s.data = dict;
            }
            
            Body.prototype.createBody = function(name,cx,cy)
            {
            	var s = this;
            	
            	var fixtures = s.data[name];
            	
            	var bodyDef = new b2BodyDef(); 
            	bodyDef.type = b2Body.b2_dynamicBody;
            	bodyDef.position.Set(cx/ptm_ratio,cy/ptm_ratio);
            	var body = world.CreateBody(bodyDef);
            	for (var i = 0; i < fixtures.length; i++) {
            		var fixture = fixtures[i];
            		
            		var fixtureDef = new b2FixtureDef();
            		fixtureDef.density = fixture[0];
            		fixtureDef.friction = fixture[1];
            		fixtureDef.restitution = fixture[2];
            		
            		fixtureDef.filter.categoryBits = fixture[3];
	                fixtureDef.filter.maskBits = fixture[4];
	                fixtureDef.filter.groupIndex = fixture[5];
	                fixtureDef.isSensor = fixture[6];

	                if(fixture[7] == "POLYGON")
	                {                    
	                    var p;
	                    var polygons = fixture[8];
	                    for(p=0; p<polygons.length; p++)
	                    {
	                        var polygonShape = new b2PolygonShape();
	                        polygonShape.SetAsArray(polygons[p], polygons[p].length);
	                        fixtureDef.shape=polygonShape;
	
	                        body.CreateFixture(fixtureDef);
	                    }
	                }
	                else if(fixture[7] == "CIRCLE")
	                {
	                    var circleShape = new b2CircleShape(fixture[9]);                    
	                    circleShape.SetLocalPosition(fixture[8]);
	                    fixtureDef.shape = circleShape;
	                    body.CreateFixture(fixtureDef);                    
	                }   
            	}
            }