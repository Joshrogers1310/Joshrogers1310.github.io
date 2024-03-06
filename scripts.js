window.addEventListener("DOMContentLoaded",
  function () {
    const element = document.getElementById("heroContent");

    const typeSentenceAndUntype = async (text) => new Promise (async resolve => {
        // Get total time and divide it by three.
        const dividedTime = 8000 / 4;
        
        document.querySelector('#heroContent').classList.remove('blinking');

        // Loop over each character in the sentence.
        for (const character of text) {
            // Wait for amount of time depending on sentence length between typing new character.
            await new Promise(resolve => setTimeout(resolve, dividedTime / text.length));
            
            // Add new character to element text.
            element.textContent = `${element.textContent}${character}`;
        }
        
        document.querySelector('#heroContent').classList.add('blinking');

        // Wait for another third of the time so that it doesn't untype instantly.
        await new Promise(resolve => setTimeout(resolve, dividedTime * 2));
        
        document.querySelector('#heroContent').classList.remove('blinking');

        // Loop over all characters in sentence.
        for (const character in element.textContent) {
            // Wait for amount of time depending on sentence length between typing new character.
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // Create an array from element text and remove the last in array.
            let textContent = [...element.textContent];
            textContent.pop();
            
            // Set the element text.
            element.textContent = textContent.join('');
        }

        document.querySelector('#heroContent').classList.add('blinking');
    })
    
    setTimeout(() => {
      typeSentenceAndUntype("on a $1000 budget");
    }, 500);

    gsap.set('.first-indicator', {opacity: 1});
    gsap.set('.second-indicator', {opacity: 0.4});
    gsap.set('.third-indicator', {opacity: 0.4});

    let timeline = gsap.timeline({ease: "power2.out", repeat: 100});

    timeline.to('.first-indicator', {
      opacity: 1,
      onStart: function () {
        gsap.to('.firstVid', {opacity: 1});
        gsap.to('.secondVid', {opacity: 1});
        gsap.to('.thirdVid', {opacity: 1});
        gsap.to('.second-indicator', {opacity: .4});
        gsap.to('.third-indicator', {opacity: .4});
      }
    })
    timeline.to('.first-indicator', {
      opacity: .4,
      onStart: function () {
        gsap.to('.second-indicator', {opacity: 1});
        gsap.to('.firstVid', {opacity: 0});
        typeSentenceAndUntype("in March where it's warm");
      }
    }, "+=8")
    timeline.to('.second-indicator', {
      opacity: .4,
      onStart: function () {
        gsap.to('.third-indicator', {opacity: 1});
        gsap.to('.secondVid', {opacity: 0});
        typeSentenceAndUntype("for the best time");
      }
    }, "+=8")
    timeline.to('.third-indicator', {
      opacity: .4,
      onStart: function () {
        gsap.to('.first-indicator', {opacity: 1});
        gsap.to('.thirdVid', {opacity: 0});
        gsap.to('.firstVid', {opacity: 1});
        typeSentenceAndUntype("on a $1000 budget");
      }
    }, "+=8")
})