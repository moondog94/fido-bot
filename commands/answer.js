const Command = require('./command')
const rp = require('request-promise')

const resArr = [ 'Are you trying to ask a question?',
                'Hey are you doing me a bamboozle with that question?',
                'Aroo? I don\'t seem to understand that question. :dog:',
                'I may be intelligent, but I\'m not wise enough to answer that',
                'Ummmmm...idk',
                'It\'s times like these I like to give this advice: Google it',
                'Go ask your mother',
                'Go ask your father',
                '¯\\_(ツ)_/¯',
                'I actually don\'t know that answer',
                'I\'m having a hard time understanding you',
                'There\'s either two things at play here: You\'re too stupid to ask a proper question or I\'m too stupid to answer that. \n*(Hint: It\'s probably me)*',
                'Good question....moving on.']

const dogArr = ['Woof!', 'Bark!', 'Bork!', 'Boof!', 'Ruff!']

class Answer extends Command {
    constructor(cmd, params) {
        super(cmd, params, '!fetch answer [query]    Ask a question and I\'ll answer!')
    }

    async runCommand() {
        try {
            if (this.params.length === 0)
                return 'You need to ask a question if you want me to answer! :dog:'

            const question = this.params.join(' ')
            if (question.toLowerCase() == 'are you a dog?' || question.toLowerCase() == 'are you a dog!')
                return dogArr[Math.floor(Math.random() * dogArr.length)] + ' :dog:';

            const wolframURL = `http://api.wolframalpha.com/v1/result?appid=${process.env.WOLFRAM_APPID}&i=${encodeURIComponent(question)}`

            const response = await rp(wolframURL)

            return response.replace('Wolfram Alpha', 'Flawless Intelligent Dog OS or Fido for short')
        } catch (e) {
            // statements
            return resArr[Math.floor(Math.random() * resArr.length)];
        }

    }
};

module.exports = Answer;