const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');





let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden=false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden= true;
}
// show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Checks for author
    if(quote.author==null) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Checks if quote is long
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    // hide loader
    complete();
}


// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {

    }
}

// tweet
function tweetQuote() {
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textcontent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes();