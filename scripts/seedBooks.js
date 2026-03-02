const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const books = [
  // Business & Entrepreneurship
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    read_time_mins: 15,
    published_year: 2018
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    isbn: "9780307887894",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg",
    read_time_mins: 18,
    published_year: 2011
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    isbn: "9780804139298",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg",
    read_time_mins: 16,
    published_year: 2014
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    isbn: "9780066620992",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780066620992-L.jpg",
    read_time_mins: 17,
    published_year: 2001
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    isbn: "9781591846444",
    category: "Leadership",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781591846444-L.jpg",
    read_time_mins: 14,
    published_year: 2009
  },
  {
    title: "The 4-Hour Work Week",
    author: "Tim Ferriss",
    isbn: "9780307353139",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780307353139-L.jpg",
    read_time_mins: 19,
    published_year: 2007
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    isbn: "9781633691780",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781633691780-L.jpg",
    read_time_mins: 18,
    published_year: 1997
  },
  {
    title: "Blue Ocean Strategy",
    author: "W. Chan Kim",
    isbn: "9781591396192",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781591396192-L.jpg",
    read_time_mins: 16,
    published_year: 2005
  },
  {
    title: "The E-Myth Revisited",
    author: "Michael Gerber",
    isbn: "9780887307287",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780887307287-L.jpg",
    read_time_mins: 17,
    published_year: 1995
  },
  {
    title: "Scaling Up",
    author: "Verne Harnish",
    isbn: "9781942958303",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781942958303-L.jpg",
    read_time_mins: 18,
    published_year: 2014
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    isbn: "9780062273208",
    category: "Business",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780062273208-L.jpg",
    read_time_mins: 16,
    published_year: 2014
  },
  {
    title: "Daring Greatly",
    author: "Brené Brown",
    isbn: "9781592407330",
    category: "Leadership",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781592407330-L.jpg",
    read_time_mins: 15,
    published_year: 2012
  },
  {
    title: "Extreme Ownership",
    author: "Jocko Willink",
    isbn: "9781250185563",
    category: "Leadership",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781250185563-L.jpg",
    read_time_mins: 14,
    published_year: 2015
  },
  {
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    isbn: "9781591848011",
    category: "Leadership",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781591848011-L.jpg",
    read_time_mins: 16,
    published_year: 2014
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    isbn: "9780743269513",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg",
    read_time_mins: 18,
    published_year: 1989
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "9781455586691",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    read_time_mins: 15,
    published_year: 2016
  },
  {
    title: "Essentialism",
    author: "Greg McKeown",
    isbn: "9780804137386",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780804137386-L.jpg",
    read_time_mins: 14,
    published_year: 2014
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    isbn: "9780142000281",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780142000281-L.jpg",
    read_time_mins: 17,
    published_year: 2001
  },
  {
    title: "The ONE Thing",
    author: "Gary Keller",
    isbn: "9781885167774",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781885167774-L.jpg",
    read_time_mins: 15,
    published_year: 2013
  },
  {
    title: "Indistractable",
    author: "Nir Eyal",
    isbn: "9780525536450",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780525536450-L.jpg",
    read_time_mins: 14,
    published_year: 2019
  },
  // Psychology & Self-Help
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
    read_time_mins: 20,
    published_year: 2011
  },
  {
    title: "Mindset",
    author: "Carol Dweck",
    isbn: "9780345472328",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780345472328-L.jpg",
    read_time_mins: 16,
    published_year: 2006
  },
  {
    title: "Grit",
    author: "Angela Duckworth",
    isbn: "9781501111109",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781501111109-L.jpg",
    read_time_mins: 15,
    published_year: 2016
  },
  {
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    isbn: "9780553383713",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780553383713-L.jpg",
    read_time_mins: 17,
    published_year: 1995
  },
  {
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    isbn: "9780061339202",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780061339202-L.jpg",
    read_time_mins: 18,
    published_year: 1990
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    isbn: "9781577314806",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",
    read_time_mins: 16,
    published_year: 1997
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    isbn: "9780807014295",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
    read_time_mins: 14,
    published_year: 1946
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    isbn: "9780062457714",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",
    read_time_mins: 15,
    published_year: 2016
  },
  {
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    isbn: "9781592858491",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781592858491-L.jpg",
    read_time_mins: 14,
    published_year: 2010
  },
  {
    title: "Untamed",
    author: "Glennon Doyle",
    isbn: "9781984859729",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781984859729-L.jpg",
    read_time_mins: 16,
    published_year: 2020
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn: "9780399590504",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    read_time_mins: 18,
    published_year: 2018
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "9781524763138",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg",
    read_time_mins: 19,
    published_year: 2018
  },
  {
    title: "You Are a Badass",
    author: "Jen Sincero",
    isbn: "9780762447695",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780762447695-L.jpg",
    read_time_mins: 13,
    published_year: 2013
  },
  {
    title: "The Magic of Thinking Big",
    author: "David Schwartz",
    isbn: "9780671646783",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780671646783-L.jpg",
    read_time_mins: 16,
    published_year: 1959
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    isbn: "9780671027032",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg",
    read_time_mins: 17,
    published_year: 1936
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    isbn: "9780449214923",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780449214923-L.jpg",
    read_time_mins: 16,
    published_year: 1937
  },
  // Finance
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    isbn: "9781612680194",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    read_time_mins: 15,
    published_year: 1997
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    isbn: "9780060555665",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780060555665-L.jpg",
    read_time_mins: 20,
    published_year: 1949
  },
  {
    title: "The Little Book of Common Sense Investing",
    author: "John Bogle",
    isbn: "9781119404507",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781119404507-L.jpg",
    read_time_mins: 14,
    published_year: 2007
  },
  {
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    isbn: "9780393358384",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780393358384-L.jpg",
    read_time_mins: 18,
    published_year: 1973
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    isbn: "9780857197689",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    read_time_mins: 15,
    published_year: 2020
  },
  {
    title: "I Will Teach You to Be Rich",
    author: "Ramit Sethi",
    isbn: "9781523505746",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781523505746-L.jpg",
    read_time_mins: 16,
    published_year: 2009
  },
  {
    title: "The Simple Path to Wealth",
    author: "JL Collins",
    isbn: "9781533667922",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781533667922-L.jpg",
    read_time_mins: 14,
    published_year: 2016
  },
  {
    title: "Your Money or Your Life",
    author: "Vicki Robin",
    isbn: "9780143129290",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780143129290-L.jpg",
    read_time_mins: 17,
    published_year: 1992
  },
  {
    title: "The Millionaire Next Door",
    author: "Thomas Stanley",
    isbn: "9781589795474",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781589795474-L.jpg",
    read_time_mins: 16,
    published_year: 1996
  },
  {
    title: "The Total Money Makeover",
    author: "Dave Ramsey",
    isbn: "9781592555764",
    category: "Finance",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781592555764-L.jpg",
    read_time_mins: 15,
    published_year: 2003
  },
  // Science
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    read_time_mins: 19,
    published_year: 2011
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "9780553380163",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    read_time_mins: 17,
    published_year: 1988
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    isbn: "9780198575191",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780198575191-L.jpg",
    read_time_mins: 18,
    published_year: 1976
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    isbn: "9780345331359",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780345331359-L.jpg",
    read_time_mins: 18,
    published_year: 1980
  },
  {
    title: "The Origin of Species",
    author: "Charles Darwin",
    isbn: "9780140432054",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780140432054-L.jpg",
    read_time_mins: 20,
    published_year: 1859
  },
  {
    title: "A Short History of Nearly Everything",
    author: "Bill Bryson",
    isbn: "9780767908184",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780767908184-L.jpg",
    read_time_mins: 19,
    published_year: 2003
  },
  {
    title: "The Elegant Universe",
    author: "Brian Greene",
    isbn: "9780375708114",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780375708114-L.jpg",
    read_time_mins: 18,
    published_year: 1999
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    isbn: "9781476733523",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781476733523-L.jpg",
    read_time_mins: 19,
    published_year: 2016
  },
  {
    title: "The Body",
    author: "Bill Bryson",
    isbn: "9780385539302",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780385539302-L.jpg",
    read_time_mins: 18,
    published_year: 2019
  },
  {
    title: "Astrophysics for People in a Hurry",
    author: "Neil deGrasse Tyson",
    isbn: "9780393609394",
    category: "Science",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780393609394-L.jpg",
    read_time_mins: 14,
    published_year: 2017
  },
  // Philosophy
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    isbn: "9780812968255",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg",
    read_time_mins: 15,
    published_year: 180
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    isbn: "9781599869773",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781599869773-L.jpg",
    read_time_mins: 12,
    published_year: -500
  },
  {
    title: "The Republic",
    author: "Plato",
    isbn: "9780140455113",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780140455113-L.jpg",
    read_time_mins: 18,
    published_year: -380
  },
  {
    title: "Nicomachean Ethics",
    author: "Aristotle",
    isbn: "9780872204645",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780872204645-L.jpg",
    read_time_mins: 17,
    published_year: -350
  },
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    isbn: "9780679724650",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780679724650-L.jpg",
    read_time_mins: 16,
    published_year: 1886
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    isbn: "9780679720201",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780679720201-L.jpg",
    read_time_mins: 15,
    published_year: 1942
  },
  {
    title: "Existentialism is a Humanism",
    author: "Jean-Paul Sartre",
    isbn: "9780300084559",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780300084559-L.jpg",
    read_time_mins: 13,
    published_year: 1946
  },
  {
    title: "The Consolations of Philosophy",
    author: "Alain de Botton",
    isbn: "9780679779179",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780679779179-L.jpg",
    read_time_mins: 15,
    published_year: 2000
  },
  {
    title: "How to Live",
    author: "Sarah Bakewell",
    isbn: "9781594203355",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781594203355-L.jpg",
    read_time_mins: 16,
    published_year: 2010
  },
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    isbn: "9780812988406",
    category: "Philosophy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780812988406-L.jpg",
    read_time_mins: 14,
    published_year: 2016
  },
  // Additional Popular Books
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    isbn: "9780316017930",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780316017930-L.jpg",
    read_time_mins: 16,
    published_year: 2008
  },
  {
    title: "The Tipping Point",
    author: "Malcolm Gladwell",
    isbn: "9780316346627",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780316346627-L.jpg",
    read_time_mins: 15,
    published_year: 2000
  },
  {
    title: "Blink",
    author: "Malcolm Gladwell",
    isbn: "9780316010665",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780316010665-L.jpg",
    read_time_mins: 14,
    published_year: 2005
  },
  {
    title: "David and Goliath",
    author: "Malcolm Gladwell",
    isbn: "9780316204361",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780316204361-L.jpg",
    read_time_mins: 15,
    published_year: 2013
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780061122415",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    read_time_mins: 13,
    published_year: 1988
  },
  {
    title: "The Five Love Languages",
    author: "Gary Chapman",
    isbn: "9780802473156",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780802473156-L.jpg",
    read_time_mins: 12,
    published_year: 1992
  },
  {
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    isbn: "9780310267305",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780310267305-L.jpg",
    read_time_mins: 16,
    published_year: 2002
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    isbn: "9781878424310",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781878424310-L.jpg",
    read_time_mins: 11,
    published_year: 1997
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    isbn: "9781582701707",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781582701707-L.jpg",
    read_time_mins: 12,
    published_year: 2006
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    isbn: "9780812981605",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg",
    read_time_mins: 15,
    published_year: 2012
  },
  {
    title: "Quiet",
    author: "Susan Cain",
    isbn: "9780307352156",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780307352156-L.jpg",
    read_time_mins: 16,
    published_year: 2012
  },
  {
    title: "Predictably Irrational",
    author: "Dan Ariely",
    isbn: "9780061353239",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780061353239-L.jpg",
    read_time_mins: 15,
    published_year: 2008
  },
  {
    title: "Influence",
    author: "Robert Cialdini",
    isbn: "9780061241895",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780061241895-L.jpg",
    read_time_mins: 16,
    published_year: 1984
  },
  {
    title: "The Willpower Instinct",
    author: "Kelly McGonigal",
    isbn: "9781583334386",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781583334386-L.jpg",
    read_time_mins: 14,
    published_year: 2011
  },
  {
    title: "Stumbling on Happiness",
    author: "Daniel Gilbert",
    isbn: "9780307477107",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780307477107-L.jpg",
    read_time_mins: 15,
    published_year: 2006
  },
  {
    title: "Switch",
    author: "Chip Heath",
    isbn: "9780385528757",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780385528757-L.jpg",
    read_time_mins: 14,
    published_year: 2010
  },
  {
    title: "Nudge",
    author: "Richard Thaler",
    isbn: "9780300122237",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780300122237-L.jpg",
    read_time_mins: 15,
    published_year: 2008
  },
  {
    title: "The Paradox of Choice",
    author: "Barry Schwartz",
    isbn: "9780062447420",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780062447420-L.jpg",
    read_time_mins: 13,
    published_year: 2004
  },
  {
    title: "Drive",
    author: "Daniel Pink",
    isbn: "9781594484803",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781594484803-L.jpg",
    read_time_mins: 14,
    published_year: 2009
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    isbn: "9781936891026",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781936891026-L.jpg",
    read_time_mins: 12,
    published_year: 2002
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    isbn: "9781594634726",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781594634726-L.jpg",
    read_time_mins: 14,
    published_year: 2015
  },
  {
    title: "Rising Strong",
    author: "Brené Brown",
    isbn: "9780812995273",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780812995273-L.jpg",
    read_time_mins: 15,
    published_year: 2015
  },
  {
    title: "Braving the Wilderness",
    author: "Brené Brown",
    isbn: "9780812995761",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780812995761-L.jpg",
    read_time_mins: 14,
    published_year: 2017
  },
  {
    title: "Dare to Lead",
    author: "Brené Brown",
    isbn: "9780399592522",
    category: "Leadership",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780399592522-L.jpg",
    read_time_mins: 16,
    published_year: 2018
  },
  {
    title: "The Compound Effect",
    author: "Darren Hardy",
    isbn: "9780735213793",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780735213793-L.jpg",
    read_time_mins: 13,
    published_year: 2010
  },
  {
    title: "The Miracle Morning",
    author: "Hal Elrod",
    isbn: "9780979019732",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780979019732-L.jpg",
    read_time_mins: 13,
    published_year: 2012
  },
  {
    title: "High Performance Habits",
    author: "Brendon Burchard",
    isbn: "9781401952313",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781401952313-L.jpg",
    read_time_mins: 15,
    published_year: 2017
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    isbn: "9781443450066",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781443450066-L.jpg",
    read_time_mins: 14,
    published_year: 2018
  },
  {
    title: "Finish",
    author: "Jon Acuff",
    isbn: "9780718078731",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780718078731-L.jpg",
    read_time_mins: 12,
    published_year: 2017
  },
  {
    title: "The 80/20 Principle",
    author: "Richard Koch",
    isbn: "9781857882005",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781857882005-L.jpg",
    read_time_mins: 14,
    published_year: 1997
  },
  {
    title: "The Power of Full Engagement",
    author: "Jim Loehr",
    isbn: "9780743226752",
    category: "Productivity",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780743226752-L.jpg",
    read_time_mins: 14,
    published_year: 2003
  },
  {
    title: "The Upside of Stress",
    author: "Kelly McGonigal",
    isbn: "9781583335284",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781583335284-L.jpg",
    read_time_mins: 13,
    published_year: 2015
  },
  {
    title: "The Happiness Project",
    author: "Gretchen Rubin",
    isbn: "9780061583260",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780061583260-L.jpg",
    read_time_mins: 14,
    published_year: 2009
  },
  {
    title: "Better Than Before",
    author: "Gretchen Rubin",
    isbn: "9780385348614",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780385348614-L.jpg",
    read_time_mins: 13,
    published_year: 2015
  },
  {
    title: "The Four Tendencies",
    author: "Gretchen Rubin",
    isbn: "9780451489284",
    category: "Psychology",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780451489284-L.jpg",
    read_time_mins: 13,
    published_year: 2017
  },
  {
    title: "Outer Order, Inner Calm",
    author: "Gretchen Rubin",
    isbn: "9781984854719",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781984854719-L.jpg",
    read_time_mins: 12,
    published_year: 2019
  },
  {
    title: "The Life-Changing Magic of Tidying Up",
    author: "Marie Kondo",
    isbn: "9781607747307",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781607747307-L.jpg",
    read_time_mins: 13,
    published_year: 2011
  },
  {
    title: "Spark Joy",
    author: "Marie Kondo",
    isbn: "9781607749721",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781607749721-L.jpg",
    read_time_mins: 12,
    published_year: 2016
  },
  {
    title: "Minimalism",
    author: "Joshua Fields Millburn",
    isbn: "9780143130447",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780143130447-L.jpg",
    read_time_mins: 13,
    published_year: 2016
  },
  {
    title: "Everything That Remains",
    author: "Joshua Fields Millburn",
    isbn: "9781938793052",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9781938793052-L.jpg",
    read_time_mins: 12,
    published_year: 2014
  },
  {
    title: "The More of Less",
    author: "Joshua Becker",
    isbn: "9780718037134",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780718037134-L.jpg",
    read_time_mins: 13,
    published_year: 2016
  },
  {
    title: "Love Does",
    author: "Bob Goff",
    isbn: "9780718037134",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780718037134-L.jpg",
    read_time_mins: 13,
    published_year: 2012
  },
  {
    title: "Everybody Always",
    author: "Bob Goff",
    isbn: "9780718078731",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780718078731-L.jpg",
    read_time_mins: 13,
    published_year: 2018
  },
  {
    title: "Dream Big",
    author: "Bob Goff",
    isbn: "9780718078731",
    category: "Self-Help",
    cover_url: "https://covers.openlibrary.org/b/isbn/9780718078731-L.jpg",
    read_time_mins: 13,
    published_year: 2020
  }
];

const summaries = [
  {
    book_id: "atomic-habits",
    summary: "Atomic Habits by James Clear presents a comprehensive framework for building good habits and breaking bad ones. The core premise is that massive change comes from tiny, consistent actions rather than dramatic overhauls. Clear introduces the concept of 'atomic habits' - small habits that compound over time to produce remarkable results. He outlines a four-step model for habit formation: cue, craving, response, and reward. The book provides practical strategies for each step: make it obvious (cue), make it attractive (craving), make it easy (response), and make it satisfying (reward). Clear emphasizes the importance of identity-based habits - becoming the type of person who embodies the desired behavior rather than just focusing on outcomes. He also discusses habit stacking, environment design, and the two-minute rule for starting new habits. The book is filled with scientific research and real-world examples that make the concepts accessible and actionable. Clear's approach is both practical and inspiring, showing how small changes can lead to extraordinary results over time.",
    key_insights: [
      "Habits are the compound interest of self-improvement - small changes compound into remarkable results",
      "Focus on identity change rather than outcome-based goals to create lasting habits",
      "Make good habits obvious, attractive, easy, and satisfying to ensure they stick",
      "Use habit stacking to link new behaviors to existing routines",
      "Environment design is crucial - make good choices easy and bad choices difficult"
    ]
  },
  {
    book_id: "the-lean-startup",
    summary: "The Lean Startup by Eric Ries revolutionizes how we think about building new businesses. Ries argues that startups exist not just to make stuff, make money, or serve customers, but to learn how to build a sustainable business. The core methodology is the Build-Measure-Learn feedback loop, which emphasizes rapid experimentation and validated learning over elaborate planning. Ries introduces concepts like Minimum Viable Product (MVP), pivot or persevere decisions, and innovation accounting. He argues that failure is a necessary part of the learning process and that startups should embrace 'validated learning' through continuous testing and iteration. The book provides a scientific approach to entrepreneurship that reduces waste and increases the chances of success. Ries draws on his experience as a startup founder and advisor to illustrate how companies can achieve success by being more agile, data-driven, and customer-focused. The methodology has been adopted by startups and large corporations alike as a way to innovate more effectively.",
    key_insights: [
      "Startups exist to learn how to build a sustainable business model",
      "Use the Build-Measure-Learn feedback loop to validate assumptions quickly",
      "Minimum Viable Products help test hypotheses with minimum resources",
      "Pivot when necessary based on validated learning from customer feedback",
      "Innovation accounting helps measure progress and make data-driven decisions"
    ]
  },
  {
    book_id: "zero-to-one",
    summary: "Zero to One by Peter Thiel presents a contrarian view on innovation and entrepreneurship. Thiel argues that the most valuable companies create something entirely new (going from 0 to 1) rather than copying what already exists (going from 1 to n). He shares insights from his experience as co-founder of PayPal and early investor in Facebook, arguing that successful startups have unique insights that others miss. Thiel introduces the concept of 'definite optimism' - believing in a specific vision for the future and working to create it. He discusses the importance of monopoly power, network effects, and proprietary technology in building lasting businesses. The book covers topics from technology and globalization to the future of humanity, always challenging conventional wisdom. Thiel's contrarian thinking extends to his advice on hiring, company culture, and even the meaning of life. He argues that the best way to predict the future is to create it yourself.",
    key_insights: [
      "True innovation creates something entirely new (0 to 1) rather than copying existing models",
      "Monopolies are good for innovation - they have the freedom to think long-term",
      "Definite optimism - believe in a specific future and work to create it",
      "Competition is for losers - focus on creating unique value instead",
      "Secrets are the key to breakthrough thinking - look for truths others haven't discovered"
    ]
  },
  {
    book_id: "good-to-great",
    summary: "Good to Great by Jim Collins explores why some companies make the leap from good to great while others don't. Collins and his research team spent five years analyzing data to identify companies that sustained exceptional performance over 15+ years. They discovered that greatness isn't about luck or charismatic leadership, but about disciplined people, disciplined thought, and disciplined action. The book introduces several key concepts: Level 5 Leadership (humble yet driven leaders), First Who Then What (getting the right people on the bus before deciding where to go), The Hedgehog Concept (finding the intersection of passion, what you can be best at, and what drives your economic engine), and the Flywheel Effect (small consistent efforts that build momentum). Collins also discusses the importance of confronting brutal facts while maintaining faith in eventual success. The book provides a framework that applies not just to business but to any organization seeking sustained excellence.",
    key_insights: [
      "Level 5 Leaders combine personal humility with intense professional will",
      "Get the right people on the bus before deciding where to drive it",
      "Great companies focus on their Hedgehog Concept - what they can be best at",
      "Success comes from consistent effort in the right direction (Flywheel Effect)",
      "Confront the brutal facts of reality while maintaining unwavering faith"
    ]
  },
  {
    book_id: "start-with-why",
    summary: "Start With Why by Simon Sinek explores the fundamental question of why some organizations and leaders are more innovative, influential, and profitable than others. Sinek introduces the Golden Circle model, which consists of three concentric circles: Why (the core purpose), How (the process), and What (the result). He argues that most organizations communicate from the outside in (What-How-Why), but inspiring leaders communicate from the inside out (Why-How-What). This approach appeals to the emotional part of the brain first, building loyalty and trust. Sinek uses examples from Apple, Martin Luther King Jr., and the Wright brothers to illustrate how starting with Why creates movements rather than just customers. The book explains how this principle applies to leadership, company culture, marketing, and personal fulfillment. Sinek shows that when people share your Why, they'll work with blood, sweat, and tears, not just for money.",
    key_insights: [
      "Inspiring leaders communicate from Why to How to What, not the reverse",
      "People don't buy what you do, they buy why you do it",
      "The limbic brain controls feelings and decision-making, not language",
      "Starting with Why creates loyalty and trust beyond rational transactions",
      "Your Why should remain constant while your How and What can evolve"
    ]
  },
  {
    book_id: "the-4-hour-work-week",
    summary: "The 4-Hour Workweek by Tim Ferriss challenges traditional notions of work and retirement. Ferriss argues that the 'deferred life plan' of working hard for 40 years to enjoy retirement is outdated. Instead, he proposes a new approach: design your lifestyle to maximize freedom and minimize work time. The book introduces the DEAL framework: Definition (eliminate outdated concepts), Elimination (focus only on high-value activities), Automation (build systems that run themselves), and Liberation (free yourself from geographical constraints). Ferriss shares practical strategies for outsourcing, virtual assistants, automated income streams, and lifestyle design. He emphasizes the importance of 'mini-retirements' throughout life rather than waiting until old age. The book is filled with specific tools, websites, and resources for implementing these ideas. While controversial, it has influenced millions to reconsider their relationship with work and time.",
    key_insights: [
      "Focus on effectiveness (doing the right things) rather than efficiency",
      "Use Parkinson's Law to your advantage - work expands to fill available time",
      "Outsource everything that doesn't require your unique skills",
      "Create automated income streams that don't require your constant presence",
      "Take mini-retirements throughout life instead of waiting for traditional retirement"
    ]
  },
  {
    book_id: "thinking-fast-and-slow",
    summary: "Thinking, Fast and Slow by Nobel laureate Daniel Kahneman explores the two systems that drive how we think: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberate, logical). Kahneman shows that while System 1 is essential for everyday functioning, it's also prone to systematic errors and biases. The book reveals how these two systems interact and often conflict, leading to poor decisions. Kahneman introduces concepts like cognitive ease, anchoring, availability heuristics, and loss aversion. He demonstrates how overconfidence can affect professional judgments and how framing influences choices. The book also explores the concept of 'experienced self' versus 'remembering self' and how this affects our life satisfaction. Through decades of research, Kahneman provides insights into why we make the decisions we do and how we can make better ones by recognizing and compensating for our cognitive biases.",
    key_insights: [
      "System 1 thinking is fast and intuitive but prone to systematic errors",
      "System 2 thinking is slow and deliberate but requires mental energy",
      "Cognitive biases affect even experts and professionals",
      "Loss aversion makes us fear losses more than we value equivalent gains",
      "Understanding these systems helps us make more rational decisions"
    ]
  },
  {
    book_id: "mindset",
    summary: "Mindset by Carol Dweck presents decades of research on how our beliefs about ability shape our success. Dweck identifies two mindsets: the fixed mindset (believing abilities are static) and the growth mindset (believing abilities can be developed). People with a growth mindset embrace challenges, persist through setbacks, and see effort as the path to mastery. Those with a fixed mindset avoid challenges, give up easily, and see effort as fruitless. Dweck shows how these mindsets develop in childhood and affect every area of life: academics, sports, business, and relationships. The book provides strategies for cultivating a growth mindset in ourselves and others. Dweck demonstrates that changing our mindset can transform our lives, turning obstacles into opportunities and failures into learning experiences. The research shows that even small changes in how we think about ability can have profound effects on achievement.",
    key_insights: [
      "Growth mindset people see abilities as developable through effort and learning",
      "Fixed mindset people believe abilities are static and fear looking incompetent",
      "Praise effort and strategy rather than intelligence or talent",
      "View challenges as opportunities to grow rather than threats to ego",
      "The brain is like a muscle - it grows stronger with exercise and learning"
    ]
  },
  {
    book_id: "grit",
    summary: "Grit by Angela Duckworth argues that the secret to outstanding achievement is not talent but a special blend of passion and persistence she calls 'grit.' Duckworth, a psychologist and MacArthur Fellow, shows that grit is a better predictor of success than IQ, talent, or luck. She defines grit as having four components: interest, practice, purpose, and hope. The book explores how gritty people pursue long-term goals with passion and perseverance, bouncing back from setbacks and staying the course. Duckworth shares stories from West Point cadets, National Spelling Bee champions, and successful business leaders to illustrate grit in action. She also provides practical strategies for cultivating grit in ourselves and others. The book challenges the 'natural talent' myth and shows that effort counts twice in the achievement equation. Duckworth's research suggests that anyone can develop grit through deliberate practice and finding purpose in their pursuits.",
    key_insights: [
      "Grit equals passion plus perseverance for long-term goals",
      "Effort counts twice: it builds skill and makes skill productive",
      "Deliberate practice - focused, goal-oriented effort - builds expertise",
      "Hope is essential - believing tomorrow can be better than today",
      "Cultivate interest, practice, purpose, and hope to develop grit"
    ]
  },
  {
    book_id: "emotional-intelligence",
    summary: "Emotional Intelligence by Daniel Goleman revolutionized our understanding of what it means to be smart. Goleman argues that EI - the ability to recognize, understand, and manage our own emotions and those of others - is more important than IQ for success in life. The book breaks EI into five components: self-awareness, self-regulation, motivation, empathy, and social skills. Goleman shows how these skills affect relationships, leadership, health, and decision-making. He demonstrates that emotions are not the enemy of reason but essential to effective thinking and action. The book draws on neuroscience and psychology to explain how the brain processes emotions and how we can develop better emotional habits. Goleman provides practical strategies for improving each aspect of emotional intelligence. The research shows that people with high EI tend to be more successful leaders, have better relationships, and enjoy better health outcomes.",
    key_insights: [
      "Emotional intelligence can be more important than IQ for life success",
      "Self-awareness is the foundation - recognize your emotions as they happen",
      "Self-regulation involves managing impulses and thinking before acting",
      "Empathy allows you to understand others' emotions and perspectives",
      "Social skills combine emotional awareness with effective communication"
    ]
  },
  {
    book_id: "flow",
    summary: "Flow by Mihaly Csikszentmihalyi explores the state of optimal experience he calls 'flow' - those moments when we're so absorbed in an activity that time seems to disappear. Csikszentmihalyi, a pioneering psychologist, shows that flow occurs when there's a perfect balance between challenge and skill. The book explains the characteristics of flow: clear goals, immediate feedback, deep concentration, and a sense of control. Flow experiences lead to personal growth, creativity, and life satisfaction. Csikszentmihalyi shows how to create more flow in work, relationships, and daily life. He argues that happiness isn't something that happens to us but something we can cultivate by structuring our lives to create flow experiences. The book provides a scientific understanding of enjoyment and practical guidance for living a more engaging and fulfilling life. Flow represents a revolutionary approach to psychology that focuses on positive experiences rather than pathology.",
    key_insights: [
      "Flow occurs when challenge and skill are perfectly balanced",
      "Clear goals and immediate feedback are essential for flow states",
      "Flow leads to personal growth and increased life satisfaction",
      "Structure your life to create more flow experiences",
      "The quality of experience matters more than the quantity of pleasure"
    ]
  },
  {
    book_id: "the-power-of-now",
    summary: "The Power of Now by Eckhart Tolle presents a spiritual guide to living in the present moment. Tolle argues that most human suffering comes from being trapped in past regrets or future anxieties rather than experiencing the present. He introduces the concept of the 'pain-body' - accumulated emotional pain that feeds on negative thoughts. The book teaches how to disidentify from the thinking mind and connect with deeper consciousness. Tolle explains that the present moment is all we ever have and that true peace and enlightenment come from embracing it. He provides practical techniques for staying present, including observing your thoughts without judgment and focusing on inner body sensations. The book has helped millions find relief from anxiety, depression, and stress by learning to live more fully in the now. Tolle's message is both simple and profound: the key to spiritual awakening is to realize that you are not your thoughts but the awareness behind them.",
    key_insights: [
      "The present moment is the only time that truly exists",
      "Most suffering comes from psychological time - past and future thinking",
      "You are not your thoughts but the awareness that observes thoughts",
      "The pain-body feeds on negative emotions and resistance to the present",
      "True freedom comes from accepting the present moment as it is"
    ]
  },
  {
    book_id: "mans-search-for-meaning",
    summary: "Man's Search for Meaning by Viktor Frankl is a profound meditation on finding meaning in suffering. Frankl, a psychiatrist and Holocaust survivor, describes his experiences in Nazi concentration camps and how he found meaning even in the most horrific circumstances. He argues that humans' primary drive is not pleasure but the pursuit of meaning. Frankl developed logotherapy, which helps people discover their purpose in life. The book is divided into two parts: his camp experiences and an explanation of logotherapy. Frankl shows that even when everything is taken away, humans still retain the freedom to choose their attitude. He demonstrates how meaning can be found through work, love, and courage in the face of suffering. The book has inspired millions with its message that meaning can be found in any circumstance. Frankl's insights come from both his professional expertise and his personal experience of extreme suffering.",
    key_insights: [
      "The primary human drive is the will to meaning, not pleasure",
      "Even in suffering, we retain the freedom to choose our attitude",
      "Meaning can be found through work, love, and courage in adversity",
      "Those who have a 'why' to live can bear almost any 'how'",
      "Logotherapy helps people discover their unique purpose in life"
    ]
  },
  {
    book_id: "rich-dad-poor-dad",
    summary: "Rich Dad Poor Dad by Robert Kiyosaki challenges conventional financial wisdom through the story of his two fathers: his highly educated but poor biological father, and his best friend's entrepreneurial and wealthy father. Kiyosaki contrasts their different approaches to money, showing how the rich think differently about assets, liabilities, and financial education. The book emphasizes the importance of financial literacy over academic achievement. Kiyosaki introduces concepts like the cashflow quadrant, the difference between assets and liabilities, and the power of passive income. He argues that the middle class works for money while the rich have money work for them. The book encourages readers to build businesses and invest in assets that generate cash flow. While controversial, it has inspired millions to take control of their financial education and pursue financial independence through entrepreneurship and investing.",
    key_insights: [
      "Assets put money in your pocket, liabilities take money out",
      "The rich buy or create assets, the middle class buy liabilities",
      "Financial education is more important than academic education",
      "Work to learn, not just to earn - acquire skills that build wealth",
      "Mind your own business - build a system that works without you"
    ]
  },
  {
    book_id: "sapiens",
    summary: "Sapiens by Yuval Noah Harari is a sweeping history of humankind from the Stone Age to the present. Harari explores how Homo sapiens came to dominate the planet through unique cognitive abilities. He argues that the key to human success was the ability to create and believe in shared fictions - things like gods, nations, money, and human rights that exist only in our collective imagination. The book covers three major revolutions: the Cognitive Revolution (70,000 years ago), the Agricultural Revolution (12,000 years ago), and the Scientific Revolution (500 years ago). Harari examines how these revolutions transformed human society, for better and worse. He also speculates about the future of humanity, including the possibility of genetic engineering and artificial intelligence. The book challenges readers to question fundamental assumptions about human nature, progress, and the meaning of life. Sapiens has become a global phenomenon for its accessible yet profound exploration of human history.",
    key_insights: [
      "Shared fictions (gods, nations, money) enabled large-scale human cooperation",
      "The Agricultural Revolution was history's biggest fraud - humans worked harder for worse nutrition",
      "Money is the most successful story ever told - everyone believes in it",
      "Science and capitalism are interdependent systems driving modern progress",
      "The future of humanity may involve genetic engineering and artificial intelligence"
    ]
  },
  {
    book_id: "deep-work",
    summary: "Deep Work by Cal Newport argues that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare and valuable. Newport defines deep work as professional activities performed in a state of distraction-free concentration that push cognitive capabilities to their limit. He contrasts this with shallow work - non-cognitively demanding tasks that can be performed while distracted. The book shows how deep work produces better results in less time and is essential for mastering difficult skills. Newport provides strategies for cultivating deep work: embracing boredom, scheduling deep work sessions, and creating distraction-free environments. He also explains how to measure the value of your work and say no to shallow commitments. Newport argues that deep work is becoming more valuable as automation handles routine tasks, making it the key to career success and personal fulfillment. The book is both a manifesto for focused work and a practical guide to achieving it.",
    key_insights: [
      "Deep work produces exponentially better results than shallow work",
      "The ability to focus deeply is becoming increasingly rare and valuable",
      "Schedule deep work sessions like appointments and protect them rigorously",
      "Embrace boredom to train your brain to resist distraction",
      "Measure your work by depth of focus, not hours spent"
    ]
  },
  {
    book_id: "the-7-habits",
    summary: "The 7 Habits of Highly Effective People by Stephen Covey presents a holistic approach to personal and professional effectiveness. Covey argues that true effectiveness requires character development, not just quick fixes. The habits are organized into three categories: Private Victory (habits 1-3), Public Victory (habits 4-6), and Renewal (habit 7). The habits are: Be Proactive, Begin with the End in Mind, Put First Things First, Think Win-Win, Seek First to Understand Then to Be Understood, Synergize, and Sharpen the Saw. Covey emphasizes that these habits are based on principles that are timeless and universal. He shows how the habits build on each other, creating a foundation for lasting effectiveness. The book has influenced millions with its principle-centered approach to personal development. Covey's framework provides a comprehensive guide for living a more effective, principle-driven life.",
    key_insights: [
      "Be proactive - take responsibility for your choices and responses",
      "Begin with the end in mind - visualize your destination before starting",
      "Put first things first - prioritize important over urgent activities",
      "Think win-win - seek mutual benefit in all interactions",
      "Seek first to understand, then to be understood - listen before speaking"
    ]
  },
  {
    book_id: "essentialism",
    summary: "Essentialism by Greg McKeown presents a systematic discipline for discerning what is absolutely essential and eliminating everything else. McKeown argues that the way to get more done is not to do more but to do less - only what truly matters. He introduces the concept of the 'essentialist' who deliberately chooses where to invest their time and energy. The book provides a framework for identifying what's essential: explore more, sleep on decisions, apply extreme criteria, and say no gracefully. McKeown shows how essentialism applies to work, relationships, and personal life. He emphasizes that essentialism isn't about doing less for the sake of less, but about doing only the right things. The book helps readers overcome the 'undisciplined pursuit of more' that leads to burnout and mediocrity. Essentialism provides a path to greater focus, clarity, and effectiveness.",
    key_insights: [
      "If you don't prioritize your life, someone else will",
      "Trade-offs are inevitable - choose what to give up rather than trying to have it all",
      "Apply extreme criteria - is this absolutely essential?",
      "Protect the asset - your health and energy are essential for effectiveness",
      "Say no gracefully but firmly to non-essential commitments"
    ]
  },
  {
    book_id: "the-psychology-of-money",
    summary: "The Psychology of Money by Morgan Housel explores the strange ways people think about money and how to make better financial decisions. Housel argues that financial success isn't about intelligence but about behavior and psychology. He shares 19 short stories that illustrate key insights about money, investing, and wealth. The book shows how luck, risk, and time play crucial roles in financial outcomes. Housel emphasizes that there's no 'right' way to handle money - what works for one person may not work for another. He discusses concepts like the difference between being rich and being wealthy, the power of compounding, and the importance of saving rate over investment returns. Housel's writing is accessible and filled with memorable anecdotes that make complex financial concepts easy to understand. The book helps readers develop a healthier relationship with money and make better financial decisions.",
    key_insights: [
      "Your personal experiences with money shape your financial behavior more than education",
      "Wealth is what you don't see - the savings not spent",
      "Compounding is more powerful than you think, given enough time",
      "Luck and risk play huge roles in financial outcomes",
      "The best financial plan is to save aggressively and invest for the long term"
    ]
  },
  {
    book_id: "outliers",
    summary: "Outliers by Malcolm Gladwell challenges the myth of the 'self-made' person by examining the factors that contribute to extraordinary success. Gladwell argues that success is not just about individual merit but about opportunity, timing, and cultural background. He introduces the '10,000-hour rule' - the idea that mastery requires approximately 10,000 hours of deliberate practice. The book explores how factors like birth month, family background, and cultural legacy affect achievement. Gladwell uses examples from hockey players, software programmers, and pilots to illustrate how hidden advantages shape success. He also examines how cultural differences can lead to plane crashes and communication breakdowns. Outliers shows that success is the product of many factors coming together at the right time. The book encourages readers to look beyond individual talent and consider the broader context of achievement.",
    key_insights: [
      "Success depends on opportunity as much as individual merit",
      "The 10,000-hour rule - mastery requires extensive deliberate practice",
      "Cultural background and timing play crucial roles in achievement",
      "Hidden advantages can make the difference between success and failure",
      "Success is the product of many factors, not just individual talent"
    ]
  },
  {
    book_id: "the-alchemist",
    summary: "The Alchemist by Paulo Coelho is a philosophical novel about following your dreams and listening to your heart. The story follows Santiago, a shepherd boy who sells his flock to pursue a treasure he dreams of finding near the Egyptian pyramids. Along his journey, Santiago meets various characters who teach him about the 'Soul of the World' and the importance of following one's 'Personal Legend.' The book explores themes of destiny, love, and the interconnectedness of all things. Coelho uses simple language to convey profound spiritual truths about the journey of self-discovery. The novel suggests that when you want something, the entire universe conspires to help you achieve it. The Alchemist has inspired millions with its message that the journey is as important as the destination and that true treasure lies within. The book combines storytelling with spiritual wisdom in a way that resonates across cultures.",
    key_insights: [
      "Follow your Personal Legend - your unique path in life",
      "When you want something, the universe conspires to help you achieve it",
      "The journey itself contains the treasure you seek",
      "Learn to read the omens and listen to your heart",
      "Fear is the greatest obstacle to pursuing your dreams"
    ]
  },
  {
    book_id: "how-to-win-friends",
    summary: "How to Win Friends and Influence People by Dale Carnegie is the classic guide to human relations and social skills. First published in 1936, the book presents fundamental principles for dealing with people effectively. Carnegie's advice is based on the idea that you can get what you want by making other people want what you want. The book is divided into sections: fundamental techniques in handling people, ways to make people like you, how to win people to your way of thinking, and how to be a leader. Carnegie's principles include becoming genuinely interested in other people, remembering names, listening more than talking, and avoiding criticism. He emphasizes the importance of appreciation, encouragement, and making others feel important. The book's timeless wisdom comes from understanding human psychology and the universal desire for recognition and respect. Despite being written decades ago, the principles remain relevant in our digital age.",
    key_insights: [
      "Become genuinely interested in other people rather than trying to get them interested in you",
      "Remember that a person's name is the sweetest sound in any language",
      "Listen more than you talk and encourage others to talk about themselves",
      "Avoid criticism, condemnation, and complaint - they create resentment",
      "Make the other person feel important and do it sincerely"
    ]
  },
  {
    book_id: "the-art-of-war",
    summary: "The Art of War by Sun Tzu is an ancient Chinese treatise on military strategy that has become a classic guide for conflict resolution and strategic thinking. Written over 2,500 years ago, the book presents principles that apply to business, politics, and personal relationships as well as warfare. Sun Tzu emphasizes the importance of knowing yourself and your enemy, understanding terrain, and using deception. He advocates winning without fighting through superior strategy and positioning. The book is divided into 13 chapters covering topics like laying plans, waging war, attack by stratagem, and use of spies. Sun Tzu's philosophy emphasizes flexibility, adaptation, and the importance of avoiding direct conflict when possible. The Art of War teaches that the supreme art of war is to subdue the enemy without fighting. Its timeless principles have influenced leaders across cultures and centuries.",
    key_insights: [
      "Know yourself and know your enemy - you will never be in peril",
      "All warfare is based on deception - appear weak when strong, strong when weak",
      "The supreme art of war is to subdue the enemy without fighting",
      "Opportunities multiply as they are seized",
      "In the midst of chaos, there is also opportunity"
    ]
  }
];

async function seedBooks() {
  console.log('Starting to seed books...');
  
  try {
    // Insert books
    console.log('Inserting books...');
    const { data: insertedBooks, error: booksError } = await supabase
      .from('books')
      .upsert(books, { onConflict: 'isbn' })
      .select();
    
    if (booksError) {
      console.error('Error inserting books:', booksError);
      return;
    }
    
    console.log(`Successfully inserted ${insertedBooks?.length || 0} books`);
    
    // Insert summaries
    console.log('Inserting summaries...');
    const summariesWithBookIds = summaries.map((summary, index) => ({
      book_id: insertedBooks?.[index]?.id || summary.book_id,
      summary: summary.summary,
      key_insights: summary.key_insights
    }));
    
    const { data: insertedSummaries, error: summariesError } = await supabase
      .from('summaries')
      .upsert(summariesWithBookIds, { onConflict: 'book_id' })
      .select();
    
    if (summariesError) {
      console.error('Error inserting summaries:', summariesError);
      return;
    }
    
    console.log(`Successfully inserted ${insertedSummaries?.length || 0} summaries`);
    console.log('Seeding completed successfully!');
    
  } catch (error) {
    console.error('Unexpected error during seeding:', error);
  }
}

seedBooks();
