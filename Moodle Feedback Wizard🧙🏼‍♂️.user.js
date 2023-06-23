// ==UserScript==
// @name        Moodle Feedback Wizard🧙🏼‍♂️
// @namespace   https://github.com/NineXYZ/Naishi-Scripts/
// @supportURL  https://github.com/NineXYZ/Naishi-Scripts/
// @version     1.0
// @author      NineXYZ
// @license     GPLv3
// @description Auto-fill (Rating as "good") and auto-complete the "Send us your Opinion" forms within the courses on the Moodle platform of Universidad Latina de Panamá. 
// @match       https://moodle.ulatina.edu.pa/course/view.php?id=*
// @match       https://moodle.ulatina.edu.pa/mod/feedback/view.php?id=*
// @match       https://moodle.ulatina.edu.pa/mod/feedback/complete.php?id=*&courseid
// @match       https://moodle.ulatina.edu.pa/mod/feedback/complete.php*
// @grant       none
// @run-at      document-end
// @inject-into content
// ==/UserScript==

// Function to click on "Bueno" buttons
function clickBuenoButton() {
    console.log("Inside clickBuenoButton function...");
    let buenoButtons = Array.from(document.querySelectorAll('input[type="radio"]'));
    console.log(`Found ${buenoButtons.length} radio buttons...`);

    buenoButtons.forEach(button => {
        let label = button.parentElement.textContent.trim();
        console.log(`Radio button label: ${label}`);

        if(label === 'Bueno') {
            console.log(`Found 'Bueno' button, clicking it...`);
            button.click();
        }
    });
}

function clickEnviarButton() {
    document.querySelector('input[name="savevalues"]').click();
}

// Function to click on "Continuar" button
function clickContinuarButton() {
    console.log("Inside clickContinuarButton function...");
    let continuarButton = document.querySelector('button.btn.btn-primary');

    if(continuarButton) {
        console.log("Found 'Continuar' button, clicking it...");
        continuarButton.click();
    } else {
        console.log("'Continuar' button not found!");
    }
}

// Function to find feedback link and click
function clickFeedbackLink() {
    console.log("Inside clickFeedbackLink function...");
    let feedbackItems = Array.from(document.querySelectorAll('.activity.feedback.modtype_feedback'));
    console.log(`Found ${feedbackItems.length} feedback items...`);

    feedbackItems.forEach(item => {
        let feedbackLinkText = item.querySelector('.instancename').textContent;
        let feedbackStatusText = item.querySelector('.activity-mod-engagement a').textContent;
        console.log(`Feedback item text: ${feedbackLinkText} ${feedbackStatusText}`);

        if(feedbackLinkText.includes('Envíanos tu') && feedbackStatusText.includes('No enviado')) {
            let feedbackLink = item.querySelector('.activityinstance a');
            console.log(`Found matching feedback item, navigating to: ${feedbackLink.href}`);
            window.location.href = feedbackLink.href;
        }
    });
}

function clickContestarButton() {
    document.querySelector('.complete-feedback a').click();
}

var url = window.location.href;
if (url.match(/https:\/\/moodle.ulatina.edu.pa\/course\/view.php\?id=.*/)) {
    console.log('URL is the course view page...');
    setTimeout(clickFeedbackLink, 1000);
} else if (url.match(/https:\/\/moodle.ulatina.edu.pa\/mod\/feedback\/view.php\?id=.*/)) {
    console.log('URL is the feedback view page...');
    setTimeout(clickContestarButton, 1000);
} else if (url.match(/https:\/\/moodle.ulatina.edu.pa\/mod\/feedback\/complete.php\?id=.*&courseid/)) {
    console.log('URL is the feedback complete page...');
    setTimeout(clickBuenoButton, 1000);
    setTimeout(clickEnviarButton, 1500);
    setTimeout(clickContinuarButton, 1000);
} else if (url.includes("mod/feedback/complete.php")) {
    console.log("URL is the feedback complete page...");
    setTimeout(clickBuenoButton, 1000);
    setTimeout(clickContinuarButton, 1000);
}
