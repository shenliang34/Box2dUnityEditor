using UnityEngine;
using System.Collections;
using UnityEditor;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEditor.SceneManagement;

[System.Serializable]
enum MyType{
	CIRCLE = 1,
	POLYGON,
	RECT,
	MAX
}

[System.Serializable]
public class Shape{
	public int shapeType; // circle, polygon, rectangle
	public float circleRadius;
	public float rectWidth;
	public float rectHeight;
	public float friction;
	public float bounciness;
    public Vector2 pos;
	public string polygonPath = null;
}

[System.Serializable]
public class Body{
	public string type;
    public string name;
    public string tag = null;
	public float mass;
	public float linearDamping;
	public float angleDamping;
    public Vector2 pos;
	public List<Shape> colliders = null;
}

[System.Serializable]
public class Box2DScene {
	public Vector2 gravity;
	public List<Body> bodies;
}

public class MyEditor : Editor
{

    //将所有游戏场景导出为JSON格式
    [MenuItem("Export/ExportJS")]
    static void ExportJSON()
    {
        string filepath = @"F:/Box2dEditor/Js/CreateBody/js/json.js";//Application.dataPath + @"/StreamingAssets/json.js";
        FileInfo t = new FileInfo(filepath);
		if(!File.Exists (filepath))
		{
			File.Delete(filepath);
		}
        int ptmradio = 100;
		StreamWriter sw = t.CreateText();
		var box2d = new Box2DScene ();
		box2d.gravity = new Vector2 (0, -10);
		List<Body> bodies = new List<Body> ();
		box2d.bodies = bodies;
		foreach (UnityEditor.EditorBuildSettingsScene S in UnityEditor.EditorBuildSettings.scenes) {
			if (S.enabled) {
				string name = S.path;
                EditorSceneManager.OpenScene(name);



				foreach (GameObject obj in Object.FindObjectsOfType(typeof(GameObject))) {
					var rig = obj.GetComponent<Rigidbody2D> ();
					if (obj.transform.parent == null && rig != null) {
						var body = new Body ();
						body.linearDamping = rig.drag;
						body.angleDamping = rig.angularDrag;
						body.type = rig.bodyType.ToString();
                        body.name = obj.name;
                        body.tag = obj.tag;
						body.colliders = new List<Shape> ();
                        body.pos = obj.transform.position * ptmradio;

						var circles = obj.GetComponents<CircleCollider2D> ();
						if (circles != null) {
							foreach (var collider in circles) {
								var shape = new Shape ();
								shape.shapeType = (int)MyType.CIRCLE;
								shape.circleRadius = collider.radius * ptmradio;
								shape.friction = collider.friction;
								shape.bounciness = collider.bounciness;
                                shape.pos = collider.transform.position * ptmradio;
								body.colliders.Add (shape);
							}
						}

						var polys = obj.GetComponents<PolygonCollider2D> ();
						if (polys != null) {
							foreach (var collider in polys) {
								var shape = new Shape ();
								shape.shapeType = (int)MyType.POLYGON;
								shape.polygonPath = "";
								for (var i = 0; i < collider.pathCount; i++) {
                                    Vector2[] line = collider.GetPath(i) ;
                                    for (int j = 0; j < line.Length; j++)
                                    {
                                        if(j != 0)
                                        {
                                            shape.polygonPath += " ";
                                        }
									    shape.polygonPath += line[j].x * ptmradio + " "  + -line[j].y * ptmradio;
                                    }
								}
								shape.friction = collider.friction;
								shape.bounciness = collider.bounciness;
                                shape.pos = collider.transform.position * ptmradio;
                                body.colliders.Add (shape);
							}
						}

						var boxes = obj.GetComponents<BoxCollider2D> ();
						if (boxes != null) {
							foreach (var collider in boxes) {
								var shape = new Shape ();
								shape.shapeType = (int)MyType.RECT;
								shape.rectWidth = collider.size.x * ptmradio;
								shape.rectHeight = collider.size.y * ptmradio;
								shape.friction = collider.friction;
								shape.bounciness = collider.bounciness;
                                shape.pos = collider.offset * ptmradio;
                                body.colliders.Add (shape);
							}
						}
						Debug.Log (JsonUtility.ToJson(body));
						bodies.Add (body);
					}
				}

			}
		}

        string str = JsonUtility.ToJson(box2d, true);
        str = "var data = " + str;

        sw.WriteLine(str);
		sw.Close();
		sw.Dispose();
		AssetDatabase.Refresh();

        Debug.Log("success");
	}

}