export const BnbIcon = ({size = 'm'} : {size: 'm' | 's'}) => {
  switch(size) {
    case 's':
      return (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 384 381" fill="#F3BA2F">
            <path d="M117.512 159.61l73.765-73.762 73.801 73.8L308 116.727 191.277 0 74.594 116.688zm-73.23-12.618l42.917 42.918-42.918 42.918L1.36 189.91zm73.23 73.23l73.765 73.762 73.801-73.796 42.945 42.898-116.746 116.746L74.59 263.148l-.063-.058zm263.687-30.292l-42.918 42.922-42.926-42.918 42.922-42.926zm0 0"/><path d="M234.813 189.895h.019l-43.555-43.555-32.187 32.187h-.004l-3.695 3.7-7.688 7.687.059.063 43.515 43.515 43.555-43.554.02-.024zm0 0"/>
          </svg>
      );
    case 'm':
      return (
        <svg width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
            <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"/>
          </g>
        </svg>
      );
  }
}

export const EthIcon = ({size = 'm'} : {size: 'm' | 's'}) => {
  switch(size) {
    case 's':
      return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           viewBox="0 0 327.5 533.3">
          <style type="text/css">
            {
              '.st0{fill:#8A92B2;} .st1{fill:#62688F;} .st2{fill:#454A75;}'
            }
          </style>
          <path className="st0" d="M163.7,197.2V0L0,271.6L163.7,197.2z"/>
          <path className="st1" d="M163.7,368.4V197.2L0,271.6L163.7,368.4z M163.7,197.2l163.7,74.4L163.7,0V197.2z"/>
          <path className="st2" d="M163.7,197.2v171.2l163.7-96.8L163.7,197.2z"/>
          <path className="st0" d="M163.7,399.4L0,302.7l163.7,230.7V399.4z"/>
          <path className="st1" d="M327.5,302.7l-163.8,96.7v134L327.5,302.7z"/>
        </svg>
        
      );
    case 'm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#627EEA"/>
            <g fill="#FFF" fillRule="nonzero">
              <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
              <path d="M16.498 4L9 16.22l7.498-3.35z"/>
              <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
              <path d="M16.498 27.995v-6.028L9 17.616z"/>
              <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
              <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
            </g>
          </g>
        </svg>
      );
  }
}