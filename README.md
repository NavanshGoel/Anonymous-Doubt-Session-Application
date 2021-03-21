# Anonymous Doubt Session Application
This project serves as a prototype for the Anonymous Doubt Session Application which aims at solving the mentioned problem statement.
## Functioning: 
The project comprises of a chat application with additional support of features like whiteboard, speech-to-text which traslates a user preferred to english, monitoring the content of chats. The students can ask their doubts anonymously either by typing in their question or by voicing the question in their preferred language inside a questions panel.The teacher gets a feature wherein the question asked by the student gets translated into the teacher's preferred language. The system monitors the question asked by the student and checks for any offensive or abusive language. If the system finds something inappropriate then the system warns the student. 

Once the question passes the screening for inappropriate content, the question is queued inside the question panel and gives the student their queue number for that question. The total number of questions inside the queue are limited to the number of participants, ensuring that one student tasks one doubt at a time. If a student tries to ask more than one doubt in the question panel, whilst their previous doubt is still pending from the teacher's end, they are asked to wait till their doubt has been clarified or declined by the teacher.

All the questions are queued up in a queue and are then presented to the teacher on first come first serve basis. The teacher then has an option to either accept or decline the doubt. Once the question gets the teacher's approval, it is displayed on the screen in a popup box above the whiteboard for better readability. During the explanation of the doubt, the student can ask questions related to that question inside an anonymous chat panel that refreshes after every question.

##Installation
To install all the dependencies:
```
npm install
```

To run the program:
```
npm start
```

Then head to your browser and go to localhost:3000.
