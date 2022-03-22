# Node/Express Microservices

## Setup

1. Download and install [Node](https://nodejs.org/en/) and [git](https://git-scm.com/downloads)

1. Clone this repository using the command ```git clone https://github.com/cossieB/microservices.git```

1. Open *microservices* folder in your favourite text editor.

1. Run ```npm install``` to install the dependencies.

1. You will need your own MongoDB Atlas account or a local MongoDB installation for some services to work.

## Edit

1. Put your MongoDB connection string as MONGO_URI in the .env file

1. The main TypeScript source code is located in the *src* folder. 

1. While in development use the command ```npm run dev```. This command will run nodemon to restart the development server after changes are made. 

1. Head over to [http//:localhost:5000](http//:localhost:5000) on your browser to preview your changes.

## Run


1. When ready, run ```tsc``` to compile the TypeScript code into JavaScript. The Javascript code will be placed into the *dist* folder.

1. Run ```npm start```


![Happy Coding](https://i.imgur.com/lhodvdG.png)