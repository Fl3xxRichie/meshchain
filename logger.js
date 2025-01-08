import chalk from 'chalk';
import gradient from 'gradient-string';
import boxen from 'boxen';

const ICONS = {
    info: chalk.blue('ℹ'),
    warn: chalk.yellow('⚠'),
    error: chalk.red('✖'),
    success: chalk.green('✓'),
    debug: chalk.magenta('⚙'),
    start: chalk.cyan('▶'),
    stop: chalk.red('■'),
    pending: chalk.yellow('⋯')
};

const GRADIENTS = {
    header: gradient(['#FF512F', '#DD2476']),
    success: gradient(['#00b09b', '#96c93d']),
    error: gradient(['#FF0000', '#FF4136']),
    info: gradient(['#56CCF2', '#2F80ED'])
};

// Helper function to create timestamp
const getTimestamp = () => {
    const now = new Date();
    return chalk.gray(`[${now.toLocaleTimeString()}]`);
};

// Helper function to format messages in a box
const boxMessage = (message, type) => {
    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue'
    };
    return boxen(message, boxenOptions);
};

export function logger(message, level = 'info', details = '') {
    const timestamp = getTimestamp();
    const icon = ICONS[level] || ICONS.info;

    switch (level) {
        case 'header':
            console.log('\n' + boxMessage(GRADIENTS.header(message), level));
            break;

        case 'success':
            console.log(`${timestamp} ${icon} ${chalk.green.bold(message)} ${chalk.gray(details)}`);
            break;

        case 'error':
            console.log(`${timestamp} ${icon} ${chalk.red.bold(message)} ${chalk.gray(details)}`);
            break;

        case 'warn':
            console.log(`${timestamp} ${icon} ${chalk.yellow.bold(message)} ${chalk.gray(details)}`);
            break;

        case 'debug':
            console.log(`${timestamp} ${icon} ${chalk.magenta(message)} ${chalk.gray(details)}`);
            break;

        case 'start':
            console.log(`${timestamp} ${icon} ${chalk.cyan(message)} ${chalk.gray(details)}`);
            break;

        case 'stop':
            console.log(`${timestamp} ${icon} ${chalk.red(message)} ${chalk.gray(details)}`);
            break;

        case 'pending':
            console.log(`${timestamp} ${icon} ${chalk.yellow(message)} ${chalk.gray(details)}`);
            break;

        default:
            console.log(`${timestamp} ${icon} ${chalk.blue(message)} ${chalk.gray(details)}`);
    }
}

// Progress bar functionality
let progressInterval;

export function startProgress(message) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    process.stdout.write('\n');
    progressInterval = setInterval(() => {
        process.stdout.write(`\r${chalk.cyan(frames[i])} ${message}`);
        i = (i + 1) % frames.length;
    }, 80);
}

export function stopProgress(finalMessage = '') {
    if (progressInterval) {
        clearInterval(progressInterval);
        process.stdout.write('\r' + ' '.repeat(process.stdout.columns) + '\r');
        if (finalMessage) {
            logger(finalMessage, 'success');
        }
    }
}