About:

This is a personal project that helps with reading Mandarin texts in english. A pdf with chinese characters is placed as the input, then its contents are translated and displayed next to it on a webpage.

I made this to translate the book, The Three Body Problem, for an easier read. 



Getting Started:

Set Up MySQL Database
https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing
- username: 3body, password: password
- TODO: make database setup more universal

Generate SQL Table
- put pdf into /3body_translate_client/public/pdf
- run python script "main.py -r"

Server Setup
- run "node MySQL.js" in 3body_translate_backend

Client Run
- run "npm start" in 3body_translate_frontend
- TODO: make pdf name general

TODO: configure run.sh to do all this in a single step



Dependencies and Sources

React: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

UI: shadcn.ui: https://ui.shadcn.com

Python PDF parser: https://pypi.org/project/multilingual-pdf2text/

Python Translation Library: https://pypi.org/project/deep-translator/ using google translate

MySQL: https://www.mysql.com
