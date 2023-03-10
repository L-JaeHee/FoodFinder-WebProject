import { Comment } from '../../components/recipeDetail/RecipeComment';
export interface RecipeDetailInitial {
  dishId: number;
  name: string;
  method: string;
  category: string;
  smallThumbnailUrl: string;
  largeThumbnailUrl: string;
  ingredient: { name: string; amount: string }[];
  serving: number;
  cookingTime: number;
  views: number;
  RecipeLikes: number;
  Steps: RecipeStepsInitial[];
  RecipeComments: Comment[];
  myStar: number;
  starAverage: number;
  liked: boolean;
  numberOfStar: number;
  writer: {
    userId: number;
    email: string;
    nickname: string;
    profileUrl: string;
  };
}

export interface RecipeStepsInitial {
  stepId?: number;
  content?: string;
  imageUrl?: string;
  step?: number;
}

export interface IngredientInitial {
  name?: string;
  amount?: string;
}
