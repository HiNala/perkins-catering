/**
 * Database seed script.
 * Creates an admin user and starter blog posts.
 *
 * Usage: npm run db:seed
 * Requires DATABASE_URL to be set.
 */

import bcrypt from "bcryptjs";
import { db, schema } from "@/lib/db-postgres";
import { eq } from "drizzle-orm";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@perkinscateringco.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "perkins2024!";

  // --- Admin user ---
  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, adminEmail))
    .limit(1);

  if (existing.length === 0) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await db.insert(schema.users).values({
      name: "Austin Perkins",
      email: adminEmail,
      passwordHash,
      role: "admin",
    });
    console.log(`[seed] Created admin user: ${adminEmail}`);
  } else {
    console.log(`[seed] Admin user already exists: ${adminEmail}`);
  }

  // --- Blog posts ---
  const posts = [
    {
      title: "Farm-to-Table Catering: Why Local Ingredients Matter",
      slug: "farm-to-table-catering-why-local-ingredients-matter",
      excerpt:
        "Sonoma County is one of the most abundant food regions in the world. Here's why building menus around what's growing nearby makes every event taste better.",
      content: `## The Bounty of Wine Country

When you cater an event in Sonoma, Napa, or Marin, you're cooking in one of the most generous agricultural regions on the planet. Within a short drive of our kitchen we have heirloom tomatoes from Dry Creek Valley, Dungeness crab from Tomales Bay, lamb from rolling Petaluma pastures, and apples from Gravenstein orchards that have been farmed for generations.

Building a menu around what's growing *right now* isn't a marketing line for us — it's the only way we know how to cook.

## What "Local" Actually Means

A lot of catering companies use the phrase "farm to table" loosely. For us it means something specific:

- **We know our farmers by name.** Austin has spent over a decade building relationships with the growers, fishers, and artisan producers of the North Bay. When we say a salad features County Line baby lettuces, that's because we picked them up from County Line Farm that week.
- **The menu follows the season, not the other way around.** We don't ship in asparagus in November. We wait for spring, and when it arrives we celebrate it.
- **Proteins are sourced with care.** Our chicken comes from Petaluma, our seafood from Marin and Sonoma coast waters, our beef from regional ranches that raise animals the right way.

## Why It Tastes Better

Produce picked at peak ripeness and eaten within days simply has more flavor. A tomato that ripened on the vine in Sebastopol sun tastes nothing like one that traveled 2,000 miles in a refrigerated truck. The same is true of fish — Dungeness crab landed at Tomales Bay and served within 24 hours is sweeter and more tender than anything you'll find out of season.

When every ingredient on the plate is at its best, the cooking gets simpler. We don't need to mask anything. A little olive oil, some sea salt, a squeeze of lemon — and the ingredient speaks for itself.

## What This Means for Your Event

Because our menus are built around seasonal availability, no two events are exactly alike. A wedding in June might feature grilled stone fruit and sweet corn risotto, while an October celebration leans into delicata squash, braised shortrib, and wild mushrooms.

This approach does require a little flexibility — we'll finalize menus closer to your event date so we can see what's looking best at the market — but the result is a meal that genuinely couldn't have been served anywhere else, at any other time.

That's the promise of farm-to-table catering done right: a menu that tastes like the place and the moment you're in.`,
      coverImage: "/images/gallery/gallery-01.jpg",
      author: "Austin Perkins",
      status: "published",
      publishedAt: new Date("2024-09-15"),
    },
    {
      title: "Planning the Perfect Wedding Menu: A Step-by-Step Guide",
      slug: "planning-the-perfect-wedding-menu",
      excerpt:
        "From the first tasting to the final plate, here's how we work with couples to design a wedding menu that feels personal, delicious, and unforgettable.",
      content: `## It Starts With a Conversation

Every great wedding menu begins with a conversation — not a spreadsheet. When a couple first reaches out, we want to hear about more than guest counts and budgets. We want to know the story: how you met, what foods you love, what your families cook for holidays, whether you're dreaming of a formal plated dinner or a relaxed family-style feast.

Those details are the raw material for a menu that feels like *you*.

## Step 1: Understanding the Vision

In our first conversation we'll talk through:

- **The feel of the day.** Black-tie elegance? Rustic wine country? A barefoot celebration in the redwoods?
- **Service style.** Plated multi-course, buffet, family-style, or cocktail-style with passed appetizers.
- **Guest count and logistics.** An intimate dinner for 40 and a buffet for 250 require very different approaches.
- **Dietary needs.** Vegetarian, vegan, gluten-free, allergies — we plan for every guest.

## Step 2: A Custom Menu Proposal

Based on that conversation, we craft a custom menu proposal. This isn't a generic package — it's built specifically for your event, drawing on what's seasonal and what fits your vision.

A summer wedding might propose little gems and Dungeness crab salad, grilled corn with white truffle oil, and California king salmon with celery root and braised endive. A fall celebration might feature butternut squash bisque, braised shortrib with popover and potato purée, and a poached pear dessert.

## Step 3: The Tasting

We believe every event should feel exactly the way you intend it to. Once we've settled on a direction, we arrange a tasting so you can experience the flavors, textures, and presentation firsthand.

This is where the menu comes alive. You'll sit down to a version of your future meal, and we'll refine every detail — adjusting seasoning, swapping a component, fine-tuning portion sizes — until it's perfect.

## Step 4: Finalizing and Executing

In the weeks before the wedding we lock in the final menu, coordinate with your venue and other vendors, and plan the service timeline down to the minute. On the day itself, our team arrives early, sets up without fuss, and executes the meal with the kind of calm professionalism that lets you focus on your guests.

We've catered weddings in rustic outdoor settings without hookups or lighting, grand ballroom celebrations, and everything in between. Whatever the setting, the goal is the same: a meal that becomes one of the best memories of the day.

## A Few Things We've Learned

After hundreds of weddings, a few principles hold true:

- **Don't overcomplicate.** A few dishes executed beautifully beat a sprawling menu done adequately.
- **Trust the season.** The best wedding menus lean into what's available, not what's trendy.
- **Feed your vendors.** A well-fed photographer and band are happy vendors. We always plan for it.
- **Have a plan B for weather.** Outdoor weddings are magical — and they need a weather backup for the food.

Ready to start planning? We'd love to hear your story.`,
      coverImage: "/images/gallery/gallery-03.jpg",
      author: "Austin Perkins",
      status: "published",
      publishedAt: new Date("2024-10-02"),
    },
    {
      title: "Seasonal Menus: Eating With the Calendar in Wine Country",
      slug: "seasonal-menus-eating-with-the-calendar",
      excerpt:
        "Spring asparagus, summer stone fruit, fall squash, winter citrus — a year of cooking in Sonoma County is a masterclass in eating seasonally.",
      content: `## A Year on the Plate

Cooking seasonally in wine country isn't a constraint — it's a gift. Each month brings a new arrival at the farmers market, and our menus shift to follow. Here's a look at how the calendar shapes what we serve.

## Spring: Bright, Green, and Eager

Spring in Sonoma arrives with a rush of green. Asparagus spears push through the soil, peas fatten on the vine, and the first tender lettuces appear at County Line Farm.

Spring menus lean bright and fresh. We're making salads with baby lettuces, chèvre, and herbed buttermilk dressing. We're grilling asparagus with lemon and shaved Parmesan. We're featuring Petaluma chicken with spring peas and new potatoes.

The energy of the season — that sense of everything waking up — finds its way onto the plate.

## Summer: Abundance

If spring is eager, summer is abundant. By July the markets are overflowing: heirloom tomatoes in every color, sweet corn, stone fruit so juicy it drips down your arm, peppers, eggplant, melons, and berries.

Summer is when we let the ingredients do the talking. A caprese with heirloom tomatoes and Pt. Reyes mozzarella needs almost nothing else. Grilled corn with white truffle oil and sage is a celebration in a single bite. And a stone fruit salad with Bellwether Farms ricotta and wildflower honey is the kind of dessert that makes people close their eyes.

Our summer meal program — pickup and delivery of seasonal dishes — was born from this abundance. It's our way of sharing the season with people who want restaurant-quality food at home.

## Fall: Depth and Warmth

Fall is when the cooking gets cozy. The market shifts to winter squash, apples, pears, root vegetables, and wild mushrooms. The air cools, and suddenly we're craving deeper, warmer flavors.

Fall menus feature butternut squash bisque, braised shortrib with popover and horseradish, lamb and leek sugo over polenta, and delicata squash salad with farro and hazelnut. We're roasting, braising, and building dishes with layers of flavor.

It's also mushroom season. When the rains come, the foragers bring us porcini and chanterelles, and we build menus around them — risottos, pastas, and earthy sauces that taste like the forest floor.

## Winter: Citrus and Comfort

Winter in wine country is quieter but not barren. Citrus arrives — Meyer lemons, blood oranges, mandarins — bringing brightness to the short days. Root vegetables store well, and the hardy greens like kale and chard are at their sweetest after a frost.

Winter menus balance comfort and brightness: white bean soup with duck confit and kale, roasted root vegetables with gremolata, cioppino with mussels and clams and crab in a Pinot noir tomato sauce, and salads that use citrus to cut through richer dishes.

## The Rhythm of the Year

Cooking this way — letting the calendar dictate the menu — means we're never bored. Just as you've perfected a summer dish, the season turns and there's something new to explore. It keeps the cooking alive, and it means your event gets food that's at the absolute peak of its flavor.

That's the real luxury of seasonal cooking: not rarity or expense, but timing. Serving something at the exact moment it's meant to be eaten.`,
      coverImage: "/images/gallery/gallery-05.jpg",
      author: "Austin Perkins",
      status: "published",
      publishedAt: new Date("2024-11-08"),
    },
    {
      title: "Wine Pairings for Catered Events: A Chef's Perspective",
      slug: "wine-pairings-for-catered-events",
      excerpt:
        "Great food deserves great wine. Here's how we think about pairings for events across Napa, Sonoma, and Marin — and why the best matches are often local.",
      content: `## Food and Wine, Together

In wine country, food and wine aren't separate considerations — they're a single experience. A dish can be delicious on its own, but paired with the right wine, it becomes something more. The wine highlights a flavor you might have missed; the food softens the tannins and brings out fruit in the glass.

We've spent years catering events at wineries and vineyards across Napa, Sonoma, and Marin, and we've learned that the best pairings are often the most local ones.

## Start With the Wine Country

When you're hosting an event in Sonoma, the easiest and most elegant choice is to pour Sonoma wines. Not because of provincial pride, but because the food and wine of a region evolved together. The bright acidity of a Russian River Pinot Noir is a natural match for the salmon we source from nearby waters. A Sonoma Coast Chardonnay cuts through the richness of Dungeness crab.

We work closely with wineries like Dutton-Goldfield and Imagery Estate, and we're always happy to coordinate with your venue's wine program or a sommelier.

## A Few Pairing Principles

You don't need to be a sommelier to think about pairings. Here are the principles we use:

- **Match weight with weight.** Delicate dishes (halibut, crab, salads) pair with lighter wines — Sauvignon Blanc, Pinot Gris, rosé. Richer dishes (shortrib, lamb, wild boar) can stand up to bigger wines — Cabernet, Syrah, Zinfandel.
- **Acid is your friend.** Wines with bright acidity (Champagne, Albariño, dry Riesling) are incredibly versatile with food. They refresh the palate between bites.
- **Consider the sauce, not just the protein.** The sauce often determines the pairing. A chicken breast with a sage jus pairs differently than one with a creamy mushroom sauce.
- **Don't forget sparkling.** Sparkling wine is the most food-friendly wine there is, and it brings a sense of celebration to any event.

## Pairings We Love

A few combinations we keep coming back to:

- **Dungeness crab salad + Sonoma Coast Chardonnay.** The wine's citrus and mineral notes echo the crab's sweetness.
- **California king salmon + Russian River Pinot Noir.** A classic. The wine's red fruit and acidity complement the salmon's richness without overwhelming it.
- **Braised shortrib + Alexander Valley Cabernet.** The wine's structure matches the dish's depth.
- **Oysters + Sparkling wine or Sauvignon Blanc.** Briny, bright, and refreshing — the way an event should begin.
- **Heirloom tomato salad + dry rosé.** Summer in a glass and on a plate.

## Building a Pairing Menu for Your Event

For plated dinners, we can design a course-by-course pairing menu, working with your wine selection or recommending wines from our partner vineyards. For buffets and cocktail-style events, we suggest a curated selection of three or four wines that cover the range of the menu — a sparkling for arrival, a white and a red for the main courses, and perhaps a dessert wine to close.

The goal isn't to impress with rare bottles. It's to make the food and wine feel like they belong together — because in wine country, they do.`,
      coverImage: "/images/gallery/gallery-07.jpg",
      author: "Austin Perkins",
      status: "published",
      publishedAt: new Date("2024-12-01"),
    },
    {
      title: "Corporate Catering That Actually Impresses Your Guests",
      slug: "corporate-catering-that-impresses",
      excerpt:
        "Tired of the same sandwich platters? Here's how to plan corporate catering that your team and clients will remember — for the right reasons.",
      content: `## Beyond the Sandwich Tray

Corporate catering has a reputation problem. Too often it means a tray of soggy sandwiches, a sad salad, and cookies from a box. Your team deserves better. Your clients — who you're trying to impress — definitely deserve better.

The good news: restaurant-quality corporate catering is entirely possible, whether you're hosting a leadership retreat for 20 or a company-wide celebration for 300.

## Match the Format to the Event

Different corporate events call for different formats:

- **Working lunches and meetings.** A buffet with composed salads, a protein, and a starch keeps things efficient while elevating the quality. Think grilled chicken with a seasonal vegetable, a grain salad, and fresh bread — food that's satisfying without inducing a post-lunch coma.
- **Client dinners and executive retreats.** A plated multi-course meal signals that you value your guests' time and attention. This is where we bring the full restaurant experience: a thoughtful progression of courses, wine pairings, and impeccable service.
- **Large celebrations and holiday parties.** Cocktail-style with passed appetizers and food stations keeps people mingling. An oyster and raw bar is a showstopper that gets people talking.
- **Conferences and all-day events.** Breakfast, lunch, and breaks — we can handle the full day with consistent quality, so your attendees stay energized instead of reaching for the coffee.

## Quality Shows in the Details

The difference between forgettable catering and memorable catering is in the details:

- **Ingredients.** We use the same farm-sourced produce and local proteins for a 300-person corporate event that we use for a private wedding. Quality scales.
- **Presentation.** Food that looks beautiful tastes better. We style every station and plate with care.
- **Service.** Our team is professional, on-time, and unobtrusive. We set up early, keep things stocked, and clean up so you don't have to think about it.
- **Dietary accommodation.** We label dishes and ensure every guest — vegetarian, gluten-free, or allergy-conscious — has options that are just as good as the rest.

## The Oyster Bar: A Corporate Crowd-Pleaser

If you want to make an impression, consider an oyster and raw bar. We've catered corporate events for 300+ with a raw bar featuring a trio of raw oysters (Tomales Bay Miyagi, Atlantic, and Kumamoto), cooked oysters (BBQ, Mornay, and bacon-braised), Ahi tuna poke, chilled Dungeness crab and Maine lobster, and sake-marinated sea clams.

It's interactive, it's impressive, and it gives people a reason to gather and talk. For a corporate event, that's exactly what you want.

## Planning Ahead

The best corporate events come together with a little lead time. Reach out a few weeks ahead if possible — we'll talk through your goals, your guest count, your venue, and your budget, and craft a menu that fits. We're flexible on scheduling and can accommodate early-morning setups, off-site venues, and tight timelines.

Because here's the thing: people remember the food at an event. Make it good, and they'll remember the event fondly. Make it exceptional, and they'll be talking about it until the next one.`,
      coverImage: "/images/gallery/gallery-02.jpg",
      author: "Austin Perkins",
      status: "published",
      publishedAt: new Date("2025-01-12"),
    },
  ];

  for (const post of posts) {
    const existingPost = await db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.slug, post.slug))
      .limit(1);

    if (existingPost.length === 0) {
      await db.insert(schema.blogPosts).values({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        author: post.author,
        status: post.status,
        publishedAt: post.publishedAt,
      });
      console.log(`[seed] Created blog post: ${post.title}`);
    } else {
      console.log(`[seed] Blog post already exists: ${post.title}`);
    }
  }

  console.log("[seed] Done.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed] Error:", err);
    process.exit(1);
  });
