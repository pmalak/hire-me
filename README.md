## hire-me Famly test project 

Demo app is running [here](https://cranky-galileo-bc5a61.netlify.app) 

### Tech
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [TypeScript](https://www.typescriptlang.org/) because it is good to use TypeScript :) 
- [React Query](https://react-query.tanstack.com/) for data handling
- [MUI](https://mui.com/) for UI components
- [styled-components](https://styled-components.com/) for a few small touches 

### App is able to do 3 things:
- List children using custom little pagination allowing to set number of items per page.   
- Checkin a child
- Checkout a child

### What can be better
- **pagination custom hook** so the logic is reusable elsewhere  
- **error handling** 
- store update after mutation 
- **tests** - there should be some 
- **design** App is not responsive
- **edge cases**    


### Instalation
`yarn install`

`touch .env` and add   REACT_APP_ACCESS_TOKEN=_your access token_

### Run server
 `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
