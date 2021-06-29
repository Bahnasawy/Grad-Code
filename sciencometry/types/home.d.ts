/** Recently opened and/or edited project */
type RecentType = { name: string; createdAt: number; description: string; id: number };

/** All recently opened projects */
type RecentsType = Array<RecentType>;
