import { type Config } from 'prettier';

const config: Config = {
    /* Spacings */
    bracketSpacing: true,
    tabWidth: 4,
    useTabs: false,
    /* Wrap */
    objectWrap: 'preserve',
    printWidth: 80,
    /* Punctuations */
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    /* Miscellaneous */
    arrowParens: 'always',
};

export default config;
