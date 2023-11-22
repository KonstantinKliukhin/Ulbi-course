import { createEntityAdapter } from '@reduxjs/toolkit';
import { type Article } from 'entities/Article';

export const articleRecommendationsAdapter = createEntityAdapter<Article>();
