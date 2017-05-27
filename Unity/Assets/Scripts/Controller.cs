using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Controller : MonoBehaviour {

    public Vector2 force;

    public float speedX;
    public float speedY;

    private Rigidbody2D rigib2d;
	// Use this for initialization
	void Start () {
		
	}

    private void Awake()
    {
        rigib2d = this.GetComponent<Rigidbody2D>();
        if(rigib2d.bodyType != RigidbodyType2D.Static)
        {
            rigib2d.bodyType = RigidbodyType2D.Static;
        }

        rigib2d.AddForce(new Vector2(10, 1));
    }

    // Update is called once per frame
    void Update () {
        float x = Input.GetAxis("Horizontal");//水平
        float y = Input.GetAxis("Vertical");//垂直
        speedX = x * force.x;
        speedY = x * force.y;

        if(rigib2d)
        {
            rigib2d.AddForce(new Vector2(speedX, speedY));
        }
    }
}
