import { cleanInvalidatedAccessTokens } from './CleanInvalidatedAccessTokens';
import corn from 'node-cron';

export const allCornJobs: corn.ScheduledTask[] = [cleanInvalidatedAccessTokens];
