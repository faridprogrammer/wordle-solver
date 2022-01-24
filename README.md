# Another Wordle Solver
A simple word enumerator for [wordle](https://www.powerlanguage.co.uk/wordle/) game. Its not using regular expressions just for fun! :D

## NPM package
This package is available on npm. To install it you can use the following command.

`npm i another-wordle-solver`

## How to run

Just run the following command.

`npx another-wordle-solver`

## Application flow

In this package there are some questions which will be asked in order to help proceed the flow. 

### 1
`Enter word letter count - useful when there is no pattern: (default is 5)`

Simply set the character count of your desired word. In case of classic wordle you can pass this question without answer. To do this simply press <kbd>Enter</kbd>.

### 2
`Enter known letters - leave empty for non (For example if last three letter are known in "HELLO" word. You can use the following pattern **LLO):`

Enter your word pattern with wildcard pattern used. The example is shown on the question itself.
### 3
`Is there any known characters which you do not know the exact places (yes/no - default is no)?`

If there is any letter that your know is present in your word but you do not aware of the exact place of it, enter `yes`, otherwise `no`
### 4
`Enter characters comma seperated (like A, B, C):`

If your answer to the previous question is `yes`, you need to enter letters in comma seperated fashion. This helps the algorithm to limit the possible words which will be shown to you. 
### 5
`Write results to file in home directory? (yes/no - default is no)?`

Say `yes` to this question if you want to save results in a text file. This should be useful when there are a lot of possible words. To say no to this question you can simply press <kbd>Enter</kbd>.

## How it words

This npm package uses a simple pattern and enumerates all **meaningful** words to be seen by user and help he/she quess the correct word.

Only you need to follow some questions which will be asked and enter requested info. 

This solvers also takes known characters which their locations are not known yet into account.

## DISCLAIMER

This package has been developed as a hobby and for fun. I DO NOT recommend using any tool like this to solve games. 
