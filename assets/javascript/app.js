//  To set global variables and objects. 
var game = [
    [
        "How did Daenarys Targaryen eventually hatch her dragon eggs?",
        ["1. In a lightning storm", "2. In a funeral pyre", "3. In a fireplace", "4. In a frozen cave"],
        "2. In a funeral pyre",
        "assets/images/q1.gif",
    ],
    [
        "The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:",
        ["1. Valar Dohaeris or 'all men must serve'", "2. Valar Rohnas or 'all men must live'", "3. Valar GoGo or 'all men must dance'", "4. Valar Morghulis or 'all men must fight'"],
        "1. Valar Dohaeris or 'all men must serve'",
        "assets/images/q2.gif",
    ],
    [
        "What is the only thing that can put out volatile Wildfire?",
        ["1. Sand", "2. Water", "3. Dragon's blood", "4. Sunlight"],
        "1. Sand",
        "assets/images/q3.gif",
    ],
    [
        "Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
        ["1. Weirwood", "2. Wildfire", "3. Valyrian Steel", "4. Magma"],
        "3. Valyrian Steel",
        "assets/images/q4.gif",
    ],
    [
        "Arya's punishment for stealing from the Many-Face God is:",
        ["1. Death", "2. Memory Loss", "3. Blindness", "4. A Broken Arm"],
        "3. Blindness",
        "assets/images/q5.gif",
    ],
    [
        "What was the name of Ned Stark's greatsword?",
        ["1. Oathkeeper", "2. Deathbringer", "3. Northguard", "4. Ice"],
        "4. Ice",
        "assets/images/q6.gif",
    ],
    [
        "Who shoots the flaming arrow that subsequently destroy's Stannis' fleet in Blackwater Bay?",
        ["1. Tyrion Lannister", "2. King Joffrey", "3. Jaime Lannister", "4. Bronn"],
        "4. Bronn",
        "assets/images/q7.gif",
    ],
    [
        "Prince Oberyn Martell is nicknamed the 'Red Viper' because of his combat and:",
        ["1. Pride in drawing blood first", "2. Knowledge of poisons", "3. Nighttime attacks", "4. Ruby-colored armor"],
        "2. Knowledge of poisons",
        "assets/images/q8.gif",
    ],
    [
        "The Night King was created using a dagger made of:",
        ["1. Blue Ice", "2. Valyrian Steel", "3. Dragonglass", "4. Obsidian"],
        "3. Dragonglass",
        "assets/images/q9.gif",
    ],
    [
        "How many arrows does Ramsay Bolton let loose at Rickon Stark?",
        ["1. Three", "2. Four", "3. Five", "4. Six"],
        "2. Four",
        "assets/images/q10.gif",
    ],
]

var b = $.extend(true, [], game);
var qCountdown;
var ans;
var counter;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var button = $(".optBtn");
var start = $("#startBtn");
var question = $("#question");
var answer = $("#answer");
var unans = $("#unanswered");
var countdown = $("#timeout");
var image = $("#image");
var gif;
var options;
var qCounter=0;


$(document).ready(function () {
    // To hide certain HTML elements before the game starts.
    button.hide();

    // To Initiate the newGame function.
    function newGame() {
        nextQuestion();
    }

    // To initiate the nextQuestion function. 
    function nextQuestion() {
        countdown.show();
        question.show();
        button.show();
        start.hide();
        answer.empty();
        unans.empty();
        image.empty();
        button.off("click");

        // Set the ending condition to display the results page. 
        if (qCounter === 10) {
            countdown.hide();
            question.hide();
            button.hide();
            start.show();
            clearInterval(qCountdown);
            answer.text("You guessed " + correct + " questions correctly, and " + incorrect + " questions incorrectly.");
            unans.text("You did not answer " + unanswered + " questions.");

        } else {
            test();
            // Set a condition and display for if the counter reaches 0.
            counter = 10;
            qCountdown = setInterval(function () {
                counter--;
                countdown.text(counter);
                if (counter === 0) {
                    b.shift();
                    clearInterval(qCountdown);
                    countdown.hide();
                    button.hide();
                    answer.text("The correct answer is " + ans + ".");
                    image.append(gif);
                    unans.text("Uh oh, you did not answer the question in time.");
                    unanswered++;
                    qCounter++;
                    window.setTimeout(nextQuestion, 4000);
                    return;
                }
            }, 1000);
        };

        var quest = question.text(b[0][0]);
        ans = b[0][2];
        gif = $("<img style='height: 420px; width: 100%; max-width: 680px;'>").attr("src", b[0][3]);

        // To assign each option button with one of the four options.
        for (i = 0; i < 4; i++) {
            btns = {
                generator: function () {
                    return b[0][1][i];
                }
            };

            button.each(function () {
                $(this).text(btns.generator());
                $(this).attr("data-value", btns.generator());
                i++;
            });
        }
    };
    function test() {
        // On-click function for the buttons to register a correct or incorrect guess. 
        button.on("click", function () {
            button.hide();
            console.log("You clicked a button once");
            console.log(qCounter);
            options = $(this).attr("data-value");
            countdown.hide();
            question.hide();
            clearInterval(qCountdown);
            window.setTimeout(nextQuestion, 4000);
            b.shift();
            if (options === ans) {
                answer.text("You guessed correctly, the answer is " + ans);
                image.append(gif);
                qCounter++;
                correct++;
                return;
            } else {
                answer.text("You guessed incorrectly, the answer is " + ans);
                image.append(gif);
                qCounter++;
                incorrect++;
            };
        });

    }

    $("#startBtn").on("click", function () {
        qCounter = 0;
        b = $.extend(true, [], game);
        newGame();
    })
});