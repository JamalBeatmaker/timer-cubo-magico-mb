/**
 * 0 - waiting for start (show animated arrows pointing to the buttons)
 */
/**
 * 1 - ready to start    (A and B are held, show solid square)
 */
/**
 * state values:
 */
/**
 * 3 - showing result    (Show chequered flag when timer stops, then shows the time repeatedly)
 */
input.onButtonPressed(Button.A, function () {
    // If 'showing result'
    if (state == 3) {
        // Go to 'waiting for start'
        state = 0
    }
})
/**
 * touching two bananas! Other fruits are available.
 */
input.onButtonPressed(Button.AB, function () {
    // If 'showing result'
    if (state == 3) {
        // Go to 'waiting for start'
        state = 0
    }
})
input.onButtonPressed(Button.B, function () {
    // If 'showing result'
    if (state == 3) {
        // Go to 'waiting for start'
        state = 0
    }
})
/**
 * on-board buttons, e.g. start and stop the timer using big external buttons, or even
 */
/**
 * Rubik's Cube / Cup Stack Timer (JavaScript version)
 */
/**
 * by James Shaughnessy - See www.demonstudios.com/microbit.html for more micro:bit apps!
 */
/**
 * Installing Instructions For Copying and Pasting Code:
 */
/**
 * 1. Launch the MakeCode Editor from microbit.org
 */
/**
 * 2. Select "New Project" ensuring 'Code options' shows either "Blocks, JavaScript or Python" or "JavaScript Only"
 */
/**
 * 3. It launches in Blocks mode, so select JavaScript at the top to switch to JavaScript mode
 */
/**
 * 4. Highlight all the placeholder text in the window (is just an empty basic.forever() function)
 */
/**
 * 5. Paste this entire program into the empty window. It should automatically compile
 */
/**
 * 6. [Optional] Run on the editor's micro:bit to test it works OK
 */
/**
 * 7. Click 'Download' on the bottom left to save the HEX file
 */
/**
 * 8. Follow the instructions below for loading a downladed HEX file directly
 */
/**
 * Installing Instructions For loading a downloaded HEX file directly:
 */
/**
 * 1. Connect your micro:bit to your computer. It should show up as a device called MICROBIT.
 */
/**
 * 2. Drag the downloaded HEX file onto the MICROBIT drive and the Operating System should install the code
 */
/**
 * 3. The program should run automatically
 */
/**
 * Changelog:
 */
/**
 * v1.0 (First release for CodeKingdoms JavaScript Editor)
 */
/**
 * v1.1 (Fixed to work properly on actual hardware)
 */
/**
 * v1.2 (Updated for the new MakeCode Editor in JavaScript mode (can be auto-converted to Blocks or Python))
 */
/**
 * Instructions for Use:
 */
/**
 * You must press A and B to both start and stop the timer, just like official competition timers
 */
/**
 * Accurate to 1 millisecond (0.001 of a second), and displays the time in mm:ss.sss format
 */
/**
 * (or just ss.sss if under one minute)
 */
/**
 * While running a nifty animated analogue split-second hand spins around
 */
/**
 * Feel free to change the code, reuse, remove these credits and pass on as desired!
 */
/**
 * Why not see how you could improve/optimise the code, or perhaps add new features,
 */
/**
 * eg. a minute clock hand, a pre-solve 15 second inspection-time countdown (for speedcubing)
 */
/**
 * This could even be modified to read the pins on the micro:bit so that instead of using the fiddly
 */
/**
 * 2 - running           (show animated clock hand)
 */
let timeString = ""
let milliseconds = 0
let seconds = 0
let minutes = 0
let s = 0
let runTime = 0
let timeAtEnd = 0
let timeAtStart = 0
let state = 0
// The main loop
while (true) {
    if (state == 0) {
        // state = 'waiting for start'
        // If both buttons are pressed down
        if (input.pinIsPressed(TouchPin.P1) && input.pinIsPressed(TouchPin.P2)) {
            // Go to 'ready to start'
            state = 1
            basic.plotLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `);
        } else if (Math.floor(input.runningTime() % 1000) < 500) {
            // We are under the half second, so draw the arrows apart,
            // but not drawing an arrow if either A or B are held
            if (input.pinIsPressed(TouchPin.P1)) {
                basic.plotLeds(`
                . . . . .
                . . . # .
                . . . # #
                . . . # .
                . . . . .
                `);
            } else if (input.pinIsPressed(TouchPin.P2)) {
                basic.plotLeds(`
                . . . . .
                . # . . .
                # # . . .
                . # . . .
                . . . . .
                `);
            } else {
                basic.plotLeds(`
                . . . . .
                . # . # .
                # # . # #
                . # . # .
                . . . . .
                `);
            }
        } else {
            // We are over the half second, so draw the arrows together,
            // but not drawing an arrow if either A or B are held
            if (input.pinIsPressed(TouchPin.P1)) {
                basic.plotLeds(`
                . . . . .
                . . # . .
                . . # # .
                . . # . .
                . . . . .
                `);
            } else if (input.pinIsPressed(TouchPin.P2)) {
                basic.plotLeds(`
                . . . . .
                . . # . .
                . # # . .
                . . # . .
                . . . . .
                `);
            } else {
                basic.plotLeds(`
                . . . . .
                . . # . .
                . # # # .
                . . # . .
                . . . . .
                `);
            }
        }
    } else if (state == 1) {
        // state = 'Ready to start'
        // If either button is now no longer pressed then we can start
        if (!(input.pinIsPressed(TouchPin.P1)) || !(input.pinIsPressed(TouchPin.P2))) {
            // Record the running time at the start
            timeAtStart = input.runningTime()
            // Go to 'running'
            state = 2
            basic.clearScreen()
        }
    } else if (state == 2) {
        // state = 'Running'
        // If both button are pressed then we can stop the timer
        if (input.pinIsPressed(TouchPin.P1) && input.pinIsPressed(TouchPin.P2)) {
            // Record the actual timer run time, which is the difference
            // between the time at the start stored earlier (timeAtStart)
            // and the runningTime at the end
            timeAtEnd = input.runningTime()
            runTime = timeAtEnd - timeAtStart
            basic.plotLeds(`
                # . # . #
                . # . # .
                # . # . #
                . # . # .
                # . # . #
                `);
pause(1000);
// Go to 'showing result'
            state = 3
        } else {
            // Show an animated clock hand where one rotation is one second
            // There are 16 positions for the hand (hence why the divisor is 16)
            runTime = input.runningTime() - timeAtStart
            s = Math.floor(runTime % 1000)
            // If under 1/16th of a second (1000ms / 16)
            if (s < 1000 / 16) {
                basic.plotLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . . . .
                . . . . .
                `);
            } else if (s < 2000 / 16) {
                basic.plotLeds(`
                . . . # .
                . . . # .
                . . # . .
                . . . . .
                . . . . .
                `);
            } else if (s < 3000 / 16) {
                basic.plotLeds(`
                . . . . #
                . . . # .
                . . # . .
                . . . . .
                . . . . .
                `);
            } else if (s < 4000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . #
                . . # # .
                . . . . .
                . . . . .
                `);
            } else if (s < 5000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # # #
                . . . . .
                . . . . .
                `);
            } else if (s < 6000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . # #
                . . . . .
                `);
            } else if (s < 7000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . # .
                . . . . #
                `);
            } else if (s < 8000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . # . .
                . . . # .
                `);
            } else if (s < 9000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . # . .
                . . # . .
                `);
            } else if (s < 10000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . # . . .
                . # . . .
                `);
            } else if (s < 11000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . . # . .
                . # . . .
                # . . . .
                `);
            } else if (s < 12000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                . # # . .
                # . . . .
                . . . . .
                `);
            } else if (s < 13000 / 16) {
                basic.plotLeds(`
                . . . . .
                . . . . .
                # # # . .
                . . . . .
                . . . . .
                `);
            } else if (s < 14000 / 16) {
                basic.plotLeds(`
                . . . . .
                # # . . .
                . . # . .
                . . . . .
                . . . . .
                `);
            } else if (s < 15000 / 16) {
                basic.plotLeds(`
                # . . . .
                . # . . .
                . . # . .
                . . . . .
                . . . . .
                `);
            } else {
                basic.plotLeds(`
                . # . . .
                . . # . .
                . . # . .
                . . . . .
                . . . . .
                `);
            }
        }
    } else {
        // state = 'show result'
        // Shows the time repeatedly while in the end of game state
        basic.clearScreen()
        // Construct a string that converts total milliseconds into mm:ss.sss,
        // adding leading zeroes if needed to the seconds and milliseconds
        // If the time is under one minute the number of minutes and the colon are omitted
        minutes = Math.floor(runTime / 60000)
        seconds = Math.floor(runTime / 1000 % 60)
        milliseconds = Math.floor(runTime % 1000)
        // If a minute or more
        if (minutes > 0) {
            // Add the number of minutes onto the string
            timeString = "" + timeString + minutes + ":"
            // If the number of seconds is under 10 add a leading zero
            if (seconds < 10) {
                timeString = "" + timeString + "0"
            }
        }
        // Add the number of seconds onto the string
        timeString = "" + timeString + seconds + "."
        // Add leading zeroes as needed
        if (milliseconds < 100) {
            timeString = "" + timeString + "0"
            if (milliseconds < 10) {
                timeString = "" + timeString + "0"
            }
        }
        // Add the number of milliseconds onto the time
        timeString = "" + timeString + milliseconds
        // Show the time string
        basic.showString(timeString)
    }
}
