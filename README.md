# Book Series Tracker

As an avid reader, I have trouble keeping track of books that I read, especially if they are part of an ongoing series. This app helps me track my favorite authors so that I know when a new release is available.

## Screenshots
Desktop:

![Desktop](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-screenshot-01.png)
![Desktop](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-screenshot-02.png)
![Desktop](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-screenshot-03.png)
![Desktop](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-screenshot-04.png)
![Desktop](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-screenshot-05.png)

Mobile:

![Mobile](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-iphone-screenshot-00.jpg)
![Mobile](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-iphone-screenshot-01.jpg)
![Mobile](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-iphone-screenshot-02.jpg)
![Mobile](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-iphone-screenshot-03.jpg)
![Mobile](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-iphone-screenshot-04.jpg)
![Mobile](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/jobget-iphone-screenshot-05.jpg)


## Use Case
This app helps readers track books they have read and learn about new book releases by those authors.

## User stories
1.1 As a visitor, I want to land on website and learn what it is about.
![Wireframe](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/wireframe-01.jpg)

1.2 As a visitor, I can sign up for an account in order to create a profile.
1.3 As a user, I can log into my account in order to save my progress.
2.2 As a user, I can update my password in case I forget it and need to log in.
1.4 As a user, I can search for books or authors I have read so that I can add them to my profile.
1.6 As a user, I can add books to my profile so that I can keep track of what I have read.
1.5 As a user, I can view my dashboard when I log in in order to see integrated data about my account.
1.7 As a user, I can view a list of new releases by authors I follow so that I can find new books in a series.
2.3 As a user, I can remove new releases from the list if I am uninterested in order to clean up the results.
1.8 As a user, I can add new releases to my profile in order to follows those authors or indicated I have read the book.
2.1 As a user, I can click on a book in the list for a plot summary so that I can refresh my memory on the book.
3.3 As a user, I can group books by genre.
3.4 As a user, I can group books by series in order to better organize my profile.
3.1 As a user, I can select favorites from my library in order to better organize my profile.
3.2 As a user, I can remove books from my profile in order to clear space if I no longer want to follow the author.
3.5 As a user, I can indicate if a books series is complete in order to better organize my profile.


## Initial UX
![Wireframe](https://raw.githubusercontent.com/Marjona6/job-get-node-capstone/master/public/img/wireframe-01.jpg)

## Working Prototype
You can access a working prototype of the app at [https://job-get.herokuapp.com](https://job-get.herokuapp.com).

## Functionality
This app is based on the concept of a [funnel system](https://timsstrategy.com/how-to-create-a-job-search-funnel/) as a strategy for organizing a job search. With this app, users can keep their job searches organized from the initial stage of identifying a new lead through six funnel stages:
* New Leads
* Qualified Leads
* Contact/Apply
* Interview
* Offer
* Negotiate

Users create a username and password that is used to sign in and to save and access their personal job leads. As job leads progress through the funnel stages, users can push their job leads along in the app to track the current status of each lead. Users can update information in their job leads or delete them entirely at any stage of the process.

Information that can be added to a job lead includes:
* Position title
* Company name
* Company overview
* Company size
* Position location
* Salary/benefit information
* Job description
* Date of application
* Contact name
* Contact email
* Application materials required (e.g., CV, resume, cover letter)
* Interview date
* Interview follow-up
* Source of lead
* Notes
* Overall desirability rating

## Technical
This app is built using HTML, CSS, JavaScript, jQuery, and Node.js.

Usernames, encrypted passwords (encrypted using salted hashing with [bcrypt.js](https://www.npmjs.com/package/bcryptjs)), and job lead information are stored and accessed from an [mLab](https://mlab.com) database.

Other technologies used include MongoDB, Mongoose, Passport, Express, Mocha, and Chai.

The app is designed to be responsive across desktop, tablet, and mobile platforms.

## Development Roadmap
This app was built for use in my own job search, but I hope other job seekers will find value in it as well. I hope to continually improve the app for a better user experience and a more pleasant job search for all users.

Additional enhancements to the app are expected to include:
* Password reset capability.
* Enhanced security by sending AJAX requests including usernames through the back end only.
* Improved username and password validation to ensure that:
* users cannot use an email address that has already been signed up
* users see an "incorrect password" message if their usernames are correct but passwords are incorrect (they currently see a generic "user does not exist, please sign up" message)
* users must enter a username in email format
* passwords must be of at least a minimum length.
* Improved testing.
* Integration with an automated email service to allow users to receive information and updates regarding the app or job searches in general.
* Integration with a browser extension (yet to be built) that allows users to import data from job postings directly into their JobGet account.
* Allowing users to customize the categories of information they wish to include for their job leads; for example, including two interview stages instead of one.
* Adding drag-and-drop functionality to job leads to move them from one funnel stage to another.
* Fixing bugs and responding to user feedback to make finding your dream job an even better experience.
