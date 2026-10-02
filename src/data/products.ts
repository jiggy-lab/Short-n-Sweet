import { Product, ProductCategory, ProductMood } from '../types';

import heroCenterpieceImg from '../assets/images/hero_bakery_centerpiece_1790962052445.jpg';
import saltedCaramelCakeImg from '../assets/images/product_salted_caramel_cake_1790962061993.jpg';
import flakyPastriesImg from '../assets/images/product_flaky_pastries_1790962071605.jpg';
import fudgeBrowniesImg from '../assets/images/product_fudge_brownies_1790962083024.jpg';
import treatBoxImg from '../assets/images/product_treat_box_1790962093189.jpg';
import velvetCupcakesImg from '../assets/images/product_velvet_cupcakes_1790962144322.jpg';
import chocolateCookiesImg from '../assets/images/product_chocolate_cookies_1790962154116.jpg';
import customCelebrationCakeImg from '../assets/images/product_custom_celebration_cake_1790962165391.jpg';

export {
  heroCenterpieceImg,
  saltedCaramelCakeImg,
  flakyPastriesImg,
  fudgeBrowniesImg,
  treatBoxImg,
  velvetCupcakesImg,
  chocolateCookiesImg,
  customCelebrationCakeImg,
};

export const PRODUCTS: Product[] = [
  {
    id: 'salted-caramel-cake',
    name: 'Salted Caramel Drip Cake',
    category: 'cakes',
    mood: 'celebrate',
    price: 24500,
    shortDescription: 'Three-layer vanilla sponge with house-cooked caramel drip and toasted pecans.',
    description: 'Our most requested celebration cake. Three lofty layers of tender, butter-rich vanilla sponge frosted with whipped brown-butter frosting, drenched in deep salted amber caramel and crowned with crushed toasted pecans and sea salt flakes.',
    image: saltedCaramelCakeImg,
    isBestseller: true,
    leadTimeDays: 2,
    servings: '8 - 10 generous slices',
    ingredients: ['French Normandy butter', 'Madagascar bourbon vanilla', 'Organic brown sugar', 'Maldon sea salt', 'Pecans', 'Fresh whole milk'],
    allergens: ['Dairy', 'Eggs', 'Gluten', 'Tree nuts (Pecans)'],
    inStock: true,
    tags: ['Bestseller', 'Celebration', 'Signature']
  },
  {
    id: 'fudge-sea-salt-brownies',
    name: 'Maldon Sea Salt Fudgy Brownies',
    category: 'brownies',
    mood: 'sweet',
    price: 8500,
    shortDescription: 'Box of 6 ultra-dense dark chocolate brownies with paper-thin crackly tops.',
    description: 'Made with 72% Belgian dark chocolate, browned European butter, and finished with flaky Maldon sea salt. Chewy at the edges, silky-fudgy in the centre, never cakey.',
    image: fudgeBrowniesImg,
    isBestseller: true,
    leadTimeDays: 0,
    servings: 'Box of 6 squares',
    ingredients: ['72% Belgian dark chocolate', 'Browned salted butter', 'Dutch cocoa powder', 'Cane sugar', 'Pasture eggs', 'Maldon sea salt flakes'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Bestseller', 'Chocoholic', 'Everyday']
  },
  {
    id: 'artisan-flaky-pastries',
    name: 'Morning Pastry Duo',
    category: 'pastries',
    mood: 'hungry',
    price: 6800,
    shortDescription: 'Two butter-laminated Pain au Chocolat and two golden cardamom morning buns.',
    description: 'Laminated by hand across 72 hours for sheer, shattering flakiness. Two double-baton dark chocolate pain au chocolat and two coiled cardamom sugar morning buns baked fresh every sunrise in our Gbagada kitchen.',
    image: flakyPastriesImg,
    isBestseller: true,
    leadTimeDays: 0,
    servings: 'Pack of 4 pastries',
    ingredients: ['Stone-ground unbleached flour', 'Lactic dry butter 84%', 'Green cardamom seeds', 'Cacao Barry chocolate batons', 'Demerara sugar'],
    allergens: ['Dairy', 'Gluten'],
    inStock: true,
    tags: ['Fresh Daily', 'Breakfast', 'Artisanal']
  },
  {
    id: 'curated-treat-box',
    name: 'The "No Occasion" Treat Box',
    category: 'boxes',
    mood: 'hungry',
    price: 18500,
    shortDescription: 'The ultimate sampler: 2 mini red velvet cupcakes, 2 salted brownies, 2 giant cookies & 2 pastries.',
    description: 'Because you do not need an excuse. Our signature assortment box hand-packed in sustainable kraft board with a sage grosgrain ribbon. Packed with all our favourites so nobody has to compromise.',
    image: treatBoxImg,
    isBestseller: true,
    leadTimeDays: 0,
    servings: 'Serves 4 - 6 people (or 1 very determined person)',
    ingredients: ['Belgian chocolate', 'Cream cheese', 'Bourbon vanilla', 'European cultured butter', 'Pecan praline', 'Maldon salt'],
    allergens: ['Dairy', 'Eggs', 'Gluten', 'Pecans'],
    inStock: true,
    tags: ['Bestseller', 'Gift Ready', 'Sampler']
  },
  {
    id: 'classic-celebration-cake',
    name: 'Textured Ivory Celebration Cake',
    category: 'cakes',
    mood: 'celebrate',
    price: 32000,
    shortDescription: 'Bespoke textured buttercream cake with edible gold leaf and fresh botanical accents.',
    description: 'Architectural, understated elegance. Three tall layers of delicate vanilla sponge filled with tart raspberry compote and swathed in textured rustic ivory swiss meringue buttercream. Finished with subtle edible gold leaf and fresh fruit.',
    image: customCelebrationCakeImg,
    isBestseller: false,
    leadTimeDays: 2,
    servings: '12 - 16 slices',
    ingredients: ['Swiss meringue buttercream', 'Madagascar vanilla beans', 'Hand-cooked raspberry compote', 'Cake flour', '24k edible gold leaf'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Custom', 'Wedding & Birthday', 'Showstopper']
  },
  {
    id: 'red-velvet-swirl-cupcakes',
    name: 'Velvet & Vanilla Swirl Cupcakes',
    category: 'cupcakes',
    mood: 'sweet',
    price: 9200,
    shortDescription: 'Box of 6 cupcakes: classic Southern red velvet and Madagascar vanilla bean.',
    description: 'Tender, cocoa-infused red velvet sponge with tangy whipped cream cheese frosting, alongside pure Madagascar vanilla bean sponge with golden crumb crowns. Soft, light, and perfectly balanced.',
    image: velvetCupcakesImg,
    isBestseller: false,
    leadTimeDays: 0,
    servings: 'Box of 6 cupcakes',
    ingredients: ['Buttermilk', 'Dutch cocoa', 'Philadelphia cream cheese', 'Tahitian vanilla bean paste', 'Powdered sugar'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Party', 'Sweet Bite', 'Classic']
  },
  {
    id: 'giant-chocolate-chunk-cookies',
    name: 'Sea Salt Chocolate Chunk Cookies',
    category: 'cookies',
    mood: 'sweet',
    price: 7500,
    shortDescription: 'Stack of 4 giant 120g bakery cookies with melted dark chocolate pools.',
    description: 'Aged for 48 hours to develop deep butterscotch and toffee notes. Crispy ruffled edges, a soft gooey centre, and packed with hand-chopped 64% Valrhona dark chocolate chunks.',
    image: chocolateCookiesImg,
    isBestseller: false,
    leadTimeDays: 0,
    servings: 'Pack of 4 giant cookies',
    ingredients: ['Dark muscovado sugar', 'Brown butter', 'Valrhona 64% chocolate', 'Flaky Cornish sea salt', 'Pasture egg yolks'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Comfort', 'Chewy', 'Everyday']
  },
  {
    id: 'berry-drip-gateau',
    name: 'Belgian Ganache & Berry Gâteau',
    category: 'cakes',
    mood: 'celebrate',
    price: 28000,
    shortDescription: 'Rich dark chocolate gâteau with glossy dark ganache drip and handpicked berries.',
    description: 'For genuine chocolate enthusiasts. Four layers of devilishly moist dark cocoa sponge layered with whipped dark chocolate mousse, wrapped in silky ganache, and topped with mountain strawberries and blackberries.',
    image: heroCenterpieceImg,
    isBestseller: false,
    leadTimeDays: 2,
    servings: '10 - 12 slices',
    ingredients: ['Callebaut dark chocolate 70%', 'Dutch processed cocoa', 'Fresh Lagos strawberries', 'Whipped dairy cream', 'Pure cane syrup'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Celebration', 'Chocoholic', 'Dramatic']
  },
  {
    id: 'cardamom-cinnamon-buns',
    name: 'Swedish Cardamom Buns (Bullar)',
    category: 'pastries',
    mood: 'hungry',
    price: 5500,
    shortDescription: 'Trio of hand-knotted cardamom brioche with pearl sugar crunch.',
    description: 'Fragrant freshly crushed green cardamom ribbons folded into enriched brioche dough, baked to a deep amber glaze and topped with crunchy nibbed sugar. Best enjoyed warm with morning coffee or afternoon chai.',
    image: flakyPastriesImg,
    isBestseller: false,
    leadTimeDays: 0,
    servings: 'Pack of 3 buns',
    ingredients: ['Swedish pearl sugar', 'Freshly ground green cardamom', 'Farm butter', 'Enriched brioche dough'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Swedish Style', 'Spiced', 'Breakfast']
  },
  {
    id: 'salted-caramel-brownie-brookie',
    name: 'Salted Caramel Brookie Box',
    category: 'brownies',
    mood: 'sweet',
    price: 9000,
    shortDescription: 'Brownie on the bottom, chocolate chip cookie on top, drizzled with caramel.',
    description: 'Why choose between a brownie and a cookie? We bake our signature dark fudge brownie base with a layer of chewy chocolate chip cookie dough baked right onto it, laced with homemade salted butter caramel.',
    image: fudgeBrowniesImg,
    isBestseller: false,
    leadTimeDays: 0,
    servings: 'Box of 6 brookies',
    ingredients: ['Dutch cocoa', 'Semi-sweet chocolate chips', 'Sea salt caramel', 'European butter'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    inStock: true,
    tags: ['Decadent', 'Crowd Pleaser']
  },
  {
    id: 'study-session-dessert-box',
    name: 'The Study & Craving Survival Pack',
    category: 'boxes',
    mood: 'hungry',
    price: 14500,
    shortDescription: 'Designed for late-night exams, deadlines, or movie marathons in Lagos.',
    description: 'Packed specifically for long nights. Contains 3 sea salt cookies, 3 double chocolate brownies, 2 mini vanilla cupcakes, and our house roasted honey-spiced peanut snack bag.',
    image: treatBoxImg,
    isBestseller: false,
    leadTimeDays: 0,
    servings: 'Generous snack pack for 2 - 3 people',
    ingredients: ['Belgian cocoa', 'Roasted Lagos peanuts', 'Honey glaze', 'Butter cookie crust'],
    allergens: ['Dairy', 'Eggs', 'Gluten', 'Peanuts'],
    inStock: true,
    tags: ['Late Night', 'Students', 'Shareable']
  },
  {
    id: 'pistachio-rose-cupcakes',
    name: 'Pistachio Cream & Rose Cupcakes',
    category: 'cupcakes',
    mood: 'celebrate',
    price: 10500,
    shortDescription: 'Box of 6 Persian-inspired pistachio cupcakes with delicate rosewater buttercream.',
    description: 'Ground Sicilian pistachios folded into a fluffy sponge, piped with a light-as-air rose blossom buttercream and scattered with crushed roasted pistachio slivers and dried organic damask rose petals.',
    image: velvetCupcakesImg,
    isBestseller: false,
    leadTimeDays: 0,
    servings: 'Box of 6 cupcakes',
    ingredients: ['Roasted pistachios', 'Damask rosewater', 'Cultured butter', 'Cake flour', 'Organic rose petals'],
    allergens: ['Dairy', 'Eggs', 'Gluten', 'Tree nuts (Pistachios)'],
    inStock: true,
    tags: ['Floral', 'Special', 'Afternoon Tea']
  }
];

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Treats' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'brownies', label: 'Brownies' },
  { id: 'boxes', label: 'Dessert Boxes' },
];

export const MOODS: { id: ProductMood; label: string; tag: string; description: string }[] = [
  {
    id: 'celebrate',
    label: 'Something to Celebrate',
    tag: 'Birthdays, graduations, wins',
    description: 'Towering tiered cakes, bespoke buttercream, and show-stopping bakes designed to remember forever.'
  },
  {
    id: 'sweet',
    label: 'Just a Little Sweet',
    tag: 'Afternoon craving, Tuesday perk-up',
    description: 'Fudgy brownies, giant chocolate chunk cookies, and delicate cupcakes when you just need that one bite.'
  },
  {
    id: 'hungry',
    label: "I'm Hungry",
    tag: 'Shareable boxes & breakfast pastries',
    description: 'Buttery flaky croissants, morning cardamom buns, and loaded treat boxes made for hungry teams or late nights.'
  }
];

export const NIGERIAN_STATES = [
  'Lagos (Mainland)',
  'Lagos (Island / Lekki / Ajah)',
  'Lagos (Ikeja / Gbagada / Ogudu)',
  'Abuja (FCT)',
  'Oyo (Ibadan)',
  'Ogun (Abeokuta / Sagamu)',
  'Rivers (Port Harcourt)',
  'Enugu',
  'Delta (Asaba / Warri)',
  'Edo (Benin City)',
  'Kano',
  'Kaduna',
  'Ondo (Akure)'
];
