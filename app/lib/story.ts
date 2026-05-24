export type StoryYear = {
  year: string;
  title: string;
  body: string;
  photos?: string[];
};

export const story: StoryYear[] = [
  {
    year: "January 2023",
    title: "How we met",
    body: "It started at a wedding! Tettemqe was standing as a groomsman for his close friend Biruk, while Abby was a bridesmaid for her sister, Milcah. Little did we know, celebrating their love story was just the beginning of ours.",
  },
  {
    year: "January 2023",
    title: "First adventure",
    body: "We didn't have to wait long for our first adventure. At the end of the wedding week, the bridal party traveled down to Hawassa. During a boat ride on the lake, we decided to jump into the water together, leaving everyone else to watch us from the boat. Looking back, it was the exact moment we both realized we had a real connection.",
    photos: ["/photos/adventure.jpeg"],
  },
  {
    year: "June 2025",
    title: "The proposal",
    body: "On the morning of June 22nd, Tettemqe proposed lakeside at Babogaya. It happened right after a quick swim in the lake — a full-circle moment. Promising forever to each other doing the exact same thing that sparked our love in the first place.",
    photos: ["/photos/proposal.JPG"],
  },
  {
    year: "May 2026",
    title: "Forever begins",
    body: "Surrounded by our favorite people, we're celebrating the beginning of forever. We're ready for a lifetime of the highest highs, the occasional lows, grand adventures, and the comfortably boring days, too. We're so grateful to step into this next chapter with you all by our side. Sadly, to break our own tradition, no lakes involved for the wedding!",
  },
];
