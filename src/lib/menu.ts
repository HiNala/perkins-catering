/**
 * Perkins Catering Co. — Menu Data
 * Source: captured menu page from perkinscateringco.com/menu
 * Full seasonal catering menu preserved from the original site.
 */

export interface MenuItem {
  name: string;
  description: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    title: "Salad",
    items: [
      { name: "Little Gems and Dungeness Crab", description: "radish, turnip, lemon cream" },
      { name: "Dungeness Crab or Shrimp Louis", description: "egg, avocado, cucumber, Louis dressing" },
      { name: "Grilled Hearts of Romaine", description: "smoked trout, fried caper, anchovy dressing, Parmesan" },
      { name: "County Line Baby Lettuces", description: "chèvre, pecan, herbed buttermilk dressing, pickled shallot" },
      { name: "Gravenstein Apple Salad", description: "arugula, bacon, Pt. Reyes blue cheese" },
      { name: "Pear and Pomegranate Salad", description: "chèvre, walnut, cranberry, orange" },
      { name: "Cauliflower Salad", description: "prosciutto, watercress, parsley, mustard, almond" },
      { name: "Delicata Squash Salad", description: "dried orange, arugula, hazelnut, farro" },
    ],
  },
  {
    title: "Soup",
    items: [
      { name: "Cream of Porcini Mushroom Soup", description: "hazelnut, truffle" },
      { name: "Butternut Squash Bisque", description: "fried squash, lemon" },
      { name: "White Bean Soup", description: "duck confit, kale, bread crumb" },
      { name: "Caramelized Fennel", description: "levain crouton, gruyère" },
      { name: "Farro and Delicata Squash", description: "bacon, kale" },
      { name: "Corn and Shrimp Chowder", description: "grilled prawn" },
    ],
  },
  {
    title: "Appetizers",
    items: [
      { name: "Raw Marin Oysters", description: "fennel mignonette" },
      { name: "Dungeness Crab Salad", description: "sunflower seed, dried fruit, citrus" },
      { name: "Baked Oysters Mornay", description: "Pt. Reyes toma, breadcrumb" },
      { name: "Crudités Shots", description: "buttermilk dressing" },
      { name: "Mushroom + Chicken Skewers", description: "fried sage, sesame" },
      { name: "Rock Cod Ceviche", description: "heirloom tomato, pepitas" },
      { name: "Mini Carnitas Quesadilla", description: "guacamole, onion, crema" },
      { name: "Fried Picholine Olives", description: "petite basque cheese, red pepper" },
      { name: "Miniature Beef Wellington", description: "duck mousse, duxelles" },
      { name: "Horseradish Twice Baked Fingerling Potatoes", description: "short rib, mirepoix, fried parsley" },
      { name: "Dungeness Crab Cakes", description: "smoked paprika aioli" },
      { name: "Heirloom Tomato Salad", description: "vinegar, mozzarella" },
      { name: "Beet + Goat Cheese Napoléons", description: "champagne vinegar" },
      { name: "Shrimp Cocktail", description: "avocado, seed salad, basil" },
      { name: "Mini Waldorf Salad", description: "Asian pear, candied pecans" },
      { name: "Asparagus + Mushroom Pizzetta", description: "chèvre, truffle oil" },
      { name: "Salmon or Pork Rillettes", description: "bread, grape-cumin jelly" },
      { name: "Lamb Sliders", description: "red pepper mayo, cauliflower pickles, toma cheese" },
      { name: "Truffle Arancini", description: "Parmesan, local honey" },
      { name: "BBQ'd Oysters", description: "home made BBQ sauce" },
      { name: "Scallion Pancake", description: "kimchi, bacon" },
      { name: "Melon Gazpacho Shooters", description: "cherry oil" },
    ],
  },
  {
    title: "Entrées",
    items: [
      { name: "Roasted Petaluma Chicken Breast", description: "fennel, delicata squash, sage jus" },
      { name: "Venison Stew", description: "potato, carrot, parsnip, gremolata" },
      { name: "California King Salmon", description: "celery root, braised endive, farro" },
      { name: "Porcini Mushroom Risotto", description: "pine nuts, parmigiana reggiano" },
      { name: "Wild Boar Tenderloin", description: 'prosciutto, "fried rice", carrot, blackberry' },
      { name: "Eye of Ribeye Steak", description: "parsley root, balsamic, sweet potato, fried herb salad" },
      { name: "Poached Alaskan Halibut", description: "roasted beet, caramelized fennel" },
      { name: "Bone-in Kurobota Pork Chop", description: "sweet potato hash, bacon, apple reduction" },
      { name: "Baked Bolinas Rock Cod", description: "fingerling potato, Brussels sprout, leek butter" },
      { name: "San Francisco Style Cioppino", description: "mussels, clams, shrimp, crab, Pinot noir tomato sauce" },
      { name: "Braised Shortrib of Beef", description: "popover, potato purée, horseradish" },
      { name: "Lamb and Leek Sugo", description: "polenta, tomato" },
    ],
  },
];

export interface SampleMenu {
  title: string;
  description: string;
  courses: MenuItem[];
}

export const sampleMenus: SampleMenu[] = [
  {
    title: "Eight-Person In-Home Dinner",
    description: "An intimate multi-course dinner crafted for a private gathering.",
    courses: [
      { name: "Grilled Local Stonefruit", description: "Bellwether Farms ricotta cheese, green onion, wildflower honey, arugula" },
      { name: "Sweet Corn Risotto", description: "pine nuts, parmigiana reggiano, chive" },
      { name: "Wild Caught California King Salmon", description: "Walla Walla onion soubise, horseradish root, marinated lemon cucumbers, red wine vinegar" },
      { name: "Confit of Petaluma Chicken", description: "zucchini panzanella, natural jus" },
    ],
  },
  {
    title: "250-Person Wedding Buffet",
    description: "A grand celebration buffet showcasing the best of local harvest.",
    courses: [
      { name: "Little Gem Lettuces", description: "Pt. Reyes blue cheese, walnuts, pickled onion, green goddess" },
      { name: "Grilled Corn on the Cob", description: "white truffle oil, black pepper, sage" },
      { name: "Dungeness Crab Mac n Cheese", description: "Pt. Reyes toma cheese, breadcrumb" },
      { name: "Wood Fired Vegetables", description: "grilled seasonal vegetables" },
      { name: "Wood Fired Hanger Steak", description: "caramelized onion + fennel, mustard seed" },
    ],
  },
  {
    title: "300-Person Corporate Event — Oyster & Raw Bar",
    description: "An elaborate raw bar setup for a large corporate celebration.",
    courses: [
      { name: "Trio of Raw Oysters", description: "Tomales Bay Miyagi, Atlantic, and Kumamoto Oysters" },
      { name: "Mignonette", description: "homemade cocktail + horseradish" },
      { name: "Trio of Cooked Oysters", description: "Barbeque, Baked Oysters Mornay, Bacon Braised Oysters" },
      { name: "Ahi Tuna Poke", description: "" },
      { name: "Chilled Dungeness Crab + Maine Lobster", description: "" },
      { name: "Sake Marinated Sea Clams", description: "" },
    ],
  },
];
