       
         attribute vec4 a_Position;
         attribute float a_PointSize;
        
         void main()
          {
           gl_PointSize = a_PointSize;
           gl_Position = a_Position;
          }
