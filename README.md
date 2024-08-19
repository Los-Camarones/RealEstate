<h1 align = "center">Domus: Real Estate Website </h1>

<h4 align="center">Developed by Los Camarones </h4>

<p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
  <a href="https://gitter.im/amitmerchant1990/electron-markdownify"><img src="https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg"></a>
  <a href="https://saythanks.io/to/bullredeyes@gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href = #developers>Developers</a> •
  <a href="#overview">Overview</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#testing">Testing</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="domusGIF.gif" alt="Your GIF" />
</p>



## Developers
Los Camarones is comprised of the following developers:
- [Julian Flores](https://github.com/ShadeManEXE). Contact and connect with me on [LinkedIn](https://www.linkedin.com/in/jflores99/)
- [Julian Pulido](https://github.com/julianpulido272) connect with me on LinkedIn [here](https://www.linkedin.com/in/julianpulido707/)!
- [Wendy Le](https://github.com/LushRamen) connect with me on LinkedIn [here](https://www.linkedin.com/in/wendy-le-36b989277/)
- [Xuanxuan Miao](https://github.com/xuanxuan002) 
- [Kumar Priyanshu Raj](https://www.linkedin.com/in/kumar-priyanshu-raj-96a9251b6/)
- [Eric Delgado](https://github.com/ERC-320-61) connect with me on LinkedIn [here](https://www.linkedin.com/in/eric-delgado-madrigal)!
- [Mohamed Ahmed](https://github.com/MohamedAhmedCS) connect with me on [LinkedIn](https://www.linkedin.com/in/mohamed-ahmed2/) and check out my [Prortfolio](https://mohamedahmedcs.github.io/)
- [Elizabeth Hernandez](https://github.com/elizabethhernandez5)

## Overview
Project Domus is a personalized real estate website for Lourdes Mendoza, an independent realtor who is currently affiliated with Big Block Realty North. The purpose of this website is to allow potential home buyers to search and virtually view properties, schedule appointments with Lourdes, and conduct market research. These features enhance efficiency, reduce environmental impact, and improve overall satisfaction, benefiting the community.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Los-Camarones/RealEstate.git

# Go into the repository
$ cd my-app

# Install dependencies
$ npm install

# Run the app
$ npm start
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Testing
# Set up Jest for unit testing:
1. Install Jest using npm:
    npm install --save-dev jest
2. Create a configuration file for Jest (jest.config.js)
3. Write unit tests for each component or module in separate test files (e.g., component.test.js).

# Set up Selenium for UI testing:
1. Install Selenium WebDriver for JavaScript:
    npm install --save-dev selenium-webdriver
2. Set up browsers for testing (e.g., ChromeDriver, GeckoDriver).
3. Write test scripts to automate UI interactions and validate UI flows.
4. Integrate Selenium tests to run as part of your continuous integration pipeline.


## Deployment
# Set up AWS deployment with Terraform and Kubernetes:
1. Set up Terraform:
    - Install Terraform if not already installed.
    - Create Terraform configuration files to define the required infrastructure on AWS.
    - Use the 'terraform init' and 'terraform apply' commands to provision the AWS resources.

2. Set up Kubernetes:
    - Ensure kubectl is installed and configured to interact with your AWS Kubernetes cluster.
    - Define Kubernetes deployment and service configurations in YAML files.
    - Use kubectl commands to manage resources, e.g., 'kubectl apply -f deployment.yaml' to deploy applications.

3. Integrate deployment process into CI/CD pipeline:

## Documentation

### Database
![image](https://github.com/Los-Camarones/RealEstate/assets/157565367/d42bb53a-a5d1-4013-bc8f-b5dac3f479f4)


#### Relational Mapping Diagram

![ERD Web-page-0](https://github.com/Los-Camarones/RealEstate/assets/149759914/88afa6e7-cdd6-44c5-843f-a923d8571392)

### Prototype
![image](https://github.com/Los-Camarones/RealEstate/assets/157565367/d8e03071-b0fb-46f2-9fcf-755db39023a4)
![image](https://github.com/Los-Camarones/RealEstate/assets/157565367/c260bdf3-2817-4a64-aa4d-2f68e15dcf18)
![image](https://github.com/Los-Camarones/RealEstate/assets/157565367/0db2f6d2-a258-41f3-966f-41e80bf1bfb4)
![image](https://github.com/Los-Camarones/RealEstate/assets/157565367/506ec153-2392-4940-a9f9-121c5b972869)
![image](https://github.com/Los-Camarones/RealEstate/assets/157565367/d3f41826-9628-4537-b3a3-5c4d5ba3a778)


## Timeline
## Sprint 3 (3/25/24 - 4/7/24)
* Front end: Homepage Creation 
	+ Landing page, navigation bar created
* Back end: Supabase Database, CI/CD created
	

## Sprint 4 (4/8/24 - 4/28/24)
* Front end: Linked Buttons, Search Bar, User Creation
	+ Buttons linking to other pages. Search bar handles user input.
* Back end: Scripts for CI/CD Automation, AWS Set UP
	+ GitHub Actions continuously integrates code within the codebase. Bash script checks the commit message.

## Sprint 5 (8/26/24 - 9/8/24)
* Front end: About Me and Buyers Page Created
	+ Engaging and friendly landing page for potential home buyers.
* Back end: CRUD actions for user account creation 
	+ Database updates in real-time to CRUD operations by user account creation

## Sprint 6 (9/9/24 - 9/23/24)
* Front end: Realtor Reviews, Admin Priveledges Created
	+ Section for users to leave reviews to the realtor. Additional privileges to admin users for extra functionality.
* Back end: Docker 
	+ Docker is fully functional and containerizes our application, allowing us to package and run applications.

## Sprint 7 (9/24/24 - 10/7/24)
* Front end: Properties Listings: Listings
	+ Incorporate listings to our properties page.
* Back end: MetroList API
	+ Implement MetroList API to pull property listings that the realtor owns.
 	+ Script to copy listings to our cloud database 

## Sprint 8 (10/8/24 - 10/21/24)
* Front end: Properties Listings: Virtual Home Viewing
	+ Incorporate virtual home viewing for each listing
* Back end: AWS Hosting, MetroList API (continued)
	+ Website is now hosted on a public domain
 	+ Each property is pinned on a Google Map, with information pulled from MetroList API.
     

## Sprint 9 (10/22/24 - 11/4/2024)
* Front end: Scheduling Appointments
	+ Scheduling capability so users can schedule phone appointments with realtor
* Back end: Calendar API, Database and Realtor Updates.
	+ Incorporate Calendar API to demonstrate realtors' availability
 	+ Database updates with scheduled appointments.
  	+ Notifies Realtor of Scheduling Appointments

## Sprint 9 (11/4/24 - 11/17/2024)
* Front end: AI Chat Bot
	+ Incorporate circular plug-in that assists users with website capability.
* Back end: Open AI API, Email/Text Notifications
	+ Incorporate Open AI API for user input and response
 	+ Email or text notifications to users from appointment creation.




## Credits

This software uses the following open source packages:

- [NextJS](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [AWS](https://aws.amazon.com/)




## License

MIT

---


