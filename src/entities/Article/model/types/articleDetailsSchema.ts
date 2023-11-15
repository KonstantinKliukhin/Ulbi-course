import { type Article } from 'entities/Article';

export interface ArticleDetailsSchema {
  isLoading: boolean
  error: string | null
  data: Article | null
}
