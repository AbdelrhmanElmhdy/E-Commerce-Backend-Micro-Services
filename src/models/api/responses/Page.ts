interface Page<T> {
  items: T[];
  page: number;
  batchSize: number;
  nextPage: number | null;
}

export default Page;
