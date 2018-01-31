import { post, get } from '../api.client';

export async function addTransaction(transaction) {
  await post('api/transaction', null, transaction);
}
