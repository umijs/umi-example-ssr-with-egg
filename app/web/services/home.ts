import request from '@/utils/request';

export const queryRestaurantData = params => {
  return request('/restapi/shopping/v3/restaurants', {
    params,
  });
}
