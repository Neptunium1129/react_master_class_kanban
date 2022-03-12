// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    //디폴트띰
    textColor: string;
    bgColor: string;
    boardColor: string;
    cardColor: string;
  }
}
