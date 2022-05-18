const firebaseConfig = {
    apiKey: "AIzaSyAB5xk1tdmFkhX-6AoWuoEBD-2n__Pye8c",
    authDomain: "chat1-8c690.firebaseapp.com",
    projectId: "chat1-8c690",
    storageBucket: "chat1-8c690.appspot.com",
    messagingSenderId: "716687861662",
    appId: "1:716687861662:web:1b4e331e89e9d9b9ffd88f",
    measurementId: "G-QR4LBF6CXN"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // initialize database
  const db = firebase.database();
  
  // get user's data
  const username = prompt("Please Tell Us Your Name");
  
  // submit form
  // listen for submit event on the form and call the postChat function
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // send message to db
  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }
  
  // display the messages
  // reference the collection created earlier
  const fetchChat = db.ref("messages/");
  
  // check for new messages using the onChildAdded event listener
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });