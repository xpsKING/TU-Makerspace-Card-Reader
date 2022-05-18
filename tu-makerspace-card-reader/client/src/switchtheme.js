import { styled } from '@mui/system';
import { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

/* code from mui website */

// green
const enabled = {
    500: '#008000',
  };
// the faded blue
  const switchbackground = {
    100: '#E7EEFC',
  };
  
  // the oval that the circle travels in
  const Root = styled('span')(
    ({ theme }) => `
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
    cursor: pointer;
    top: -114px;
    right: 100px;
  
    &.${switchUnstyledClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    & .${switchUnstyledClasses.track /* pretty sure this takes from the theme */} {
      background: ${switchbackground[100]};
      border-radius: 15px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
    }
  
    & .${switchUnstyledClasses.thumb /* this is the circle that travels */} {
      display: block;
      width: 24px;
      height: 24px;
      top: 3px;
      left: 3px;
      border-radius: 16px;
      background-color: #fff;
      position: relative;
      transition: all 200ms ease;
    }
  
    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
      background-color: ${switchbackground[100]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }
  
    &.${switchUnstyledClasses.checked} {
      .${switchUnstyledClasses.thumb /* circle moves when toggled */} {
        left: 33px;
        top: 3px;
        background-color: #fff;
      }
  
      .${switchUnstyledClasses.track /* the color of the oval when it's toggled on */} {
        background: ${enabled[500]};
      }
    }
  
    & .${switchUnstyledClasses.input /* idk */} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
  );

  export default Root;