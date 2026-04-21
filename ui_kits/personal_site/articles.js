// articles.js — article data store
const ARTICLES = [
  {
    slug: 'on-holding-a-small-page',
    year: '2026',
    date: 'April 2026',
    kind: 'Essay',
    title: 'On holding a small page',
    standfirst: 'A short note on restraint — what stays when you remove everything that isn\'t essential.',
    body: [
      { type: 'p', text: 'There is a version of this website that lists every project I have ever worked on, in reverse chronological order, with thumbnails and tags and a search box that nobody will use. I built that site twice. Both times I deleted it before it went live, and both times for the same reason: it was a résumé pretending to be a home.' },
      { type: 'p', text: 'What you\'re reading now is the third attempt. It has six bits of text, a cursor that writes itself across the page, and nothing else. I think about that decision most days.' },
      { type: 'h2', text: 'The room at the end of the hall' },
      { type: 'p', text: 'The best rooms I have ever been in were quiet. Not silent — quiet. There was a conversation already happening when you walked in, and the furniture was arranged so you could join it without making a scene.' },
      { type: 'quote', text: 'A page is a room. You can fill it with everything you own, or you can leave the corners empty and let people walk around.' },
      { type: 'p', text: 'I wanted a page like that. So I took everything off the walls and put back one thing at a time, and stopped the moment I felt the room ask me to stop.' },
      { type: 'hr' },
      { type: 'p', text: 'If you\'re here because we\'ve already met, the footer is a reliable door. If you\'re here for the first time, welcome — take your time.' },
    ],
  },
  {
    slug: 'a-single-gesture-repeated',
    year: '2025',
    date: 'November 2025',
    kind: 'Note',
    title: 'A single gesture, repeated',
    standfirst: 'A six-word interaction that carried an entire site.',
    body: [
      { type: 'p', text: 'The letters follow the cursor. When the cursor stops, the letters settle into a slow sine wave — the kind of idle animation a page makes when it\'s waiting for you to come back.' },
      { type: 'p', text: 'I wrote it in an afternoon. I\'ve been refining it for a year.' },
      { type: 'quote', text: 'The gesture is small enough to miss, and patient enough to still be there when you look again.' },
      { type: 'p', text: 'That\'s the whole note.' },
    ],
  },
  {
    slug: 'what-stays-when-you-remove',
    year: '2025',
    date: 'June 2025',
    kind: 'Essay',
    title: 'What stays when you remove',
    standfirst: 'A practice for subtraction, borrowed from a friend who photographs.',
    body: [
      { type: 'p', text: 'My friend photographs rooms. She works in black and white and she works very slowly. Every picture she takes begins with a longer act of walking around the room and moving things out of frame.' },
      { type: 'p', text: 'I asked her once what she was doing. She said: I\'m finding the one thing that has to be in the picture, and then I\'m removing the things that are arguing with it.' },
      { type: 'h2', text: 'Arguing' },
      { type: 'p', text: 'It\'s a good word. Most interfaces I use argue with themselves — a toolbar wants to be the point, a sidebar wants to be the point, a badge wants to be the point. The thing you came for has to shout over all of them.' },
      { type: 'quote', text: 'A page without argument is not empty. It is in agreement with itself.' },
      { type: 'p', text: 'I try to design pages that agree.' },
    ],
  },
  {
    slug: 'the-room-at-the-end-of-the-hall',
    year: '2024',
    date: 'October 2024',
    kind: 'Note',
    title: 'The room at the end of the hall',
    standfirst: 'On the kind of hospitality a website can offer.',
    body: [
      { type: 'p', text: 'You know the feeling of a house where the host has left a lamp on in the back room, just in case you want to wander there. That\'s the atmosphere I\'m after.' },
      { type: 'p', text: 'Not every page has to announce itself. Some can just sit there with the lamp on.' },
    ],
  },
];

window.ARTICLES = ARTICLES;
