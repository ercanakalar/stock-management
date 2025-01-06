## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npx json-server --watch db.json`

Starts the mock server to do fetch processes.

### `How to work`

The application get all the data and divide by a constant number to pagination. Each page will show 6 product and by response it will change. The user can sort the products by price and alphabetic. Also, there is a filter to show available products which are quantity is bigger than 0. Actually, there were other filters for brands and models. However, the original url does not provide the quantity for products. That is why, I get the data and add quantity. So, while I am fetching data from url as parameters, I could not do for the same mock data.