import {Offer, Comment} from '../types/types';


export const adaptOfferToClient = (offer: any): Offer => {
  const adaptedOffer= Object.assign(
    {},
    offer,
    {
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      maxAdults: offer.max_adults,
      previewImage: offer.preview_image,
      host: {
        isPro: offer.host.is_pro,
        avatarUrl: offer.host.avatar_url,
        name: offer.host.name,
      },
    },
  );

  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;
  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.name;

  return adaptedOffer;
};


export const adaptCommentToClient = (comment: any): Comment => {
  const adaptedComent= Object.assign(
    {},
    comment,
    {
      user: {
        isPro: comment.user.is_pro,
        avatarUrl: comment.user.avatar_url,
        name: comment.user.name,
      },
    },
  );

  delete adaptedComent.user.is_pro;
  delete adaptedComent.user.avatar_url;
  delete adaptedComent.user.name;

  return adaptedComent;
};

