"use strict";

import Navbar from './page/element/navbar.js'

import Home     from './page/home.js'
import Login    from './page/login.js'
import Register from './page/register.js'

import UserProfile from './page/userProfile.js'
import UserHome from './page/userHome.js'

import Error404 from './page/error.js'

import Utils from './lib/utils.js'

// List of supported routes. 
// Any url other than these routes will throw a 404 error
const routes = {
    '/'          : Home
    ,'/login'    : Login
    ,'/register' : Register
    ,'/userprofile' : UserProfile
    ,'/userhome' : UserHome
};

// Router takes a URL, checks against the list of supported routes and then renders the corresponding content page
const router = async () => { // function always returns a promise

    firebase.auth().onAuthStateChanged(user => {
        console.log(window.user);
        if (user) {
            // User is signed in.
            console.log("User is signed in");
            const displayName = user.displayName;
            const email = user.email;
            // const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            // const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            const providerData = user.providerData;
            console.log(`name: ${displayName}, email: ${email}, photo: ${photoURL}, uid: ${uid}, provider: ${providerData}`);
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            
        }
    });

    // load view element
    const header  = document.getElementById('header-container'); 
    const content = null || document.getElementById('page-container'); // If the first value is false, it checks the second value 
    
    // Render the header of the page
    header.innerHTML = await Navbar.render(); // wait till the promise resolves
    await Navbar.after_render();
    
    // Get the page from the hash of supported routes.
    let request = Utils.parseRequestURL();
    //console.log(request);
    
    // Parse the URL and if it has an id part, change it with the string ":id"
    // condition ? exprIfTrue : exprIfFalse 
    let parsedURL = (request.resource ? '/' + request.resource : '/') 
        + (request.id ? '/:id' : '') 
        + (request.verb ? '/' + request.verb : '');
        //console.log(parsedURL);
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404; 
    content.innerHTML = await page.render();
    await page.after_render();    
}

// Listen on hash change:
window.addEventListener('hashchange', router); // The event occurs when there has been changes to the anchor part of a URL
// Listen on page load:
window.addEventListener('load', router); // The event occurs when an object has loaded