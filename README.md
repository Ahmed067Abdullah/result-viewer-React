## About
This application is created to view semester wise performance of the students in the graphical form. You can also view other interesting graphs and statistics related to the results.

## How to visualize your batch's performance
1. Clone/Download the repository.
2. Go to ```sr/common/data.js``` and replace the array of students with your own and with exact same object structure.
3. Go to ```sr/common/creditHours.js``` and replace the values there with credit hours of each of your semester.
4. In the root directory, run ```npm install``` and then ```npm start```.

## Deployment
1. Create your app on the [firebase](https://firebase.google.com/).
2. Initialize the firebase in your local project using ```firebase init``` command and filling out necessary details.
3. Go to ```sr/config/firebaseConfig.js``` and paste the config object there to track user activities **(OPTIONAL)**.
4. In the root directory, run ```npm run deploy```.

## How to get firebase config object
1. Open your project from firebase dashboard.
2. Click the **gear/settings** icon next to **Project Overview** in the top left corner and select **Project Settings** from the menu that appears.
3. In the **Settings** page, go to **General** tab and scroll down to the **Your apps** section.
4. Find **Firebase SDK snippet** in **Your apps** section and check the **Config** radio button.
5. Code snippit below would change and give you the firebase config object.