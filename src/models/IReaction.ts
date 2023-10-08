export const enum EnamReactionType {
  like = "like",
  favourite = "favourite",
  dislike = "dislike",
}
export const enum EnamReactionAction {
  AddToLikes = "add to Likes",
  AddToFavourites = "add to Favourites",
  AddToDislikes = "add to Dislikes",
}

export interface IReaction {
  type: EnamReactionType;
  date: string;
  action: EnamReactionAction;
  id: string;
}
