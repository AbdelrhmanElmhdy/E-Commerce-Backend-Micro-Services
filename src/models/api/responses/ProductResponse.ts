import { PriceDetails } from '../../entities/PriceDetails';

interface ProductResponse {
  name: string;
  price: PriceDetails;
  description: string;
  thumbnailImageUrl: string;
  imageUrls: string[];
  rating?: number;
}

export default ProductResponse;
