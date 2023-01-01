export enum EnamReactionType {
  like = "like",
  favourite = "favourite",
  dislike = "dislike",
}
export type IReactionType =
  | EnamReactionType.like
  | EnamReactionType.favourite
  | EnamReactionType.dislike;
export type IReactionAction =
  | "add to Likes"
  | "add to Favourites"
  | "add to Dislikes";

export default interface IReaction {
  type: IReactionType;
  date: string;
  action: IReactionAction;
  id: string;
}
