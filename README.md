# double-orcid-auth-node

This repository consists of 2 simple node.js apps that demonstrate a workflow that requires 2 oauth requests. This mimics a scenario in the ORCID record auto-update workflow, where users need to grant permission to 2 systems (ex: a submission system and a DOI registration system) in order to complete the process. The first section covers the steps the user takes once the application is running. The second section details how to set up the application.

## Demo the Double OAuth Request

###1. Go the start page of the first system
In this demo the start page is a mock manuscript submission form for Pub Pals located at [localhost](https://localhost:8443/).

![localhost submission screen](/readme_images/submission_form.png "local host submission")

###2. Fill out the personal information fields as a user would as part of an article submission.
(These fields are optional in the demo, but content provided will be used in the OAuth process).

![text fields](/readme_images/author_fields.png "Add author name and email address")

###3. Click the "Create or Connect your ORCID iD" button
This will open a pop-up with the ORCID Authorization screen where you can grant access to Pub Pals. (Any information you provided in step 2 will be used to fill the registration form).

![Granting permission to Pub Pals](/readme_images/pubpals_permission.png "Grant permission to Pubpals")

###4. Grant Permission to Pub Pals
In the pop-up, sign up for a new sandbox account, or sign into an exiting one, and grant Pub Pals access to your ORCID record. When you click Authorize, Pub Pals will get your ORCID iD and permission to create and update activities on your ORCID record.

![Click Authorize](/readme_images/authorize.png "Click authorize")

###5. Return to the Pub Pals redirect URI
After granting access to Pub Pals, you'll be taken to Pub Pals redirect URI. This page includes a link to authorize a connection with DOI Dudes.

![Screen after granting permission to Pub Pals](/readme_images/pubpals_redirect.png "Redirect back to Pub Pals")

###6. Click the link to kick off granting permission to the second app
Click the "Yes, grant permission take me to DOI Dudes" button. You'll be taken to another ORCID OAuth page, this time to grant access to DOI Dudes.

![Granting permission to DOI Dudes](/readme_images/doidudes_permission.png "Grant permission to DOI Dudes")


###7. Grant permission to DOI Dudes
When you click Authorize, DOI Dudes will get your ORCID iD and permission to create and update activities on your ORCID record.

![Click Authorize](/readme_images/doidudes_authorize.png "Click authorize")

###8. Return to the DOI Dudes redirect

After granting access to DOI Dudes you will be taken to the DOI Dudes redirect URI. 

![DOI Dudes Thank you](/readme_images/doidudes_redirect.png "You have now granted DOI Dudes access to your record")

###9. Click on the Close Window button. 

You will return to the Pub Pals submission form, now complete with your ORCID iD which they captured in step 4. 

![Completed submission form](/readme_images/pubpals_complete.png "Completed Pub Pals submission form")

###10. Complete the submission process

Now both Pub Pals and DOI Dudes have access to your ORCID iD. Pub Pals used this access immediately to include your ORCID iD with the submission and DOI Dudes will use it to post the work to your ORCID record once it is published. Click the Submit button to reset the form and test again. 



## Quickstart Installation

### 1. Install NodeJS or Upgrade 

[Install it!](https://nodejs.org/)
or 
[Upgrade it!](http://davidwalsh.name/upgrade-nodejs)



### 2. Download Project

Download [zip file](https://github.com/ORCID/double-orcid-auth-node/archive/master.zip) and
 unzip.
   

### 3. Open a command prompt

* **Windows**
 
    Select `Search programs and files` type in `node.js command prompt` and select `Node.js command prompt`.
    
* **OSX**
 
    Open terminal by clicking `Search Spotlight` typing in `Terminal` and selecting Terminal.


### 4. Point the command prompt to the ```pub-pals``` directory inside the directory you just downloaded

* **Windows**

        cd Downloads/double-orcid-auth-node-master/double-orcid-auth-node-master/pub-pals

* **OSX**

        cd Downloads/double-orcid-auth-node-master/pub-pals

### 5. Install client app node dependencies
Type the following command into the command prompt and hit return.

       npm install 

### 6. (OPTIONAL) Configure credentials. 

This example is configured with default test credentials on the ORCID Sandbox. You can optionally supply your own  
sandbox credentials or other [environment variables](http://en.wikipedia.org/wiki/Environment_variable). Note that the DOI Dudes authorization is launched from the redirect URI, if you are testing with your own credentials, we suggest adding https://localhost as a redirect URI to the credentials and using the default URI. You can register for sandbox credentials at:
[http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application). 

The following configuration keys can be set when starting the client application:

* PUBPALS_CLIENT_ID - Client id issued by ORCID.
* DOIDUDES_CLIENT_ID - Client id issued by ORCID.
* PUBPALS_CLIENT_SECRET - Client secret issued by ORCID
* DOIDUDES_CLIENT_SECRET - Client secret issued by ORCID
* PUBPALS_CODE_CALLBACK_URI - Link user is sent back to with OAuth2 authorization code.
* DOIDUDES_CODE_CALLBACK_URI - Link user is sent back to with OAuth2 authorization code.
* AUTHORIZE_URI - https://sandbox.orcid.org or https://orcid.org
* TOKEN_PATH - https://sandbox.orcid.org/oauth/token or https://orcid.org/oauth/token

An example to start the application with individual sandbox credentials for the first authorization:
		PUBPALS_CLIENT_ID=APP-674MCQQR985VZZQX PUBPALS_CLIENT_SECRET=d08b711e-9411-488d-a474-46efd395884X node client-app.js


### 7. Start pubpals client application.
Type the following command into the command prompt and hit return.

       node client-app.js

Wait for the return prompt: "server started on 8443"

### 8. Open localhost [https://localhost:8443/](https://localhost:8443/)
Use your internert browser to navigate to [https://localhost:8443/](https://localhost:8443/). Since this is a demo app on localhost you'll get an invalid certificate message, follow the instructions to accepting the invalid certificate and proceeding to localhost. You now have a sample client application running on your local machine!


### 9. Open another command prompt window/tab (and keep the first one open as well!)
Return to Terminal or Node.js command prompt from step three and open a new window or new tab without closing the existing window.

### 10. Point the new command prompt to the ```doi-dudes``` directory inside the ```double-orcid-auth-node-master``` directory

Depending on how you downloaded and unzipped the project, type the following command into the command prompt and hit return. If the file is saved somewhere other than the Downloads folder update the file path to reflect the correct location.

* **Windows**

        cd Downloads/double-orcid-auth-node-master/double-orcid-auth-node-master/doi-dudes

* **OSX**

        cd Downloads/double-orcid-auth-node-master/doi-dudes

### 11. Install client app node dependencies. 
Type the following command into the command prompt and hit return.

       npm install 

### 12. (OPTIONAL) Configure credentials, as in step 6 above. 

### 13. Start doidudes client application.
Type the following command into the command prompt and hit return.

       node client-app.js

Wait for the return prompt: "server started on 9443" The DOI Dudes app runs at [https://localhost:9443/](https://localhost:9443/), however, it's not necessary to open this page in a browser in order to use the demo.
