       
         uniform mat4 u_mMatrix;
         uniform mat4 u_vMatrix;
         uniform mat4 u_pMatrix;

         attribute vec4 a_Position;
         attribute float a_PointSize;
        
         void main()
          {
           gl_PointSize = a_PointSize;
           gl_Position = u_pMatrix * u_vMatrix * u_mMatrix *a_Position;
          }
