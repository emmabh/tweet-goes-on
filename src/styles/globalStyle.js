import { createGlobalStyle } from "styled-components";

import OutwardEOT from '../fonts/outward-round-webfont.eot';
import OutwardWOFF from "../fonts/outward-round-webfont.woff";
import OutwardWOFF2 from "../fonts/outward-round-webfont.woff2";
import OutwardTTF from "../fonts/outward-round-webfont.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'outward';
        src: url(${OutwardEOT}) format('embedded-opentype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'outward';
        src: url(${OutwardWOFF2}) format('woff2'),
            url(${OutwardWOFF}) format('woff'),
            url(${OutwardTTF}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    html, body {
        padding: 0;
        margin: 0;
        font-family: 'Inconsolata', monospace;
        font-weight: 300;
        color:#23293A;
        backgroud-color:#23293A;
    }
`