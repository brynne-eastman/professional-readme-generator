// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const util = require('util');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('You need to enter your project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project. (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('You need to enter a project description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    { 
        type: 'checkbox',
        name: 'languages',
        message: 'What technologies did you use to create this project? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'jQuery', 'Bootstrap', 'Node']
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions of how to use your app.',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    { 
        type: 'checkbox',
        name: 'license',
        message: 'What kind of license should your project have?',
        choices: ['MIT', 'GNU', 'Apache'],
        default: ['MIT'],
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please choose a license!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'May other users contribute to your repository?',
    },
    {
        type: 'input',
        name:'contributing',
        message: 'Please enter your guidelines for contributing.',
        when: ({ confirmContributing }) => {
            if (confirmContributing) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Is testing available?'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please explain how users can test your application.',
        when: ({ confirmTest }) => {
            if (confirmTest) {
                return true;
            } else {
                return false;
            }
        }
    }
];    
//end of question array

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
           return console.log(err);
        } else {
            console.log('Success! Your README.md file has been generated!');
        };
    });
};

const createReadMe = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try {
        //prompt inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log('Thank you! The current data is being generated into your README.me: ', userResponses);

        const markdown = generateMarkdown(userResponses);
        console.log(markdown);

        await createReadMe('ExampleREADME', markdown);
    } catch (err) {
        console.log(err);
    }
};

// Function call to initialize app
init();
