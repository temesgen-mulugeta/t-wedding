export type TimelineEvent = {
  time: string;
  title: string;
  note: string;
};

// Times shown in Ethiopian local time (Western time + 6, in 12-hour cycles).
export const dayTimeline: TimelineEvent[] = [
  { time: "7:00 AM", title: "Groom & groomsmen prepare", note: "The morning at the groom's house" },
  { time: "9:00 AM", title: "Family photos", note: "Capturing the day in still moments" },
  { time: "11:30 AM", title: "Groom arrives at bride's house", note: "The first look" },
  { time: "1:20 PM", title: "Arrival at the church", note: "Doors open" },
  { time: "1:30 PM", title: "Church ceremony", note: "The vows that begin everything" },
];
