/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Slickybohem: ['Slickybohem'],
        Strawforditalic: ['Strawforditalic'],
        Strawford: ['Strawford'],
      },

      colors: {
        black: '#000000',
        white: '#ffffff',

        yellowHome: '#FFF399',
        yellow1: '#FCFF62',
        yellow2: '#FCF554',
        yellow3: '#FCF446',
        yellow4: '#FCF238',
        yellow5: '#FFDD1C',
        yellow6: '#FFD900',
        yellow7: '#F0D400',
        yellow8: '#E7C500',
        yellowAZ: '#C4A600',
        yellowLetter: '#B99F0D',

        blueHome: '#C9DBE1',
        blue1: '#D3EEF8',
        blue2: '#BEDCE7',
        blue3: '#AACAD5',
        blue4: '#95BBC4',
        blue5: '#80A5B3',
        blue6: '#6B93A2',
        blue7: '#578190',
        blue8: '#426F7F',
        blueLetter: '#578292',

        orangeHome: '#FFC086',
        orange1: '#FFB733',
        orange2: '#FFAA17',
        orange3: '#FFA626',
        orange4: '#FF8F26',
        orange5: '#FF7810',
        orange6: '#E95C10',
        orange7: '#D74309',
        orange8: '#B5330B',
        orangeLetter: '#922A0A',

        greenHome: '#9FE3A4',
        green1: '#8DFE74',
        green2: '#61E949',
        green3: '#51D54D',
        green4: '#46D44F',
        green5: '#31BD47',
        green6: '#21B13C',
        green7: '#11A831',
        green8: '#01711D',
        greenLetter: '#045819',

        purpleHome: '#E2C0E8',
        purple1: '#F7BAFF',
        purple2: '#E7A7F0',
        purple3: '#D793E1',
        purple4: '#C783D2',
        purple5: '#BE70D4',
        purple6: '#A76BB4',
        purple7: '#9761A5',
        purple8: '#873496',
        purpleLetter: '#7E2A8D',

        redHome: '#FF9898',
        red1: '#FF7B7B',
        red2: '#FF5959',
        red3: '#FF3333',
        redAgain: '#E8CCCC'
      },
    },
  },
  plugins: [],
}

