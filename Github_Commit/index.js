const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

// Function to make commits
const makeCommit = (n, totalCommits, startDate) => {
    const git = simpleGit();

    if (n === 0) {
        return git.push()
            .then(() => console.log('Push successful!'))
            .catch(err => console.error('Push failed:', err));
    }

    // Calculate the number of days to add based on the total commits and current commit number
    const daysToAdd = totalCommits - n;
    const DATE = moment(startDate).add(daysToAdd, 'days').format();
    
    const data = {
        date: DATE
    };
    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, () => {
        git.add([FILE_PATH]).commit(DATE, { '--date': DATE },
            makeCommit.bind(this, --n, totalCommits, startDate)
        );
    });
};

// Example usage:
// To make 20 commits starting from '2025-07-30' in the current repository:
const numberOfCommits = 20; // Define the total number of commits here
makeCommit(numberOfCommits, numberOfCommits, '2025-07-30');
