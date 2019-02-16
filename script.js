window.onload=function(){
// Adds an event listener to our form. When the form is submitted, it will send data to our Lambda function, which in turn, will send us an email.
    document.getElementById('serverless-contact-form').addEventListener('submit', sendDataToLambda);
    // Now for the good stuff. This is the function that will send our data to AWS.
    function sendDataToLambda(e) {
    e.preventDefault();

    // Gets the values of each field in our form. This is the data we'll send to our Lambda function.
    var formEmail = document.querySelector('.form-email').value;
    var formSubject = "Faith-Based Editorial Request from " + document.querySelector('.form-name').value;
    var formMessage = 
        document.querySelector('.form-name').value + " has submitted a request on your site. " + "\r\n\r\n" +
        "Project Title: " + document.querySelector('.form-title').value + "\r\n" +
        "Genre: " + document.querySelector('.form-genre').value + "\r\n\r\n" +
        "About the Project: " + document.querySelector('.form-plans').value
    // This is the endpoint we created in our API Gateway. This is where we make our POST request, which calls our Lambda function.
    var endpoint = 'https://1jeax6zb6g.execute-api.us-east-1.amazonaws.com/prod/ContactFormLambda';
    // Remember those form values we just grabbed? We're going to put them into an object here.
    var body = {
        email: formEmail,
        subject: formSubject,
        message: formMessage
    }
    // Here, we instantiate our Request. This is a special object used by the Fetch API so it knows where to send data, what data to send, and how to send it.
    var lambdaRequest = new Request(endpoint, {
        method: 'POST',
        // Quick note: 'no-cors' mode is for development on localhost only!
        mode: 'no-cors',
        body: JSON.stringify(body)
    }
     //   ,location.href = "contactResponse.html"
);
    // Call the Fetch API to make our request
    fetch(lambdaRequest)
        // This is where you can handle errors. This is just an example, so we won't cover that.
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
}