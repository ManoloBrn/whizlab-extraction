function extractQuestionsAndAnswers() {
    console.log('Inside extractQuestionsAndAnswers function');
    const questions = document.querySelectorAll(
      '#content-area > div.page-content > div > div.review-answerSection > div > div > div.box-content > div.que-group > div.que'
    );
  
    const answers = document.querySelectorAll(
        '#content-area > div.page-content > div > div.review-answerSection > div > div > div.box-content > div.que-group > div.answer > ul'
      );      
  
    const explanations = document.querySelectorAll(
    '#content-area > div.page-content > div > div.review-answerSection > div > div > div.box-content > div.explanation-block'
    );
      
    console.log('Questions:', questions);
    console.log('Answers:', answers);
  
    const extractedData = Array.from(questions).map((question, index) => {
        const answerListItems = Array.from(answers[index].querySelectorAll('li'));
        const answerText = answerListItems.map((li) => li.textContent.trim()).join('\n');
      
        return {
          question: question.textContent.trim(),
          answers: answerText,
          explanation: explanations[index].textContent.trim(),
        };
      });
      
      
  
      const formattedData = extractedData
      .map((item, index) => {
        return (
          `Pregunta ${index + 1}: ${item.question}\n` +
          `Respuestas:\n` +
          `${item.answers}\n` +
          `\n` +
          `${item.explanation}`
        );
      })
      .join('\n\n');
    
  
    console.log('Formatted data:', formattedData);
  
    sendMessageToOpenNewTab(formattedData);
  }
  
  function sendMessageToOpenNewTab(text) {
    console.log('Inside sendMessageToOpenNewTab function');
    const encodedText = encodeURIComponent(text);
    chrome.runtime.sendMessage({
      type: 'OPEN_NEW_TAB',
      encodedText: encodedText,
    });
  }
  extractQuestionsAndAnswers();
