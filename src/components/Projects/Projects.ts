export type ProjectType = {
  id: number;
  title: string;
  description: string;
  bigDesc?: string;
  imgUrl: string;
  tools: string[];
  multiUrl?: string[];
  link?: string;
};
export const Projects = [
  {
    id: 0,
    title: "Codepreneurs portfolio template",
    description: "Static App",
    bigDes:
      "This App is made with only html/css and it is responsive for mobile-devices,tablets, laptops.",
    imgUrl: "/images/homeImages/secondChallenge.webp",
    multiUrl: ["/images/homeImages/secondChallenge.webp"],
    tools: ["html", "css"],
    tab: 1,
    album: 1,
  },
  {
    id: 1,
    title: "Gallery website",
    description: "Static App",
    bigDes:
      "This App is made with only html/css and it is an image gallery with a simple hover effect.",
    imgUrl: "/images/homeImages/fourthChallenge.webp",
    multiUrl: [
      "/images/homeImages/fourthChallenge.webp",
      "/images/1/hover-effect.webp",
    ],
    tools: ["html", "sass"],
    tab: 1,
    album: 1,
  },
  {
    id: 2,
    title: "Apple Mockup App",
    description: "Static App",
    imgUrl: "/images/homeImages/firstChallenge.webp",
    bigDes:
      "This App is made with only html/css and it is an apple mockup app, it's made with 'float'.",
    multiUrl: ["/images/homeImages/firstChallenge.webp"],
    tools: ["html", "css"],
    tab: 1,
    album: 1,
  },
  {
    id: 3,
    title: "Responsive Template",
    description: "Static App",
    bigDes:
      "This App is made with only html/css and it is responsive for mobile-devices, tablets, laptops. ",
    multiUrl: [
      "/images/homeImages/fifthChallenge.webp",
      "/images/1/mobileFifthChallenge.webp",
    ],
    imgUrl: "/images/homeImages/fifthChallenge.webp",
    tools: ["html", "css"],
    tab: 1,
    album: 1,
  },
  {
    id: 4,
    title: "Responsive Bootstrap App",
    description: "Static App",
    bigDes:
      "This App is made with only html/bootstrap and it is responsive for mobile-devices, tablets, laptops. ",
    multiUrl: [
      "/images/homeImages/sixthChallenge.webp",
      "/images/1/mobileMenuSixth.webp",
      "/images/1/tabletSixth.webp",
    ],
    imgUrl: "/images/homeImages/sixthChallenge.webp",
    tools: ["html", "bootstrap"],
    tab: 1,
    album: 1,
  },
  {
    id: 5,
    title: "Responsive Bootstrap App",
    description: "Static App",
    imgUrl: "/images/homeImages/eighthChallenge.webp",
    bigDes:
      "This App is made with only html/bootstrap and it is responsive for mobile-devices, tablets, laptops. ",
    multiUrl: [
      "/images/homeImages/eighthChallenge.webp",
      "/images/1/eightBlog.webp",
      "/images/1/eightLaptop.webp",
      "/images/1/eightServices.webp",
    ],
    tools: ["html", "bootstrap"],
    tab: 1,
    album: 1,
  },
  {
    id: 6,
    title: "JavaScript Keyboard",
    description: "Bilingual keyboard",
    imgUrl: "/images/homeImages/ninethChallenge.webp",
    bigDes: "This is a bilingual keyboard and is made with JavaScript.",
    multiUrl: [
      "/images/homeImages/ninethChallenge.webp",
      "/images/1/firstKeyboard.webp",
      "/images/1/secondKeyboard.webp",
    ],
    tools: ["html", "js"],
    tab: 2,
    album: 1,
  },
  {
    id: 7,
    title: "JavaScript Book Tracker",
    description:
      "You can edit/delete and track the books that you've read or you still read them",
    imgUrl: "/images/homeImages/tenChallenge.webp",
    bigDes:
      "You can edit/delete and track the books that you've read or you still read them.",
    multiUrl: ["/images/homeImages/tenChallenge.webp"],
    tools: ["html", "js", "bootstrap"],
    tab: 2,
    album: 1,
  },
  {
    id: 8,
    title: "jQuery Budget App",
    description: "See where your money is going.",
    imgUrl: "/images/homeImages/eleventhChallenge.webp",
    bigDes:
      "This Website is made with jQuery. It's an expense tracker where you can edit or delete every expense.",
    multiUrl: ["/images/homeImages/eleventhChallenge.webp"],
    tools: ["html", "jquery", "bootstrap"],
    tab: 2,
    album: 1,
  },
  {
    id: 9,
    title: "Bike Shop",
    description: "Bike shop with working filters",
    imgUrl: "/images/homeImages/thirteenthChallenge.webp",
    bigDes:
      "Responsive app store for bikes, the data is taken from dummy endpoint. The cards, sidebar, menu and the footer are made dynamically with javascript.",
    multiUrl: [
      "/images/homeImages/thirteenthChallenge.webp",
      "/images/1/bikeAppFilter.webp",
    ],
    tools: ["html", "bootstrap", "jQuery", "js"],
    tab: 2,
    album: 1,
  },
  {
    id: 10,
    title: "Racing Game",
    description: "Racing game which keeps the score from previous races",
    imgUrl: "/images/homeImages/twelveChallenge.webp",
    bigDes:
      "Racing game made with jQuery animations, which keeps the score from previous races",
    multiUrl: [
      "/images/homeImages/twelveChallenge.webp",
      "/images/homeImages/twelveChallengeSecond.png",
      "/images/homeImages/twelveChallengeThird.png",
    ],
    tools: ["html", "jquery", "bootstrap"],
    tab: 2,
    album: 1,
  },
  {
    id: 11,
    title: "Restaurants App",
    description:
      "An app where you can see every resturant and leave a review on a resturant",
    imgUrl: "/images/homeImages/restaurantMostpopular.webp",
    bigDes:
      "Restaurant app created with React routing with react-router-dom. Custom Hooks and a Context are used to have the data available in every component. This page also contains a review form and all the reviews are added with ajax - PUT request. You can see the review form on the third slide.",
    multiUrl: [
      "/images/homeImages/restaurantMostpopular.webp",
      "/images/1/cuisines-page.webp",
      "/images/1/detail-page.webp",
      "/images/1/favorites-page.webp",
    ],
    tools: ["html", "css", "react"],
    tab: 3,
    album: 2,
  },
  {
    id: 12,
    title: "Street Artist App",
    description:
      "An app that connects people that love art. Keep in mind that this project is made for mobile devices. ",
    imgUrl: "/images/homeImages/streetArtist.webp",
    bigDes:
      "This App is created with vanilla JavaScript, (please keep in mind that it's only for mobile devices it is NOT responsive for other devices), it has two login options, one is artist login and one is visitor login. There is an auctioning page where the visitor can bid on an art piece. If you login as an artist you can edit or add items/art pieces and they are saved locally, with localStorage.",
    multiUrl: [
      "/images/1/streetArtist1.webp",
      "/images/homeImages/streetArtist.webp",
      "/images/1/streetArtist2.webp",
      "/images/1/streetArtist3.webp",
      "/images/1/streetArtist4.webp",
      "/images/1/streetArtist5.webp",
    ],
    tools: ["html", "css", "javascript"],
    tab: 3,
    album: 2,
    link: "https://streetartistigormgjorgjievski.netlify.app",
  },
  {
    id: 13,
    title: "Brainster Labs",
    description:
      "An app where you can see the projects done from marketing/front-end/web-design academies",
    imgUrl: "/images/homeImages/brainsterLabs.webp",
    bigDes:
      "An app where you can see the projects done from marketing, front-end,web-design Brainster academies",
    multiUrl: [
      "/images/homeImages/brainsterLabs.webp",
      "/images/1/brainsterLab1.webp",
      "/images/1/brainsterLab2.webp",
      "/images/1/brainsterLab3.webp",
    ],
    tools: ["html", "css", "javascript"],
    tab: 2,
    album: 2,
    link: "https://igorgjorgjievskibrainsterlabs.netlify.app",
  },
  {
    id: 14,
    title: "Watch Sale Site",
    description: "An app where you can sell/buy watches",
    imgUrl: "/images/homeImages/watchSaleSite.webp",
    bigDes:
      "This is a web application where you can buy and sell watches. Firebase is my choice for the database. You can delete a watch you posted, edit and add a new one for sell, ONLY if you have an account. You can login via g-mail, facebook, or create your own account for this app. There are four search filters that you can select plus one filter that filters by brand.",
    multiUrl: [
      "/images/homeImages/watchSaleSite.webp",
      "/images/1/watchSaleSite1.webp",
      "/images/1/watchSaleSite2.webp",
      "/images/1/watchSaleSite3.webp",
    ],
    tools: ["html", "css", "bootstrap", "javascript", "firebase"],
    tab: 3,
    album: 2,
  },
  {
    id: 15,
    title: "Clothing Shop",
    description: "An app where you can buy clothes and read fashion news",
    imgUrl: "/images/homeImages/lastChallenge.webp",
    bigDes:
      "This Clothing Shop is made with nextJS. I used getStaticProps, getServerSideProps and getStaticPaths. You can search for blogs or you can search for clothes the choice is yours.",
    multiUrl: [
      "/images/homeImages/lastChallenge.webp",
      "/images/1/about.webp",
      "/images/1/blog.webp",
      "/images/1/blog-detail.webp",
      "/images/1/search-blog-results.webp",
      "/images/1/search-both-results.webp",
      "/images/1/search-overlay-open.webp",
      "/images/1/search-products-results.webp",
      "/images/1/shop.webp",
      "/images/1/shop-detail.webp",
    ],
    tools: ["html", "css", "next"],
    tab: 3,
    album: 2,
  },
  {
    id: 16,
    title: "Burger Builder",
    description: "An app where you can order your favorite burger",
    imgUrl: "/images/1/burgerBuilder1.webp",
    bigDes:
      "Order your favorite burger care free. First of all if you want to order your favorite burger you need to sign up, that is handled with firebase authentication, after you sign up you can order your favorite burger. Also you can see your previous orders. In this application, Firebase is my choice for the database and authentication. ",
    multiUrl: [
      "/images/1/BurgerSignUp.webp",
      "/images/1/burgerBuilder1.webp",
      "/images/1/burgerBuilder2.webp",
      "/images/1/BurgerBuilder3.webp",
    ],
    tools: ["html", "css", "react", "firebase"],
    tab: 3,
    album: 1,
  },
];
