$(document).ready(function () {


    /*
        Firebase
        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    */
    var config = {
        apiKey: "AIzaSyCLQQaC2PjCbaoYwkeYea8mlJeNwX-G7Y4",
        authDomain: "project1test-346b5.firebaseapp.com",
        databaseURL: "https://project1test-346b5.firebaseio.com",
        projectId: "project1test-346b5",
        storageBucket: "project1test-346b5.appspot.com",
        messagingSenderId: "712815187401"
    };
    firebase.initializeApp(config);
    //set firebase ref//
    var database = firebase.database();
    //set variable to hold unique user ID of logged in user. This is used to save user data later on//
    var currentUser = "";



    //sign up action//
    $("#signupSubmit").on("click", function () {
        var email = $("#signupEmail").val().trim();
        var password = $("#signupPassword").val().trim();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                return firebase.auth().createUserWithEmailAndPassword(email, password)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("please try again, Sign Up unsuccesful")
            });
    });

    //sign in action//
    $("#signinSubmit").on("click", function () {
        var email = $("#signinEmail").val().trim();
        var password = $("#signinPassword").val().trim();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("please try again, Sign In unsuccesful")
            });
    });



    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = user.uid;

            //not tested//
            document.location.href = "user.html";
        } else {

        }
    });




    /*
        Google Books API
        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    */
    // Functions
    function bookSearch(α) {
        // TODO: get search string from correct id in html
        // TODO: append search results to correct place in html
        α.preventDefault()
        $('#content').empty()
        α = $('#search-term').val()
        $('#search-term').val('')
        let url = 'https://www.googleapis.com/books/v1/volumes?q=' + α
        $.get(url).then(function(β) {
            for (let i in β.items) {
                let imgURL = β.items[i].volumeInfo.imageLinks.thumbnail
                let γ = $('<div>').addClass('search-image').attr('data-id',β.items[i].id)
                $('<img>').attr('src',imgURL).attr('data-id',β.items[i].id).appendTo(γ)
                γ.appendTo($('#content'))
            }
        })
    }
    function bookDetail() {
        // TODO: append ω data to correct place
        $('#details').empty()
        let α = $(this).attr('data-id')
        let url = 'https://www.googleapis.com/books/v1/volumes/' + α
        $.get(url).then(function(β) {
            console.log(β)
            let ω = {
                title: β.volumeInfo.title,
                author: β.volumeInfo.authors[0],
                rating: β.averageRating,
                description: β.volumeInfo.description,  // should be inputted as .html(description)
                publisher: β.volumeInfo.publisher,
                date: β.volumeInfo.publishedDate,
                pages: β.volumeInfo.pageCount,
                link: β.volumeInfo.previewLink,
                forSale: β.saleInfo,
                image: β.volumeInfo.imageLinks.large,
            }
            for (let i in ω) {
                $('<div>').html(ω[i]).appendTo($('#details'))
            }
            return ω
        })
    }

    // Listeners
    // TODO: change/update listener location
    $(document).on('click','.search',bookSearch)
    $(document).on('click','.search-image',bookDetail)


    //document on ready closing tab//
});