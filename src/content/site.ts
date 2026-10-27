export type NavLink = { label: string; href: string };

export type WorkflowStep = { title: string; description: string };
export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  images: [MediaSlot, MediaSlot];
  workflow: WorkflowStep[];
  faqs: Faq[];
};

export type MediaSlot = { src?: string; alt: string; tone: "warm" | "cool" | "ink" | "sand" };

export type WorkItem = {
  id: string;
  title: string;
  client: string;
  poster?: string;
  video?: string;
  tone: MediaSlot["tone"];
};

export type Milestone = { year: string; title: string; text: string; media: MediaSlot };

export type ProcessStep ={ id: string; step: string; title: string; description: string };

export type FormFieldConfig = {
  name: "firstName" | "lastName" | "email" | "phone" | "company" | "service" | "message";
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "pills" | "textarea";
  options?: string[];
  multiple?: boolean;
  maxLength?: number;
  hint?: string;
  autoComplete?: string;
};

export const site = {
  brand: {
    name: "Shared Spark",
    tagline: "Content, strategy and campaigns that turn attention into real business.",
  },

  nav: {
    links: [
      { label: "Home", href: "/#home" },
      { label: "Why Us", href: "/why-us" },
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/#work" },
    ] satisfies NavLink[],
    cta: { label: "Book a call", href: "/#contact" },
    menuLabel: "Open menu",
    closeLabel: "Close menu",
  },

  hero: {
    headline: "Make your brand impossible to ignore.",
    highlight: "impossible to ignore.",
    subtext: "We create the content, strategy and campaigns that turn attention into real business.",
    cta: { label: "Book a free strategy call", href: "/#contact" },
    media: { alt: "Creator holding a product on camera", tone: "warm" } satisfies MediaSlot,
    badges: [
      { id: "views", value: "+20M", label: "views generated", position: "top" },
      { id: "leads", value: "10%", label: "more leads", position: "right" },
      { id: "brands", value: "+15", label: "brands grown", position: "bottom-left" },
    ] as const,
  },

  clients: {
    label: "Trusted by growing brands",
    logos: [
      { id: "kult", name: "Kult The Salon", style: "serif" },
      { id: "circle", name: "Circle Co.", style: "circle" },
      { id: "ccs", name: "CCS", style: "block" },
      { id: "delta", name: "Delta", style: "triangle" },
    ] as const,
  },

  whyUs: {
    eyebrow: "Why Us",
    title: "Services built to grow your brand",
    subtitle: "Four ways we help brands get seen, get remembered and get chosen.",
    serviceCta: "View service",
    moreLabel: "Learn more about us",
    moreHref: "/why-us",
  },

  about: {
    metaTitle: "Why Us",
    metaDescription: "Who we are, what we do and the story of Shared Spark so far.",
    hero: {
      eyebrow: "Why Us",
      title: "About Shared Spark",
      text: "We are a creative agency that helps brands get seen, get remembered and get chosen. Content, strategy and campaigns, all under one roof.",
    },
    intro: {
      title: "What is Shared Spark?",
      paragraphs: [
        "Shared Spark started with a simple idea: great brands deserve content that people actually stop for. We bring creators, strategists and media buyers together in one team, so every video, post and ad works toward the same goal.",
        "We work closely with every client, from the first strategy call to the monthly report. No long handovers, no guesswork, just clear plans and content that is made to perform.",
      ],
      metrics: [
        { id: "views", value: "+20M", label: "views generated for our clients" },
        { id: "brands", value: "+15", label: "brands grown across industries" },
        { id: "years", value: "3+", label: "years creating content that converts" },
      ],
    },
    work: {
      title: "A glimpse of our work",
      items: [
        { id: "a1", title: "Salon launch", client: "Kult The Salon", tone: "warm" },
        { id: "a2", title: "Product shoot", client: "CCS", tone: "ink" },
        { id: "a3", title: "Behind the brand", client: "Circle Co.", tone: "sand" },
        { id: "a4", title: "Founder story", client: "Delta", tone: "cool" },
        { id: "a5", title: "Seasonal campaign", client: "CCS", tone: "warm" },
      ] satisfies WorkItem[],
    },
    story: {
      eyebrow: "Our story",
      title: "The history so far",
      text: "Every year we have grown with our clients. Pick a year to see where we were and what we built.",
      listLabel: "Years",
      milestones: [
        {
          year: "2023",
          title: "The first spark",
          text: "Shared Spark is founded by a small team of creators with one camera and a lot of ideas. Our first clients are local businesses who want to stand out online.",
          media: { alt: "The founding team on an early shoot", tone: "warm" },
        },
        {
          year: "2024",
          title: "Growing the team",
          text: "We add strategy and social media management, so clients get one partner for planning, creating and posting.",
          media: { alt: "Team planning a content calendar", tone: "cool" },
        },
        {
          year: "2025",
          title: "Campaigns that convert",
          text: "Paid campaigns join our services. Our content now drives leads and sales, not just views.",
          media: { alt: "Campaign results on a screen", tone: "ink" },
        },
        {
          year: "2026",
          title: "A bigger stage",
          text: "New studio, bigger productions and brands across several industries trusting us with their growth.",
          media: { alt: "Our studio during a production day", tone: "sand" },
        },
        {
          year: "2027+",
          title: "What comes next",
          text: "More brands, new markets and new ways to tell stories. We are just getting started.",
          media: { alt: "The team looking ahead", tone: "warm" },
        },
      ] satisfies Milestone[],
    },
    formTitle: "Let's build your story together",
    formText: "Tell us about your brand and what you want to achieve. We will get back to you within one business day.",
  },

  servicePage: {
    eyebrow: "Our services",
    cta: { label: "Book a free strategy call", href: "#contact" },
    videosTitle: "Our previous work",
    videosEmpty: "New videos for this service are coming soon.",
    playLabel: "Play video",
    workflowEyebrow: "How it works",
    workflowTitle: "Our work flow",
    logosLabel: "Brands we have worked with",
    formTitle: "Let's talk about your project",
    formText: "Tell us a little about your brand. We have already selected this service for you, and you can add others.",
    reviewsTitle: "What our clients say",
    faqTitle: "Frequently asked questions",
  },

  services: [
    {
      slug: "content-creation",
      name: "Content Creation",
      title: "Service 1: Content Creation",
      description:
        "Scroll-stopping short-form video, photography and copy, produced in-house and made for the platforms your customers actually use.",
      images: [
        { alt: "Behind the scenes of a video shoot", tone: "warm" },
        { alt: "Final edited reel on a phone", tone: "ink" },
      ],
      workflow: [
        { title: "Creative brief", description: "We learn your product, audience and goals, then agree on formats and posting platforms." },
        { title: "Scripts and shot list", description: "Hooks, scripts and a shot list for every piece, approved by you before filming." },
        { title: "Shoot day", description: "Our crew films on location or in studio, with creators or your own team on camera." },
        { title: "Edit and deliver", description: "Edited reels, photos and captions delivered ready to post, with one round of revisions." },
      ],
      faqs: [
        { question: "How many videos do we get per month?", answer: "It depends on the package. Most clients start with 8 to 12 short-form videos a month." },
        { question: "Do you provide the people on camera?", answer: "Yes. We can bring creators, or film you and your team if you prefer a more personal feel." },
        { question: "How long until the first videos are ready?", answer: "Usually within two weeks of the brief being approved." },
        { question: "Who owns the content?", answer: "You do. Once delivered, the videos and photos are yours to use anywhere." },
      ],
    },
    {
      slug: "brand-strategy",
      name: "Brand Strategy",
      title: "Service 2: Brand Strategy",
      description:
        "We define who you are, who you speak to and what makes you different, then turn it into a clear plan every piece of content follows.",
      images: [
        { alt: "Strategy workshop with sticky notes", tone: "sand" },
        { alt: "Brand positioning board", tone: "cool" },
      ],
      workflow: [
        { title: "Discovery workshop", description: "A working session to understand your business, customers, competitors and ambitions." },
        { title: "Research", description: "We study your market and audience to find where your brand can stand out." },
        { title: "Positioning and voice", description: "We define what you stand for, who you speak to and how you sound." },
        { title: "Brand playbook", description: "A clear document your team and partners follow for every piece of content." },
      ],
      faqs: [
        { question: "What do we receive at the end?", answer: "A brand playbook covering positioning, audience, messaging and tone of voice, plus content pillars." },
        { question: "How long does a strategy project take?", answer: "Typically three to five weeks, depending on the size of the business." },
        { question: "Do you also design logos?", answer: "Strategy focuses on positioning and messaging. Visual identity can be added as a separate project." },
        { question: "Can our team be involved?", answer: "Yes. We run the discovery workshop with your key people so the result reflects your business." },
      ],
    },
    {
      slug: "social-media-management",
      name: "Social Media Management",
      title: "Service 3: Social Media Management",
      description:
        "Consistent posting, community management and monthly reporting, so your channels keep growing while you focus on the business.",
      images: [
        { alt: "Content calendar on a laptop", tone: "cool" },
        { alt: "Analytics dashboard with growth", tone: "warm" },
      ],
      workflow: [
        { title: "Audit", description: "We review your current accounts, what works, what doesn't and where the gaps are." },
        { title: "Content calendar", description: "A monthly plan of posts, stories and reels, approved by you in advance." },
        { title: "Publish and engage", description: "We post on schedule, reply to comments and messages, and grow your community." },
        { title: "Monthly report", description: "Clear numbers on reach, engagement and growth, with what we will improve next month." },
      ],
      faqs: [
        { question: "Which platforms do you manage?", answer: "Instagram, TikTok, Facebook and LinkedIn. We recommend the ones where your customers spend time." },
        { question: "Do we approve posts before they go live?", answer: "Yes. You see and approve the monthly calendar before anything is published." },
        { question: "Do you reply to comments and messages?", answer: "Yes, community management is included, with clear rules agreed with you." },
        { question: "Is there a minimum contract?", answer: "We recommend at least three months to see real growth, then month to month." },
      ],
    },
    {
      slug: "paid-campaigns",
      name: "Paid Campaigns",
      title: "Service 4: Paid Campaigns",
      description:
        "Performance ads on Meta, TikTok and Google, built from creative that works and optimised every week for leads and sales.",
      images: [
        { alt: "Ad creative variations", tone: "ink" },
        { alt: "Campaign results report", tone: "sand" },
      ],
      workflow: [
        { title: "Goals and tracking", description: "We agree on targets and set up conversion tracking so every result is measured." },
        { title: "Creative and audiences", description: "We build ad creative that stops the scroll and test it on the right audiences." },
        { title: "Launch", description: "Campaigns go live on Meta, TikTok or Google with a clear daily budget." },
        { title: "Optimise weekly", description: "Every week we cut what doesn't work and scale what does, and report the results." },
      ],
      faqs: [
        { question: "What budget do we need?", answer: "It depends on your goals and market. We will recommend a starting budget on the strategy call." },
        { question: "Is the ad budget included in your fee?", answer: "No. Ad spend is paid directly to the platforms, and our fee covers management and creative." },
        { question: "When will we see results?", answer: "First data arrives in days. Most campaigns stabilise and improve after two to four weeks of testing." },
        { question: "Which platforms do you advertise on?", answer: "Meta (Facebook and Instagram), TikTok and Google, chosen based on where your customers are." },
      ],
    },
  ] satisfies Service[],

  work: {
    title: "Work",
    panel: {
      title: "Reels that get results",
      text: "A few recent pieces we produced for our clients. Every reel is planned, shot and edited to stop the scroll and drive action.",
      cta: { label: "Start your project", href: "/#contact" },
    },
    prevLabel: "Previous reel",
    nextLabel: "Next reel",
    playLabel: "Play reel",
    items: [
      { id: "w1", title: "Salon launch", client: "Kult The Salon", tone: "warm" },
      { id: "w2", title: "Product drop", client: "CCS", tone: "ink" },
      { id: "w3", title: "Behind the brand", client: "Circle Co.", tone: "sand" },
      { id: "w4", title: "Founder story", client: "Delta", tone: "cool" },
      { id: "w5", title: "Seasonal campaign", client: "CCS", tone: "warm" },
      { id: "w6", title: "Customer stories", client: "Kult The Salon", tone: "ink" },
    ] satisfies WorkItem[],
  },

  testimonials: {
    title: "What Our Clients Say",
    googleBadge: "Google review",
    readMore: "Read on Google",
    prevLabel: "Previous reviews",
    nextLabel: "More reviews",
  },

  process: {
    title: "Our Process",
    subtitle: "A simple, proven path from first call to measurable growth.",
    steps: [
      {
        id: "s1",
        step: "Step 1",
        title: "Discover",
        description: "A free strategy call to understand your brand, your audience and your goals.",
      },
      {
        id: "s2",
        step: "Step 2",
        title: "Create",
        description: "We plan, shoot and produce content and campaigns tailored to your brand.",
      },
      {
        id: "s3",
        step: "Step 3",
        title: "Grow",
        description: "We launch, measure and optimise every month so results keep compounding.",
      },
    ] satisfies ProcessStep[],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    text: "Tell us about your brand and what you want to achieve. We will get back to you within one business day.",
    fields: [
      { name: "firstName", label: "First name", placeholder: "Jane", autoComplete: "given-name" },
      { name: "lastName", label: "Last name", placeholder: "Doe", autoComplete: "family-name" },
      { name: "email", label: "Email", placeholder: "jane@company.com", type: "email", autoComplete: "email" },
      { name: "phone", label: "WhatsApp number", placeholder: "Include your country code", type: "tel", autoComplete: "tel" },
      { name: "company", label: "Company", placeholder: "Your company", autoComplete: "organization" },
      {
        name: "service",
        label: "Which services are you interested in?",
        hint: "Pick all that apply",
        placeholder: "",
        type: "pills",
        multiple: true,
        options: ["Content Creation", "Brand Strategy", "Social Media Management", "Paid Campaigns", "Not sure yet"],
      },
      { name: "message", label: "Message", placeholder: "Tell us about your project", type: "textarea", maxLength: 3000 },
    ] satisfies FormFieldConfig[],
    submit: {
      idle: "Send message",
      loading: "Sending...",
      error: "Something went wrong. Please try again or email us directly.",
    },
    errors: {
      required: "This field is required",
      email: "Enter a valid email address",
      phone: "Enter a valid WhatsApp number",
      services: "Pick at least one service",
      messageMin: "Please write at least 10 characters",
      messageMax: "Please keep it under 3000 characters",
    },
  },

  thankYou: {
    metaTitle: "Thank you",
    eyebrow: "Message received",
    title: "Thanks, we got your message!",
    text: "Our team will get back to you within one business day. In the meantime, take a look at what we can do for your brand.",
    primaryCta: { label: "Explore our services", href: "/#services" },
    secondaryCta: { label: "Back to home", href: "/" },
  },

  footer: {
    columns: [
      {
        title: "Sitemap",
        links: [
          { label: "Home", href: "/#home" },
          { label: "Why Us", href: "/why-us" },
          { label: "Services", href: "/#services" },
          { label: "Work", href: "/#work" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Content Creation", href: "/#services" },
          { label: "Brand Strategy", href: "/#services" },
          { label: "Social Media", href: "/#services" },
          { label: "Paid Campaigns", href: "/#services" },
        ],
      },
      {
        title: "Social",
        links: [
          { label: "Instagram", href: "#" },
          { label: "TikTok", href: "#" },
          { label: "LinkedIn", href: "#" },
        ],
      },
    ],
    contact: {
      title: "Contact",
      email: "hello@sharedspark.com",
      phone: "+1 555 000 0000",
      location: "City, Country",
    },
    copyright: "Shared Spark. All rights reserved.",
  },
};

export type Site = typeof site;
